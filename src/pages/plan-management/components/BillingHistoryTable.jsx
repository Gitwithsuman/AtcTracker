import React from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

const BillingHistoryTable = ({ billingHistory }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-success/10 text-success';
      case 'Pending':
        return 'bg-warning/10 text-warning';
      case 'Failed':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return 'CheckCircle';
      case 'Pending':
        return 'Clock';
      case 'Failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Receipt" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Billing History
          </h3>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 text-sm font-body font-medium text-muted-foreground">
                Date
              </th>
              <th className="text-left p-4 text-sm font-body font-medium text-muted-foreground">
                Plan
              </th>
              <th className="text-left p-4 text-sm font-body font-medium text-muted-foreground">
                Amount
              </th>
              <th className="text-left p-4 text-sm font-body font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left p-4 text-sm font-body font-medium text-muted-foreground">
                Invoice
              </th>
            </tr>
          </thead>
          <tbody>
            {billingHistory?.map((record, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="p-4">
                  <div className="text-sm font-body text-foreground">
                    {record?.date}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {record?.time}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={record?.plan === 'Premium' ? 'Crown' : 'Zap'} 
                      size={16} 
                      color={record?.plan === 'Premium' ? 'var(--color-primary)' : 'var(--color-warning)'} 
                    />
                    <span className="text-sm font-body font-medium text-foreground">
                      {record?.plan}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {record?.billingCycle}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-body font-medium text-foreground">
                    ₹{record?.amount?.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {record?.paymentMethod}
                  </div>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(record?.status)}`}>
                    <Icon name={getStatusIcon(record?.status)} size={12} />
                    <span>{record?.status}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    iconName="Download" 
                    iconPosition="left"
                    className="text-primary hover:text-primary/80"
                  >
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {billingHistory?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Receipt" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4 opacity-50" />
          <h4 className="text-sm font-body font-medium text-foreground mb-2">
            No billing history yet
          </h4>
          <p className="text-xs text-muted-foreground">
            Your payment history will appear here once you make your first purchase
          </p>
        </div>
      )}
    </div>
  );
};

export default BillingHistoryTable;