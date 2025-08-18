/**
 * Performance Optimizer
 * Advanced performance monitoring and optimization for EcoSpire
 */

export class PerformanceOptimizer {
  constructor() {
    this.metrics = new Map();
    this.optimizations = new Map();
    this.cache = new Map();
    this.observers = [];
    
    // Performance thresholds
    this.thresholds = {
      analysisTime: 5000, // 5 seconds max
      imageProcessing: 3000, // 3 seconds max
      audioProcessing: 4000, // 4 seconds max
      databaseQuery: 1000, // 1 second max
      memoryUsage: 100 * 1024 * 1024, // 100MB max
      cacheSize: 50 * 1024 * 1024 // 50MB max
    };

    this.initializeOptimizations();
  }

  /**
   * Initialize performance optimizations
   */
  initializeOptimizations() {
    // Enable performance monitoring
    this.enablePerformanceMonitoring();
    
    // Setup caching strategies
    this.setupCaching();
    
    // Initialize lazy loading
    this.setupLazyLoading();
    
    // Setup memory management
    this.setupMemoryManagement();
    
    console.log('⚡ Performance optimizer initialized');
  }

  /**
   * Enable comprehensive performance monitoring
   */
  enablePerformanceMonitoring() {
    // Monitor navigation timing
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0];
        this.recordMetric('pageLoad', nav.loadEventEnd - nav.fetchStart);
      }
    }

    // Monitor resource loading
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.name.includes('chunk') || entry.name.includes('.js')) {
            this.recordMetric('resourceLoad', entry.duration, entry.name);
          }
        });
      });
      
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    }

    // Monitor memory usage
    this.startMemoryMonitoring();
  }

  /**
   * Setup intelligent caching system
   */
  setupCaching() {
    // Analysis result cache with TTL
    this.analysisCache = new Map();
    this.cacheTimestamps = new Map();
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes

    // Image processing cache
    this.imageCache = new Map();
    this.imageCacheSize = 0;

    // Audio processing cache
    this.audioCache = new Map();
    this.audioCacheSize = 0;

    // Database query cache
    this.dbCache = new Map();
    this.dbCacheTimestamps = new Map();
    this.dbCacheTTL = 2 * 60 * 1000; // 2 minutes
  }

  /**
   * Setup lazy loading for components and resources
   */
  setupLazyLoading() {
    // Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
      this.lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadLazyContent(entry.target);
          }
        });
      }, {
        rootMargin: '50px'
      });
    }
  }

  /**
   * Setup memory management
   */
  setupMemoryManagement() {
    // Periodic cleanup
    setInterval(() => {
      this.cleanupCache();
      this.cleanupMemory();
    }, 60000); // Every minute

    // Cleanup on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.cleanupMemory();
      }
    });
  }

  /**
   * Monitor memory usage
   */
  startMemoryMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        this.recordMetric('memoryUsed', memory.usedJSHeapSize);
        this.recordMetric('memoryTotal', memory.totalJSHeapSize);
        
        // Trigger cleanup if memory usage is high
        if (memory.usedJSHeapSize > this.thresholds.memoryUsage) {
          this.cleanupMemory();
        }
      }, 30000); // Every 30 seconds
    }
  }

  /**
   * Optimize image analysis performance
   */
  async optimizeImageAnalysis(imageSource, analysisFunction) {
    const startTime = performance.now();
    
    try {
      // Check cache first
      const cacheKey = this.generateImageCacheKey(imageSource);
      const cached = this.getFromCache('image', cacheKey);
      
      if (cached) {
        this.recordMetric('imageCacheHit', performance.now() - startTime);
        return cached;
      }

      // Optimize image before analysis
      const optimizedImage = await this.optimizeImage(imageSource);
      
      // Run analysis with timeout
      const result = await this.withTimeout(
        analysisFunction(optimizedImage),
        this.thresholds.imageProcessing
      );

      // Cache result
      this.setCache('image', cacheKey, result);
      
      const duration = performance.now() - startTime;
      this.recordMetric('imageAnalysis', duration);
      
      return result;

    } catch (error) {
      const duration = performance.now() - startTime;
      this.recordMetric('imageAnalysisError', duration);
      throw error;
    }
  }

  /**
   * Optimize audio analysis performance
   */
  async optimizeAudioAnalysis(audioData, analysisFunction) {
    const startTime = performance.now();
    
    try {
      // Check cache first
      const cacheKey = this.generateAudioCacheKey(audioData);
      const cached = this.getFromCache('audio', cacheKey);
      
      if (cached) {
        this.recordMetric('audioCacheHit', performance.now() - startTime);
        return cached;
      }

      // Optimize audio before analysis
      const optimizedAudio = await this.optimizeAudio(audioData);
      
      // Run analysis with timeout
      const result = await this.withTimeout(
        analysisFunction(optimizedAudio),
        this.thresholds.audioProcessing
      );

      // Cache result
      this.setCache('audio', cacheKey, result);
      
      const duration = performance.now() - startTime;
      this.recordMetric('audioAnalysis', duration);
      
      return result;

    } catch (error) {
      const duration = performance.now() - startTime;
      this.recordMetric('audioAnalysisError', duration);
      throw error;
    }
  }

  /**
   * Optimize database operations
   */
  async optimizeDbOperation(operation, cacheKey = null) {
    const startTime = performance.now();
    
    try {
      // Check cache if key provided
      if (cacheKey) {
        const cached = this.getFromCache('db', cacheKey);
        if (cached) {
          this.recordMetric('dbCacheHit', performance.now() - startTime);
          return cached;
        }
      }

      // Run operation with timeout
      const result = await this.withTimeout(
        operation(),
        this.thresholds.databaseQuery
      );

      // Cache result if key provided
      if (cacheKey) {
        this.setCache('db', cacheKey, result);
      }
      
      const duration = performance.now() - startTime;
      this.recordMetric('dbOperation', duration);
      
      return result;

    } catch (error) {
      const duration = performance.now() - startTime;
      this.recordMetric('dbOperationError', duration);
      throw error;
    }
  }

  /**
   * Optimize image for analysis
   */
  async optimizeImage(imageSource) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Optimize dimensions (max 1920x1080)
          const maxWidth = 1920;
          const maxHeight = 1080;
          let { width, height } = img;
          
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw with high quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to optimized format
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
          resolve(optimizedDataUrl);
          
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = reject;
      img.src = typeof imageSource === 'string' ? imageSource : URL.createObjectURL(imageSource);
    });
  }

  /**
   * Optimize audio for analysis
   */
  async optimizeAudio(audioData) {
    // For now, return as-is. In a real implementation, this could:
    // - Compress audio
    // - Normalize volume
    // - Remove silence
    // - Convert to optimal format
    return audioData;
  }

  /**
   * Add timeout to promises
   */
  withTimeout(promise, timeoutMs) {
    return Promise.race([
      promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
      )
    ]);
  }

  /**
   * Cache management
   */
  setCache(type, key, value) {
    const now = Date.now();
    
    switch (type) {
      case 'image':
        const imageSize = this.estimateSize(value);
        if (this.imageCacheSize + imageSize > this.thresholds.cacheSize) {
          this.cleanupImageCache();
        }
        this.imageCache.set(key, value);
        this.imageCacheSize += imageSize;
        break;
        
      case 'audio':
        const audioSize = this.estimateSize(value);
        if (this.audioCacheSize + audioSize > this.thresholds.cacheSize) {
          this.cleanupAudioCache();
        }
        this.audioCache.set(key, value);
        this.audioCacheSize += audioSize;
        break;
        
      case 'db':
        this.dbCache.set(key, value);
        this.dbCacheTimestamps.set(key, now);
        break;
        
      default:
        this.cache.set(key, value);
        this.cacheTimestamps.set(key, now);
    }
  }

  getFromCache(type, key) {
    const now = Date.now();
    
    switch (type) {
      case 'image':
        return this.imageCache.get(key);
        
      case 'audio':
        return this.audioCache.get(key);
        
      case 'db':
        const dbTimestamp = this.dbCacheTimestamps.get(key);
        if (dbTimestamp && (now - dbTimestamp) < this.dbCacheTTL) {
          return this.dbCache.get(key);
        }
        this.dbCache.delete(key);
        this.dbCacheTimestamps.delete(key);
        return null;
        
      default:
        const timestamp = this.cacheTimestamps.get(key);
        if (timestamp && (now - timestamp) < this.cacheTTL) {
          return this.cache.get(key);
        }
        this.cache.delete(key);
        this.cacheTimestamps.delete(key);
        return null;
    }
  }

  /**
   * Cache cleanup
   */
  cleanupCache() {
    const now = Date.now();
    
    // Cleanup general cache
    for (const [key, timestamp] of this.cacheTimestamps.entries()) {
      if (now - timestamp > this.cacheTTL) {
        this.cache.delete(key);
        this.cacheTimestamps.delete(key);
      }
    }
    
    // Cleanup DB cache
    for (const [key, timestamp] of this.dbCacheTimestamps.entries()) {
      if (now - timestamp > this.dbCacheTTL) {
        this.dbCache.delete(key);
        this.dbCacheTimestamps.delete(key);
      }
    }
  }

  cleanupImageCache() {
    // Remove oldest entries if cache is too large
    const entries = Array.from(this.imageCache.entries());
    const toRemove = Math.ceil(entries.length * 0.3); // Remove 30%
    
    for (let i = 0; i < toRemove; i++) {
      const [key] = entries[i];
      this.imageCache.delete(key);
    }
    
    this.imageCacheSize = this.imageCacheSize * 0.7; // Approximate
  }

  cleanupAudioCache() {
    // Remove oldest entries if cache is too large
    const entries = Array.from(this.audioCache.entries());
    const toRemove = Math.ceil(entries.length * 0.3); // Remove 30%
    
    for (let i = 0; i < toRemove; i++) {
      const [key] = entries[i];
      this.audioCache.delete(key);
    }
    
    this.audioCacheSize = this.audioCacheSize * 0.7; // Approximate
  }

  cleanupMemory() {
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
    
    // Clear large caches if memory pressure is high
    if ('memory' in performance) {
      const memory = performance.memory;
      if (memory.usedJSHeapSize > this.thresholds.memoryUsage * 0.8) {
        this.imageCache.clear();
        this.audioCache.clear();
        this.imageCacheSize = 0;
        this.audioCacheSize = 0;
      }
    }
  }

  /**
   * Generate cache keys
   */
  generateImageCacheKey(imageSource) {
    if (typeof imageSource === 'string') {
      return `img_${this.hashString(imageSource)}`;
    } else if (imageSource instanceof Blob) {
      return `img_${imageSource.size}_${imageSource.type}_${imageSource.lastModified || Date.now()}`;
    }
    return `img_${Date.now()}_${Math.random()}`;
  }

  generateAudioCacheKey(audioData) {
    if (audioData instanceof Blob) {
      return `audio_${audioData.size}_${audioData.type}_${audioData.lastModified || Date.now()}`;
    }
    return `audio_${Date.now()}_${Math.random()}`;
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Estimate object size in bytes
   */
  estimateSize(obj) {
    const jsonString = JSON.stringify(obj);
    return new Blob([jsonString]).size;
  }

  /**
   * Record performance metrics
   */
  recordMetric(name, value, details = null) {
    const metric = {
      name,
      value,
      details,
      timestamp: Date.now()
    };
    
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const metrics = this.metrics.get(name);
    metrics.push(metric);
    
    // Keep only last 100 metrics per type
    if (metrics.length > 100) {
      metrics.shift();
    }
    
    // Log performance issues
    if (this.isPerformanceIssue(name, value)) {
      console.warn(`⚠️ Performance issue: ${name} took ${value}ms`);
    }
  }

  isPerformanceIssue(name, value) {
    const thresholds = {
      imageAnalysis: 3000,
      audioAnalysis: 4000,
      dbOperation: 1000,
      pageLoad: 5000
    };
    
    return thresholds[name] && value > thresholds[name];
  }

  /**
   * Get performance report
   */
  getPerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: {},
      cacheStats: this.getCacheStats(),
      memoryStats: this.getMemoryStats(),
      recommendations: []
    };

    // Calculate averages and statistics
    for (const [name, metrics] of this.metrics.entries()) {
      if (metrics.length > 0) {
        const values = metrics.map(m => m.value);
        report.metrics[name] = {
          count: values.length,
          average: values.reduce((a, b) => a + b, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
          latest: values[values.length - 1]
        };
      }
    }

    // Generate recommendations
    report.recommendations = this.generatePerformanceRecommendations(report);

    return report;
  }

  getCacheStats() {
    return {
      imageCache: {
        size: this.imageCache.size,
        sizeBytes: this.imageCacheSize
      },
      audioCache: {
        size: this.audioCache.size,
        sizeBytes: this.audioCacheSize
      },
      dbCache: {
        size: this.dbCache.size
      },
      generalCache: {
        size: this.cache.size
      }
    };
  }

  getMemoryStats() {
    if ('memory' in performance) {
      const memory = performance.memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        usagePercent: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
      };
    }
    return null;
  }

  generatePerformanceRecommendations(report) {
    const recommendations = [];

    // Check analysis times
    if (report.metrics.imageAnalysis?.average > 2000) {
      recommendations.push({
        type: 'performance',
        priority: 'medium',
        message: 'Image analysis is slow. Consider optimizing image size or using web workers.',
        metric: 'imageAnalysis'
      });
    }

    if (report.metrics.audioAnalysis?.average > 3000) {
      recommendations.push({
        type: 'performance',
        priority: 'medium',
        message: 'Audio analysis is slow. Consider preprocessing audio or using streaming analysis.',
        metric: 'audioAnalysis'
      });
    }

    // Check memory usage
    const memoryStats = this.getMemoryStats();
    if (memoryStats && memoryStats.usagePercent > 80) {
      recommendations.push({
        type: 'memory',
        priority: 'high',
        message: 'High memory usage detected. Consider clearing caches or reducing data retention.',
        metric: 'memory'
      });
    }

    // Check cache efficiency
    const cacheStats = this.getCacheStats();
    if (cacheStats.imageCache.sizeBytes > this.thresholds.cacheSize * 0.8) {
      recommendations.push({
        type: 'cache',
        priority: 'low',
        message: 'Image cache is large. Consider reducing cache size or TTL.',
        metric: 'cache'
      });
    }

    return recommendations;
  }

  /**
   * Lazy loading utilities
   */
  observeLazyLoad(element) {
    if (this.lazyLoadObserver) {
      this.lazyLoadObserver.observe(element);
    }
  }

  loadLazyContent(element) {
    // Implementation depends on element type
    if (element.dataset.src) {
      element.src = element.dataset.src;
      element.removeAttribute('data-src');
    }
    
    if (this.lazyLoadObserver) {
      this.lazyLoadObserver.unobserve(element);
    }
  }

  /**
   * Cleanup on destroy
   */
  destroy() {
    // Clear all caches
    this.cache.clear();
    this.imageCache.clear();
    this.audioCache.clear();
    this.dbCache.clear();
    
    // Disconnect observers
    this.observers.forEach(observer => observer.disconnect());
    if (this.lazyLoadObserver) {
      this.lazyLoadObserver.disconnect();
    }
    
    console.log('⚡ Performance optimizer destroyed');
  }
}

// Create singleton instance
export const performanceOptimizer = new PerformanceOptimizer();

// Export optimization functions
export const optimizeImageAnalysis = (imageSource, analysisFunction) => {
  return performanceOptimizer.optimizeImageAnalysis(imageSource, analysisFunction);
};

export const optimizeAudioAnalysis = (audioData, analysisFunction) => {
  return performanceOptimizer.optimizeAudioAnalysis(audioData, analysisFunction);
};

export const optimizeDbOperation = (operation, cacheKey) => {
  return performanceOptimizer.optimizeDbOperation(operation, cacheKey);
};

export const getPerformanceReport = () => {
  return performanceOptimizer.getPerformanceReport();
};

export default performanceOptimizer;