import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/ui/AppIcon';
import Image from '../../../components/ui/AppImage';

const RecentActivity = () => {
  const recentClassifications = [
    {
      id: 1,
      animalType: "Holstein Friesian Cow",
      timestamp: "2 hours ago",
      atcScore: 87.5,
      healthStatus: "Healthy",
      image: "/assets/images/OIP.jpeg"
    },
    {
      id: 2,
      animalType: "Murrah Buffalo",
      timestamp: "5 hours ago",
      atcScore: 92.3,
      healthStatus: "Alert",
      image: "/assets/images/OIP (1).jpeg"
    },
    {
      id: 3,
      animalType: "Jersey Cow",
      timestamp: "1 day ago",
      atcScore: 78.9,
      healthStatus: "Healthy",
      image: "/assets/images/OIP (2).jpeg"
    }
  ];

  const getHealthStatusColor = (status) => {
    return status === 'Healthy' ? 'text-success bg-success/10' : 'text-error bg-error/10';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Clock" size={20} color="var(--color-muted-foreground)" />
      </div>
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {recentClassifications?.slice(0, 3)?.map((item, index) => (
          <motion.div
            key={item?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={item?.image}
                alt={item?.animalType}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">
                {item?.animalType}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  ATC: {item?.atcScore}%
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {item?.timestamp}
                </span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(item?.healthStatus)}`}>
                {item?.healthStatus}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View All Classifications
        </button>
      </div>
    </motion.div>
  );
};

export default RecentActivity;