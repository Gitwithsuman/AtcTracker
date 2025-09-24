import React from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

const CurrentPlanCard = ({ currentPlan, usageStats, onUpgrade }) => {
  const isBasic = currentPlan?.tier === 'Basic';
  
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={isBasic ? "Zap" : "Crown"} 
              size={20} 
              color={isBasic ? "var(--color-warning)" : "var(--color-primary)"} 
            />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {currentPlan?.tier} Plan
            </h3>
            <span className={`px-2 py-1 text-xs font-caption rounded-full ${
              isBasic 
                ? 'bg-warning/10 text-warning' :'bg-primary/10 text-primary'
            }`}>
              Active
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {isBasic ? 'Perfect for getting started' : 'Full access to all features'}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-heading font-bold text-foreground">
            {currentPlan?.price === 0 ? 'Free' : `₹${currentPlan?.price?.toLocaleString('en-IN')}`}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentPlan?.price === 0 ? 'Forever' : `/${currentPlan?.billingCycle}`}
          </div>
        </div>
      </div>
      {/* Usage Statistics */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body text-muted-foreground">
              Monthly Uploads
            </span>
            <span className="text-sm font-body font-medium text-foreground">
              {usageStats?.uploadsUsed}/{isBasic ? currentPlan?.uploadLimit : '∞'}
            </span>
          </div>
          {isBasic && (
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  usageStats?.uploadsUsed >= currentPlan?.uploadLimit * 0.8 
                    ? 'bg-error' 
                    : usageStats?.uploadsUsed >= currentPlan?.uploadLimit * 0.6 
                    ? 'bg-warning' :'bg-success'
                }`}
                style={{ 
                  width: `${Math.min((usageStats?.uploadsUsed / currentPlan?.uploadLimit) * 100, 100)}%` 
                }}
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body text-muted-foreground">
              Classifications This Month
            </span>
            <span className="text-sm font-body font-medium text-foreground">
              {usageStats?.classificationsUsed}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-body text-muted-foreground">
              Next Billing Date
            </span>
            <span className="text-sm font-body font-medium text-foreground">
              {currentPlan?.nextBillingDate}
            </span>
          </div>
        </div>
      </div>
      {/* Upgrade Button for Basic Users */}
      {isBasic && (
        <div className="pt-4 border-t border-border">
          <Button 
            variant="default" 
            fullWidth 
            iconName="ArrowUp" 
            iconPosition="right"
            onClick={onUpgrade}
          >
            Upgrade to Premium
          </Button>
        </div>
      )}
    </div>
  );
};

export default CurrentPlanCard;