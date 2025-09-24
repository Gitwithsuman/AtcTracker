import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import CurrentPlanCard from './components/CurrentPlanCard';
import PlanComparisonCard from './components/PlanComparisonCard';
import UsageStatsCard from './components/UsageStatsCard';
import PaymentModal from './components/PaymentModal';
import BillingHistoryTable from './components/BillingHistoryTable';
import Icon from '../../components/ui/AppIcon';
import Button from '../../components/ui/Button';

const PlanManagement = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock current plan data
  const currentPlan = {
    tier: 'Basic',
    price: 0,
    billingCycle: 'month',
    uploadLimit: 50,
    nextBillingDate: '25/10/2024'
  };

  // Mock usage statistics
  const usageStats = {
    uploadsUsed: 38,
    classificationsUsed: 42,
    totalClassifications: 156,
    healthAssessments: 89,
    bpaSyncs: 23,
    reportsGenerated: 67,
    mostActiveDay: 'Tuesday',
    successRate: 94
  };

  // Mock available plans
  const availablePlans = [
    {
      tier: 'Basic',
      price: 0,
      billingCycle: 'month',
      description: 'Perfect for getting started with animal classification',
      uploadLimit: 50
    },
    {
      tier: 'Premium',
      price: 2999,
      billingCycle: 'month',
      description: 'Complete solution for professional livestock management',
      uploadLimit: null
    }
  ];

  // Mock billing history
  const billingHistory = [
    {
      date: '15/09/2024',
      time: '14:30 IST',
      plan: 'Premium',
      billingCycle: 'Monthly',
      amount: 2999,
      paymentMethod: 'UPI',
      status: 'Paid'
    },
    {
      date: '15/08/2024',
      time: '09:15 IST',
      plan: 'Premium',
      billingCycle: 'Monthly',
      amount: 2999,
      paymentMethod: 'Card',
      status: 'Paid'
    },
    {
      date: '15/07/2024',
      time: '16:45 IST',
      plan: 'Basic',
      billingCycle: 'Monthly',
      amount: 0,
      paymentMethod: 'Free',
      status: 'Paid'
    }
  ];

  const handleUpgrade = () => {
    const premiumPlan = availablePlans?.find(plan => plan?.tier === 'Premium');
    setSelectedPlan(premiumPlan);
    setShowPaymentModal(true);
  };

  const handleSelectPlan = (plan) => {
    if (plan?.tier !== currentPlan?.tier) {
      setSelectedPlan(plan);
      if (plan?.price > 0) {
        setShowPaymentModal(true);
      }
    }
  };

  const handlePaymentSuccess = () => {
    // Handle successful payment
    console.log('Payment successful for plan:', selectedPlan?.tier);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <Icon name="CreditCard" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                  Plan Management
                </h1>
                <p className="text-muted-foreground font-body">
                  Manage your subscription and view usage statistics
                </p>
              </div>
            </div>
          </div>

          {/* Current Plan & Usage Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CurrentPlanCard 
              currentPlan={currentPlan}
              usageStats={usageStats}
              onUpgrade={handleUpgrade}
            />
            <UsageStatsCard 
              usageStats={usageStats}
              currentPlan={currentPlan}
            />
          </div>

          {/* Plan Comparison Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Choose Your Plan
                </h2>
                <p className="text-sm text-muted-foreground">
                  Compare features and select the plan that best fits your needs
                </p>
              </div>
              
              {/* Plan Benefits Highlight */}
              <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={16} color="var(--color-success)" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="RefreshCw" size={16} color="var(--color-primary)" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {availablePlans?.map((plan, index) => (
                <PlanComparisonCard
                  key={index}
                  plan={plan}
                  isCurrentPlan={plan?.tier === currentPlan?.tier}
                  isPopular={plan?.tier === 'Premium'}
                  onSelectPlan={handleSelectPlan}
                />
              ))}
            </div>
          </div>

          {/* Premium Benefits Highlight */}
          <div className="mb-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg flex-shrink-0">
                <Icon name="Crown" size={24} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  Why Upgrade to Premium?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Infinity" size={16} color="var(--color-primary)" />
                    <span>Unlimited monthly uploads</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Brain" size={16} color="var(--color-primary)" />
                    <span>Advanced AI analytics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Headphones" size={16} color="var(--color-primary)" />
                    <span>Priority customer support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Download" size={16} color="var(--color-primary)" />
                    <span>Multiple export formats</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button 
                    variant="default" 
                    iconName="ArrowRight" 
                    iconPosition="right"
                    onClick={handleUpgrade}
                  >
                    Upgrade Now - Save 20%
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <BillingHistoryTable billingHistory={billingHistory} />

          {/* Help Section */}
          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-4">
              <Icon name="HelpCircle" size={24} color="var(--color-primary)" />
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  Need Help?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about plans or billing? Our support team is here to help.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" iconName="Mail" iconPosition="left">
                    Email Support
                  </Button>
                  <Button variant="outline" size="sm" iconName="Phone" iconPosition="left">
                    Call Support
                  </Button>
                  <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedPlan={selectedPlan}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default PlanManagement;