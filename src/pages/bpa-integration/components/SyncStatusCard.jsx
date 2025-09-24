import React from 'react';
import Icon from '../../../components/ui/AppIcon';

const SyncStatusCard = ({ status, lastSync, pendingRecords }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success bg-success/10 border-success/20';
      case 'syncing':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'syncing':
        return 'RefreshCw';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'syncing':
        return 'Syncing...';
      case 'error':
        return 'Connection Error';
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">BPA Connection Status</h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(status)}`}>
          <Icon 
            name={getStatusIcon(status)} 
            size={16} 
            className={status === 'syncing' ? 'animate-spin' : ''} 
          />
          <span className="text-sm font-medium">{getStatusText(status)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Last Sync</span>
          </div>
          <p className="text-sm text-foreground">{lastSync}</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Database" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Pending Records</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{pendingRecords}</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Compliance</span>
          </div>
          <p className="text-sm text-success font-medium">Active</p>
        </div>
      </div>
    </div>
  );
};

export default SyncStatusCard;