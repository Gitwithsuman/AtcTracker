import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SyncStatusCard from './components/SyncStatusCard';
import SyncHistoryTable from './components/SyncHistoryTable';
import PendingRecordsList from './components/PendingRecordsList';
import IntegrationSettings from './components/IntegrationSettings';
import SyncButton from './components/SyncButton';
import ComplianceInfo from './components/ComplianceInfo';
import Icon from '../../components/ui/AppIcon';
import Button from '../../components/ui/Button';

const BPAIntegration = () => {
  const navigate = useNavigate();
  const [syncStatus, setSyncStatus] = useState('connected');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Mock data for sync status
  const [statusData] = useState({
    status: 'connected',
    lastSync: '24 Sep 2025, 10:45 AM',
    pendingRecords: 3
  });

  // Mock data for sync history
  const [syncHistory] = useState([
    {
      id: 1,
      date: '24 Sep 2025',
      time: '09:30 AM',
      dataType: 'Animal Classification',
      dataTypeIcon: 'Beef',
      recordCount: 5,
      status: 'success'
    },
    {
      id: 2,
      date: '23 Sep 2025',
      time: '02:15 PM',
      dataType: 'Health Assessment',
      dataTypeIcon: 'Heart',
      recordCount: 3,
      status: 'success'
    },
    {
      id: 3,
      date: '23 Sep 2025',
      time: '11:20 AM',
      dataType: 'Animal Classification',
      dataTypeIcon: 'Beef',
      recordCount: 2,
      status: 'failed'
    },
    {
      id: 4,
      date: '22 Sep 2025',
      time: '04:45 PM',
      dataType: 'Vaccination Records',
      dataTypeIcon: 'Shield',
      recordCount: 8,
      status: 'success'
    },
    {
      id: 5,
      date: '22 Sep 2025',
      time: '01:30 PM',
      dataType: 'Health Assessment',
      dataTypeIcon: 'Heart',
      recordCount: 1,
      status: 'pending'
    }
  ]);

  // Mock data for pending records
  const [pendingRecords, setPendingRecords] = useState([
    {
      id: 'AC001',
      animalId: 'BUF-2025-001',
      animalType: 'Buffalo',
      classifiedDate: '24 Sep 2025',
      atcScore: 87.5,
      healthStatus: 'Healthy'
    },
    {
      id: 'AC002',
      animalId: 'CAT-2025-003',
      animalType: 'Cattle',
      classifiedDate: '24 Sep 2025',
      atcScore: 92.3,
      healthStatus: 'Alert'
    },
    {
      id: 'AC003',
      animalId: 'BUF-2025-002',
      animalType: 'Buffalo',
      classifiedDate: '23 Sep 2025',
      atcScore: 89.1,
      healthStatus: 'Healthy'
    }
  ]);

  // Mock data for integration settings
  const [integrationSettings, setIntegrationSettings] = useState({
    autoSync: true,
    healthDataSharing: true,
    complianceAlerts: true,
    dataValidation: true,
    syncFrequency: 'daily'
  });

  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleMainSync = async () => {
    setSyncStatus('syncing');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update status and clear pending records
    setSyncStatus('connected');
    setPendingRecords([]);
    showSuccessNotification('Successfully synced all records with BPA database!');
  };

  const handleSyncRecord = async (recordId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Remove synced record
    setPendingRecords(prev => prev?.filter(record => record?.id !== recordId));
    showSuccessNotification(`Record ${recordId} synced successfully!`);
  };

  const handleBatchSync = async (recordIds) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Remove synced records
    setPendingRecords(prev => prev?.filter(record => !recordIds?.includes(record?.id)));
    showSuccessNotification(`${recordIds?.length} records synced successfully!`);
  };

  const handleUpdateSettings = async (newSettings) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIntegrationSettings(newSettings);
    showSuccessNotification('Integration settings updated successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 bg-success text-success-foreground px-4 py-3 rounded-lg shadow-lg border border-success/20 animate-in slide-in-from-right">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">{notificationMessage}</span>
          </div>
        </div>
      )}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">BPA Integration</h1>
                <p className="text-muted-foreground mt-2">
                  Synchronize your livestock data with government databases
                </p>
              </div>
              
              <div className="hidden sm:flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/classification-results')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Results
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate('/plan-management')}
                  iconName="CreditCard"
                  iconPosition="left"
                >
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Sync Status Card */}
              <SyncStatusCard
                status={statusData?.status}
                lastSync={statusData?.lastSync}
                pendingRecords={pendingRecords?.length}
              />

              {/* Sync Button */}
              <SyncButton
                onSync={handleMainSync}
                pendingCount={pendingRecords?.length}
              />

              {/* Pending Records */}
              <PendingRecordsList
                pendingRecords={pendingRecords}
                onSyncRecord={handleSyncRecord}
                onBatchSync={handleBatchSync}
              />

              {/* Sync History */}
              <SyncHistoryTable syncHistory={syncHistory} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Integration Settings */}
              <IntegrationSettings
                settings={integrationSettings}
                onUpdateSettings={handleUpdateSettings}
              />

              {/* Compliance Information */}
              <ComplianceInfo />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/health-assessment')}
                    iconName="Heart"
                    iconPosition="left"
                    className="w-full justify-start"
                  >
                    Health Assessment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/classification-results')}
                    iconName="BarChart3"
                    iconPosition="left"
                    className="w-full justify-start"
                  >
                    View Results
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/landing-dashboard')}
                    iconName="Home"
                    iconPosition="left"
                    className="w-full justify-start"
                  >
                    Dashboard
                  </Button>
                </div>
              </div>

              {/* Support Contact */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="HelpCircle" size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Need Help?</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Contact our support team for BPA integration assistance
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Mail" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">support@animalclassify.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Phone" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">+91 98765 43210</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Quick Actions */}
          <div className="sm:hidden mt-8 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/classification-results')}
              iconName="ArrowLeft"
              iconPosition="left"
              className="w-full"
            >
              Back to Results
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/plan-management')}
              iconName="CreditCard"
              iconPosition="left"
              className="w-full"
            >
              Upgrade Plan
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BPAIntegration;