# 🚀 EcoSpire Installation & Setup Guide

## Prerequisites
- **Node.js 16+** and npm
- **Python 3.8+** with pip (for backend features)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Git** for cloning the repository

## 🎯 Quick Installation (Frontend Only)

### 1. Clone Repository
```bash
git clone [your-repository-url]
cd ecospire
```

### 2. Install Dependencies
```bash
cd web
npm install
```

### 3. Start Application
```bash
npm start
```

### 4. Open Browser
Navigate to `http://localhost:3000`

## 🔧 Full Installation (Frontend + Backend)

### Frontend Setup
```bash
# 1. Clone and install frontend
git clone [your-repository-url]
cd ecospire/web
npm install

# 2. Start frontend (Terminal 1)
npm start
# Frontend runs on http://localhost:3000
```

### Backend Setup
```bash
# 3. Install backend dependencies (Terminal 2)
cd web/backend
npm install

# 4. Setup Python environment (recommended)
python -m venv venv

# Activate virtual environment:
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 5. Install Python dependencies
pip install -r python/requirements.txt

# 6. Initialize database
npm run init-db

# 7. Start backend server
npm start
# Backend runs on http://localhost:5000
```

### Backend Features Enabled
- **🧬 BioStreamAI**: Real DNA sequence analysis with FASTA files
- **👻 PhantomFootprint**: Product URL environmental impact analysis
- **♻️ EWasteRecycling**: Electronic device valuation and recycling
- **💧 AquaLens**: Enhanced water quality analysis with Python AI
- **🎧 BiodiversityEar**: Advanced audio processing for species identification

## 🧪 Testing Your Installation

### ✅ Frontend Verification
- [ ] Dashboard loads with environmental data and global stats
- [ ] All 17 tools are accessible from navigation menu
- [ ] EcoSonification plays environmental soundscapes
- [ ] UpcyclingAgent shows 50+ project ideas
- [ ] EcoTasks displays environmental challenges
- [ ] Community features work (posting, liking, commenting)

### ✅ Backend Verification (If Installed)
```bash
# Test backend health
curl http://localhost:5000/api/health
# Should return: {"status":"healthy","service":"EcoSpire Environmental Analysis API"}
```

**Backend Integration Tests:**
- [ ] **BioStreamAI**: Upload DNA files from `sample_data/` folder
- [ ] **PhantomFootprint**: Analyze product URLs (try Amazon/eBay links)
- [ ] **EWasteRecycling**: Get device valuations for phones/laptops
- [ ] **AquaLens**: Enhanced water analysis with Python processing
- [ ] **BiodiversityEar**: Advanced audio species identification

### ✅ Sample Data Testing
```bash
# Test with provided sample files in sample_data/
sample_data/
├── e_coli.fasta          # Bacterial contamination analysis
├── salmo_trutta.fasta    # Fish species identification  
└── custom_database.fasta # Custom genomic analysis

# Upload these files to BioStreamAI tool
# Backend will process them with real BLAST analysis
```

### ✅ Environmental Impact Tracking
- [ ] Complete water tests in AquaLens → Check Dashboard stats
- [ ] Complete biodiversity scans → Check Dashboard stats  
- [ ] Complete EcoTasks → Check Dashboard stats
- [ ] View Profile page → Check achievements and activity timeline

## Troubleshooting

### Common Issues
1. **Port 3000 already in use**
   ```bash
   npx kill-port 3000
   npm start
   ```

2. **Node modules issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Backend connection errors**
   - Ensure backend server is running on port 5000
   - Check firewall settings
   - Verify CORS configuration

### Performance Optimization
- Use Chrome DevTools to monitor performance
- Check Network tab for API calls
- Monitor Console for any errors

## Support
- Check console for error messages
- Verify all dependencies are installed
- Ensure browser supports modern JavaScript features
- Test on multiple browsers if issues occur