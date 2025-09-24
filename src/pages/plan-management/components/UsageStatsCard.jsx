import React from 'react';
import Icon from '../../../components/ui/AppIcon';

const UsageStatsCard = ({ usageStats, currentPlan }) => {
  const isBasic = currentPlan?.tier === 'Basic';
  
  const statsData = [
    {
      label: 'Total Classifications',
      value: usageStats?.totalClassifications,
      icon: 'Target',
      color: 'var(--color-primary)'
    },
    {
      label: 'Health Assessments',
      value: usageStats?.healthAssessments,
      icon: 'Heart',
      color: 'var(--color-error)'
    },
    {
      label: 'BPA Syncs',
      value: usageStats?.bpaSyncs,
      icon: 'RefreshCw',
      color: 'var(--color-accent)'
    },
    {
      label: 'Reports Generated',
      value: usageStats?.reportsGenerated,
      icon: 'FileText',
      color: 'var(--color-success)'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BarChart3" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Usage Statistics
        </h3>
      </div>
      {/* Monthly Upload Progress */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body font-medium text-foreground">
            Monthly Uploads
          </span>
          <span className="text-sm font-body text-muted-foreground">
            {usageStats?.uploadsUsed}/{isBasic ? currentPlan?.uploadLimit : '∞'}
          </span>
        </div>
        {isBasic && (
          <>
            <div className="w-full bg-background rounded-full h-3 mb-2">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  usageStats?.uploadsUsed >= currentPlan?.uploadLimit * 0.9 
                    ? 'bg-error' 
                    : usageStats?.uploadsUsed >= currentPlan?.uploadLimit * 0.7 
                    ? 'bg-warning' :'bg-success'
                }`}
                style={{ 
                  width: `${Math.min((usageStats?.uploadsUsed / currentPlan?.uploadLimit) * 100, 100)}%` 
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>{currentPlan?.uploadLimit}</span>
            </div>
          </>
        )}
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {statsData?.map((stat, index) => (
          <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Icon name={stat?.icon} size={20} color={stat?.color} />
            </div>
            <div className="text-xl font-heading font-bold text-foreground mb-1">
              {stat?.value?.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Usage Insights */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-body font-medium text-foreground mb-3">
          This Month's Activity
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average per day</span>
            <span className="font-body font-medium text-foreground">
              {Math.round(usageStats?.uploadsUsed / 24)} uploads
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Most active day</span>
            <span className="font-body font-medium text-foreground">
              {usageStats?.mostActiveDay}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Success rate</span>
            <span className="font-body font-medium text-success">
              {usageStats?.successRate}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageStatsCard;