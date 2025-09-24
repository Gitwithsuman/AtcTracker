import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/ui/AppIcon';

const AnalyticsCards = ({ data }) => {
  const cards = [
    {
      title: 'Total Uploads',
      value: data?.totalUploads?.toString(),
      icon: 'Upload',
      color: 'bg-primary',
      textColor: 'text-primary',
      bgColor: 'bg-primary/10',
      subtitle: 'All-time records'
    },
    {
      title: 'Average ATC Score',
      value: `${data?.avgAtcScore?.toFixed(1)}%`,
      icon: 'Target',
      color: 'bg-secondary',
      textColor: 'text-secondary',
      bgColor: 'bg-secondary/10',
      subtitle: 'Classification accuracy'
    },
    {
      title: 'Healthy Animals',
      value: data?.healthyCount?.toString(),
      icon: 'Heart',
      color: 'bg-success',
      textColor: 'text-success',
      bgColor: 'bg-success/10',
      subtitle: `${((data?.healthyCount / data?.totalUploads) * 100)?.toFixed(1)}% of total`
    },
    {
      title: 'BPA Synchronized',
      value: data?.syncedToBpa?.toString(),
      icon: 'RefreshCw',
      color: 'bg-info',
      textColor: 'text-info',
      bgColor: 'bg-info/10',
      subtitle: 'Gov. database synced'
    },
    {
      title: 'This Week',
      value: data?.thisWeekUploads?.toString(),
      icon: 'Calendar',
      color: 'bg-accent',
      textColor: 'text-accent',
      bgColor: 'bg-accent/10',
      subtitle: 'Recent activity'
    },
    {
      title: 'This Month',
      value: data?.thisMonthUploads?.toString(),
      icon: 'TrendingUp',
      color: 'bg-warning',
      textColor: 'text-warning',
      bgColor: 'bg-warning/10',
      subtitle: 'Monthly progress'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {cards?.map((card, index) => (
        <motion.div
          key={card?.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${card?.bgColor}`}>
              <Icon name={card?.icon} size={24} className={card?.textColor} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{card?.value}</div>
              <div className="text-sm text-muted-foreground">{card?.subtitle}</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{card?.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnalyticsCards;