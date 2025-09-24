import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/ui/AppIcon';
import { useImageContext } from '../../context/ImageContext';

const ImageUploader = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { uploadImage } = useImageContext();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      uploadImage(file);
      // Simulate analysis processing
      setTimeout(() => {
        navigate('/results');
      }, 2000);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
          <Icon name="Upload" size={24} color="var(--color-primary)" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Upload Cattle Image
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Upload a clear image of your cattle for AI-powered analysis
        </p>
        
        <button
          onClick={handleUploadClick}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors duration-200"
        >
          <Icon name="Camera" size={20} />
          <span>Choose Image</span>
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <p className="text-xs text-muted-foreground mt-4">
          Supported formats: JPG, PNG, JPEG • Max size: 10MB
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;