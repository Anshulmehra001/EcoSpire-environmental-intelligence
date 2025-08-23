import sys
import json
import cv2
import numpy as np
from skimage import color as skimage_color
import os

class WaterQualityAnalyzer:
    def __init__(self):
       self.lab_calibration = {
    'ph': [
        ((54, 81, 69), 4.0),
        ((63, 60, 59), 5.0),
        ((75, 24, 79), 6.0),
        ((88, -8, 86), 6.5),
        ((97, -15, 94), 7.0),
        ((91, -26, 85), 7.5),
        ((88, -76, 81), 8.0),
        ((91, -48, -14), 8.5),
        ((54, 57, -100), 9.0),
    ],
    'chlorine': [
        ((100, 0, 0), 0.0),
        ((97, 5, 2), 0.5),
        ((91, 15, 5), 1.0),
        ((76, 34, 4), 2.0),
        ((60, 49, -4), 3.0),
        ((54, 69, 36), 4.0),
    ],
    'nitrates': [
        ((100, 0, 0), 0),
        ((97, 6, 4), 5),
        ((92, 14, 6), 10),
        ((76, 33, 5), 25),
        ((63, 60, 58), 50),
    ],
    'hardness': [
        ((100, 0, 0), 0),
        ((98, -3, 3), 50),
        ((91, -21, 20), 100),
        ((88, -76, 81), 150),
        ((54, -39, 36), 200),
        ((46, -51, 49), 300),
    ],
    'alkalinity': [
        ((100, 0, 0), 0),
        ((98, -9, 0), 40),
        ((91, -16, -11), 80),
        ((91, -48, -14), 120),
        ((87, -42, -15), 160),
        ((60, -29, -29), 240),
    ],
    'bacteria': [
        ((100, 0, 0), 0),
        ((97, -1, 12), 0.5),
        ((97, -15, 94), 1),
    ],
}



    def _color_distance_lab(self, lab1, lab2):
        return np.sqrt(np.sum((np.array(lab1) - np.array(lab2)) ** 2))

    def analyze_parameter(self, avg_lab_color, parameter):
        if parameter not in self.lab_calibration: return 0, 0
        calibration_data = self.lab_calibration[parameter]
        if not calibration_data: return 0, 0
        
        distances = [(self._color_distance_lab(avg_lab_color, cal_lab), value) for cal_lab, value in calibration_data]
        distances.sort()
        
        closest_dist, best_value = distances[0]
        confidence = max(0, 100 - (closest_dist * 2.5))
        
        if len(distances) >= 2:
            d1, v1 = distances[0]
            d2, v2 = distances[1]
            if (d1 + d2) == 0: return v1, confidence
            weight1 = d2 / (d1 + d2)
            weight2 = d1 / (d1 + d2)
            interpolated_value = v1 * weight1 + v2 * weight2
            return interpolated_value, confidence
        
        return best_value, confidence

    def analyze_water_quality(self, image_path, water_source='unknown'):
        image = cv2.imread(image_path)
        if image is None: raise ValueError(f"Could not load image: {image_path}")
        
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        height = image_rgb.shape[0]
        pad_height = height // 6
        regions_of_interest = [image_rgb[i * pad_height:(i + 1) * pad_height, :] for i in range(6)]

        parameter_names = ['ph', 'chlorine', 'nitrates', 'hardness', 'alkalinity', 'bacteria']
        results, confidences = {}, {}

        for i, param in enumerate(parameter_names):
            roi_rgb = regions_of_interest[i]
            roi_lab = skimage_color.rgb2lab(roi_rgb)
            avg_lab_color = np.mean(roi_lab.reshape(-1, 3), axis=0)
            value, confidence = self.analyze_parameter(avg_lab_color, param)
            results[param] = value
            confidences[param] = round(confidence)
            
        overall_confidence = round(np.mean(list(confidences.values())))

        return {
            "ph": results.get('ph', 0), "chlorine": results.get('chlorine', 0),
            "nitrates": results.get('nitrates', 0), "hardness": results.get('hardness', 0),
            "alkalinity": results.get('alkalinity', 0), "bacteria": results.get('bacteria', 0),
            "confidence": overall_confidence, "individualConfidences": confidences,
            "processingMethod": "Python CV (LAB Space)",
        }

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}), file=sys.stderr)
        sys.exit(1)
    
    image_path = sys.argv[1]
    water_source = sys.argv[2] if len(sys.argv) > 2 else 'unknown'
    
    if not os.path.exists(image_path):
        print(json.dumps({"error": f"Image file not found: {image_path}"}), file=sys.stderr)
        sys.exit(1)
    
    try:
        analyzer = WaterQualityAnalyzer()
        results = analyzer.analyze_water_quality(image_path, water_source)
        print(json.dumps(results, indent=4))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()