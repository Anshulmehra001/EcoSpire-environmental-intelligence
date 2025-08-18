import React, { useState, useRef, useCallback } from 'react';
import './FileUpload.css';

const FileUpload = ({
  accept = '*/*',
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  onFileSelect,
  onError,
  disabled = false,
  className = '',
  children,
  variant = 'default',
  ...props
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const validateFile = useCallback((file) => {
    if (maxSize && file.size > maxSize) {
      return `File size must be less than ${formatFileSize(maxSize)}`;
    }
    return null;
  }, [maxSize]);

  const handleFiles = useCallback((fileList) => {
    const newFiles = Array.from(fileList);
    const validFiles = [];
    const errors = [];

    newFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push({ file: file.name, error });
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0 && onError) {
      onError(errors);
    }

    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);
      if (onFileSelect) {
        onFileSelect(multiple ? updatedFiles : validFiles[0]);
      }
    }
  }, [files, multiple, onFileSelect, onError, validateFile]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragActive(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  }, [disabled, handleFiles]);

  const handleFileInputChange = useCallback((e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles);
    }
  }, [handleFiles]);

  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  const removeFile = useCallback((index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onFileSelect) {
      onFileSelect(multiple ? updatedFiles : null);
    }
  }, [files, multiple, onFileSelect]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const baseClasses = 'terra-file-upload';
  const variantClasses = `terra-file-upload--${variant}`;
  const stateClasses = [
    isDragActive && 'terra-file-upload--drag-active',
    disabled && 'terra-file-upload--disabled',
    files.length > 0 && 'terra-file-upload--has-files'
  ].filter(Boolean).join(' ');

  const uploadClasses = [
    baseClasses,
    variantClasses,
    stateClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="terra-file-upload-wrapper">
      <div
        className={uploadClasses}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        {...props}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          disabled={disabled}
          className="terra-file-upload__input"
        />

        <div className="terra-file-upload__content">
          {children || (
            <>
              <div className="terra-file-upload__icon">
                {isDragActive ? '📤' : '📁'}
              </div>
              <div className="terra-file-upload__text">
                <p className="terra-file-upload__primary">
                  {isDragActive 
                    ? 'Drop files here' 
                    : 'Click to upload or drag and drop'
                  }
                </p>
                <p className="terra-file-upload__secondary">
                  {accept !== '*/*' && `Accepted formats: ${accept}`}
                  {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="terra-file-upload__files">
          <h4 className="terra-file-upload__files-title">
            Selected Files ({files.length})
          </h4>
          <div className="terra-file-upload__files-list">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="terra-file-upload__file">
                <div className="terra-file-upload__file-info">
                  <span className="terra-file-upload__file-name">{file.name}</span>
                  <span className="terra-file-upload__file-size">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <button
                  type="button"
                  className="terra-file-upload__file-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  aria-label={`Remove ${file.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;