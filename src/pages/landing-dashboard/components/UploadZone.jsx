import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import { useImageContext } from '../../../context/ImageContext';

const UploadZone = ({ onFileUpload, onCameraCapture }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadImage } = useImageContext();

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    
    if (imageFiles?.length > 0) {
      setIsUploading(true);
      uploadImage(imageFiles?.[0]); // Store in context
      setTimeout(() => {
        onFileUpload(imageFiles?.[0]);
        setIsUploading(false);
      }, 1500);
    }
  }, [onFileUpload, uploadImage]);

  const handleFileSelect = useCallback((e) => {
    const file = e?.target?.files?.[0];
    if (file && file?.type?.startsWith('image/')) {
      setIsUploading(true);
      uploadImage(file); // Store in context
      setTimeout(() => {
        onFileUpload(file);
        setIsUploading(false);
      }, 1500);
    }
  }, [onFileUpload, uploadImage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 lg:p-12 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-primary bg-primary/5 scale-105' :'border-border hover:border-primary/50 bg-card'
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin">
              <Icon name="Loader2" size={48} color="var(--color-primary)" />
            </div>
            <p className="text-lg font-medium text-foreground">Processing image...</p>
            <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                animate={{ y: isDragOver ? -10 : 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-primary/10 rounded-full"
              >
                <Icon name="Upload" size={48} color="var(--color-primary)" />
              </motion.div>
              
              <div className="space-y-2">
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                  Upload Animal Image
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Drag and drop your cattle or buffalo image here, or click to browse files
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 bg-muted rounded">JPG</span>
                <span className="px-2 py-1 bg-muted rounded">PNG</span>
                <span className="px-2 py-1 bg-muted rounded">WEBP</span>
                <span className="px-2 py-1 bg-muted rounded">Max 10MB</span>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-center mt-6">
        <div className="flex items-center space-x-4">
          <div className="h-px bg-border flex-1" />
          <span className="text-sm text-muted-foreground font-medium">OR</span>
          <div className="h-px bg-border flex-1" />
        </div>
      </div>
      <div className="mt-6 text-center">
        <Button
          variant="outline"
          size="lg"
          iconName="Camera"
          iconPosition="left"
          onClick={onCameraCapture}
          className="w-full sm:w-auto"
        >
          Live Camera Capture
        </Button>
      </div>
    </motion.div>
  );
};

export default UploadZone;