import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationSettings = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState(false);

  const handleToggle = (key) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await onUpdateSettings(localSettings);
    setSaving(false);
  };

  const settingsOptions = [
    {
      key: 'autoSync',
      title: 'Automatic Synchronization',
      description: 'Automatically sync new animal records with BPA database',
      icon: 'RefreshCw'
    },
    {
      key: 'healthDataSharing',
      title: 'Health Data Sharing',
      description: 'Share health assessment data with government veterinary services',
      icon: 'Heart'
    },
    {
      key: 'complianceAlerts',
      title: 'Compliance Notifications',
      description: 'Receive alerts for livestock registration compliance requirements',
      icon: 'Bell'
    },
    {
      key: 'dataValidation',
      title: 'Data Validation',
      description: 'Validate animal records before submitting to government database',
      icon: 'Shield'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Integration Settings</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Configure BPA synchronization preferences and data sharing options
        </p>
      </div>
      <div className="p-6 space-y-6">
        {settingsOptions?.map((option) => (
          <div key={option?.key} className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                <Icon name={option?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground">{option?.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{option?.description}</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings?.[option?.key]}
                onChange={() => handleToggle(option?.key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        ))}

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-foreground">Sync Frequency</h4>
              <p className="text-sm text-muted-foreground mt-1">How often to sync with BPA database</p>
            </div>
            <select 
              value={localSettings?.syncFrequency || 'daily'}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, syncFrequency: e?.target?.value }))}
              className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="realtime">Real-time</option>
              <option value="hourly">Every Hour</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            loading={saving}
            iconName="Save"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;
