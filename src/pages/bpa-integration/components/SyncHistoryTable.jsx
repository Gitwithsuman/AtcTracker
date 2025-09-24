import React from 'react';
import Icon from '../../../components/ui/AppIcon';

const SyncHistoryTable = ({ syncHistory }) => {
  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'success':
        return `${baseClasses} bg-success/10 text-success border border-success/20`;
      case 'failed':
        return `${baseClasses} bg-error/10 text-error border border-error/20`;
      case 'pending':
        return `${baseClasses} bg-warning/10 text-warning border border-warning/20`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground border border-border`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return 'CheckCircle';
      case 'failed':
        return 'XCircle';
      case 'pending':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Sync History</h3>
        <p className="text-sm text-muted-foreground mt-1">Recent synchronization attempts with BPA database</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date & Time
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Data Type
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Records
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {syncHistory?.map((record) => (
              <tr key={record?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{record?.date}</div>
                  <div className="text-xs text-muted-foreground">{record?.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Icon name={record?.dataTypeIcon} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{record?.dataType}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {record?.recordCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(record?.status)}>
                    <Icon name={getStatusIcon(record?.status)} size={12} />
                    <span className="capitalize">{record?.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {record?.status === 'failed' && (
                      <button className="text-primary hover:text-primary/80 text-sm font-medium">
                        Retry
                      </button>
                    )}
                    <button className="text-muted-foreground hover:text-foreground">
                      <Icon name="Eye" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SyncHistoryTable;