import React from 'react';
import Icon from '../../../components/ui/AppIcon';

const HealthMetricCard = ({ metric, status, value, description, recommendations, icon }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-success text-success-foreground';
      case 'alert':
        return 'bg-error text-error-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle';
      case 'alert':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
            <Icon name={icon} size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{metric}</h3>
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              <Icon name={getStatusIcon(status)} size={12} />
              <span className="capitalize">{status}</span>
            </div>
          </div>
        </div>
        {value && (
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-1">Assessment</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {recommendations && recommendations?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Recommendations</h4>
            <ul className="space-y-1">
              {recommendations?.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthMetricCard;