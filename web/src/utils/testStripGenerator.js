/**
 * Test Strip Image Generator for AquaLens Accuracy Testing
 * Generates realistic water test strip images with known values for testing accuracy
 */

export class TestStripGenerator {
  constructor() {
    // Color mappings for different parameters based on real test strips
    this.colorMappings = {
      ph: {
        4.0: { r: 255, g: 100, b: 100 }, // Red
        5.0: { r: 255, g: 150, b: 100 }, // Orange-red
        6.0: { r: 255, g: 200, b: 100 }, // Orange
        6.5: { r: 255, g: 255, b: 100 }, // Yellow
        7.0: { r: 150, g: 255, b: 150 }, // Light green
        7.5: { r: 100, g: 200, b: 100 }, // Green
        8.0: { r: 100, g: 150, b: 200 }, // Blue-green
        8.5: { r: 100, g: 100, b: 255 }, // Blue
        9.0: { r: 150, g: 100, b: 255 }  // Purple
      },
      chlorine: {
        0: { r: 255, g: 255, b: 255 },   // White
        0.5: { r: 255, g: 250, b: 200 }, // Very light yellow
        1.0: { r: 255, g: 240, b: 150 }, // Light yellow
        2.0: { r: 255, g: 220, b: 100 }, // Yellow
        3.0: { r: 255, g: 200, b: 50 },  // Dark yellow
        5.0: { r: 255, g: 150, b: 0 },   // Orange
        10.0: { r: 200, g: 100, b: 0 }   // Dark orange
      },
      nitrates: {
        0: { r: 255, g: 255, b: 255 },   // White
        5: { r: 255, g: 240, b: 240 },   // Very light pink
        10: { r: 255, g: 200, b: 200 },  // Light pink
        25: { r: 255, g: 150, b: 150 },  // Pink
        50: { r: 255, g: 100, b: 100 },  // Red-pink
        100: { r: 200, g: 50, b: 50 },   // Dark red
        200: { r: 150, g: 0, b: 0 }      // Very dark red
      },
      hardness: {
        0: { r: 100, g: 255, b: 100 },   // Green
        50: { r: 150, g: 255, b: 150 },  // Light green
        100: { r: 200, g: 255, b: 200 }, // Very light green
        150: { r: 255, g: 255, b: 200 }, // Light yellow
        200: { r: 255, g: 200, b: 150 }, // Yellow-orange
        300: { r: 255, g: 150, b: 100 }, // Orange
        500: { r: 255, g: 100, b: 50 }   // Red-orange
      },
      alkalinity: {
        0: { r: 255, g: 100, b: 100 },   // Red
        40: { r: 255, g: 150, b: 100 },  // Orange-red
        80: { r: 255, g: 200, b: 100 },  // Orange
        120: { r: 255, g: 255, b: 100 }, // Yellow
        180: { r: 200, g: 255, b: 150 }, // Light green
        240: { r: 150, g: 200, b: 200 }, // Blue-green
        400: { r: 100, g: 150, b: 255 }  // Blue
      },
      bacteria: {
        0: { r: 100, g: 255, b: 100 },   // Green (safe)
        1: { r: 255, g: 100, b: 100 }    // Red (unsafe)
      }
    };

    // Test strip layout configuration
    this.stripConfig = {
      width: 400,
      height: 100,
      backgroundColor: { r: 240, g: 240, b: 230 }, // Off-white strip background
      pads: [
        { name: 'ph', x: 50, y: 30, width: 40, height: 40 },
        { name: 'chlorine', x: 110, y: 30, width: 40, height: 40 },
        { name: 'nitrates', x: 170, y: 30, width: 40, height: 40 },
        { name: 'hardness', x: 230, y: 30, width: 40, height: 40 },
        { name: 'alkalinity', x: 290, y: 30, width: 40, height: 40 },
        { name: 'bacteria', x: 350, y: 30, width: 40, height: 40 }
      ]
    };

    // Predefined test scenarios
    this.testScenarios = {
      'excellent_water': {
        ph: 7.2,
        chlorine: 1.0,
        nitrates: 0,
        hardness: 75,
        alkalinity: 120,
        bacteria: 0,
        description: 'Excellent quality drinking water'
      },
      'good_water': {
        ph: 7.5,
        chlorine: 2.0,
        nitrates: 5,
        hardness: 150,
        alkalinity: 180,
        bacteria: 0,
        description: 'Good quality water with minor issues'
      },
      'poor_water': {
        ph: 6.0,
        chlorine: 0,
        nitrates: 50,
        hardness: 300,
        alkalinity: 40,
        bacteria: 0,
        description: 'Poor quality water needing treatment'
      },
      'contaminated_water': {
        ph: 5.5,
        chlorine: 0,
        nitrates: 100,
        hardness: 400,
        alkalinity: 20,
        bacteria: 1,
        description: 'Contaminated water - unsafe for consumption'
      }
    };
  }

  /**
   * Generate a test strip image with specified parameters
   */
  generateTestStrip(parameters, options = {}) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = this.stripConfig.width;
    canvas.height = this.stripConfig.height;

    // Apply lighting and background variations if specified
    const lighting = options.lighting || 'normal';
    const background = options.background || 'white';
    const noise = options.noise || 0;

    // Draw background
    this.drawBackground(ctx, background);

    // Draw test strip base
    this.drawStripBase(ctx, lighting);

    // Draw parameter pads
    this.stripConfig.pads.forEach(pad => {
      if (parameters[pad.name] !== undefined) {
        this.drawParameterPad(ctx, pad, parameters[pad.name], lighting, noise);
      }
    });

    // Add realistic imperfections
    if (options.addImperfections) {
      this.addRealisticImperfections(ctx, options.imperfectionLevel || 'low');
    }

    // Add labels if requested
    if (options.addLabels) {
      this.addParameterLabels(ctx);
    }

    return {
      canvas: canvas,
      dataURL: canvas.toDataURL('image/png'),
      parameters: parameters,
      expectedResults: this.calculateExpectedResults(parameters),
      metadata: {
        lighting: lighting,
        background: background,
        noise: noise,
        timestamp: new Date().toISOString()
      }
    };
  }

  /**
   * Generate a test strip from a predefined scenario
   */
  generateFromScenario(scenarioName, options = {}) {
    const scenario = this.testScenarios[scenarioName];
    if (!scenario) {
      throw new Error(`Unknown scenario: ${scenarioName}`);
    }

    return this.generateTestStrip(scenario, {
      ...options,
      scenarioName: scenarioName,
      description: scenario.description
    });
  }

  /**
   * Draw the background
   */
  drawBackground(ctx, backgroundType) {
    const { width, height } = this.stripConfig;

    switch (backgroundType) {
      case 'white':
        ctx.fillStyle = '#ffffff';
        break;
      case 'colored':
        ctx.fillStyle = '#f0f8ff'; // Light blue
        break;
      case 'textured':
        // Create a subtle texture pattern
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#f8f8f8');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#f0f0f0');
        ctx.fillStyle = gradient;
        break;
      default:
        ctx.fillStyle = '#ffffff';
    }

    ctx.fillRect(0, 0, width, height);
  }

  /**
   * Draw the test strip base
   */
  drawStripBase(ctx, lighting) {
    const { width, height, backgroundColor } = this.stripConfig;
    
    // Adjust base color based on lighting
    let baseColor = { ...backgroundColor };
    switch (lighting) {
      case 'dim':
        baseColor.r *= 0.7;
        baseColor.g *= 0.7;
        baseColor.b *= 0.7;
        break;
      case 'bright':
        baseColor.r = Math.min(255, baseColor.r * 1.2);
        baseColor.g = Math.min(255, baseColor.g * 1.2);
        baseColor.b = Math.min(255, baseColor.b * 1.2);
        break;
    }

    ctx.fillStyle = `rgb(${Math.round(baseColor.r)}, ${Math.round(baseColor.g)}, ${Math.round(baseColor.b)})`;
    ctx.fillRect(10, 10, width - 20, height - 20);

    // Add strip border
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, width - 20, height - 20);
  }

  /**
   * Draw a parameter pad with appropriate color
   */
  drawParameterPad(ctx, pad, value, lighting, noise) {
    const color = this.getColorForValue(pad.name, value);
    
    // Apply lighting effects
    let adjustedColor = { ...color };
    switch (lighting) {
      case 'dim':
        adjustedColor.r *= 0.6;
        adjustedColor.g *= 0.6;
        adjustedColor.b *= 0.6;
        break;
      case 'bright':
        adjustedColor.r = Math.min(255, adjustedColor.r * 1.3);
        adjustedColor.g = Math.min(255, adjustedColor.g * 1.3);
        adjustedColor.b = Math.min(255, adjustedColor.b * 1.3);
        break;
    }

    // Add noise if specified
    if (noise > 0) {
      adjustedColor.r += (Math.random() - 0.5) * noise * 50;
      adjustedColor.g += (Math.random() - 0.5) * noise * 50;
      adjustedColor.b += (Math.random() - 0.5) * noise * 50;
      
      // Clamp values
      adjustedColor.r = Math.max(0, Math.min(255, adjustedColor.r));
      adjustedColor.g = Math.max(0, Math.min(255, adjustedColor.g));
      adjustedColor.b = Math.max(0, Math.min(255, adjustedColor.b));
    }

    // Draw the pad
    ctx.fillStyle = `rgb(${Math.round(adjustedColor.r)}, ${Math.round(adjustedColor.g)}, ${Math.round(adjustedColor.b)})`;
    ctx.fillRect(pad.x, pad.y, pad.width, pad.height);

    // Add subtle border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(pad.x, pad.y, pad.width, pad.height);
  }

  /**
   * Get color for a specific parameter value
   */
  getColorForValue(parameter, value) {
    const colorMap = this.colorMappings[parameter];
    if (!colorMap) {
      return { r: 128, g: 128, b: 128 }; // Gray fallback
    }

    // Find the closest color values for interpolation
    const values = Object.keys(colorMap).map(Number).sort((a, b) => a - b);
    
    if (value <= values[0]) {
      return colorMap[values[0]];
    }
    
    if (value >= values[values.length - 1]) {
      return colorMap[values[values.length - 1]];
    }

    // Interpolate between two closest values
    let lowerValue = values[0];
    let upperValue = values[values.length - 1];
    
    for (let i = 0; i < values.length - 1; i++) {
      if (value >= values[i] && value <= values[i + 1]) {
        lowerValue = values[i];
        upperValue = values[i + 1];
        break;
      }
    }

    const lowerColor = colorMap[lowerValue];
    const upperColor = colorMap[upperValue];
    const ratio = (value - lowerValue) / (upperValue - lowerValue);

    return {
      r: lowerColor.r + (upperColor.r - lowerColor.r) * ratio,
      g: lowerColor.g + (upperColor.g - lowerColor.g) * ratio,
      b: lowerColor.b + (upperColor.b - lowerColor.b) * ratio
    };
  }

  /**
   * Add realistic imperfections to make the image more authentic
   */
  addRealisticImperfections(ctx, level) {
    const { width, height } = this.stripConfig;
    const intensity = level === 'high' ? 0.3 : level === 'medium' ? 0.15 : 0.05;

    // Add subtle shadows
    ctx.fillStyle = `rgba(0, 0, 0, ${intensity * 0.1})`;
    ctx.fillRect(12, 12, width - 24, 2); // Top shadow
    ctx.fillRect(12, height - 14, width - 24, 2); // Bottom shadow

    // Add slight color variations
    for (let i = 0; i < intensity * 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2 + 1;
      
      ctx.fillStyle = `rgba(${Math.random() * 50}, ${Math.random() * 50}, ${Math.random() * 50}, ${intensity})`;
      ctx.fillRect(x, y, size, size);
    }
  }

  /**
   * Add parameter labels
   */
  addParameterLabels(ctx) {
    ctx.fillStyle = '#333333';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';

    this.stripConfig.pads.forEach(pad => {
      const labelY = pad.y + pad.height + 15;
      ctx.fillText(pad.name.toUpperCase(), pad.x + pad.width / 2, labelY);
    });
  }

  /**
   * Calculate expected analysis results
   */
  calculateExpectedResults(parameters) {
    return {
      ph: parameters.ph,
      chlorine: parameters.chlorine,
      nitrates: parameters.nitrates,
      hardness: parameters.hardness,
      alkalinity: parameters.alkalinity,
      bacteria: parameters.bacteria,
      overallQuality: this.assessOverallQuality(parameters),
      safetyLevel: this.assessSafetyLevel(parameters)
    };
  }

  /**
   * Assess overall water quality
   */
  assessOverallQuality(params) {
    let score = 100;

    // pH scoring
    if (params.ph < 6.5 || params.ph > 8.5) score -= 20;
    else if (params.ph < 7.0 || params.ph > 8.0) score -= 10;

    // Chlorine scoring
    if (params.chlorine < 0.2 || params.chlorine > 4.0) score -= 15;

    // Nitrates scoring
    if (params.nitrates > 50) score -= 25;
    else if (params.nitrates > 25) score -= 15;
    else if (params.nitrates > 10) score -= 5;

    // Hardness scoring
    if (params.hardness > 300) score -= 10;
    else if (params.hardness > 200) score -= 5;

    // Alkalinity scoring
    if (params.alkalinity < 50 || params.alkalinity > 300) score -= 10;

    // Bacteria scoring
    if (params.bacteria > 0) score -= 30;

    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Poor';
    return 'Very Poor';
  }

  /**
   * Assess safety level
   */
  assessSafetyLevel(params) {
    if (params.bacteria > 0) return 'Unsafe';
    if (params.ph < 6.0 || params.ph > 9.0) return 'Unsafe';
    if (params.nitrates > 100) return 'Unsafe';
    if (params.chlorine > 5.0) return 'Caution';
    if (params.ph < 6.5 || params.ph > 8.5) return 'Caution';
    if (params.nitrates > 50) return 'Caution';
    return 'Safe';
  }

  /**
   * Generate multiple test strips with variations
   */
  generateTestSuite(options = {}) {
    const testSuite = [];
    const scenarios = options.scenarios || Object.keys(this.testScenarios);
    const lightingConditions = options.lightingConditions || ['dim', 'normal', 'bright'];
    const backgrounds = options.backgrounds || ['white', 'colored'];

    scenarios.forEach(scenarioName => {
      lightingConditions.forEach(lighting => {
        backgrounds.forEach(background => {
          try {
            const testStrip = this.generateFromScenario(scenarioName, {
              lighting: lighting,
              background: background,
              addImperfections: true,
              imperfectionLevel: 'medium',
              noise: Math.random() * 0.1
            });

            testSuite.push({
              id: `${scenarioName}_${lighting}_${background}`,
              ...testStrip,
              testConditions: {
                scenario: scenarioName,
                lighting: lighting,
                background: background
              }
            });
          } catch (error) {
            console.error(`Failed to generate test strip for ${scenarioName}_${lighting}_${background}:`, error);
          }
        });
      });
    });

    return testSuite;
  }

  /**
   * Export test suite as downloadable files
   */
  exportTestSuite(testSuite, format = 'json') {
    const exportData = {
      generatedAt: new Date().toISOString(),
      totalTests: testSuite.length,
      tests: testSuite.map(test => ({
        id: test.id,
        parameters: test.parameters,
        expectedResults: test.expectedResults,
        testConditions: test.testConditions,
        imageDataURL: test.dataURL
      }))
    };

    if (format === 'json') {
      return JSON.stringify(exportData, null, 2);
    }

    return exportData;
  }

  /**
   * Get available test scenarios
   */
  getAvailableScenarios() {
    return Object.keys(this.testScenarios).map(key => ({
      name: key,
      description: this.testScenarios[key].description,
      parameters: { ...this.testScenarios[key] }
    }));
  }
}

// Create singleton instance
export const testStripGenerator = new TestStripGenerator();

// Export convenience functions
export const generateTestStrip = (parameters, options) => {
  return testStripGenerator.generateTestStrip(parameters, options);
};

export const generateFromScenario = (scenarioName, options) => {
  return testStripGenerator.generateFromScenario(scenarioName, options);
};

export default testStripGenerator;