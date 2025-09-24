import React from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

const HealthSummaryCard = ({ overallScore, findings, actionItems, animalId }) => {
  const getOverallStatus = (score) => {
    if (score >= 85) return { status: 'Excellent', color: 'text-success', bgColor: 'bg-success/10' };
    if (score >= 70) return { status: 'Good', color: 'text-success', bgColor: 'bg-success/10' };
    if (score >= 50) return { status: 'Fair', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { status: 'Poor', color: 'text-error', bgColor: 'bg-error/10' };
  };

  const statusInfo = getOverallStatus(overallScore);

  const priorityItems = actionItems?.filter(item => item?.priority === 'high');
  const normalItems = actionItems?.filter(item => item?.priority !== 'high');

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
            <Icon name="Heart" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Health Summary</h3>
            <p className="text-sm text-muted-foreground">Overall wellness assessment for Animal #{animalId}</p>
          </div>
        </div>
        <Button variant="outline" iconName="Download" iconPosition="left">
          Export Report
        </Button>
      </div>
      {/* Overall Score */}
      <div className={`p-4 rounded-lg ${statusInfo?.bgColor} mb-6`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">{overallScore}/100</div>
            <div className={`text-lg font-medium ${statusInfo?.color}`}>
              {statusInfo?.status} Health
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Assessment Date</div>
            <div className="font-medium text-foreground">
              {new Date()?.toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Key Findings */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-medium text-foreground">Key Findings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {findings?.map((finding, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon 
                name={finding?.status === 'healthy' ? 'CheckCircle' : 'AlertTriangle'} 
                size={16} 
                color={finding?.status === 'healthy' ? 'var(--color-success)' : 'var(--color-warning)'} 
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{finding?.metric}</div>
                <div className="text-xs text-muted-foreground">{finding?.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Priority Action Items */}
      {priorityItems?.length > 0 && (
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
            <h4 className="text-sm font-medium text-error">Priority Actions Required</h4>
          </div>
          <div className="space-y-2">
            {priorityItems?.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-error/5 border border-error/20 rounded-lg">
                <Icon name="AlertCircle" size={16} color="var(--color-error)" className="mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{item?.action}</div>
                  <div className="text-xs text-muted-foreground">{item?.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* General Recommendations */}
      {normalItems?.length > 0 && (
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-medium text-foreground">Recommendations</h4>
          <div className="space-y-2">
            {normalItems?.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{item?.action}</div>
                  <div className="text-xs text-muted-foreground">{item?.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="default" iconName="Calendar" iconPosition="left" className="flex-1">
          Book Veterinary Consultation
        </Button>
        <Button variant="outline" iconName="Share" iconPosition="left" className="flex-1">
          Share with BPA
        </Button>
        <Button variant="ghost" iconName="History" iconPosition="left">
          View History
        </Button>
      </div>
    </div>
  );
};

export default HealthSummaryCard;