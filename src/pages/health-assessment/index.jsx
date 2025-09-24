import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import HealthMetricCard from './components/HealthMetricCard';
import BCSScoreCard from './components/BCSScoreCard';
import HealthSummaryCard from './components/HealthSummaryCard';
import HealthTrendsChart from './components/HealthTrendsChart';
import VeterinaryConsultationCard from './components/VeterinaryConsultationCard';
import Icon from '../../components/ui/AppIcon';
import Button from '../../components/ui/Button';

const HealthAssessment = () => {
  const [currentBCS, setCurrentBCS] = useState(3);
  const [selectedTrendMetrics, setSelectedTrendMetrics] = useState(['bcs', 'overall']);
  const [activeTab, setActiveTab] = useState('assessment');

  // Mock health assessment data
  const healthMetrics = [
    {
      metric: "Lameness Assessment",
      status: "healthy",
      value: "0/5",
      description: "Animal shows normal gait and movement patterns. No signs of limping, favoring limbs, or reluctance to move. Weight distribution appears even across all limbs.",
      recommendations: [
        "Continue regular hoof trimming schedule",
        "Monitor for any changes in movement patterns",
        "Maintain clean, dry housing conditions"
      ],
      icon: "Activity"
    },
    {
      metric: "Posture Analysis",
      status: "healthy",
      value: "Normal",
      description: "Proper body alignment observed. Head carriage is alert and natural. Back appears straight without arching or hunching. Standing posture is balanced and comfortable.",
      recommendations: [
        "Ensure adequate rest areas",
        "Monitor for any postural changes",
        "Provide comfortable bedding"
      ],
      icon: "User"
    },
    {
      metric: "Weight Assessment",
      status: "warning",
      value: "85%",
      description: "Animal appears slightly underweight compared to breed standards. Ribs are more prominent than ideal. May indicate nutritional deficiency or underlying health issues.",
      recommendations: [
        "Increase feed quality and quantity",
        "Consider nutritional supplements",
        "Schedule follow-up weight monitoring",
        "Consult nutritionist for feed plan"
      ],
      icon: "Scale"
    },
    {
      metric: "Skin Condition",
      status: "alert",
      value: "Concern",
      description: "Dry patches observed on several areas. Some minor lesions present on the neck region. Hair coat appears dull and lacks normal shine. Possible parasitic infestation or nutritional deficiency.",
      recommendations: [
        "Apply topical treatments as prescribed",
        "Implement parasite control program",
        "Improve nutritional supplementation",
        "Schedule veterinary examination immediately"
      ],
      icon: "Shield"
    }
  ];

  const healthSummaryData = {
    overallScore: 72,
    findings: [
      { metric: "Lameness", result: "No mobility issues detected", status: "healthy" },
      { metric: "Posture", result: "Normal alignment and stance", status: "healthy" },
      { metric: "Weight", result: "Slightly underweight (85%)", status: "warning" },
      { metric: "Skin", result: "Dry patches and lesions present", status: "alert" },
      { metric: "BCS", result: "Score 3/5 - Ideal condition", status: "healthy" },
      { metric: "Appetite", result: "Good feed intake observed", status: "healthy" }
    ],
    actionItems: [
      {
        priority: "high",
        action: "Immediate Skin Treatment",
        description: "Address skin lesions and implement parasite control program"
      },
      {
        priority: "high",
        action: "Nutritional Assessment",
        description: "Review and improve feed quality to address weight concerns"
      },
      {
        priority: "normal",
        action: "Regular Monitoring",
        description: "Schedule weekly weight and condition assessments"
      },
      {
        priority: "normal",
        action: "Preventive Care",
        description: "Maintain current hoof care and housing standards"
      }
    ]
  };

  const trendData = [
    { date: '15/09/24', bcs: 2.8, lameness: 0, overall: 68, weight: 82 },
    { date: '18/09/24', bcs: 2.9, lameness: 0, overall: 70, weight: 83 },
    { date: '21/09/24', bcs: 3.0, lameness: 0, overall: 72, weight: 85 },
    { date: '24/09/24', bcs: 3.0, lameness: 0, overall: 72, weight: 85 }
  ];

  const handleBCSUpdate = (newScore) => {
    setCurrentBCS(newScore);
  };

  const handleTrendMetricToggle = (metric) => {
    setSelectedTrendMetrics(prev => 
      prev?.includes(metric) 
        ? prev?.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const tabs = [
    { id: 'assessment', label: 'Health Assessment', icon: 'Heart' },
    { id: 'trends', label: 'Health Trends', icon: 'TrendingUp' },
    { id: 'consultation', label: 'Veterinary Care', icon: 'Stethoscope' }
  ];

  useEffect(() => {
    document.title = 'Health Assessment - ATCTacker';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <Icon name="Heart" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Health Assessment</h1>
                <p className="text-muted-foreground">
                  Comprehensive livestock health evaluation and monitoring
                </p>
              </div>
            </div>

            {/* Animal Info Bar */}
            <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Animal ID:</span> #AC-2024-001
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Breed:</span> Holstein Friesian
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Age:</span> 4 years
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Last Assessment:</span> 21/09/2024
                </div>
              </div>
              <Button variant="outline" iconName="Camera" iconPosition="left">
                New Assessment
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'assessment' && (
            <div className="space-y-8">
              {/* Health Metrics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {healthMetrics?.map((metric, index) => (
                  <HealthMetricCard
                    key={index}
                    metric={metric?.metric}
                    status={metric?.status}
                    value={metric?.value}
                    description={metric?.description}
                    recommendations={metric?.recommendations}
                    icon={metric?.icon}
                  />
                ))}
              </div>

              {/* BCS Score Card */}
              <BCSScoreCard 
                currentScore={currentBCS}
                onScoreUpdate={handleBCSUpdate}
              />

              {/* Health Summary */}
              <HealthSummaryCard
                overallScore={healthSummaryData?.overallScore}
                findings={healthSummaryData?.findings}
                actionItems={healthSummaryData?.actionItems}
                animalId="AC-2024-001"
              />
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-8">
              <HealthTrendsChart
                data={trendData}
                selectedMetrics={selectedTrendMetrics}
                onMetricToggle={handleTrendMetricToggle}
              />

              {/* Trend Analysis Summary */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                    <Icon name="BarChart3" size={20} color="var(--color-accent)" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Trend Analysis</h3>
                    <p className="text-sm text-muted-foreground">Key insights from health monitoring</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="TrendingUp" size={16} color="var(--color-success)" />
                      <span className="text-sm font-medium text-success">Improving</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      BCS and weight showing positive trend over the past week
                    </p>
                  </div>

                  <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Minus" size={16} color="var(--color-warning)" />
                      <span className="text-sm font-medium text-warning">Stable</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Overall health score maintaining consistent levels
                    </p>
                  </div>

                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Target" size={16} color="var(--color-primary)" />
                      <span className="text-sm font-medium text-primary">Target</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Continue current care plan to maintain positive trajectory
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'consultation' && (
            <div className="space-y-8">
              <VeterinaryConsultationCard
                animalId="AC-2024-001"
                healthScore={healthSummaryData?.overallScore}
              />

              {/* Recent Consultations */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                    <Icon name="History" size={20} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Consultation History</h3>
                    <p className="text-sm text-muted-foreground">Previous veterinary visits and treatments</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      date: '18/09/2024',
                      vet: 'Dr. Rajesh Kumar',
                      type: 'Routine Check-up',
                      status: 'Completed',
                      notes: 'General health assessment, vaccination updated'
                    },
                    {
                      date: '05/09/2024',
                      vet: 'Dr. Priya Sharma',
                      type: 'Follow-up Visit',
                      status: 'Completed',
                      notes: 'Skin condition treatment follow-up, improvement noted'
                    },
                    {
                      date: '28/08/2024',
                      vet: 'Dr. Amit Patel',
                      type: 'Urgent Consultation',
                      status: 'Completed',
                      notes: 'Addressed skin lesions, prescribed topical treatment'
                    }
                  ]?.map((consultation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="text-sm font-medium text-foreground">{consultation?.date}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{consultation?.vet}</span>
                        </div>
                        <div className="text-sm font-medium text-foreground mb-1">{consultation?.type}</div>
                        <div className="text-xs text-muted-foreground">{consultation?.notes}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                          {consultation?.status}
                        </span>
                        <Button variant="ghost" size="sm" iconName="FileText">
                          View Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HealthAssessment;