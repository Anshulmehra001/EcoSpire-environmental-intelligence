// Image handling utilities for community posts and uploads
class ImageHandler {
  constructor() {
    this.maxFileSize = 5 * 1024 * 1024; // 5MB
    this.allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    this.storageKey = 'ecospire_images';
  }

  // Validate image file
  validateImage(file) {
    const errors = [];

    if (!file) {
      errors.push('No file selected');
      return { valid: false, errors };
    }

    if (file.size > this.maxFileSize) {
      errors.push(`File size must be less than ${this.maxFileSize / 1024 / 1024}MB`);
    }

    if (!this.allowedTypes.includes(file.type)) {
      errors.push('File type not supported. Please use JPEG, PNG, GIF, or WebP');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Convert file to base64 for storage
  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Compress image if needed
  async compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(resolve, file.type, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  // Process image for upload
  async processImage(file, options = {}) {
    const validation = this.validateImage(file);
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    const {
      compress = true,
      maxWidth = 800,
      quality = 0.8
    } = options;

    let processedFile = file;

    // Compress if requested and file is large
    if (compress && file.size > 500 * 1024) { // 500KB threshold
      processedFile = await this.compressImage(file, maxWidth, quality);
    }

    const base64 = await this.fileToBase64(processedFile);
    
    return {
      original: {
        name: file.name,
        size: file.size,
        type: file.type
      },
      processed: {
        name: processedFile.name || file.name,
        size: processedFile.size,
        type: processedFile.type,
        data: base64
      },
      preview: base64
    };
  }

  // Store image in localStorage (for demo purposes)
  storeImage(imageData, imageId) {
    try {
      const stored = this.getStoredImages();
      stored[imageId] = {
        ...imageData,
        timestamp: Date.now(),
        id: imageId
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(stored));
      return true;
    } catch (error) {
      console.error('Failed to store image:', error);
      return false;
    }
  }

  // Get stored images
  getStoredImages() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to retrieve stored images:', error);
      return {};
    }
  }

  // Get specific image
  getImage(imageId) {
    const stored = this.getStoredImages();
    return stored[imageId] || null;
  }

  // Delete image
  deleteImage(imageId) {
    try {
      const stored = this.getStoredImages();
      delete stored[imageId];
      localStorage.setItem(this.storageKey, JSON.stringify(stored));
      return true;
    } catch (error) {
      console.error('Failed to delete image:', error);
      return false;
    }
  }

  // Clean up old images (older than 30 days)
  cleanupOldImages() {
    try {
      const stored = this.getStoredImages();
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      
      let cleaned = 0;
      Object.keys(stored).forEach(imageId => {
        if (stored[imageId].timestamp < thirtyDaysAgo) {
          delete stored[imageId];
          cleaned++;
        }
      });

      if (cleaned > 0) {
        localStorage.setItem(this.storageKey, JSON.stringify(stored));
        console.log(`Cleaned up ${cleaned} old images`);
      }

      return cleaned;
    } catch (error) {
      console.error('Failed to cleanup old images:', error);
      return 0;
    }
  }

  // Get storage usage info
  getStorageInfo() {
    try {
      const stored = this.getStoredImages();
      const imageCount = Object.keys(stored).length;
      
      let totalSize = 0;
      Object.values(stored).forEach(image => {
        totalSize += image.processed?.size || 0;
      });

      const storageUsed = new Blob([localStorage.getItem(this.storageKey) || '']).size;

      return {
        imageCount,
        totalSize,
        storageUsed,
        formattedSize: this.formatFileSize(totalSize),
        formattedStorageUsed: this.formatFileSize(storageUsed)
      };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return {
        imageCount: 0,
        totalSize: 0,
        storageUsed: 0,
        formattedSize: '0 B',
        formattedStorageUsed: '0 B'
      };
    }
  }

  // Format file size for display
  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Generate placeholder images for demo
  generatePlaceholderImage(type = 'environmental', width = 400, height = 300) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    
    switch (type) {
      case 'water':
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#4682B4');
        break;
      case 'nature':
        gradient.addColorStop(0, '#98FB98');
        gradient.addColorStop(1, '#228B22');
        break;
      case 'air':
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#B0E0E6');
        break;
      default:
        gradient.addColorStop(0, '#90EE90');
        gradient.addColorStop(1, '#32CD32');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🌿 EcoSpire', width / 2, height / 2);
    ctx.font = '16px Arial';
    ctx.fillText('Environmental Image', width / 2, height / 2 + 30);

    return canvas.toDataURL('image/png');
  }
}

export const imageHandler = new ImageHandler();
export default imageHandler;