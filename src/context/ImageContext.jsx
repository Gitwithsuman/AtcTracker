import React, { createContext, useContext, useState } from 'react';

const ImageContext = createContext();

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};

export const ImageProvider = ({ children }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);

  const uploadImage = (imageFile) => {
    // Create a URL for the uploaded image
    const imageUrl = URL.createObjectURL(imageFile);
    setUploadedImage({
      file: imageFile,
      url: imageUrl,
      name: imageFile.name,
      uploadedAt: new Date()
    });
  };

  const clearImage = () => {
    if (uploadedImage?.url) {
      URL.revokeObjectURL(uploadedImage.url);
    }
    setUploadedImage(null);
    setAnalysisResults(null);
  };

  const value = {
    uploadedImage,
    analysisResults,
    uploadImage,
    clearImage,
    setAnalysisResults
  };

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  );
};