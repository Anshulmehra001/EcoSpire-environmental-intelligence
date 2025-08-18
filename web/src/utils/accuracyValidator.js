/**
 * ACCURACY VALIDATOR
 * Validate data accuracy and consistency across the application
 */

export class AccuracyValidator {
    constructor() {
        this.validationRules = new Map();
        this.validationHistory = [];
        this.setupDefaultRules();
    }

    setupDefaultRules() {
        // Environmental data validation rules
        this.addRule('temperature', {
            min: -50,
            max: 60,
            unit: '°C',
            precision: 1
        });

        this.addRule('humidity', {
            min: 0,
            max: 100,
            unit: '%',
            precision: 1
        });

        this.addRule('airQuality', {
            min: 0,
            max: 500,
            unit: 'AQI',
            precision: 0
        });

        this.addRule('waterPH', {
            min: 0,
            max: 14,
            unit: 'pH',
            precision: 2
        });

        this.addRule('coordinates', {
            latitude: { min: -90, max: 90 },
            longitude: { min: -180, max: 180 },
            precision: 6
        });

        // Device pricing validation
        this.addRule('devicePrice', {
            min: 0,
            max: 10000,
            unit: '$',
            precision: 0
        });

        // Carbon footprint validation
        this.addRule('carbonFootprint', {
            min: 0,
            max: 1000,
            unit: 'kg CO2',
            precision: 2
        });
    }

    addRule(field, rule) {
        this.validationRules.set(field, rule);
    }

    validateField(field, value, context = {}) {
        const rule = this.validationRules.get(field);
        if (!rule) {
            return { valid: true, message: 'No validation rule found' };
        }

        const result = {
            valid: true,
            message: '',
            warnings: [],
            correctedValue: value
        };

        try {
            // Type validation
            if (typeof value !== 'number' && !Array.isArray(value) && typeof value !== 'object') {
                const numValue = parseFloat(value);
                if (isNaN(numValue)) {
                    result.valid = false;
                    result.message = `Invalid ${field}: must be a number`;
                    return result;
                }
                result.correctedValue = numValue;
                value = numValue;
            }

            // Range validation
            if (rule.min !== undefined && value < rule.min) {
                result.valid = false;
                result.message = `${field} value ${value} is below minimum ${rule.min}`;
                result.correctedValue = rule.min;
            }

            if (rule.max !== undefined && value > rule.max) {
                result.valid = false;
                result.message = `${field} value ${value} is above maximum ${rule.max}`;
                result.correctedValue = rule.max;
            }

            // Precision validation
            if (rule.precision !== undefined) {
                const rounded = parseFloat(value.toFixed(rule.precision));
                if (rounded !== value) {
                    result.warnings.push(`${field} rounded to ${rule.precision} decimal places`);
                    result.correctedValue = rounded;
                }
            }

            // Special validations
            if (field === 'coordinates') {
                return this.validateCoordinates(value, rule);
            }

            // Context-based validation
            if (context.previousValue !== undefined) {
                const change = Math.abs(value - context.previousValue);
                const threshold = (rule.max - rule.min) * 0.1; // 10% change threshold
                
                if (change > threshold) {
                    result.warnings.push(`Large change detected: ${change.toFixed(2)} ${rule.unit || ''}`);
                }
            }

        } catch (error) {
            result.valid = false;
            result.message = `Validation error: ${error.message}`;
        }

        // Record validation
        this.recordValidation(field, value, result);

        return result;
    }

    validateCoordinates(coords, rule) {
        const result = {
            valid: true,
            message: '',
            warnings: [],
            correctedValue: coords
        };

        if (!coords || typeof coords !== 'object') {
            result.valid = false;
            result.message = 'Coordinates must be an object with lat and lng properties';
            return result;
        }

        const { lat, lng } = coords;

        // Validate latitude
        if (typeof lat !== 'number' || lat < rule.latitude.min || lat > rule.latitude.max) {
            result.valid = false;
            result.message = `Invalid latitude: ${lat}. Must be between ${rule.latitude.min} and ${rule.latitude.max}`;
        }

        // Validate longitude
        if (typeof lng !== 'number' || lng < rule.longitude.min || lng > rule.longitude.max) {
            result.valid = false;
            result.message = `Invalid longitude: ${lng}. Must be between ${rule.longitude.min} and ${rule.longitude.max}`;
        }

        // Precision correction
        if (rule.precision !== undefined) {
            result.correctedValue = {
                lat: parseFloat(lat.toFixed(rule.precision)),
                lng: parseFloat(lng.toFixed(rule.precision))
            };
        }

        return result;
    }

    validateDataSet(data, schema = {}) {
        const results = {
            valid: true,
            errors: [],
            warnings: [],
            correctedData: { ...data }
        };

        for (const [field, value] of Object.entries(data)) {
            const context = schema[field] || {};
            const validation = this.validateField(field, value, context);

            if (!validation.valid) {
                results.valid = false;
                results.errors.push({
                    field,
                    message: validation.message,
                    value,
                    correctedValue: validation.correctedValue
                });
            }

            if (validation.warnings.length > 0) {
                results.warnings.push(...validation.warnings.map(w => ({ field, warning: w })));
            }

            results.correctedData[field] = validation.correctedValue;
        }

        return results;
    }

    recordValidation(field, value, result) {
        this.validationHistory.push({
            field,
            value,
            result,
            timestamp: Date.now()
        });

        // Keep only last 1000 validations
        if (this.validationHistory.length > 1000) {
            this.validationHistory = this.validationHistory.slice(-1000);
        }
    }

    getValidationStats() {
        const stats = {
            totalValidations: this.validationHistory.length,
            successRate: 0,
            fieldStats: new Map(),
            recentErrors: []
        };

        let successCount = 0;
        const now = Date.now();
        const oneHourAgo = now - (60 * 60 * 1000);

        this.validationHistory.forEach(validation => {
            if (validation.result.valid) {
                successCount++;
            } else if (validation.timestamp > oneHourAgo) {
                stats.recentErrors.push({
                    field: validation.field,
                    message: validation.result.message,
                    timestamp: validation.timestamp
                });
            }

            // Field statistics
            if (!stats.fieldStats.has(validation.field)) {
                stats.fieldStats.set(validation.field, {
                    total: 0,
                    errors: 0,
                    warnings: 0
                });
            }

            const fieldStat = stats.fieldStats.get(validation.field);
            fieldStat.total++;
            if (!validation.result.valid) fieldStat.errors++;
            if (validation.result.warnings && validation.result.warnings.length > 0) {
                fieldStat.warnings++;
            }
        });

        stats.successRate = stats.totalValidations > 0 ? 
            (successCount / stats.totalValidations) * 100 : 100;

        return stats;
    }

    clearHistory() {
        this.validationHistory = [];
    }
}

// Global validator instance
export const accuracyValidator = new AccuracyValidator();

// Utility functions
export const validateField = (field, value, context) => 
    accuracyValidator.validateField(field, value, context);

export const validateDataSet = (data, schema) => 
    accuracyValidator.validateDataSet(data, schema);

export const getValidationStats = () => 
    accuracyValidator.getValidationStats();

export const addValidationRule = (field, rule) => 
    accuracyValidator.addRule(field, rule);