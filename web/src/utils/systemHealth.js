/**
 * SYSTEM HEALTH MONITORING
 * Monitor application performance and health metrics
 */

export class SystemHealthMonitor {
    constructor() {
        this.metrics = {
            performance: {},
            errors: [],
            warnings: [],
            uptime: Date.now(),
            lastCheck: Date.now()
        };
        
        this.thresholds = {
            memoryUsage: 100 * 1024 * 1024, // 100MB
            responseTime: 1000, // 1 second
            errorRate: 0.05 // 5%
        };
        
        this.startMonitoring();
    }

    startMonitoring() {
        // Monitor performance every 30 seconds
        setInterval(() => {
            this.checkSystemHealth();
        }, 30000);
        
        // Monitor memory usage
        if (performance.memory) {
            this.monitorMemoryUsage();
        }
        
        // Monitor network performance
        this.monitorNetworkPerformance();
    }

    checkSystemHealth() {
        const now = Date.now();
        const uptime = now - this.metrics.uptime;
        
        this.metrics.lastCheck = now;
        this.metrics.performance.uptime = uptime;
        
        // Check for performance issues
        this.checkPerformanceMetrics();
        
        // Clean old errors (keep last 100)
        if (this.metrics.errors.length > 100) {
            this.metrics.errors = this.metrics.errors.slice(-100);
        }
        
        // Clean old warnings (keep last 50)
        if (this.metrics.warnings.length > 50) {
            this.metrics.warnings = this.metrics.warnings.slice(-50);
        }
        
        return this.getHealthStatus();
    }

    monitorMemoryUsage() {
        if (performance.memory) {
            const memory = performance.memory;
            this.metrics.performance.memory = {
                used: memory.usedJSHeapSize,
                total: memory.totalJSHeapSize,
                limit: memory.jsHeapSizeLimit,
                timestamp: Date.now()
            };
            
            // Check for memory leaks
            if (memory.usedJSHeapSize > this.thresholds.memoryUsage) {
                this.addWarning('High memory usage detected', {
                    used: memory.usedJSHeapSize,
                    threshold: this.thresholds.memoryUsage
                });
            }
        }
    }

    monitorNetworkPerformance() {
        // Monitor fetch performance
        const originalFetch = window.fetch;
        const self = this;
        
        window.fetch = function(...args) {
            const startTime = performance.now();
            
            return originalFetch.apply(this, args)
                .then(response => {
                    const endTime = performance.now();
                    const duration = endTime - startTime;
                    
                    self.recordNetworkMetric(args[0], duration, response.status);
                    
                    return response;
                })
                .catch(error => {
                    const endTime = performance.now();
                    const duration = endTime - startTime;
                    
                    self.recordNetworkError(args[0], duration, error);
                    throw error;
                });
        };
    }

    recordNetworkMetric(url, duration, status) {
        if (!this.metrics.performance.network) {
            this.metrics.performance.network = [];
        }
        
        this.metrics.performance.network.push({
            url: typeof url === 'string' ? url : url.toString(),
            duration,
            status,
            timestamp: Date.now()
        });
        
        // Keep only last 50 network requests
        if (this.metrics.performance.network.length > 50) {
            this.metrics.performance.network = this.metrics.performance.network.slice(-50);
        }
        
        // Check for slow requests
        if (duration > this.thresholds.responseTime) {
            this.addWarning('Slow network request detected', {
                url: typeof url === 'string' ? url : url.toString(),
                duration,
                threshold: this.thresholds.responseTime
            });
        }
    }

    recordNetworkError(url, duration, error) {
        this.addError('Network request failed', {
            url: typeof url === 'string' ? url : url.toString(),
            duration,
            error: error.message
        });
    }

    checkPerformanceMetrics() {
        // Check navigation timing
        if (performance.navigation && performance.timing) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            this.metrics.performance.pageLoad = {
                loadTime,
                domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
                timestamp: Date.now()
            };
        }
        
        // Check resource timing
        if (performance.getEntriesByType) {
            const resources = performance.getEntriesByType('resource');
            const slowResources = resources.filter(resource => resource.duration > 1000);
            
            if (slowResources.length > 0) {
                this.addWarning('Slow resources detected', {
                    count: slowResources.length,
                    resources: slowResources.map(r => ({ name: r.name, duration: r.duration }))
                });
            }
        }
    }

    addError(message, details = {}) {
        this.metrics.errors.push({
            message,
            details,
            timestamp: Date.now(),
            type: 'error'
        });
        
        console.error('System Health Error:', message, details);
    }

    addWarning(message, details = {}) {
        this.metrics.warnings.push({
            message,
            details,
            timestamp: Date.now(),
            type: 'warning'
        });
        
        console.warn('System Health Warning:', message, details);
    }

    getHealthStatus() {
        const now = Date.now();
        const recentErrors = this.metrics.errors.filter(e => now - e.timestamp < 300000); // Last 5 minutes
        const recentWarnings = this.metrics.warnings.filter(w => now - w.timestamp < 300000);
        
        let status = 'healthy';
        let score = 100;
        
        // Deduct points for errors and warnings
        score -= recentErrors.length * 10;
        score -= recentWarnings.length * 5;
        
        // Check memory usage
        if (this.metrics.performance.memory) {
            const memoryUsage = this.metrics.performance.memory.used / this.metrics.performance.memory.limit;
            if (memoryUsage > 0.8) {
                score -= 20;
            } else if (memoryUsage > 0.6) {
                score -= 10;
            }
        }
        
        // Check network performance
        if (this.metrics.performance.network) {
            const recentRequests = this.metrics.performance.network.filter(r => now - r.timestamp < 300000);
            const slowRequests = recentRequests.filter(r => r.duration > this.thresholds.responseTime);
            const errorRate = slowRequests.length / recentRequests.length;
            
            if (errorRate > this.thresholds.errorRate) {
                score -= 15;
            }
        }
        
        // Determine status based on score
        if (score >= 90) status = 'excellent';
        else if (score >= 75) status = 'good';
        else if (score >= 60) status = 'fair';
        else if (score >= 40) status = 'poor';
        else status = 'critical';
        
        return {
            status,
            score: Math.max(0, score),
            uptime: now - this.metrics.uptime,
            lastCheck: this.metrics.lastCheck,
            recentErrors: recentErrors.length,
            recentWarnings: recentWarnings.length,
            metrics: this.metrics
        };
    }

    getDetailedReport() {
        return {
            ...this.getHealthStatus(),
            performance: this.metrics.performance,
            recentErrors: this.metrics.errors.slice(-10),
            recentWarnings: this.metrics.warnings.slice(-10)
        };
    }

    reset() {
        this.metrics = {
            performance: {},
            errors: [],
            warnings: [],
            uptime: Date.now(),
            lastCheck: Date.now()
        };
    }
}

// Global instance
export const systemHealth = new SystemHealthMonitor();

// Utility functions
export const getSystemHealth = () => systemHealth.getHealthStatus();
export const getDetailedHealthReport = () => systemHealth.getDetailedReport();
export const recordError = (message, details) => systemHealth.addError(message, details);
export const recordWarning = (message, details) => systemHealth.addWarning(message, details);