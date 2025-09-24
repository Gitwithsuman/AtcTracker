import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

const PendingRecordsList = ({ pendingRecords, onSyncRecord, onBatchSync }) => {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [syncingRecords, setSyncingRecords] = useState([]);

  const handleSelectRecord = (recordId) => {
    setSelectedRecords(prev => 
      prev?.includes(recordId) 
        ? prev?.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRecords?.length === pendingRecords?.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(pendingRecords?.map(record => record?.id));
    }
  };

  const handleSyncRecord = async (recordId) => {
    setSyncingRecords(prev => [...prev, recordId]);
    await onSyncRecord(recordId);
    setSyncingRecords(prev => prev?.filter(id => id !== recordId));
  };

  const handleBatchSync = async () => {
    if (selectedRecords?.length === 0) return;
    
    setSyncingRecords(selectedRecords);
    await onBatchSync(selectedRecords);
    setSyncingRecords([]);
    setSelectedRecords([]);
  };

  const getAnimalIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'cattle':
        return 'Beef';
      case 'buffalo':
        return 'Beef';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Pending Records</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Animal records awaiting government database submission
            </p>
          </div>
          {selectedRecords?.length > 0 && (
            <Button
              variant="default"
              onClick={handleBatchSync}
              loading={syncingRecords?.length > 0}
              iconName="Upload"
              iconPosition="left"
            >
              Sync Selected ({selectedRecords?.length})
            </Button>
          )}
        </div>
      </div>
      <div className="p-6">
        {pendingRecords?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">All Records Synced</h4>
            <p className="text-muted-foreground">No pending records for BPA submission</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRecords?.length === pendingRecords?.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Select All</span>
              </label>
              <span className="text-sm text-muted-foreground">
                {pendingRecords?.length} records pending
              </span>
            </div>

            <div className="space-y-3">
              {pendingRecords?.map((record) => (
                <div
                  key={record?.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedRecords?.includes(record?.id)}
                      onChange={() => handleSelectRecord(record?.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={getAnimalIcon(record?.animalType)} size={20} className="text-primary" />
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-foreground">
                          {record?.animalId} - {record?.animalType}
                        </h4>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>Classified: {record?.classifiedDate}</span>
                          <span>ATC Score: {record?.atcScore}</span>
                          <span>Health: {record?.healthStatus}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSyncRecord(record?.id)}
                      loading={syncingRecords?.includes(record?.id)}
                      iconName="Upload"
                      iconPosition="left"
                    >
                      Sync Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PendingRecordsList;