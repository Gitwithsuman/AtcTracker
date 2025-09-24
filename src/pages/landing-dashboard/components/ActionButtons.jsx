import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ userPlan }) => {
  const navigate = useNavigate();

  const actionItems = [
    {
      label: 'Start Classification',
      variant: 'default',
      icon: 'Play',
      onClick: () => navigate('/results'),
      description: 'Begin animal analysis'
    },
    {
      label: 'Health Assessment',
      variant: 'secondary',
      icon: 'Heart',
      onClick: () => navigate('/health'),
      description: 'Check animal health'
    },
    {
      label: 'BPA Integration',
      variant: 'outline',
      icon: 'RefreshCw',
      onClick: () => navigate('/sync'),
      description: 'Sync with government app'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actionItems?.map((action, index) => (
          <motion.div
            key={action?.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={action?.variant}
              size="lg"
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.onClick}
              fullWidth
              className="h-16 flex-col space-y-1"
            >
              <span className="font-semibold">{action?.label}</span>
              <span className="text-xs opacity-80">{action?.description}</span>
            </Button>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="ghost"
          iconName="History"
          iconPosition="left"
          onClick={() => navigate('/results')}
          className="flex-1"
        >
          View Upload History
        </Button>
        
        {userPlan === 'Basic' && (
          <Button
            variant="success"
            iconName="Zap"
            iconPosition="left"
            onClick={() => navigate('/plans')}
            className="flex-1"
          >
            Upgrade Plan
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ActionButtons;