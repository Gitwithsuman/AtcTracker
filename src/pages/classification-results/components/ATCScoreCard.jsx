import React from 'react';
import Icon from '../../../components/ui/AppIcon';

const ATCScoreCard = ({ score, maxScore, category, description, status }) => {
  const percentage = (score / maxScore) * 100;
  const getStatusColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressColor = () => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Target" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">{category}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-heading font-bold ${getStatusColor()}`}>
            {score}/{maxScore}
          </div>
          <div className="text-sm text-muted-foreground">{percentage?.toFixed(1)}%</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className={`font-medium ${getStatusColor()}`}>{status}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ATCScoreCard;