import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStatsPanel = ({ userPlan, uploadsRemaining, recentClassifications }) => {
  const statsData = [
    {
      label: 'Current Plan',
      value: userPlan,
      icon: 'Crown',
      color: userPlan === 'Premium' ? 'text-warning' : 'text-muted-foreground'
    },
    {
      label: 'Uploads Remaining',
      value: userPlan === 'Premium' ? 'Unlimited' : `${uploadsRemaining}/50`,
      icon: 'Upload',
      color: uploadsRemaining < 10 && userPlan !== 'Premium' ? 'text-error' : 'text-success'
    },
    {
      label: 'Classifications Today',
      value: recentClassifications,
      icon: 'BarChart3',
      color: 'text-primary'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
        <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {statsData?.map((stat, index) => (
          <motion.div
            key={stat?.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="text-center p-4 bg-muted/50 rounded-lg"
          >
            <div className="flex items-center justify-center mb-2">
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className={`text-xl font-bold ${stat?.color} mb-1`}>
              {stat?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat?.label}
            </div>
          </motion.div>
        ))}
      </div>
      {userPlan === 'Basic' && uploadsRemaining < 10 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">
              Low Upload Credits
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            You have {uploadsRemaining} uploads remaining. Upgrade to Premium for unlimited access.
          </p>
          <Button variant="warning" size="sm" fullWidth>
            Upgrade Now
          </Button>
        </motion.div>
      )}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-3">
          Last classification: 2 hours ago
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="History" className="flex-1">
            View History
          </Button>
          <Button variant="outline" size="sm" iconName="Settings" className="flex-1">
            Settings
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickStatsPanel;