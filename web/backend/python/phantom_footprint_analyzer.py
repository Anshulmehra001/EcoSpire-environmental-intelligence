# FILE: web/backend/python/phantom_footprint_analyzer.py (UPGRADED with better AI)

import sys
import json
import random

# --- UPGRADED KNOWLEDGE BASE ---
# We've added more categories and more specific data
product_category_db = {
    "small_electronics": {
        "return_rate_percent": (20, 35), "packaging_waste_grams": (300, 800),
        "carbon_footprint_kg": (15, 40), "water_usage_liters": (3000, 12000),
        "base_weight_kg": 0.3,
        "recommendations": [
            "Look for brands with strong repairability scores to extend the product's life.",
            "Consider purchasing refurbished electronics to reduce manufacturing demand.",
            "Check for certifications like EPEAT or Energy Star for efficiency."
        ]
    },
    "fashion": {
        "return_rate_percent": (25, 45), "packaging_waste_grams": (100, 400),
        "carbon_footprint_kg": (10, 30), "water_usage_liters": (2500, 8000),
        "base_weight_kg": 0.8,
        "recommendations": [
            "High return rates often indicate poor sizing. Check user reviews for sizing accuracy.",
            "Choose natural, sustainably sourced fibers like organic cotton or Tencel.",
            "Wash clothes in cold water to save energy and extend their lifespan."
        ]
    },
    "small_appliance": {
        "return_rate_percent": (10, 20), "packaging_waste_grams": (800, 2500),
        "carbon_footprint_kg": (20, 60), "water_usage_liters": (1000, 5000),
        "base_weight_kg": 2.5,
        "recommendations": [
            "Prioritize energy and water efficiency ratings to save on long-term running costs.",
            "Measure your space carefully before ordering to avoid return shipping.",
            "Check if the manufacturer has a take-back program for your old appliance."
        ]
    },
    # --- NEW, MORE ACCURATE CATEGORY ---
    "large_appliance": {
        "return_rate_percent": (5, 15), "packaging_waste_grams": (3000, 8000),
        "carbon_footprint_kg": (80, 250), "water_usage_liters": (4000, 10000),
        "base_weight_kg": 8.0, # Much heavier
        "recommendations": [
            "For large appliances, repair is almost always the most eco-friendly option.",
            "Ensure the product has a high energy-efficiency rating as its lifetime energy use is a major impact.",
            "Confirm the retailer will recycle your old appliance upon delivery."
        ]
    },
    "default": { # Fallback for unknown items
        "return_rate_percent": (15, 30), "packaging_waste_grams": (200, 600),
        "carbon_footprint_kg": (20, 50), "water_usage_liters": (2000, 6000),
        "base_weight_kg": 1.0,
        "recommendations": ["Consider buying from local retailers to reduce shipping emissions.", "Look for minimal packaging options."]
    }
}

transport_co2_kg_per_km_per_kg = 0.00018
shipping_distances_km = { "China": 12000, "Vietnam": 13500, "India": 14000, "Colombia": 4500, "USA": 1500, "Germany": 8000 }

# --- UPGRADED "AI" - More Keywords, Better Logic ---
def extract_info_from_url(url):
    """
    A smarter simulation to identify product, category, and origin from a URL.
    """
    url_lower = url.lower() # Convert URL to lowercase for easier searching
    
    # Check for specific, high-impact items first
    if "vacuum" in url_lower or "navigator" in url_lower or "cleaner" in url_lower:
        return "Vacuum Cleaner", "large_appliance", "China"
        
    # Check for other categories
    if "headphone" in url_lower or "speaker" in url_lower or "case" in url_lower or "tracker" in url_lower:
        return "Electronic Accessory", "small_electronics", "China"
    if "shoe" in url_lower or "backpack" in url_lower or "shirt" in url_lower:
        return "Fashion Apparel", "fashion", "Vietnam"
    if "coffee" in url_lower or "lamp" in url_lower or "blender" in url_lower:
        return "Small Home Appliance", "small_appliance", "Germany"
    
    # A better default fallback
    return "General Product", "default", "China"

# --- The rest of the file (analyze_phantom_footprint and the main block) remains the same ---
def analyze_phantom_footprint(url):
    product_name, category, origin_country = extract_info_from_url(url)
    category_data = product_category_db[category]
    distance = shipping_distances_km.get(origin_country, 8000)
    transport_co2 = distance * category_data['base_weight_kg'] * transport_co2_kg_per_km_per_kg
    manufacturing_co2 = random.randint(*category_data["carbon_footprint_kg"])
    total_co2_footprint = manufacturing_co2 + transport_co2
    hidden_impacts = {
        "returnRate": random.randint(*category_data["return_rate_percent"]),
        "packagingWaste": random.randint(*category_data["packaging_waste_grams"]),
        "carbonFootprint": manufacturing_co2,
        "waterUsage": random.randint(*category_data["water_usage_liters"])
    }
    score = (hidden_impacts["returnRate"] * 0.5 + total_co2_footprint * 0.5 + hidden_impacts["packagingWaste"] / 100)
    report = {
        "productName": product_name, "originCountry": origin_country,
        "impactScore": min(99, int(score)),
        "phantomFootprint": {
            "totalCO2EquivalentKg": round(total_co2_footprint, 2),
            "breakdown": {"manufacturingCO2Kg": manufacturing_co2, "transportCO2Kg": round(transport_co2, 2)},
            "hiddenWaterUsageLiters": hidden_impacts['waterUsage'],
            "productionWasteKg": round(hidden_impacts['packagingWaste'] / 1000, 2)
        },
        "insights": category_data["recommendations"]
    }
    return report

if __name__ == "__main__":
    try:
        input_data = json.load(sys.stdin)
        url = input_data.get('url')
        if not url: raise ValueError("Missing product URL.")
        analysis_report = analyze_phantom_footprint(url)
        print(json.dumps(analysis_report))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)