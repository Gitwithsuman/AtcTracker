import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import Icon from './ui/AppIcon';
import { useImageContext } from '../context/ImageContext';

const CameraCapture = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const { uploadImage } = useImageContext();

  // Get available camera devices
  const getDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices.length > 0 && !selectedDevice) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error('Error getting devices:', err);
    }
  }, [selectedDevice]);

  // Start camera stream
  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Stop existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          deviceId: selectedDevice ? { ideal: selectedDevice } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: devices.length > 1 ? 'environment' : 'user' // Back camera preferred for cattle
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsLoading(false);
        };
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError(getErrorMessage(err));
      setIsLoading(false);
    }
  }, [selectedDevice, devices]);

  // Get user-friendly error message
  const getErrorMessage = (error) => {
    if (error.name === 'NotAllowedError') {
      return 'Camera access denied. Please allow camera permissions and try again.';
    } else if (error.name === 'NotFoundError') {
      return 'No camera found. Please connect a camera and try again.';
    } else if (error.name === 'NotSupportedError') {
      return 'Camera not supported by this browser. Please try a different browser.';
    } else {
      return 'Unable to access camera. Please check your camera connection and permissions.';
    }
  };

  // Capture photo from video stream
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob and create file
    canvas.toBlob((blob) => {
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);

        // Create a File object for consistency with file uploads
        const file = new File([blob], `cattle-capture-${Date.now()}.jpg`, {
          type: 'image/jpeg'
        });

        // Upload to context
        uploadImage(file);
        
        setTimeout(() => {
          setIsCapturing(false);
          if (onCapture) {
            onCapture(file);
          }
        }, 800);
      }
    }, 'image/jpeg', 0.9);
  }, [uploadImage, onCapture]);

  // Retake photo
  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    if (streamRef.current) {
      startCamera();
    }
  }, [startCamera]);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Handle device change
  const handleDeviceChange = useCallback((deviceId) => {
    setSelectedDevice(deviceId);
  }, []);

  // Initialize camera when modal opens
  useEffect(() => {
    if (isOpen) {
      getDevices().then(() => {
        startCamera();
      });
    } else {
      stopCamera();
      setCapturedImage(null);
      setError(null);
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, getDevices, startCamera, stopCamera]);

  // Update camera when device changes
  useEffect(() => {
    if (isOpen && selectedDevice) {
      startCamera();
    }
  }, [selectedDevice, isOpen, startCamera]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card rounded-2xl border shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Icon name="Camera" size={24} color="var(--color-primary)" />
              <h2 className="text-xl font-semibold text-foreground">Live Camera Capture</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>

          {/* Camera View */}
          <div className="p-6">
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6">
              {/* Loading State */}
              {isLoading && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center text-white">
                    <div className="animate-spin mb-4">
                      <Icon name="Loader2" size={48} />
                    </div>
                    <p className="text-lg">Starting camera...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/90">
                  <div className="text-center text-white max-w-md px-4">
                    <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-red-400" />
                    <h3 className="text-lg font-semibold mb-2">Camera Error</h3>
                    <p className="text-sm text-gray-300 mb-4">{error}</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setError(null);
                        startCamera();
                      }}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {/* Captured Image Preview */}
              {capturedImage && (
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={capturedImage}
                  alt="Captured cattle"
                  className="w-full h-full object-cover"
                />
              )}

              {/* Live Video Feed */}
              {!capturedImage && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}

              {/* Capture Animation */}
              {isCapturing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-white"
                />
              )}
            </div>

            {/* Device Selection */}
            {devices.length > 1 && !capturedImage && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Camera Device:
                </label>
                <select
                  value={selectedDevice}
                  onChange={(e) => handleDeviceChange(e.target.value)}
                  className="w-full max-w-xs px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {devices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Camera ${devices.indexOf(device) + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              {!capturedImage ? (
                <Button
                  size="lg"
                  iconName="Camera"
                  onClick={capturePhoto}
                  disabled={isLoading || error}
                  className="px-8"
                >
                  Capture Photo
                </Button>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="RotateCcw"
                    onClick={retakePhoto}
                  >
                    Retake
                  </Button>
                  <Button
                    size="lg"
                    iconName="Check"
                    onClick={onClose}
                    className="px-8"
                  >
                    Use Photo
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CameraCapture;