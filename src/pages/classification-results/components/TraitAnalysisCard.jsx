import React from 'react';
import Icon from '../../../components/ui/AppIcon';

const TraitAnalysisCard = ({ trait, value, unit, benchmark, status, icon }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Excellent': return 'text-success bg-success/10';
      case 'Good': return 'text-success bg-success/10';
      case 'Average': return 'text-warning bg-warning/10';
      case 'Below Average': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'Excellent': return 'TrendingUp';
      case 'Good': return 'CheckCircle';
      case 'Average': return 'Minus';
      case 'Below Average': return 'TrendingDown';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name={icon} size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">{trait}</h3>
            <p className="text-sm text-muted-foreground">Measured Value</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon()} size={12} />
            <span>{status}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-heading font-bold text-foreground">
            {value} {unit}
          </span>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Benchmark</div>
            <div className="text-sm font-medium text-foreground">{benchmark} {unit}</div>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              status === 'Excellent' || status === 'Good' ? 'bg-success' :
              status === 'Average' ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${Math.min((value / benchmark) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TraitAnalysisCard;