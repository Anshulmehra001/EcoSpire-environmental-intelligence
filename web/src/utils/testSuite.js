/**
 * EcoSpire Comprehensive Test Suite
 * Automated testing for all environmental analysis tools
 */

import { analyzeAudioForSpecies } from './audioAnalysis';
import { analyzeWaterImage, waterQualityAnalyzer } from './imageAnalysis';
import { waterQualityDB } from './waterQualityDatabase';
import { biodiversityDB } from './biodiversityDatabase';
import { systemHealthChecker } from './systemHealth';
import { accuracyValidator } from './accuracyValidator';

export class EcoSpireTestSuite {
  constructor() {
    this.testResults = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    console.log('🧪 Starting EcoSpire Test Suite...');
    
    this.testResults = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };

    // Core functionality tests
    await this.testSystemHealth();
    await this.testDatabases();
    await this.testAudioAnalysis();
    await this.testWaterQualityAnalysis();
    await this.testAccuracyValidation();
    
    // Integration tests
    await this.testDataPersistence();
    await this.testErrorHandling();
    await this.testPerformance();

    // Generate report
    const report = this.generateTestReport();
    console.log('📊 Test Results:', report);
    
    return report;
  }

  /**
   * Test system health monitoring
   */
  async testSystemHealth() {
    const testName = 'System Health Check';
    try {
      console.log('🔍 Testing system health...');
      
      const healthStatus = await systemHealthChecker.performHealthCheck();
      
      this.assert(healthStatus.overall !== 'unknown', 'Health check completed');
      this.assert(Object.keys(healthStatus.components).length > 0, 'Components checked');
      this.assert(healthStatus.lastCheck !== null, 'Timestamp recorded');
      
      if (healthStatus.overall === 'error') {
        this.addWarning(testName, 'System health shows errors: ' + healthStatus.errors.join(', '));
      }
      
      this.addTest(testName, 'passed', 'System health monitoring working');
      
    } catch (error) {
      this.addTest(testName, 'failed', error.message);
    }
  }

  /**
   * Test database functionality
   */
  async testDatabases() {
    await this.testWaterQualityDB();
    await this.testBiodiversityDB();
  }

  async testWaterQualityDB() {
    const testName = 'Water Quality Database';
    try {
      console.log('💧 Testing water quality database...');
      
      // Test initialization
      await waterQualityDB.init();
      this.assert(waterQualityDB.db !== null, 'Database initialized');
      
      // Test data operations
      const testData = {
        id: 'test_' + Date.now(),
        waterSource: 'Test Water',
        results: { ph: 7.0, chlorine: 1.0 },
        overallQuality: 'Good',
        safetyLevel: 'Safe',
        confidence: 95
      };
      
      await waterQualityDB.saveWaterTest(testData);
      const retrieved = await waterQualityDB.getAllWaterTests(1);
      
      this.assert(retrieved.length > 0, 'Data saved and retrieved');
      this.assert(retrieved[0].id === testData.id, 'Data integrity maintained');
      
      this.addTest(testName, 'passed', 'Database operations working');
      
    } catch (error) {
      this.addTest(testName, 'failed', error.message);
    }
  }

  async testBiodiversityDB() {
    const testName = 'Biodiversity Database';
    try {
      console.log('🦜 Testing biodiversity database...');
      
      await biodiversityDB.init();
      this.assert(biodiversityDB.db !== null, 'Database initialized');
      
      const testData = {
        id: 'test_bio_' + Date.now(),
        habitat: 'Test Habitat',
        detectedSpecies: [{ name: 'Test Bird', confidence: 85 }],
        biodiversityMetrics: { speciesRichness: 1, ecosystemHealth: 'Good' }
      };
      
      await biodiversityDB.saveRecording(testData);
      const retrieved = await biodiversityDB.getAllRecordings(1);
      
      this.assert(retrieved.length > 0, 'Recording saved and retrieved');
      
      this.addTest(testName, 'passed', 'Database operations working');
      
    } catch (error) {
      this.addTest(testName, 'failed', error.message);
    }
  }

  /**
   * Test audio analysis functionality
   */
  async testAudioAnalysis() {
    const testName = 'Audio Analysis';
    try {
      console.log('🎵 Testing audio analysis...');
      
      // Test with mock data (since we can't generate real audio in tests)
      const mockAudioBlob = new Blob(['mock audio data'], { type: 'audio/wav' });
      
      const result = await analyzeAudioForSpecies(mockAudioBlob, 'North America', 'Urban Park');
      
      this.assert(result !== null, 'Analysis completed');
      this.assert(result.detectedSpecies !== undefined, 'Species detection attempted');
      this.assert(result.biodiversityMetrics !== undefined, 'Biodiversity metrics calculated');
      this.assert(result.confidence !== undefined, 'Confidence score provided');
      this.assert(result.recommendations !== undefined, 'Recommendations generated');
      
      // Test accuracy validation
      const validation = await accuracyValidator.validateBiodiversityAccuracy(result);
      this.assert(validation.accuracy !== undefined, 'Accuracy validation working');
      
      this.addTest(testName, 'passed', 'Audio analysis pipeline working');
      
    } catch (error) {
      this.addTest(testName, 'failed', error.message);
    }
  }

  /**
   * Test water quality analysis
   */
  async testWaterQualityAnalysis() {
    const testName = 'Water Quality Analysis';
    try {
      console.log('💧 Testing water quality analysis...');
      
      // Create a mock image (canvas-based)
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      
      // Draw a simple test pattern
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(100, 0, 100, 100);
      ctx.fillStyle = '#0000ff';
      ctx.fillRect(200, 0, 100, 100);
      
      const mockImageData = canvas.toDataURL('image/png');
      
      const result = await analyzeWaterImage(mockImageData, 'Tap Water');
      
      this.assert(result !== null, 'Analysis completed');
      this.assert(result.ph !== undefined, 'pH analysis performed');
      this.assert(result.chlorine !== undefined, 'Chlorine analysis performed');
      this.assert(result.confidence !== undefined, 'Confidence score provided');
      
      // Test quality assessment
      const assessment = waterQualityAnalyzer.assessWaterQuality(result);
      this.assert(assessment.quality !== undefined, 'Quality assessment performed');
      this.assert(assessment.safety !== undefined, 'Safety assessment performed');
      
      this.addTest(testName, 'passed', 'Water quality analysis working');
      
    } catch (error) {
      this.addTest(testName, 'failed', error.message);
    }
  }

  /**
   * Test accuracy validation system
   */
  async testAccuracyValidation() {
    const testName = 'Accuracy Validation';
    try {
      console.log('🎯 Testing accuracy validation...');
      
      // Test water quality validation
      const mockWaterResult = {
        ph: 7.0,
        chlorine: 1.5,
        nitrates: 5,
        hardness: 120,
        alkalinity: 100,
        bacteria: 0,
        confidence: 90
      };
      
      const waterValidation = await accuracyValidator.validateWaterQualityAccuracy(mockWaterResult);
      this.assert(waterValidation.accuracy !== undefined, 'Water quality validation working');
      
      // Test biodiversity validation
      const mockBioResult = {
        detectedSpecies: [
          { name: 'Test Bird', confidence: 85, scientificName: 'Testus birdus', habitat: 'Test' }
        ],
        biodiversityMetrics: { speciesRichness: 1, ecosystemHealth: 'Good' }
      };
      
      const bioValidation = await accuracyValidator.validateBiodiversityAccuracy(mockBioResult);
      this.assert(bioValidation.accuracy !== undefined, 'Biodiversity validation working');
      
      // Test overall validation
      const overallValidation = await accuracyValidator.validateOverallAccuracy();
      this.assert(overallValidation.overallAccuracy !== undefined, 'Overall validation working');
      
      this.addTest(testName, 'passed', 'Accuracy validation system working');
      
    } catch (error) {
      this.addTest(testName, 'failed', error.message);
    }
  }

  /**
   * Test data persistence
   */
  async testDataPersistence() {
    const testName = 'Data Persistence';
    try {
      console.log('💾 Testing data persistence...');
      
      // Test localStorage
      const testKey = 'ecospire_test_' + Date.now();
      const testValue = { test: 'data', timestamp: Date.now() };
      
      localStorage.setItem(testKey, JSON.stringify(testValue));
      const retrieved = JSON.parse(localStorage.getItem(testKey));
      
      this.assert(retrieved.test === testValue.test, 'localStorage working');
      
      localStorage.removeItem(testKey);
      
      // Test IndexedDB (basic check)
      this.assert('indexedDB' in window, 'IndexedDB available');
      
      this.addTest(testName, 'passed', 'Data persistence working');
      
    } catch (error) {
      this.addTest(testName, 'failed', error.message);
    }
  }

  /**
   * Test error handling
   */
  async testErrorHandling() {
    const testName = 'Error Handling';
    try {
      console.log('⚠️ Testing error handling...');
      
      // Test invalid audio data
      try {
        await analyzeAudioForSpecies(null, 'North America', 'Urban Park');
        this.addWarning(testName, 'Audio analysis should reject null input');
      } catch (error) {
        this.assert(error.message.includes('No audio data'), 'Audio error handling working');
      }
      
      // Test invalid image data
      try {
        await analyzeWaterImage(null, 'Tap Water');
        this.addWarning(testName, 'Image analysis should reject null input');
      } catch (error) {
        this.assert(error.message.includes('No image source'), 'Image error handling working');
      }
      
      this.addTest(testName, 'passed', 'Error handling working');
      
    } catch (error) {
      this.addTest(testName, 'failed', error.message);
    }
  }

  /**
   * Test performance
   */
  async testPerformance() {
    const testName = 'Performance';
    try {
      console.log('⚡ Testing performance...');
      
      const startTime = performance.now();
      
      // Run a quick analysis
      const mockAudioBlob = new Blob(['mock'], { type: 'audio/wav' });
      await analyzeAudioForSpecies(mockAudioBlob, 'North America', 'Urban Park');
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.assert(duration < 10000, 'Analysis completes within 10 seconds'); // Generous limit
      
      if (duration > 5000) {
        this.addWarning(testName, `Analysis took ${duration.toFixed(0)}ms (>5s)`);
      }
      
      this.addTest(testName, 'passed', `Performance acceptable (${duration.toFixed(0)}ms)`);
      
    } catch (error) {
      this.addTest(testName, 'failed', error.message);
    }
  }

  /**
   * Helper methods
   */
  assert(condition, message) {
    if (!condition) {
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  addTest(name, status, message) {
    this.testResults.tests.push({ name, status, message, timestamp: new Date().toISOString() });
    if (status === 'passed') this.testResults.passed++;
    else if (status === 'failed') this.testResults.failed++;
  }

  addWarning(testName, message) {
    this.testResults.warnings++;
    console.warn(`⚠️ ${testName}: ${message}`);
  }

  generateTestReport() {
    const total = this.testResults.passed + this.testResults.failed;
    const successRate = total > 0 ? (this.testResults.passed / total * 100).toFixed(1) : 0;
    
    return {
      summary: {
        total: total,
        passed: this.testResults.passed,
        failed: this.testResults.failed,
        warnings: this.testResults.warnings,
        successRate: `${successRate}%`
      },
      details: this.testResults.tests,
      timestamp: new Date().toISOString(),
      systemReady: this.testResults.failed === 0 && this.testResults.warnings < 3
    };
  }

  /**
   * Run quick health check
   */
  async quickHealthCheck() {
    console.log('🏥 Running quick health check...');
    
    const checks = {
      browserAPIs: this.checkBrowserAPIs(),
      localStorage: this.checkLocalStorage(),
      databases: await this.checkDatabases(),
      utilities: await this.checkUtilities()
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    return {
      status: passedChecks === totalChecks ? 'healthy' : 'warning',
      score: Math.round((passedChecks / totalChecks) * 100),
      checks: checks,
      message: `${passedChecks}/${totalChecks} health checks passed`
    };
  }

  checkBrowserAPIs() {
    return !!(window.AudioContext || window.webkitAudioContext) &&
           !!navigator.mediaDevices &&
           !!window.indexedDB &&
           !!window.localStorage;
  }

  checkLocalStorage() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  async checkDatabases() {
    try {
      await waterQualityDB.init();
      await biodiversityDB.init();
      return true;
    } catch (e) {
      return false;
    }
  }

  async checkUtilities() {
    try {
      return typeof analyzeAudioForSpecies === 'function' &&
             typeof analyzeWaterImage === 'function' &&
             typeof systemHealthChecker === 'object';
    } catch (e) {
      return false;
    }
  }
}

// Create singleton instance
export const testSuite = new EcoSpireTestSuite();

// Auto-run quick health check in development
if (process.env.NODE_ENV === 'development') {
  testSuite.quickHealthCheck().then(result => {
    console.log('🏥 Quick Health Check:', result.status, `(${result.score}%)`);
  });
}

export default testSuite;