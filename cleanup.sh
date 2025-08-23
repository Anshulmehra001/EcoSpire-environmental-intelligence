#!/bin/bash

# EcoSpire Project Cleanup Script
# Removes redundant files and optimizes project structure

echo "🧹 Starting EcoSpire Project Cleanup..."

# Remove redundant documentation files
echo "📄 Removing redundant documentation..."
rm -f web/AQUA_LENS_README.md
rm -f web/COMPREHENSIVE_FEATURES_README.md
rm -f web/LAUNCH_GUIDE.md
rm -f web/README.md
rm -f tree_output.txt
rm -f web/tree_output.txt

# Remove development test files
echo "🧪 Removing development test files..."
rm -f web/syntax-test.js
rm -f web/test-classifier.js

# Clean up temporary directories (but keep the structure)
echo "🗂️ Cleaning temporary files..."
rm -rf web/backend/temp/*
rm -rf web/backend/uploads/*
rm -rf web/backend/results/*

# Create .gitkeep files to maintain directory structure
touch web/backend/temp/.gitkeep
touch web/backend/uploads/.gitkeep
touch web/backend/results/.gitkeep

# Optional: Remove build artifacts (uncomment if needed)
# echo "🏗️ Removing build artifacts..."
# rm -rf web/build/
# rm -rf web/node_modules/
# rm -rf web/backend/node_modules/

echo "✅ Cleanup completed!"
echo ""
echo "📋 Summary of changes:"
echo "  - Removed redundant documentation files"
echo "  - Removed development test files"
echo "  - Cleaned temporary directories"
echo "  - Maintained directory structure with .gitkeep files"
echo ""
echo "🚀 Your EcoSpire project is now optimized and ready!"
echo "📖 Main documentation is now in the root README.md file"