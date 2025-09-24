import React from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

const PlanComparisonCard = ({ plan, isCurrentPlan, isPopular, onSelectPlan }) => {
  const features = [
    {
      name: 'Monthly Uploads',
      basic: '50 uploads',
      premium: 'Unlimited uploads',
      icon: 'Upload'
    },
    {
      name: 'Animal Classification',
      basic: 'Basic ATC scoring',
      premium: 'Advanced ATC + detailed traits',
      icon: 'Target'
    },
    {
      name: 'Health Assessment',
      basic: 'Basic health indicators',
      premium: 'Comprehensive health analytics',
      icon: 'Heart'
    },
    {
      name: 'Data Export',
      basic: 'PDF reports only',
      premium: 'PDF + CSV + Excel exports',
      icon: 'Download'
    },
    {
      name: 'BPA Integration',
      basic: 'Manual sync only',
      premium: 'Auto-sync + priority processing',
      icon: 'RefreshCw'
    },
    {
      name: 'Support',
      basic: 'Email support',
      premium: 'Priority phone + email support',
      icon: 'Headphones'
    },
    {
      name: 'Analytics Dashboard',
      basic: 'Basic charts',
      premium: 'Advanced analytics + insights',
      icon: 'BarChart3'
    },
    {
      name: 'History Storage',
      basic: '3 months',
      premium: 'Unlimited history',
      icon: 'Clock'
    }
  ];

  return (
    <div className={`relative bg-card rounded-lg border-2 p-6 transition-all duration-200 ${
      isPopular 
        ? 'border-primary shadow-lg scale-105' 
        : isCurrentPlan 
        ? 'border-success shadow-md' 
        : 'border-border shadow-sm hover:shadow-md hover:border-primary/50'
    }`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-caption font-semibold">
            Most Popular
          </div>
        </div>
      )}
      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="absolute -top-3 right-4">
          <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-caption font-semibold flex items-center space-x-1">
            <Icon name="Check" size={12} />
            <span>Current</span>
          </div>
        </div>
      )}
      {/* Plan Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <Icon 
            name={plan?.tier === 'Basic' ? 'Zap' : 'Crown'} 
            size={24} 
            color={plan?.tier === 'Basic' ? 'var(--color-warning)' : 'var(--color-primary)'} 
          />
        </div>
        <h3 className="text-xl font-heading font-bold text-foreground mb-1">
          {plan?.tier}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {plan?.description}
        </p>
        <div className="mb-4">
          <div className="text-3xl font-heading font-bold text-foreground">
            {plan?.price === 0 ? 'Free' : `₹${plan?.price?.toLocaleString('en-IN')}`}
          </div>
          <div className="text-sm text-muted-foreground">
            {plan?.price === 0 ? 'Forever' : `/${plan?.billingCycle}`}
          </div>
        </div>
      </div>
      {/* Features List */}
      <div className="space-y-3 mb-6">
        {features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <Icon 
                name={feature?.icon} 
                size={16} 
                color="var(--color-primary)" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-body font-medium text-foreground">
                {feature?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {plan?.tier === 'Basic' ? feature?.basic : feature?.premium}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Action Button */}
      <div className="pt-4 border-t border-border">
        {isCurrentPlan ? (
          <Button variant="outline" fullWidth disabled>
            Current Plan
          </Button>
        ) : (
          <Button 
            variant={plan?.tier === 'Premium' ? 'default' : 'outline'} 
            fullWidth
            onClick={() => onSelectPlan(plan)}
          >
            {plan?.tier === 'Premium' ? 'Upgrade Now' : 'Downgrade'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PlanComparisonCard;