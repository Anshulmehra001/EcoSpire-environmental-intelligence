# 🧪 Aqua-Lens Backend Setup Guide

## Overview

The Aqua-Lens backend provides enhanced processing capabilities using multiple programming languages for maximum accuracy and performance.

## 🏗️ Architecture

- **Node.js** - API server and coordination
- **Python** - AI-powered image analysis with OpenCV
- **C++** - High-performance image preprocessing
- **SQLite** - Comprehensive data storage

## 🚀 Quick Setup

### 1. Install Node.js Dependencies
```bash
cd web/backend
npm install
```

### 2. Setup Python Environment
```bash
# Install Python dependencies
pip install -r python/requirements.txt

# Or using virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r python/requirements.txt
```

### 3. Build C++ Components (Optional)
```bash
# Install OpenCV (Ubuntu/Debian)
sudo apt-get install libopencv-dev

# Install OpenCV (macOS)
brew install opencv

# Build the image processor
cd cpp
make
```

### 4. Initialize Database
```bash
npm run init-db
```

### 5. Start the Server
```bash
npm start
# Or for development
npm run dev
```

## 📋 Dependencies

### Node.js Packages
- `express` - Web server framework
- `multer` - File upload handling
- `sqlite3` - Database interface
- `sharp` - Image processing
- `cors` - Cross-origin requests
- `uuid` - Unique ID generation

### Python Packages
- `opencv-python` - Computer vision
- `Pillow` - Image processing
- `numpy` - Numerical computing
- `scipy` - Scientific computing
- `scikit-image` - Image analysis

### C++ Dependencies
- `OpenCV 4.x` - Computer vision library
- `g++` - C++ compiler
- `make` - Build system

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_PATH=./database/water_quality.db
UPLOAD_DIR=./uploads
TEMP_DIR=./temp
```

### API Endpoints

#### POST /api/analyze-water
Upload and analyze water test strip image
- **Body**: FormData with image file
- **Response**: Water quality analysis results

#### GET /api/water-map
Get water quality map data
- **Query**: lat, lng, radius
- **Response**: Array of water quality points

#### GET /api/alerts
Get contamination alerts
- **Query**: lat, lng, radius, severity
- **Response**: Array of active alerts

#### GET /api/health
System health check
- **Response**: Service status information

## 🧪 Testing

### Test Python Analysis
```bash
cd python
python water_analysis.py ../test_images/sample.jpg tap_water
```

### Test C++ Processing
```bash
cd cpp
make test
```

### Test API Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Upload test image
curl -X POST -F "image=@test.jpg" -F "waterSource=Tap Water" \
  http://localhost:5000/api/analyze-water
```

## 🐳 Docker Setup (Optional)

### Build Docker Image
```bash
docker build -t aqua-lens-backend .
```

### Run Container
```bash
docker run -p 5000:5000 -v $(pwd)/database:/app/database aqua-lens-backend
```

## 🔍 Troubleshooting

### Common Issues

#### Python Dependencies
```bash
# If OpenCV installation fails
pip install opencv-python-headless

# For ARM-based systems (M1 Mac)
pip install opencv-python --no-binary opencv-python
```

#### C++ Compilation
```bash
# If OpenCV not found
export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH

# Alternative compilation
g++ -std=c++11 -o image_processor image_processor.cpp \
  -lopencv_core -lopencv_imgproc -lopencv_imgcodecs
```

#### Database Issues
```bash
# Reset database
rm database/water_quality.db
npm run init-db
```

## 📊 Performance Optimization

### Image Processing
- Images are automatically resized to 800x600 for faster processing
- JPEG quality set to 95% for optimal balance
- Temporary files cleaned up after 5 seconds

### Database Optimization
- Indexes on location, timestamp, and quality fields
- Automatic cleanup of old temporary data
- Connection pooling for concurrent requests

### Memory Management
- Sharp image processing with automatic memory cleanup
- Python process spawning with proper cleanup
- C++ RAII for resource management

## 🔒 Security Features

- File type validation for uploads
- File size limits (10MB max)
- Input sanitization
- Rate limiting
- CORS configuration
- Helmet security headers

## 📈 Monitoring

### Logs
- Server logs to console
- Error tracking with stack traces
- Performance metrics logging
- Database query logging

### Health Checks
- Service availability monitoring
- Database connection status
- Python/C++ component availability
- Memory and CPU usage tracking

## 🚀 Production Deployment

### Environment Setup
```bash
NODE_ENV=production
PORT=80
DATABASE_PATH=/data/water_quality.db
```

### Process Management
```bash
# Using PM2
npm install -g pm2
pm2 start server.js --name aqua-lens-backend

# Using systemd
sudo systemctl enable aqua-lens-backend
sudo systemctl start aqua-lens-backend
```

### Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📚 API Documentation

Full API documentation available at:
- Swagger UI: `http://localhost:5000/api-docs`
- OpenAPI spec: `http://localhost:5000/api/openapi.json`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

---

*For frontend-only usage, the system works completely without the backend using the self-contained JavaScript analysis engine.*