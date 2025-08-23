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









# 🌿 EcoSpire Backend Setup Guide

## Overview

The EcoSpire backend is a high-performance, multi-language system designed to power a suite of environmental intelligence tools. It uses a Node.js coordinator to manage specialized Python and C++ services for maximum accuracy.

## 🏗️ Architecture

-   **Node.js** - Main API server and request coordination.
-   **Python** - AI-powered analysis for computer vision (AquaLens), audio (BiodiversityEar), and bioinformatics (Bio-Stream AI).
-   **C++** - High-performance image preprocessing for AquaLens.
-   **SQLite** - Lightweight and comprehensive data storage.
-   **NCBI BLAST+** - Scientific engine for DNA sequence analysis.

## 🚀 Quick Setup

### 1. Install Node.js Dependencies
```bash
cd web/backend
npm install
2. Setup Python Environment
code
Bash
# It is highly recommended to use a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install all Python dependencies
pip install -r python/requirements.txt
3. Install Scientific Toolkit (for Bio-Stream AI)
The Bio-Stream AI tool requires the NCBI BLAST+ command-line toolkit for its analysis engine.
Download: Get the installer from the official NCBI BLAST website.
Install: Run the installer. Crucially, during setup, you must check the box to "Add BLAST to the system PATH". This allows the backend to find and use the tool.
Verify: After installation, open a new terminal and run makeblastdb -version. You should see a version number printed.
4. Build Bio-Stream AI Database
Bio-Stream AI uses a custom DNA database. To build it, run the following commands from the web/backend/ directory:
code
Bash
# Navigate to the database source directory
cd python/blast_db

# (On Windows) Combine the sample DNA files
copy *.fasta custom_database.fasta
# (On Mac/Linux)
cat *.fasta > custom_database.fasta

# Build the database
makeblastdb -in "custom_database.fasta" -dbtype nucl -out "biostream_db"
Note: If makeblastdb fails due to a space in your project path, please use the "temporary folder" method documented in the BioStreamAI-README.md.
5. Build C++ Components (Optional for AquaLens)
code
Bash
# For detailed instructions, see the "Troubleshooting" section below.
cd cpp
make
6. Initialize Database
This creates the water_quality.db file for AquaLens data.
code
Bash
npm run init-db
7. Start the Server
code
Bash
# For development with live reloading
npm run dev

# For production
npm start```

## 📋 Dependencies

### Node.js Packages
-   `express` - Web server framework
-   `multer` - File upload handling
-   `sqlite3` - Database interface
-   `sharp` - Image processing
-   `cors` - Cross-origin requests
-   `uuid` - Unique ID generation

### Python Packages
-   `opencv-python` - Computer vision
-   `Pillow` - Image processing
-   `numpy` - Numerical computing
-   `scipy` - Scientific computing
-   `scikit-image` - Image analysis
-   `librosa` - Audio analysis
-   `biopython` - Toolkit for bioinformatics

### C++ Dependencies
-   `OpenCV 4.x` - Computer vision library
-   `g++` / `make` - Build tools

## 🔧 Configuration

Create a `.env` file in the `web/backend` directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_PATH=./database/water_quality.db
UPLOAD_DIR=./uploads
TEMP_DIR=./temp
📡 API Endpoints
POST /api/analyze-water
Tool: AquaLens
Body: FormData with image file
Response: Water quality analysis results
POST /api/analyze-audio
Tool: BiodiversityEar
Body: FormData with audioFile
Response: Acoustic biodiversity analysis report
POST /api/analyze-dna
Tool: Bio-Stream AI
Body: FormData with dnaFile
Response: A full ecosystem health and species identification report.
GET /api/water-map
Tool: AquaLens
Query: lat, lng, radius
Response: Array of water quality data points for mapping