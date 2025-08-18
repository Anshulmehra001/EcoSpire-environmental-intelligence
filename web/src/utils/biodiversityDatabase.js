/**
 * BiodiversityEar Local Database
 * IndexedDB-based storage for biodiversity data
 */

class BiodiversityDatabase {
  constructor() {
    this.dbName = 'BiodiversityEarDB';
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

        // Audio recordings store
        if (!db.objectStoreNames.contains('audioRecordings')) {
          const recordingStore = db.createObjectStore('audioRecordings', { keyPath: 'id' });
          recordingStore.createIndex('timestamp', 'timestamp', { unique: false });
          recordingStore.createIndex('location', ['latitude', 'longitude'], { unique: false });
          recordingStore.createIndex('habitat', 'habitat', { unique: false });
          recordingStore.createIndex('speciesCount', 'speciesCount', { unique: false });
        }

        // Species observations store
        if (!db.objectStoreNames.contains('speciesObservations')) {
          const speciesStore = db.createObjectStore('speciesObservations', { keyPath: 'id' });
          speciesStore.createIndex('speciesName', 'speciesName', { unique: false });
          speciesStore.createIndex('timestamp', 'timestamp', { unique: false });
          speciesStore.createIndex('confidence', 'confidence', { unique: false });
          speciesStore.createIndex('location', ['latitude', 'longitude'], { unique: false });
        }

        // Biodiversity hotspots store
        if (!db.objectStoreNames.contains('biodiversityHotspots')) {
          const hotspotStore = db.createObjectStore('biodiversityHotspots', { keyPath: 'id' });
          hotspotStore.createIndex('location', ['latitude', 'longitude'], { unique: false });
          hotspotStore.createIndex('speciesRichness', 'speciesRichness', { unique: false });
        }

        // User preferences store
        if (!db.objectStoreNames.contains('userPreferences')) {
          db.createObjectStore('userPreferences', { keyPath: 'key' });
        }

        // Species library store (for offline access)
        if (!db.objectStoreNames.contains('speciesLibrary')) {
          const libraryStore = db.createObjectStore('speciesLibrary', { keyPath: 'id' });
          libraryStore.createIndex('scientificName', 'scientificName', { unique: false });
          libraryStore.createIndex('region', 'region', { unique: false });
          libraryStore.createIndex('conservationStatus', 'conservationStatus', { unique: false });
        }
      };
    });
  }

  /**
   * Save an audio recording analysis
   */
  async saveRecording(recordingData) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['audioRecordings', 'speciesObservations'], 'readwrite');
      const recordingStore = transaction.objectStore('audioRecordings');
      const speciesStore = transaction.objectStore('speciesObservations');
      
      const recordingRecord = {
        id: recordingData.id || this.generateId(),
        timestamp: recordingData.timestamp || new Date().toISOString(),
        latitude: recordingData.location?.latitude || null,
        longitude: recordingData.location?.longitude || null,
        habitat: recordingData.habitat || 'Unknown',
        duration: recordingData.duration || 0,
        audioQuality: recordingData.audioQuality || 'Good',
        speciesCount: recordingData.detectedSpecies?.length || 0,
        biodiversityScore: recordingData.biodiversityMetrics?.biodiversityScore || 0,
        shannonIndex: recordingData.biodiversityMetrics?.shannonIndex || 0,
        ecosystemHealth: recordingData.biodiversityMetrics?.ecosystemHealth || 'Unknown',
        detectedSpecies: recordingData.detectedSpecies || [],
        acousticFeatures: recordingData.acousticFeatures || {},
        recommendations: recordingData.recommendations || [],
        confidence: recordingData.confidence || 0,
        audioData: recordingData.audioData || null // Store audio blob if needed
      };

      // Save main recording
      const recordingRequest = recordingStore.add(recordingRecord);
      
      recordingRequest.onsuccess = () => {
        // Save individual species observations
        const speciesPromises = (recordingData.detectedSpecies || []).map(species => {
          return new Promise((resolveSpecies, rejectSpecies) => {
            const speciesRecord = {
              id: this.generateId(),
              recordingId: recordingRecord.id,
              speciesName: species.name,
              scientificName: species.scientificName,
              confidence: species.confidence,
              timestamp: recordingRecord.timestamp,
              latitude: recordingRecord.latitude,
              longitude: recordingRecord.longitude,
              habitat: recordingRecord.habitat,
              callType: species.callType || 'unknown',
              frequency: species.frequency,
              conservationStatus: species.conservationStatus,
              matchedFeatures: species.matchedFeatures || []
            };

            const speciesRequest = speciesStore.add(speciesRecord);
            speciesRequest.onsuccess = () => resolveSpecies(speciesRecord);
            speciesRequest.onerror = () => rejectSpecies(speciesRequest.error);
          });
        });

        Promise.all(speciesPromises)
          .then(() => resolve(recordingRecord))
          .catch(reject);
      };
      
      recordingRequest.onerror = () => reject(recordingRequest.error);
    });
  }

  /**
   * Get all recordings
   */
  async getAllRecordings(limit = 100) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['audioRecordings'], 'readonly');
      const store = transaction.objectStore('audioRecordings');
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
   * Get recordings by location
   */
  async getRecordingsByLocation(latitude, longitude, radiusKm = 10) {
    const allRecordings = await this.getAllRecordings(1000);
    
    return allRecordings.filter(recording => {
      if (!recording.latitude || !recording.longitude) return false;
      
      const distance = this.calculateDistance(
        latitude, longitude,
        recording.latitude, recording.longitude
      );
      
      return distance <= radiusKm;
    });
  }

  /**
   * Get species observations
   */
  async getSpeciesObservations(speciesName = null, limit = 100) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['speciesObservations'], 'readonly');
      const store = transaction.objectStore('speciesObservations');
      
      let request;
      if (speciesName) {
        const index = store.index('speciesName');
        request = index.getAll(speciesName);
      } else {
        const index = store.index('timestamp');
        request = index.openCursor(null, 'prev');
      }
      
      if (speciesName) {
        request.onsuccess = () => resolve(request.result.slice(0, limit));
        request.onerror = () => reject(request.error);
      } else {
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
      }
    });
  }

  /**
   * Get biodiversity statistics
   */
  async getStatistics() {
    const allRecordings = await this.getAllRecordings(10000);
    const allObservations = await this.getSpeciesObservations(null, 10000);

    const stats = {
      totalRecordings: allRecordings.length,
      totalSpeciesObservations: allObservations.length,
      uniqueSpecies: new Set(allObservations.map(obs => obs.speciesName)).size,
      averageBiodiversityScore: 0,
      averageSpeciesPerRecording: 0,
      ecosystemHealthDistribution: {
        excellent: 0,
        good: 0,
        fair: 0,
        poor: 0
      },
      conservationStatusDistribution: {},
      habitatDistribution: {},
      topSpecies: [],
      recordingsByMonth: {}
    };

    if (allRecordings.length > 0) {
      // Calculate averages
      stats.averageBiodiversityScore = allRecordings.reduce((sum, rec) => sum + (rec.biodiversityScore || 0), 0) / allRecordings.length;
      stats.averageSpeciesPerRecording = allRecordings.reduce((sum, rec) => sum + (rec.speciesCount || 0), 0) / allRecordings.length;

      // Ecosystem health distribution
      allRecordings.forEach(recording => {
        const health = (recording.ecosystemHealth || 'unknown').toLowerCase();
        if (stats.ecosystemHealthDistribution[health] !== undefined) {
          stats.ecosystemHealthDistribution[health]++;
        }
      });

      // Habitat distribution
      allRecordings.forEach(recording => {
        const habitat = recording.habitat || 'Unknown';
        stats.habitatDistribution[habitat] = (stats.habitatDistribution[habitat] || 0) + 1;
      });

      // Recordings by month
      allRecordings.forEach(recording => {
        const month = new Date(recording.timestamp).toISOString().slice(0, 7); // YYYY-MM
        stats.recordingsByMonth[month] = (stats.recordingsByMonth[month] || 0) + 1;
      });
    }

    if (allObservations.length > 0) {
      // Conservation status distribution
      allObservations.forEach(observation => {
        const status = observation.conservationStatus || 'Unknown';
        stats.conservationStatusDistribution[status] = (stats.conservationStatusDistribution[status] || 0) + 1;
      });

      // Top species
      const speciesCounts = {};
      allObservations.forEach(observation => {
        const species = observation.speciesName;
        speciesCounts[species] = (speciesCounts[species] || 0) + 1;
      });

      stats.topSpecies = Object.entries(speciesCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([species, count]) => ({ species, count }));
    }

    return stats;
  }

  /**
   * Find biodiversity hotspots
   */
  async findBiodiversityHotspots(latitude, longitude, radiusKm = 50) {
    const nearbyRecordings = await this.getRecordingsByLocation(latitude, longitude, radiusKm);
    
    // Group recordings by approximate location (grid-based)
    const gridSize = 0.01; // ~1km grid
    const locationGroups = {};
    
    nearbyRecordings.forEach(recording => {
      if (recording.latitude && recording.longitude) {
        const gridLat = Math.round(recording.latitude / gridSize) * gridSize;
        const gridLng = Math.round(recording.longitude / gridSize) * gridSize;
        const key = `${gridLat.toFixed(3)}_${gridLng.toFixed(3)}`;
        
        if (!locationGroups[key]) {
          locationGroups[key] = {
            latitude: gridLat,
            longitude: gridLng,
            recordings: [],
            totalSpecies: new Set(),
            avgBiodiversityScore: 0
          };
        }
        
        locationGroups[key].recordings.push(recording);
        recording.detectedSpecies.forEach(species => {
          locationGroups[key].totalSpecies.add(species.name);
        });
      }
    });

    // Calculate hotspot metrics
    const hotspots = Object.values(locationGroups)
      .map(group => {
        const avgScore = group.recordings.reduce((sum, rec) => sum + (rec.biodiversityScore || 0), 0) / group.recordings.length;
        const distance = this.calculateDistance(latitude, longitude, group.latitude, group.longitude);
        
        return {
          latitude: group.latitude,
          longitude: group.longitude,
          speciesRichness: group.totalSpecies.size,
          recordingCount: group.recordings.length,
          averageBiodiversityScore: Math.round(avgScore),
          distance: Math.round(distance * 100) / 100,
          lastRecorded: Math.max(...group.recordings.map(r => new Date(r.timestamp).getTime())),
          topSpecies: [...group.totalSpecies].slice(0, 5)
        };
      })
      .filter(hotspot => hotspot.speciesRichness >= 2) // Minimum 2 species
      .sort((a, b) => b.speciesRichness - a.speciesRichness)
      .slice(0, 10);

    return hotspots;
  }

  /**
   * Get species migration patterns
   */
  async getSpeciesMigrationPatterns(speciesName) {
    const observations = await this.getSpeciesObservations(speciesName, 1000);
    
    // Group by month
    const monthlyData = {};
    observations.forEach(obs => {
      const month = new Date(obs.timestamp).getMonth();
      if (!monthlyData[month]) {
        monthlyData[month] = {
          count: 0,
          locations: [],
          avgConfidence: 0
        };
      }
      
      monthlyData[month].count++;
      if (obs.latitude && obs.longitude) {
        monthlyData[month].locations.push({
          lat: obs.latitude,
          lng: obs.longitude
        });
      }
      monthlyData[month].avgConfidence += obs.confidence;
    });

    // Calculate averages
    Object.keys(monthlyData).forEach(month => {
      const data = monthlyData[month];
      data.avgConfidence = Math.round(data.avgConfidence / data.count);
    });

    return monthlyData;
  }

  /**
   * Save user preference
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
   * Calculate distance between two coordinates
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
    return 'bio_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Export data as JSON
   */
  async exportData() {
    const [recordings, observations, preferences] = await Promise.all([
      this.getAllRecordings(10000),
      this.getSpeciesObservations(null, 10000),
      this.getAllUserPreferences()
    ]);

    return {
      audioRecordings: recordings,
      speciesObservations: observations,
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

  /**
   * Clear all data
   */
  async clearAllData() {
    if (!this.db) await this.init();

    const stores = ['audioRecordings', 'speciesObservations', 'biodiversityHotspots', 'userPreferences', 'speciesLibrary'];
    
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
}

// Create singleton instance
export const biodiversityDB = new BiodiversityDatabase();

// Initialize database on import
biodiversityDB.init().catch(console.error);

export default biodiversityDB;