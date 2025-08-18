/**
 * Egyptian-Specific Plant Detection for FloraShield
 * Optimized for arid environments and common Egyptian flora
 */

export class EgyptianPlantDetector {
  constructor() {
    this.egyptianPlants = {
      'Phoenix dactylifera': {
        commonName: 'Date Palm',
        features: {
          leafShape: 'pinnate',
          leafColor: 'blue-green',
          trunk: 'fibrous',
          habitat: 'oasis'
        },
        confidence: 0.9
      },
      'Ficus sycomorus': {
        commonName: 'Sycamore Fig',
        features: {
          leafShape: 'heart-shaped',
          leafColor: 'dark-green',
          trunk: 'smooth-bark',
          habitat: 'riverine'
        },
        confidence: 0.85
      },
      'Acacia nilotica': {
        commonName: 'Gum Arabic Tree',
        features: {
          leafShape: 'bipinnate',
          leafColor: 'light-green',
          trunk: 'thorny',
          habitat: 'savanna'
        },
        confidence: 0.8
      },
      'Bougainvillea spectabilis': {
        commonName: 'Bougainvillea',
        features: {
          leafShape: 'ovate',
          leafColor: 'bright-green',
          flowers: 'colorful-bracts',
          habitat: 'urban'
        },
        confidence: 0.85
      },
      'Nerium oleander': {
        commonName: 'Oleander',
        features: {
          leafShape: 'lanceolate',
          leafColor: 'dark-green',
          flowers: 'pink-white',
          habitat: 'urban'
        },
        confidence: 0.8
      },
      'Tamarix nilotica': {
        commonName: 'Tamarisk',
        features: {
          leafShape: 'scale-like',
          leafColor: 'blue-green',
          trunk: 'reddish-bark',
          habitat: 'saline'
        },
        confidence: 0.75
      }
    };
  }

  /**
   * Segment plant from desert/arid background
   */
  async segmentPlantFromDesert(imageFile) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const segmentation = this.performDesertSegmentation(imageData);
          
          resolve(segmentation);
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(imageFile);
    });
  }

  /**
   * Perform plant segmentation for desert environments
   */
  performDesertSegmentation(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // Create vegetation mask
    const vegetationMask = new Uint8Array(width * height);
    const plantRegions = [];
    
    // 1. NDVI-like vegetation index
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Enhanced vegetation detection for arid conditions
      const ndvi = (g - r) / (g + r + 1e-8);
      const greenness = g / (r + g + b + 1e-8);
      const saturation = this.calculateSaturation(r, g, b);
      
      // Vegetation criteria adapted for Egyptian plants
      const isVegetation = (
        ndvi > 0.05 ||  // Lower threshold for desert plants
        (greenness > 0.35 && saturation > 0.15) ||  // Green and saturated
        (g > r + 10 && g > b + 5)  // Simple green dominance
      );
      
      const pixelIdx = Math.floor(i / 4);
      vegetationMask[pixelIdx] = isVegetation ? 255 : 0;
    }
    
    // 2. Morphological operations to clean mask
    const cleanedMask = this.morphologicalOperations(vegetationMask, width, height);
    
    // 3. Find connected plant regions
    const components = this.findPlantComponents(cleanedMask, width, height);
    
    // 4. Filter and rank plant regions
    const validPlants = components.filter(comp => {
      const area = comp.pixels.length;
      const aspectRatio = comp.width / comp.height;
      
      // Filter criteria for plants
      return area > 500 && area < width * height * 0.8 && aspectRatio > 0.2 && aspectRatio < 5;
    });
    
    // Sort by area (largest first)
    validPlants.sort((a, b) => b.pixels.length - a.pixels.length);
    
    return {
      originalImage: imageData,
      vegetationMask: cleanedMask,
      plantRegions: validPlants,
      primaryPlant: validPlants[0] || null,
      confidence: this.calculateSegmentationConfidence(validPlants, width * height)
    };
  }

  /**
   * Calculate color saturation
   */
  calculateSaturation(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max === 0 ? 0 : (max - min) / max;
  }

  /**
   * Morphological operations for mask cleaning
   */
  morphologicalOperations(mask, width, height) {
    // Erosion followed by dilation (opening)
    const eroded = this.erosion(mask, width, height, 2);
    const opened = this.dilation(eroded, width, height, 3);
    
    // Dilation followed by erosion (closing)
    const dilated = this.dilation(opened, width, height, 2);
    const closed = this.erosion(dilated, width, height, 2);
    
    return closed;
  }

  /**
   * Erosion operation
   */
  erosion(mask, width, height, kernelSize) {
    const result = new Uint8Array(width * height);
    const radius = Math.floor(kernelSize / 2);
    
    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        let minValue = 255;
        
        for (let ky = -radius; ky <= radius; ky++) {
          for (let kx = -radius; kx <= radius; kx++) {
            const idx = (y + ky) * width + (x + kx);
            minValue = Math.min(minValue, mask[idx]);
          }
        }
        
        result[y * width + x] = minValue;
      }
    }
    
    return result;
  }

  /**
   * Dilation operation
   */
  dilation(mask, width, height, kernelSize) {
    const result = new Uint8Array(width * height);
    const radius = Math.floor(kernelSize / 2);
    
    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        let maxValue = 0;
        
        for (let ky = -radius; ky <= radius; ky++) {
          for (let kx = -radius; kx <= radius; kx++) {
            const idx = (y + ky) * width + (x + kx);
            maxValue = Math.max(maxValue, mask[idx]);
          }
        }
        
        result[y * width + x] = maxValue;
      }
    }
    
    return result;
  }

  /**
   * Find connected plant components
   */
  findPlantComponents(mask, width, height) {
    const visited = new Uint8Array(width * height);
    const components = [];
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        
        if (mask[idx] === 255 && !visited[idx]) {
          const component = this.floodFillComponent(mask, visited, x, y, width, height);
          if (component.pixels.length > 100) {
            components.push(component);
          }
        }
      }
    }
    
    return components;
  }

  /**
   * Flood fill for connected components
   */
  floodFillComponent(mask, visited, startX, startY, width, height) {
    const stack = [{x: startX, y: startY}];
    const pixels = [];
    let minX = startX, maxX = startX, minY = startY, maxY = startY;
    
    while (stack.length > 0) {
      const {x, y} = stack.pop();
      const idx = y * width + x;
      
      if (x < 0 || x >= width || y < 0 || y >= height || visited[idx] || mask[idx] !== 255) {
        continue;
      }
      
      visited[idx] = 1;
      pixels.push({x, y});
      
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      
      // Add 8-connected neighbors
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx !== 0 || dy !== 0) {
            stack.push({x: x + dx, y: y + dy});
          }
        }
      }
    }
    
    return {
      pixels,
      x: minX,
      y: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
      centerX: Math.round((minX + maxX) / 2),
      centerY: Math.round((minY + maxY) / 2)
    };
  }

  /**
   * Calculate segmentation confidence
   */
  calculateSegmentationConfidence(plantRegions, totalPixels) {
    if (plantRegions.length === 0) return 0;
    
    const largestPlant = plantRegions[0];
    const plantRatio = largestPlant.pixels.length / totalPixels;
    
    // Confidence based on plant size and number of regions
    let confidence = Math.min(90, plantRatio * 200); // Size factor
    
    if (plantRegions.length === 1) confidence += 10; // Single clear plant
    else if (plantRegions.length > 5) confidence -= 20; // Too fragmented
    
    return Math.max(10, Math.round(confidence));
  }

  /**
   * Extract plant features for identification
   */
  extractPlantFeatures(imageData, plantRegion) {
    const data = imageData.data;
    const width = imageData.width;
    
    // Extract color features
    const colorFeatures = this.extractColorFeatures(data, width, plantRegion);
    
    // Extract shape features
    const shapeFeatures = this.extractShapeFeatures(plantRegion);
    
    // Extract texture features
    const textureFeatures = this.extractTextureFeatures(data, width, plantRegion);
    
    return {
      color: colorFeatures,
      shape: shapeFeatures,
      texture: textureFeatures,
      size: plantRegion.pixels.length,
      boundingBox: {
        width: plantRegion.width,
        height: plantRegion.height,
        aspectRatio: plantRegion.width / plantRegion.height
      }
    };
  }

  /**
   * Extract color features from plant region
   */
  extractColorFeatures(data, width, plantRegion) {
    let totalR = 0, totalG = 0, totalB = 0;
    let minR = 255, maxR = 0, minG = 255, maxG = 0, minB = 255, maxB = 0;
    
    for (const pixel of plantRegion.pixels) {
      const idx = (pixel.y * width + pixel.x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      totalR += r;
      totalG += g;
      totalB += b;
      
      minR = Math.min(minR, r);
      maxR = Math.max(maxR, r);
      minG = Math.min(minG, g);
      maxG = Math.max(maxG, g);
      minB = Math.min(minB, b);
      maxB = Math.max(maxB, b);
    }
    
    const pixelCount = plantRegion.pixels.length;
    const avgR = totalR / pixelCount;
    const avgG = totalG / pixelCount;
    const avgB = totalB / pixelCount;
    
    // Calculate color properties
    const brightness = (avgR + avgG + avgB) / 3;
    const greenness = avgG / (avgR + avgG + avgB);
    const saturation = this.calculateSaturation(avgR, avgG, avgB);
    
    // Convert to HSV
    const hsv = this.rgbToHsv(avgR, avgG, avgB);
    
    return {
      averageRGB: [avgR, avgG, avgB],
      hsv: hsv,
      brightness: brightness,
      greenness: greenness,
      saturation: saturation,
      colorRange: {
        r: maxR - minR,
        g: maxG - minG,
        b: maxB - minB
      }
    };
  }

  /**
   * Extract shape features
   */
  extractShapeFeatures(plantRegion) {
    const area = plantRegion.pixels.length;
    const perimeter = this.calculatePerimeter(plantRegion);
    const compactness = (4 * Math.PI * area) / (perimeter * perimeter);
    
    // Calculate moments for shape analysis
    const moments = this.calculateMoments(plantRegion);
    const elongation = moments.majorAxis / moments.minorAxis;
    
    return {
      area: area,
      perimeter: perimeter,
      compactness: compactness,
      aspectRatio: plantRegion.width / plantRegion.height,
      elongation: elongation,
      rectangularity: area / (plantRegion.width * plantRegion.height)
    };
  }

  /**
   * Calculate perimeter of plant region
   */
  calculatePerimeter(plantRegion) {
    const pixelSet = new Set(plantRegion.pixels.map(p => `${p.x},${p.y}`));
    let perimeter = 0;
    
    for (const pixel of plantRegion.pixels) {
      // Check 4-connected neighbors
      const neighbors = [
        {x: pixel.x + 1, y: pixel.y},
        {x: pixel.x - 1, y: pixel.y},
        {x: pixel.x, y: pixel.y + 1},
        {x: pixel.x, y: pixel.y - 1}
      ];
      
      for (const neighbor of neighbors) {
        if (!pixelSet.has(`${neighbor.x},${neighbor.y}`)) {
          perimeter++;
          break;
        }
      }
    }
    
    return perimeter;
  }

  /**
   * Calculate image moments for shape analysis
   */
  calculateMoments(plantRegion) {
    const centerX = plantRegion.centerX;
    const centerY = plantRegion.centerY;
    
    let m20 = 0, m02 = 0, m11 = 0;
    
    for (const pixel of plantRegion.pixels) {
      const dx = pixel.x - centerX;
      const dy = pixel.y - centerY;
      
      m20 += dx * dx;
      m02 += dy * dy;
      m11 += dx * dy;
    }
    
    const n = plantRegion.pixels.length;
    m20 /= n;
    m02 /= n;
    m11 /= n;
    
    // Calculate eigenvalues for major/minor axes
    const trace = m20 + m02;
    const det = m20 * m02 - m11 * m11;
    const lambda1 = (trace + Math.sqrt(trace * trace - 4 * det)) / 2;
    const lambda2 = (trace - Math.sqrt(trace * trace - 4 * det)) / 2;
    
    return {
      majorAxis: Math.sqrt(Math.max(lambda1, lambda2)),
      minorAxis: Math.sqrt(Math.min(lambda1, lambda2))
    };
  }

  /**
   * Extract texture features
   */
  extractTextureFeatures(data, width, plantRegion) {
    // Sample texture from plant region
    const texturePatches = this.sampleTexturePatches(data, width, plantRegion, 5);
    
    let totalVariance = 0;
    let totalContrast = 0;
    
    for (const patch of texturePatches) {
      const variance = this.calculateVariance(patch);
      const contrast = this.calculateContrast(patch);
      
      totalVariance += variance;
      totalContrast += contrast;
    }
    
    return {
      variance: totalVariance / texturePatches.length,
      contrast: totalContrast / texturePatches.length,
      smoothness: 1 / (1 + totalVariance / texturePatches.length)
    };
  }

  /**
   * Sample texture patches from plant region
   */
  sampleTexturePatches(data, width, plantRegion, patchSize) {
    const patches = [];
    const step = Math.max(1, Math.floor(Math.sqrt(plantRegion.pixels.length) / 10));
    
    for (let i = 0; i < plantRegion.pixels.length; i += step) {
      const centerPixel = plantRegion.pixels[i];
      const patch = this.extractPatch(data, width, centerPixel.x, centerPixel.y, patchSize);
      
      if (patch.length === patchSize * patchSize) {
        patches.push(patch);
      }
    }
    
    return patches;
  }

  /**
   * Extract image patch around a pixel
   */
  extractPatch(data, width, centerX, centerY, patchSize) {
    const patch = [];
    const radius = Math.floor(patchSize / 2);
    
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const x = centerX + dx;
        const y = centerY + dy;
        
        if (x >= 0 && x < width && y >= 0) {
          const idx = (y * width + x) * 4;
          const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          patch.push(gray);
        }
      }
    }
    
    return patch;
  }

  /**
   * Calculate variance of patch
   */
  calculateVariance(patch) {
    const mean = patch.reduce((sum, val) => sum + val, 0) / patch.length;
    const variance = patch.reduce((sum, val) => sum + (val - mean) ** 2, 0) / patch.length;
    return variance;
  }

  /**
   * Calculate contrast of patch
   */
  calculateContrast(patch) {
    const max = Math.max(...patch);
    const min = Math.min(...patch);
    return max - min;
  }

  /**
   * RGB to HSV conversion
   */
  rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    let h = 0;
    if (delta !== 0) {
      if (max === r) h = ((g - b) / delta) % 6;
      else if (max === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
    }
    h = (h * 60 + 360) % 360;
    
    const s = max === 0 ? 0 : delta / max;
    const v = max;
    
    return [h, s, v];
  }

  /**
   * Identify Egyptian plant species
   */
  identifyEgyptianPlant(features) {
    const candidates = [];
    
    for (const [species, plantData] of Object.entries(this.egyptianPlants)) {
      const similarity = this.calculatePlantSimilarity(features, plantData);
      
      if (similarity > 0.3) {
        candidates.push({
          species: species,
          commonName: plantData.commonName,
          confidence: Math.round(similarity * plantData.confidence * 100),
          matchedFeatures: this.getMatchedFeatures(features, plantData),
          habitat: plantData.features.habitat
        });
      }
    }
    
    // Sort by confidence
    candidates.sort((a, b) => b.confidence - a.confidence);
    
    return candidates.slice(0, 3); // Top 3 matches
  }

  /**
   * Calculate similarity between extracted features and plant database
   */
  calculatePlantSimilarity(features, plantData) {
    let similarity = 0;
    let factors = 0;
    
    // Color similarity
    const colorSim = this.calculateColorSimilarity(features.color, plantData.features);
    similarity += colorSim * 0.4;
    factors += 0.4;
    
    // Shape similarity
    const shapeSim = this.calculateShapeSimilarity(features.shape, plantData.features);
    similarity += shapeSim * 0.3;
    factors += 0.3;
    
    // Size similarity
    const sizeSim = this.calculateSizeSimilarity(features.size, plantData.features);
    similarity += sizeSim * 0.3;
    factors += 0.3;
    
    return factors > 0 ? similarity / factors : 0;
  }

  /**
   * Calculate color similarity
   */
  calculateColorSimilarity(colorFeatures, plantFeatures) {
    // Simple heuristic based on greenness and brightness
    let similarity = 0;
    
    if (plantFeatures.leafColor === 'dark-green' && colorFeatures.greenness > 0.4) {
      similarity += 0.8;
    } else if (plantFeatures.leafColor === 'light-green' && colorFeatures.greenness > 0.35) {
      similarity += 0.7;
    } else if (plantFeatures.leafColor === 'blue-green' && colorFeatures.hsv[0] > 180 && colorFeatures.hsv[0] < 200) {
      similarity += 0.6;
    }
    
    return Math.min(1, similarity);
  }

  /**
   * Calculate shape similarity
   */
  calculateShapeSimilarity(shapeFeatures, plantFeatures) {
    // Simple heuristic based on aspect ratio and compactness
    let similarity = 0;
    
    if (plantFeatures.leafShape === 'pinnate' && shapeFeatures.elongation > 2) {
      similarity += 0.7;
    } else if (plantFeatures.leafShape === 'ovate' && shapeFeatures.compactness > 0.6) {
      similarity += 0.8;
    } else if (plantFeatures.leafShape === 'lanceolate' && shapeFeatures.aspectRatio > 2) {
      similarity += 0.6;
    }
    
    return Math.min(1, similarity);
  }

  /**
   * Calculate size similarity
   */
  calculateSizeSimilarity(size, plantFeatures) {
    // Normalize size and compare to expected ranges
    // This is a simplified heuristic
    return 0.5; // Neutral similarity for now
  }

  /**
   * Get matched features for explanation
   */
  getMatchedFeatures(features, plantData) {
    const matched = [];
    
    if (features.color.greenness > 0.35) {
      matched.push('Green foliage detected');
    }
    
    if (features.shape.elongation > 2) {
      matched.push('Elongated leaf structure');
    }
    
    if (features.shape.compactness > 0.6) {
      matched.push('Compact leaf arrangement');
    }
    
    return matched;
  }
}

export const egyptianPlantDetector = new EgyptianPlantDetector();