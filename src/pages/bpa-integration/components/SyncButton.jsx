import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

const SyncButton = ({ onSync, disabled = false, pendingCount = 0 }) => {
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSync = async () => {
    if (disabled || syncing) return;

    setSyncing(true);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await onSync();
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Reset after completion
      setTimeout(() => {
        setSyncing(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      setSyncing(false);
      setProgress(0);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon 
            name="Database" 
            size={32} 
            className={`text-primary ${syncing ? 'animate-pulse' : ''}`} 
          />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Sync with BPA Database
        </h3>
        
        <p className="text-sm text-muted-foreground mb-6">
          {pendingCount > 0 
            ? `${pendingCount} records ready for government database submission`
            : 'All records are up to date with the government database'
          }
        </p>

        {syncing && (
          <div className="mb-6">
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">
              Syncing... {progress}% complete
            </p>
          </div>
        )}

        <Button
          variant="default"
          size="lg"
          onClick={handleSync}
          disabled={disabled || pendingCount === 0}
          loading={syncing}
          iconName="Upload"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          {syncing ? 'Syncing...' : 'Sync with BPA'}
        </Button>

        {pendingCount === 0 && (
          <div className="mt-4 flex items-center justify-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">All records synchronized</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SyncButton;
