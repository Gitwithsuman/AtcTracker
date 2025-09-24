import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

const ExportControls = ({ onExport }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState(null);

  const handleExport = async (type) => {
    setIsExporting(true);
    setExportType(type);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onExport(type);
      
      // Show success message
      const fileName = `animal-classification-${new Date()?.toISOString()?.split('T')?.[0]}.${type?.toLowerCase()}`;
      alert(`Export completed! File: ${fileName}`);
    } catch (error) {
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
          <Icon name="Download" size={20} color="var(--color-warning)" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Export Results</h3>
          <p className="text-sm text-muted-foreground">Download analysis data</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => handleExport('PDF')}
            disabled={isExporting}
            loading={isExporting && exportType === 'PDF'}
            iconName="FileText"
            iconPosition="left"
            className="justify-start"
          >
            Export as PDF
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleExport('CSV')}
            disabled={isExporting}
            loading={isExporting && exportType === 'CSV'}
            iconName="Table"
            iconPosition="left"
            className="justify-start"
          >
            Export as CSV
          </Button>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Export includes:</p>
              <ul className="space-y-1 text-xs">
                <li>• ATC scores and classifications</li>
                <li>• Detailed trait measurements</li>
                <li>• Breed composition analysis</li>
                <li>• Image analysis markers</li>
                <li>• Timestamp and metadata</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;