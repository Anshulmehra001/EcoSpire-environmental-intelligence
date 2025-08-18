-- EcoSpire Database Schema
-- Complete database structure for production deployment

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    preferences JSONB DEFAULT '{}'::jsonb
);

-- User sessions
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Environmental data
CREATE TABLE environmental_data (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    data_type VARCHAR(50) NOT NULL, -- 'air_quality', 'water_quality', 'biodiversity', etc.
    location_lat DECIMAL(10, 8),
    location_lon DECIMAL(11, 8),
    data_values JSONB NOT NULL,
    confidence_score DECIMAL(5, 2),
    source VARCHAR(100), -- 'user_input', 'api', 'sensor', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_public BOOLEAN DEFAULT false
);

-- E-waste items
CREATE TABLE ewaste_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    device_type VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    model VARCHAR(200),
    condition VARCHAR(50),
    storage_capacity VARCHAR(50),
    accessories TEXT[],
    estimated_value_min INTEGER,
    estimated_value_max INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    recycled_at TIMESTAMP,
    recycling_method VARCHAR(100)
);

-- Upcycling projects
CREATE TABLE upcycling_projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    item_type VARCHAR(100),
    material VARCHAR(100),
    condition VARCHAR(100),
    skill_level VARCHAR(50),
    time_required VARCHAR(100),
    estimated_cost VARCHAR(50),
    instructions JSONB,
    materials_needed TEXT[],
    tools_needed TEXT[],
    sustainability_impact TEXT,
    images TEXT[],
    is_completed BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT false,
    likes_count INTEGER DEFAULT 0,
    saves_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Biodiversity recordings
CREATE TABLE biodiversity_recordings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    location_lat DECIMAL(10, 8),
    location_lon DECIMAL(11, 8),
    habitat_type VARCHAR(100),
    region VARCHAR(100),
    audio_file_url VARCHAR(500),
    duration_seconds INTEGER,
    detected_species JSONB,
    biodiversity_metrics JSONB,
    confidence_score DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT false
);

-- Water quality tests
CREATE TABLE water_quality_tests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    location_lat DECIMAL(10, 8),
    location_lon DECIMAL(11, 8),
    water_source VARCHAR(100),
    test_method VARCHAR(50), -- 'image_analysis', 'test_strip', 'manual'
    ph_level DECIMAL(4, 2),
    chlorine_level DECIMAL(6, 3),
    nitrate_level DECIMAL(6, 3),
    hardness_level INTEGER,
    alkalinity_level INTEGER,
    bacteria_count INTEGER,
    turbidity DECIMAL(5, 2),
    overall_quality VARCHAR(50),
    safety_level VARCHAR(50),
    confidence_score DECIMAL(5, 2),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Carbon footprint tracking
CREATE TABLE carbon_activities (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(100) NOT NULL, -- 'transport', 'energy', 'food', 'waste'
    activity_name VARCHAR(200) NOT NULL,
    amount DECIMAL(10, 3),
    unit VARCHAR(50),
    co2_equivalent DECIMAL(10, 3), -- kg CO2
    date_recorded DATE NOT NULL,
    location VARCHAR(200),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Smart farming data
CREATE TABLE farming_data (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    location_lat DECIMAL(10, 8),
    location_lon DECIMAL(11, 8),
    farm_size DECIMAL(10, 2),
    crop_type VARCHAR(100),
    soil_moisture DECIMAL(5, 2),
    soil_temperature DECIMAL(5, 2),
    soil_ph DECIMAL(4, 2),
    ndvi DECIMAL(4, 3),
    precipitation DECIMAL(6, 2),
    temperature DECIMAL(5, 2),
    humidity DECIMAL(5, 2),
    wind_speed DECIMAL(5, 2),
    growing_degree_days INTEGER,
    pest_pressure INTEGER,
    disease_risk INTEGER,
    recommendations TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Air quality monitoring
CREATE TABLE air_quality_data (
    id SERIAL PRIMARY KEY,
    location_lat DECIMAL(10, 8) NOT NULL,
    location_lon DECIMAL(11, 8) NOT NULL,
    city_name VARCHAR(200),
    country VARCHAR(100),
    aqi INTEGER,
    pm25 DECIMAL(6, 2),
    pm10 DECIMAL(6, 2),
    o3 DECIMAL(6, 2),
    no2 DECIMAL(6, 2),
    so2 DECIMAL(6, 2),
    co DECIMAL(6, 2),
    temperature DECIMAL(5, 2),
    humidity DECIMAL(5, 2),
    pressure DECIMAL(7, 2),
    wind_speed DECIMAL(5, 2),
    wind_direction INTEGER,
    visibility DECIMAL(5, 2),
    uv_index INTEGER,
    data_source VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User achievements
CREATE TABLE user_achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    achievement_type VARCHAR(100) NOT NULL,
    achievement_name VARCHAR(200) NOT NULL,
    description TEXT,
    points_earned INTEGER DEFAULT 0,
    badge_icon VARCHAR(100),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_public BOOLEAN DEFAULT true
);

-- Community projects
CREATE TABLE community_projects (
    id SERIAL PRIMARY KEY,
    creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    location VARCHAR(200),
    funding_goal INTEGER,
    funding_raised INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    impact_metrics JSONB,
    images TEXT[],
    website_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User interactions (likes, saves, shares)
CREATE TABLE user_interactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    target_type VARCHAR(50) NOT NULL, -- 'project', 'recording', 'test', etc.
    target_id INTEGER NOT NULL,
    interaction_type VARCHAR(50) NOT NULL, -- 'like', 'save', 'share', 'comment'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, target_type, target_id, interaction_type)
);

-- System analytics
CREATE TABLE system_analytics (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- API usage tracking
CREATE TABLE api_usage (
    id SERIAL PRIMARY KEY,
    api_name VARCHAR(100) NOT NULL,
    endpoint VARCHAR(200),
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    request_count INTEGER DEFAULT 1,
    response_time_ms INTEGER,
    status_code INTEGER,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_environmental_data_user_id ON environmental_data(user_id);
CREATE INDEX idx_environmental_data_type ON environmental_data(data_type);
CREATE INDEX idx_environmental_data_location ON environmental_data(location_lat, location_lon);
CREATE INDEX idx_environmental_data_created_at ON environmental_data(created_at);
CREATE INDEX idx_ewaste_items_user_id ON ewaste_items(user_id);
CREATE INDEX idx_ewaste_items_device_type ON ewaste_items(device_type);
CREATE INDEX idx_upcycling_projects_user_id ON upcycling_projects(user_id);
CREATE INDEX idx_upcycling_projects_public ON upcycling_projects(is_public);
CREATE INDEX idx_biodiversity_recordings_user_id ON biodiversity_recordings(user_id);
CREATE INDEX idx_biodiversity_recordings_location ON biodiversity_recordings(location_lat, location_lon);
CREATE INDEX idx_water_quality_tests_user_id ON water_quality_tests(user_id);
CREATE INDEX idx_carbon_activities_user_id ON carbon_activities(user_id);
CREATE INDEX idx_carbon_activities_date ON carbon_activities(date_recorded);
CREATE INDEX idx_farming_data_user_id ON farming_data(user_id);
CREATE INDEX idx_air_quality_location ON air_quality_data(location_lat, location_lon);
CREATE INDEX idx_air_quality_created_at ON air_quality_data(created_at);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_community_projects_status ON community_projects(status);
CREATE INDEX idx_user_interactions_user_id ON user_interactions(user_id);
CREATE INDEX idx_user_interactions_target ON user_interactions(target_type, target_id);
CREATE INDEX idx_system_analytics_event_type ON system_analytics(event_type);
CREATE INDEX idx_system_analytics_created_at ON system_analytics(created_at);
CREATE INDEX idx_api_usage_api_name ON api_usage(api_name);
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_projects_updated_at BEFORE UPDATE ON community_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();