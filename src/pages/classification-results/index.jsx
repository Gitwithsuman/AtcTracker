import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import { useImageContext } from '../../context/ImageContext';
import ATCScoreCard from './components/ATCScoreCard';
import TraitAnalysisCard from './components/TraitAnalysisCard';
import BreedCompositionChart from './components/BreedCompositionChart';
import TraitComparisonChart from './components/TraitComparisonChart';
import AnimalImageAnalysis from './components/AnimalImageAnalysis';
import ExportControls from './components/ExportControls';
import ActionButtons from './components/ActionButtons';

const ClassificationResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { uploadedImage } = useImageContext();

  useEffect(() => {
    // Simulate loading delay - longer if we have a new uploaded image
    const loadingTime = uploadedImage ? 2500 : 1500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [uploadedImage]);

  // Mock ATC scores data
  const atcScores = [
    {
      category: "Overall Classification",
      score: 87,
      maxScore: 100,
      description: "Primary breed identification",
      status: "Excellent"
    },
    {
      category: "Conformation Score",
      score: 74,
      maxScore: 100,
      description: "Physical structure assessment",
      status: "Good"
    },
    {
      category: "Genetic Purity",
      score: 92,
      maxScore: 100,
      description: "Breed authenticity measure",
      status: "Excellent"
    }
  ];

  // Updated trait analysis data - Only the measurements specified by user
  const traitData = [
    {
      trait: "Body Length",
      value: 165,
      unit: "cm",
      benchmark: 160,
      status: "Good",
      icon: "Ruler"
    },
    {
      trait: "Chest Width",
      value: 68,
      unit: "cm",
      benchmark: 65,
      status: "Excellent",
      icon: "Maximize2"
    },
    {
      trait: "Rump Angle",
      value: 28,
      unit: "°",
      benchmark: 30,
      status: "Good",
      icon: "Triangle"
    },
    {
      trait: "Height at Withers",
      value: 142,
      unit: "cm",
      benchmark: 145,
      status: "Average",
      icon: "ArrowUp"
    },
    {
      trait: "Face Length",
      value: 28,
      unit: "cm",
      benchmark: 27,
      status: "Good",
      icon: "User"
    },
    {
      trait: "Neck Length",
      value: 42,
      unit: "cm",
      benchmark: 40,
      status: "Excellent",
      icon: "ArrowUpRight"
    },
    {
      trait: "Hip Height",
      value: 144,
      unit: "cm",
      benchmark: 146,
      status: "Average",
      icon: "Triangle"
    },
    {
      trait: "Horn Shape",
      value: "Curved Forward",
      unit: "",
      benchmark: "Standard Curve",
      status: "Good",
      icon: "Moon"
    },
    {
      trait: "Size of Cattle/Buffalo",
      value: "Large",
      unit: "",
      benchmark: "Medium-Large",
      status: "Excellent",
      icon: "Maximize"
    }
  ];

  // Mock breed composition data - Updated for cattle/buffalo breeds
  const breedComposition = [
    { name: "Holstein Friesian", value: 35 },
    { name: "Jersey", value: 20 },
    { name: "Gir", value: 18 },
    { name: "Sahiwal", value: 15 },
    { name: "Murrah Buffalo", value: 8 },
    { name: "Other", value: 4 }
  ];

  // Mock trait comparison data - Updated with user specified measurements
  const traitComparison = [
    { name: "Body Length", measured: 165, benchmark: 160, unit: "cm" },
    { name: "Height at Withers", measured: 142, benchmark: 145, unit: "cm" },
    { name: "Chest Width", measured: 68, benchmark: 65, unit: "cm" },
    { name: "Rump Angle", measured: 28, benchmark: 30, unit: "°" },
    { name: "Face Length", measured: 28, benchmark: 27, unit: "cm" },
    { name: "Neck Length", measured: 42, benchmark: 40, unit: "cm" },
    { name: "Hip Height", measured: 144, benchmark: 146, unit: "cm" }
  ];

  const handleExport = (type) => {
    console.log(`Exporting data as ${type}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                Processing Classification Results
              </h2>
              <p className="text-muted-foreground">
                Analyzing cattle and buffalo data and generating comprehensive report...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Cattle & Buffalo Classification Results
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive livestock analysis completed on {new Date()?.toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
                  Analysis Complete
                </div>
              </div>
            </div>
          </motion.div>

          {/* ATC Scores Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
              ATC Scoring Results for Cattle & Buffalo
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {atcScores?.map((score, index) => (
                <ATCScoreCard key={index} {...score} />
              ))}
            </div>
          </motion.section>

          {/* Trait Analysis Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
              Detailed Livestock Trait Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {traitData?.map((trait, index) => (
                <TraitAnalysisCard key={index} {...trait} />
              ))}
            </div>
          </motion.section>

          {/* Data Visualization Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
              Cattle & Buffalo Data Visualization
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <BreedCompositionChart data={breedComposition} />
              <TraitComparisonChart data={traitComparison} />
            </div>
          </motion.section>

          {/* Image Analysis Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Cattle & Buffalo Image Analysis
              </h2>
              {uploadedImage && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Your Upload</span>
                </div>
              )}
            </div>
            <AnimalImageAnalysis 
              imageUrl={uploadedImage?.url || "/assets/images/OIP.jpeg"}
              imageName={uploadedImage?.name || "Sample Cattle"}
              measurements={traitData}
            />
          </motion.section>

          {/* Export and Actions Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExportControls onExport={handleExport} />
              <ActionButtons />
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default ClassificationResults;