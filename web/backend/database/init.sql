-- Aqua-Lens Water Quality Database Schema
-- SQLite database initialization script

-- Main water tests table
CREATE TABLE IF NOT EXISTS water_tests (
    id TEXT PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT,
    latitude REAL,
    longitude REAL,
    water_source TEXT NOT NULL,
    image_path TEXT,
    
    -- Water quality parameters
    ph REAL NOT NULL,
    chlorine REAL NOT NULL,
    nitrates INTEGER NOT NULL,
    hardness INTEGER NOT NULL,
    alkalinity INTEGER NOT NULL,
    bacteria INTEGER NOT NULL DEFAULT 0,
    
    -- Analysis results
    overall_quality TEXT NOT NULL,
    safety_level TEXT NOT NULL,
    confidence REAL NOT NULL DEFAULT 95.0,
    processing_time REAL,
    alerts TEXT, -- JSON array of alerts
    color_analysis TEXT, -- JSON object with color data
    
    -- Metadata
    strip_type TEXT DEFAULT 'multi-parameter',
    calibration_used TEXT DEFAULT 'standard',
    lighting_conditions TEXT,
    image_quality_score REAL,
    
    -- Indexing for performance
    FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Water quality alerts table
CREATE TABLE IF NOT EXISTS water_alerts (
    id TEXT PRIMARY KEY,
    test_id TEXT NOT NULL,
    alert_type TEXT NOT NULL, -- 'contamination', 'ph_warning', 'bacteria', etc.
    severity TEXT NOT NULL,   -- 'low', 'medium', 'high', 'critical'
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    latitude REAL,
    longitude REAL,
    resolved BOOLEAN DEFAULT FALSE,
    resolved_timestamp DATETIME,
    
    FOREIGN KEY(test_id) REFERENCES water_tests(id)
);

-- User profiles table (optional)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    location_name TEXT,
    default_latitude REAL,
    default_longitude REAL,
    test_count INTEGER DEFAULT 0,
    last_test_date DATETIME
);

-- Calibration data for improving accuracy
CREATE TABLE IF NOT EXISTS calibration_data (
    id TEXT PRIMARY KEY,
    parameter TEXT NOT NULL, -- 'ph', 'chlorine', etc.
    color_rgb TEXT NOT NULL, -- JSON array [r, g, b]
    actual_value REAL NOT NULL,
    confidence REAL DEFAULT 100.0,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    source TEXT DEFAULT 'lab_verified', -- 'lab_verified', 'user_reported', 'estimated'
    
    -- For machine learning model training
    image_path TEXT,
    lighting_condition TEXT,
    strip_brand TEXT
);

-- Water source locations for mapping
CREATE TABLE IF NOT EXISTS water_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'well', 'lake', 'river', 'tap', etc.
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    description TEXT,
    last_tested DATETIME,
    average_quality TEXT,
    test_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Community reports and feedback
CREATE TABLE IF NOT EXISTS community_reports (
    id TEXT PRIMARY KEY,
    test_id TEXT,
    user_id TEXT,
    report_type TEXT NOT NULL, -- 'accuracy_feedback', 'contamination_report', 'false_positive'
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    latitude REAL,
    longitude REAL,
    status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'dismissed'
    
    FOREIGN KEY(test_id) REFERENCES water_tests(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

-- System performance metrics
CREATE TABLE IF NOT EXISTS system_metrics (
    id TEXT PRIMARY KEY,
    metric_name TEXT NOT NULL,
    metric_value REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    details TEXT -- JSON object with additional data
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_water_tests_location ON water_tests(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_water_tests_timestamp ON water_tests(timestamp);
CREATE INDEX IF NOT EXISTS idx_water_tests_quality ON water_tests(overall_quality, safety_level);
CREATE INDEX IF NOT EXISTS idx_water_tests_user ON water_tests(user_id);

CREATE INDEX IF NOT EXISTS idx_alerts_location ON water_alerts(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON water_alerts(severity, resolved);
CREATE INDEX IF NOT EXISTS idx_alerts_timestamp ON water_alerts(timestamp);

CREATE INDEX IF NOT EXISTS idx_calibration_parameter ON calibration_data(parameter);
CREATE INDEX IF NOT EXISTS idx_water_sources_location ON water_sources(latitude, longitude);

-- Insert some sample calibration data
INSERT OR IGNORE INTO calibration_data (id, parameter, color_rgb, actual_value, source) VALUES
('cal_ph_1', 'ph', '[255, 0, 0]', 4.0, 'lab_verified'),
('cal_ph_2', 'ph', '[255, 140, 0]', 6.0, 'lab_verified'),
('cal_ph_3', 'ph', '[255, 255, 0]', 7.0, 'lab_verified'),
('cal_ph_4', 'ph', '[0, 255, 0]', 8.0, 'lab_verified'),
('cal_ph_5', 'ph', '[0, 0, 255]', 9.0, 'lab_verified'),

('cal_chlorine_1', 'chlorine', '[255, 255, 255]', 0.0, 'lab_verified'),
('cal_chlorine_2', 'chlorine', '[255, 182, 193]', 1.0, 'lab_verified'),
('cal_chlorine_3', 'chlorine', '[255, 105, 180]', 2.0, 'lab_verified'),
('cal_chlorine_4', 'chlorine', '[220, 20, 60]', 4.0, 'lab_verified'),

('cal_nitrates_1', 'nitrates', '[255, 255, 255]', 0, 'lab_verified'),
('cal_nitrates_2', 'nitrates', '[255, 192, 203]', 10, 'lab_verified'),
('cal_nitrates_3', 'nitrates', '[255, 105, 180]', 25, 'lab_verified'),
('cal_nitrates_4', 'nitrates', '[255, 69, 0]', 50, 'lab_verified');

-- Create a view for easy water quality mapping
CREATE VIEW IF NOT EXISTS water_quality_map AS
SELECT 
    wt.id,
    wt.latitude,
    wt.longitude,
    wt.water_source,
    wt.overall_quality,
    wt.safety_level,
    wt.ph,
    wt.chlorine,
    wt.nitrates,
    wt.timestamp,
    CASE 
        WHEN wt.safety_level = 'Unsafe' THEN 'red'
        WHEN wt.overall_quality = 'Poor' THEN 'orange'
        WHEN wt.overall_quality = 'Fair' THEN 'yellow'
        WHEN wt.overall_quality = 'Good' THEN 'lightgreen'
        ELSE 'green'
    END as marker_color,
    COUNT(wa.id) as alert_count
FROM water_tests wt
LEFT JOIN water_alerts wa ON wt.id = wa.test_id AND wa.resolved = FALSE
WHERE wt.latitude IS NOT NULL AND wt.longitude IS NOT NULL
GROUP BY wt.id
ORDER BY wt.timestamp DESC;

-- Create a view for recent alerts
CREATE VIEW IF NOT EXISTS recent_alerts AS
SELECT 
    wa.*,
    wt.water_source,
    wt.overall_quality,
    wt.ph,
    wt.chlorine,
    wt.nitrates
FROM water_alerts wa
JOIN water_tests wt ON wa.test_id = wt.id
WHERE wa.resolved = FALSE
ORDER BY wa.timestamp DESC;

-- Trigger to update user test count
CREATE TRIGGER IF NOT EXISTS update_user_test_count
AFTER INSERT ON water_tests
FOR EACH ROW
WHEN NEW.user_id IS NOT NULL
BEGIN
    UPDATE users 
    SET test_count = test_count + 1,
        last_test_date = NEW.timestamp
    WHERE id = NEW.user_id;
END;

-- Trigger to create alerts for unsafe water
CREATE TRIGGER IF NOT EXISTS create_safety_alerts
AFTER INSERT ON water_tests
FOR EACH ROW
WHEN NEW.safety_level = 'Unsafe'
BEGIN
    INSERT INTO water_alerts (id, test_id, alert_type, severity, message, latitude, longitude)
    VALUES (
        'alert_' || NEW.id,
        NEW.id,
        'contamination',
        'high',
        'Unsafe water quality detected: ' || NEW.overall_quality,
        NEW.latitude,
        NEW.longitude
    );
END;