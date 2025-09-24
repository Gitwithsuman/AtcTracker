import React from 'react';
import Icon from '../../../components/ui/AppIcon';

const ComplianceInfo = () => {
  const benefits = [
    {
      icon: 'Shield',
      title: 'Legal Compliance',
      description: 'Ensure your livestock records meet government registration requirements'
    },
    {
      icon: 'Award',
      title: 'Certification Support',
      description: 'Streamline the process for obtaining livestock health certificates'
    },
    {
      icon: 'TrendingUp',
      title: 'Market Access',
      description: 'Access premium markets that require verified animal health records'
    },
    {
      icon: 'Users',
      title: 'Veterinary Network',
      description: 'Connect with government veterinary services for expert consultation'
    }
  ];

  const requirements = [
    'Animal identification tags must be clearly visible in uploaded images',
    'Health assessment data should be current (within 30 days)',
    'All animal records must include accurate breed classification',
    'Vaccination records should be maintained and updated regularly'
  ];

  return (
    <div className="space-y-6">
      {/* Benefits Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Info" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">BPA Integration Benefits</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={benefit?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{benefit?.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{benefit?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Requirements Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="CheckSquare" size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Compliance Requirements</h3>
        </div>
        
        <div className="space-y-3">
          {requirements?.map((requirement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{requirement}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-warning font-medium">Important Notice</p>
              <p className="text-xs text-warning/80 mt-1">
                Ensure all animal data is accurate before syncing. Incorrect information may delay government processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceInfo;