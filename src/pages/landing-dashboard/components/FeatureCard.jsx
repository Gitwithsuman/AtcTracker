import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/ui/AppIcon';

const FeatureCard = ({ icon, title, description, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;