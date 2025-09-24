import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Next Steps</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button
          variant="default"
          onClick={() => handleNavigation('/health-assessment')}
          iconName="Heart"
          iconPosition="left"
          className="justify-start"
        >
          Health Assessment
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleNavigation('/bpa-integration')}
          iconName="RefreshCw"
          iconPosition="left"
          className="justify-start"
        >
          Sync with BPA
        </Button>
        
        <Button
          variant="secondary"
          onClick={() => handleNavigation('/landing-dashboard')}
          iconName="Home"
          iconPosition="left"
          className="justify-start"
        >
          Back to Dashboard
        </Button>
      </div>
      <div className="mt-4 p-4 bg-success/10 rounded-lg">
        <div className="flex items-center space-x-2 text-success">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-sm font-medium">Classification completed successfully</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Analysis completed on {new Date()?.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
};

export default ActionButtons;