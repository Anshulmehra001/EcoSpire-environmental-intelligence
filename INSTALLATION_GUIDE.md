# 🚀 EcoSpire Installation & Setup Guide

## Prerequisites
- **Node.js 16+** and npm
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Git** for cloning the repository

## Quick Installation

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

## Verification Checklist

### ✅ Frontend Verification
- [ ] Dashboard loads with environmental data
- [ ] All 18 tools are accessible from navigation
- [ ] BioStreamAI can upload files from `sample_data/`
- [ ] EcoSonification plays audio
- [ ] UpcyclingAgent shows project ideas
- [ ] Responsive design works on mobile

### ✅ Backend Verification (Optional)
```bash
cd web/backend
npm install
node server.js
```
- [ ] Server starts on port 5000
- [ ] BioStreamAI backend integration works
- [ ] PhantomFootprint URL analysis works
- [ ] EWasteRecycling device analysis works

### ✅ Sample Data Testing
```bash
# Test with provided sample files
sample_data/
├── e_coli.fasta          # Upload to BioStreamAI
├── salmo_trutta.fasta    # Upload to BioStreamAI  
└── custom_database.fasta # Upload to BioStreamAI
```

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

## Demo Preparation

### For Hackathon Judges
1. **Start the application**: `npm start`
2. **Open multiple tabs** to show different tools
3. **Prepare sample files** for BioStreamAI demo
4. **Test audio** for EcoSonification
5. **Have backup plan** if internet connection fails

### Key Demo Points
- Show Dashboard with real-time data
- Demonstrate BioStreamAI with actual FASTA files
- Play EcoSonification audio
- Browse UpcyclingAgent project ideas
- Highlight mobile responsiveness

## Support
- Check console for error messages
- Verify all dependencies are installed
- Ensure browser supports modern JavaScript features
- Test on multiple browsers if issues occur