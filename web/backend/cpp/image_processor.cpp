/*
 * Aqua-Lens High-Performance Image Processor
 * C++ implementation for advanced image preprocessing
 * Optimized for test strip color analysis
 */

#include <opencv2/opencv.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/imgcodecs.hpp>
#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include <algorithm>

class TestStripProcessor {
private:
    cv::Mat originalImage;
    cv::Mat processedImage;
    
public:
    TestStripProcessor() {}
    
    bool loadImage(const std::string& imagePath) {
        originalImage = cv::imread(imagePath, cv::IMREAD_COLOR);
        if (originalImage.empty()) {
            std::cerr << "Error: Could not load image " << imagePath << std::endl;
            return false;
        }
        return true;
    }
    
    void preprocessImage() {
        cv::Mat temp;
        originalImage.copyTo(temp);
        
        // Step 1: Noise reduction using bilateral filter
        cv::bilateralFilter(temp, processedImage, 9, 75, 75);
        
        // Step 2: Enhance contrast using CLAHE (Contrast Limited Adaptive Histogram Equalization)
        cv::Mat lab;
        cv::cvtColor(processedImage, lab, cv::COLOR_BGR2Lab);
        
        std::vector<cv::Mat> labChannels;
        cv::split(lab, labChannels);
        
        cv::Ptr<cv::CLAHE> clahe = cv::createCLAHE(2.0, cv::Size(8, 8));
        clahe->apply(labChannels[0], labChannels[0]);
        
        cv::merge(labChannels, lab);
        cv::cvtColor(lab, processedImage, cv::COLOR_Lab2BGR);
        
        // Step 3: Color correction and white balance
        correctWhiteBalance();
        
        // Step 4: Sharpen the image
        sharpenImage();
        
        // Step 5: Normalize lighting conditions
        normalizeLighting();
    }
    
    void correctWhiteBalance() {
        cv::Mat temp;
        processedImage.copyTo(temp);
        
        // Simple white balance using gray world assumption
        cv::Scalar meanBGR = cv::mean(temp);
        double meanGray = (meanBGR[0] + meanBGR[1] + meanBGR[2]) / 3.0;
        
        std::vector<cv::Mat> channels;
        cv::split(temp, channels);
        
        // Adjust each channel
        for (int i = 0; i < 3; i++) {
            if (meanBGR[i] > 0) {
                double scale = meanGray / meanBGR[i];
                channels[i] *= scale;
            }
        }
        
        cv::merge(channels, processedImage);
    }
    
    void sharpenImage() {
        cv::Mat kernel = (cv::Mat_<float>(3, 3) << 
                         0, -1, 0,
                         -1, 5, -1,
                         0, -1, 0);
        
        cv::Mat sharpened;
        cv::filter2D(processedImage, sharpened, -1, kernel);
        processedImage = sharpened;
    }
    
    void normalizeLighting() {
        cv::Mat temp;
        processedImage.copyTo(temp);
        
        // Convert to HSV for better lighting control
        cv::Mat hsv;
        cv::cvtColor(temp, hsv, cv::COLOR_BGR2HSV);
        
        std::vector<cv::Mat> hsvChannels;
        cv::split(hsv, hsvChannels);
        
        // Normalize the V (brightness) channel
        cv::equalizeHist(hsvChannels[2], hsvChannels[2]);
        
        cv::merge(hsvChannels, hsv);
        cv::cvtColor(hsv, processedImage, cv::COLOR_HSV2BGR);
    }
    
    std::vector<cv::Rect> detectTestStripRegions() {
        std::vector<cv::Rect> regions;
        
        cv::Mat gray, binary;
        cv::cvtColor(processedImage, gray, cv::COLOR_BGR2GRAY);
        
        // Use adaptive thresholding to find colored regions
        cv::adaptiveThreshold(gray, binary, 255, cv::ADAPTIVE_THRESH_GAUSSIAN_C, 
                             cv::THRESH_BINARY_INV, 11, 2);
        
        // Find contours
        std::vector<std::vector<cv::Point>> contours;
        std::vector<cv::Vec4i> hierarchy;
        cv::findContours(binary, contours, hierarchy, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_SIMPLE);
        
        // Filter contours by area and aspect ratio
        for (const auto& contour : contours) {
            cv::Rect boundingRect = cv::boundingRect(contour);
            double area = cv::contourArea(contour);
            double aspectRatio = (double)boundingRect.width / boundingRect.height;
            
            // Filter based on reasonable test strip pad characteristics
            if (area > 100 && area < 10000 && aspectRatio > 0.5 && aspectRatio < 3.0) {
                regions.push_back(boundingRect);
            }
        }
        
        // Sort regions by position (left to right, top to bottom)
        std::sort(regions.begin(), regions.end(), [](const cv::Rect& a, const cv::Rect& b) {
            if (abs(a.y - b.y) < 50) { // Same row
                return a.x < b.x;
            }
            return a.y < b.y;
        });
        
        return regions;
    }
    
    cv::Vec3b extractAverageColor(const cv::Rect& region) {
        cv::Mat roi = processedImage(region);
        cv::Scalar meanColor = cv::mean(roi);
        return cv::Vec3b(meanColor[0], meanColor[1], meanColor[2]);
    }
    
    bool saveProcessedImage(const std::string& outputPath) {
        if (processedImage.empty()) {
            std::cerr << "Error: No processed image to save" << std::endl;
            return false;
        }
        
        std::vector<int> compression_params;
        compression_params.push_back(cv::IMWRITE_JPEG_QUALITY);
        compression_params.push_back(95);
        
        return cv::imwrite(outputPath, processedImage, compression_params);
    }
    
    void analyzeColorAccuracy() {
        // Calculate color distribution and quality metrics
        cv::Mat hsv;
        cv::cvtColor(processedImage, hsv, cv::COLOR_BGR2HSV);
        
        std::vector<cv::Mat> hsvChannels;
        cv::split(hsv, hsvChannels);
        
        // Calculate histogram for each channel
        int histSize = 256;
        float range[] = {0, 256};
        const float* histRange = {range};
        
        cv::Mat hHist, sHist, vHist;
        cv::calcHist(&hsvChannels[0], 1, 0, cv::Mat(), hHist, 1, &histSize, &histRange);
        cv::calcHist(&hsvChannels[1], 1, 0, cv::Mat(), sHist, 1, &histSize, &histRange);
        cv::calcHist(&hsvChannels[2], 1, 0, cv::Mat(), vHist, 1, &histSize, &histRange);
        
        // Output color analysis results
        std::cout << "Color Analysis Complete:" << std::endl;
        std::cout << "Image Size: " << processedImage.cols << "x" << processedImage.rows << std::endl;
        std::cout << "Processing: Enhanced contrast, white balance, sharpening applied" << std::endl;
    }
};

int main(int argc, char* argv[]) {
    if (argc != 3) {
        std::cerr << "Usage: " << argv[0] << " <input_image> <output_image>" << std::endl;
        return -1;
    }
    
    std::string inputPath = argv[1];
    std::string outputPath = argv[2];
    
    TestStripProcessor processor;
    
    // Load the image
    if (!processor.loadImage(inputPath)) {
        return -1;
    }
    
    std::cout << "Processing image: " << inputPath << std::endl;
    
    // Process the image
    processor.preprocessImage();
    
    // Detect test strip regions
    std::vector<cv::Rect> regions = processor.detectTestStripRegions();
    std::cout << "Detected " << regions.size() << " test strip regions" << std::endl;
    
    // Analyze color accuracy
    processor.analyzeColorAccuracy();
    
    // Save the processed image
    if (processor.saveProcessedImage(outputPath)) {
        std::cout << "Processed image saved to: " << outputPath << std::endl;
        return 0;
    } else {
        std::cerr << "Failed to save processed image" << std::endl;
        return -1;
    }
}

/*
Compilation instructions:
g++ -std=c++11 -o image_processor image_processor.cpp `pkg-config --cflags --libs opencv4`

Or if opencv4 is not available:
g++ -std=c++11 -o image_processor image_processor.cpp -lopencv_core -lopencv_imgproc -lopencv_imgcodecs

For Windows with vcpkg:
g++ -std=c++11 -o image_processor.exe image_processor.cpp -I"C:/vcpkg/installed/x64-windows/include" -L"C:/vcpkg/installed/x64-windows/lib" -lopencv_core -lopencv_imgproc -lopencv_imgcodecs
*/