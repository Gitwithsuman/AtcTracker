import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import UploadZone from './components/UploadZone';
import FeatureCard from './components/FeatureCard';
import QuickStatsPanel from './components/QuickStatsPanel';
import ActionButtons from './components/ActionButtons';
import RecentActivity from './components/RecentActivity';
import CameraCapture from '../../components/CameraCapture';

const LandingDashboard = () => {
  const navigate = useNavigate();
  const [userPlan] = useState('Basic'); // Mock user plan
  const [uploadsRemaining] = useState(12);
  const [recentClassifications] = useState(3);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleFileUpload = (file) => {
    console.log('File uploaded:', file?.name);
    // Simulate navigation to results after upload
    setTimeout(() => {
      navigate('/results');
    }, 500);
  };

  const handleCameraCapture = () => {
    setIsCameraOpen(true);
  };

  const handleCameraClose = () => {
    setIsCameraOpen(false);
  };

  const handleCameraPhotoCapture = (file) => {
    // Photo captured successfully, navigate to results
    setTimeout(() => {
      navigate('/results');
    }, 500);
  };

  const featureHighlights = [
    {
      icon: 'Target',
      title: 'ATC Scoring',
      description: 'Advanced Animal Type Classification with precise scoring algorithms for accurate breed identification and trait analysis.',
      color: 'bg-primary',
      delay: 0.1
    },
    {
      icon: 'Heart',
      title: 'Health Assessment',
      description: 'Comprehensive health monitoring including BCS evaluation, lameness detection, and posture analysis.',
      color: 'bg-error',
      delay: 0.2
    },
    {
      icon: 'RefreshCw',
      title: 'BPA Integration',
      description: 'Seamless synchronization with Bharat Pashudhan App for government livestock database management.',
      color: 'bg-secondary',
      delay: 0.3
    },
    {
      icon: 'BarChart3',
      title: 'Data Analytics',
      description: 'Interactive charts and detailed reports with export capabilities for comprehensive livestock insights.',
      color: 'bg-accent',
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
                AI-Powered Animal Classification
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Upload your cattle or buffalo images for instant breed identification, health assessment, and comprehensive trait analysis with government integration.
              </p>
            </motion.div>

            <UploadZone 
              onFileUpload={handleFileUpload}
              onCameraCapture={handleCameraCapture}
            />
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Powerful Features for Livestock Management
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools designed for modern farmers and livestock professionals
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {featureHighlights?.map((feature, index) => (
                <FeatureCard
                  key={feature?.title}
                  icon={feature?.icon}
                  title={feature?.title}
                  description={feature?.description}
                  color={feature?.color}
                  delay={feature?.delay}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Stats and Actions */}
              <div className="lg:col-span-2 space-y-8">
                <QuickStatsPanel
                  userPlan={userPlan}
                  uploadsRemaining={uploadsRemaining}
                  recentClassifications={recentClassifications}
                />
                
                <ActionButtons userPlan={userPlan} />
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-1">
                <RecentActivity />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center bg-card border border-border rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Livestock Management?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of farmers using ATCTacker for accurate breed identification, health monitoring, and seamless government integration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/results')}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Start Free Classification
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/plans')}
                  className="px-8 py-4 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  View Pricing Plans
                </motion.button>
              </div>

              <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>99.5% Accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Government Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} ATCTacker. All rights reserved.</p>
            <p className="mt-2">Empowering farmers with AI-driven livestock intelligence.</p>
          </div>
        </div>
      </footer>

      {/* Camera Capture Modal */}
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={handleCameraClose}
        onCapture={handleCameraPhotoCapture}
      />
    </div>
  );
};

export default LandingDashboard;