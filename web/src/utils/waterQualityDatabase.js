/**
 * Aqua-Lens Local Database
 * IndexedDB-based storage for water quality data
 */

class WaterQualityDatabase {
  constructor() {
    this.dbName = 'AquaLensDB';
    this.version = 1;
    this.db = null;
  }

  /**
   * Initialize the database
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Water tests store
        if (!db.objectStoreNames.contains('waterTests')) {
          const testStore = db.createObjectStore('waterTests', { keyPath: 'id' });
          testStore.createIndex('timestamp', 'timestamp', { unique: false });
          testStore.createIndex('waterSource', 'waterSource', { unique: false });
          testStore.createIndex('safetyLevel', 'safetyLevel', { unique: false });
          testStore.createIndex('location', ['latitude', 'longitude'], { unique: false });
        }

        // Alerts store
        if (!db.objectStoreNames.contains('alerts')) {
          const alertStore = db.createObjectStore('alerts', { keyPath: 'id' });
          alertStore.createIndex('timestamp', 'timestamp', { unique: false });
          alertStore.createIndex('severity', 'severity', { unique: false });
          alertStore.createIndex('resolved', 'resolved', { unique: false });
        }

        // User preferences store
        if (!db.objectStoreNames.contains('userPreferences')) {
          db.createObjectStore('userPreferences', { keyPath: 'key' });
        }

        // Calibration data store
        if (!db.objectStoreNames.contains('calibrationData')) {
          const calStore = db.createObjectStore('calibrationData', { keyPath: 'id' });
          calStore.createIndex('parameter', 'parameter', { unique: false });
        }
      };
    });
  }

  /**
   * Save a water test result
   */
  async saveWaterTest(testData) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['waterTests'], 'readwrite');
      const store = transaction.objectStore('waterTests');

      const testRecord = {
        id: testData.id || this.generateId(),
        timestamp: testData.timestamp || new Date().toISOString(),
        waterSource: testData.waterSource,
        latitude: testData.location?.latitude || null,
        longitude: testData.location?.longitude || null,
        results: testData.results,
        overallQuality: testData.overallQuality,
        safetyLevel: testData.safetyLevel,
        confidence: testData.confidence,
        alerts: testData.alerts || [],
        recommendations: testData.recommendations || [],
        imageData: testData.imageData || null,
        processingMethod: testData.processingMethod,
        colorAccuracy: testData.colorAccuracy,
        metadata: {
          colorChannels: testData.colorChannels,
          lightingConditions: testData.lightingConditions,
          regionsDetected: testData.regionsDetected
        }
      };

      const request = store.add(testRecord);

      request.onsuccess = () => {
        // Create alerts if unsafe
        if (testData.safetyLevel === 'Unsafe') {
          this.createAlert(testRecord);
        }
        resolve(testRecord);
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get all water tests
   */
  async getAllWaterTests(limit = 100) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['waterTests'], 'readonly');
      const store = transaction.objectStore('waterTests');
      const index = store.index('timestamp');

      const request = index.openCursor(null, 'prev'); // Newest first
      const results = [];
      let count = 0;

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor && count < limit) {
          results.push(cursor.value);
          count++;
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get water tests by location (within radius)
   */
  async getWaterTestsByLocation(latitude, longitude, radiusKm = 10) {
    const allTests = await this.getAllWaterTests(1000);

    return allTests.filter(test => {
      if (!test.latitude || !test.longitude) return false;

      const distance = this.calculateDistance(
        latitude, longitude,
        test.latitude, test.longitude
      );

      return distance <= radiusKm;
    });
  }

  /**
   * Get water tests by source type
   */
  async getWaterTestsBySource(waterSource) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['waterTests'], 'readonly');
      const store = transaction.objectStore('waterTests');
      const index = store.index('waterSource');

      const request = index.getAll(waterSource);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Create an alert for unsafe water
   */
  async createAlert(testData) {
    if (!this.db) await this.init();

    const alert = {
      id: this.generateId(),
      testId: testData.id,
      type: 'contamination',
      severity: testData.safetyLevel === 'Unsafe' ? 'high' : 'medium',
      message: `Unsafe water detected: ${testData.alerts.join(', ')}`,
      timestamp: new Date().toISOString(),
      latitude: testData.latitude,
      longitude: testData.longitude,
      resolved: false,
      waterSource: testData.waterSource
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['alerts'], 'readwrite');
      const store = transaction.objectStore('alerts');

      const request = store.add(alert);
      request.onsuccess = () => resolve(alert);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get all alerts
   */
  async getAllAlerts(includeResolved = false) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['alerts'], 'readonly');
      const store = transaction.objectStore('alerts');
      const index = store.index('timestamp');

      const request = index.openCursor(null, 'prev');
      const results = [];

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const alert = cursor.value;
          if (includeResolved || !alert.resolved) {
            results.push(alert);
          }
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get alerts by location
   */
  async getAlertsByLocation(latitude, longitude, radiusKm = 50) {
    const allAlerts = await this.getAllAlerts();

    return allAlerts.filter(alert => {
      if (!alert.latitude || !alert.longitude) return false;

      const distance = this.calculateDistance(
        latitude, longitude,
        alert.latitude, alert.longitude
      );

      return distance <= radiusKm;
    });
  }

  /**
   * Resolve an alert
   */
  async resolveAlert(alertId) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['alerts'], 'readwrite');
      const store = transaction.objectStore('alerts');

      const getRequest = store.get(alertId);

      getRequest.onsuccess = () => {
        const alert = getRequest.result;
        if (alert) {
          alert.resolved = true;
          alert.resolvedTimestamp = new Date().toISOString();

          const putRequest = store.put(alert);
          putRequest.onsuccess = () => resolve(alert);
          putRequest.onerror = () => reject(putRequest.error);
        } else {
          reject(new Error('Alert not found'));
        }
      };

      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  /**
   * Save user preferences
   */
  async saveUserPreference(key, value) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['userPreferences'], 'readwrite');
      const store = transaction.objectStore('userPreferences');

      const request = store.put({ key, value, timestamp: new Date().toISOString() });
      request.onsuccess = () => resolve(value);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get user preference
   */
  async getUserPreference(key, defaultValue = null) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['userPreferences'], 'readonly');
      const store = transaction.objectStore('userPreferences');

      const request = store.get(key);
      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.value : defaultValue);
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get statistics
   */
  async getStatistics() {
    const allTests = await this.getAllWaterTests(10000);
    const allAlerts = await this.getAllAlerts();

    const stats = {
      totalTests: allTests.length,
      safeTests: allTests.filter(t => t.safetyLevel === 'Safe').length,
      unsafeTests: allTests.filter(t => t.safetyLevel === 'Unsafe').length,
      activeAlerts: allAlerts.filter(a => !a.resolved).length,
      qualityDistribution: {
        excellent: allTests.filter(t => t.overallQuality === 'Excellent').length,
        good: allTests.filter(t => t.overallQuality === 'Good').length,
        fair: allTests.filter(t => t.overallQuality === 'Fair').length,
        poor: allTests.filter(t => t.overallQuality === 'Poor').length
      },
      sourceDistribution: {},
      averageConfidence: 0
    };

    // Calculate source distribution
    allTests.forEach(test => {
      const source = test.waterSource || 'Unknown';
      stats.sourceDistribution[source] = (stats.sourceDistribution[source] || 0) + 1;
    });

    // Calculate average confidence
    if (allTests.length > 0) {
      stats.averageConfidence = allTests.reduce((sum, test) => sum + (test.confidence || 0), 0) / allTests.length;
    }

    return stats;
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convert degrees to radians
   */
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return 'aqua_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Clear all data (for testing/reset)
   */
  async clearAllData() {
    if (!this.db) await this.init();

    const stores = ['waterTests', 'alerts', 'userPreferences', 'calibrationData'];

    return Promise.all(stores.map(storeName => {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }));
  }

  /**
   * Export data as JSON
   */
  async exportData() {
    const [tests, alerts, preferences] = await Promise.all([
      this.getAllWaterTests(10000),
      this.getAllAlerts(true),
      this.getAllUserPreferences()
    ]);

    return {
      waterTests: tests,
      alerts: alerts,
      userPreferences: preferences,
      exportTimestamp: new Date().toISOString(),
      version: this.version
    };
  }

  /**
   * Get all user preferences
   */
  async getAllUserPreferences() {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['userPreferences'], 'readonly');
      const store = transaction.objectStore('userPreferences');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// Create singleton instance
export const waterQualityDB = new WaterQualityDatabase();

// Initialize database on import
waterQualityDB.init().catch(console.error);

export default waterQualityDB;