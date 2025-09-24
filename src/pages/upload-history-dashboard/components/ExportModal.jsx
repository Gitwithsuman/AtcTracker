import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/ui/AppIcon';

const ExportModal = ({ onClose, onExport, selectedCount, totalCount }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportScope, setExportScope] = useState('filtered');
  const [includeImages, setIncludeImages] = useState(false);
  const [customFields, setCustomFields] = useState({
    basicInfo: true,
    measurements: true,
    healthData: true,
    breedAnalysis: true,
    timestamps: true,
    notes: false
  });

  const formatOptions = [
    { value: 'csv', label: 'CSV', description: 'Comma-separated values for spreadsheets' },
    { value: 'xlsx', label: 'Excel', description: 'Microsoft Excel format' },
    { value: 'pdf', label: 'PDF', description: 'Formatted report document' },
    { value: 'json', label: 'JSON', description: 'Machine-readable data format' }
  ];

  const scopeOptions = [
    { value: 'all', label: 'All Records', count: totalCount },
    { value: 'filtered', label: 'Filtered Results', count: totalCount },
    { value: 'selected', label: 'Selected Records', count: selectedCount, disabled: selectedCount === 0 }
  ];

  const handleExport = () => {
    const options = {
      format: exportFormat,
      scope: exportScope,
      includeImages,
      fields: customFields
    };
    
    onExport(exportFormat, exportScope === 'selected', options);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Export Cattle & Buffalo Data</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Export Format</h3>
            <div className="grid grid-cols-2 gap-3">
              {formatOptions?.map((format) => (
                <label
                  key={format?.value}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    exportFormat === format?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format?.value}
                    checked={exportFormat === format?.value}
                    onChange={(e) => setExportFormat(e?.target?.value)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{format?.label}</div>
                    <div className="text-sm text-muted-foreground">{format?.description}</div>
                  </div>
                  {exportFormat === format?.value && (
                    <Icon name="Check" size={20} className="text-primary" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Export Scope */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Export Scope</h3>
            <div className="space-y-2">
              {scopeOptions?.map((scope) => (
                <label
                  key={scope?.value}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                    scope?.disabled
                      ? 'opacity-50 cursor-not-allowed border-border'
                      : exportScope === scope?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="scope"
                      value={scope?.value}
                      checked={exportScope === scope?.value}
                      onChange={(e) => setExportScope(e?.target?.value)}
                      disabled={scope?.disabled}
                      className="sr-only"
                    />
                    <div>
                      <div className="font-medium text-foreground">{scope?.label}</div>
                      <div className="text-sm text-muted-foreground">{scope?.count} records</div>
                    </div>
                  </div>
                  {exportScope === scope?.value && !scope?.disabled && (
                    <Icon name="Check" size={20} className="text-primary" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Data Fields */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Include Data Fields</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(customFields)?.map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setCustomFields({
                      ...customFields,
                      [key]: e?.target?.checked
                    })}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-foreground capitalize">
                    {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Additional Options</h3>
            <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors">
              <input
                type="checkbox"
                checked={includeImages}
                onChange={(e) => setIncludeImages(e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <div>
                <span className="text-foreground">Include Images</span>
                <div className="text-sm text-muted-foreground">
                  Embed animal images in the export (PDF only)
                </div>
              </div>
            </label>
          </div>

          {/* Export Preview */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Export Preview</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Format: <span className="text-foreground">{formatOptions?.find(f => f?.value === exportFormat)?.label}</span></div>
              <div>Records: <span className="text-foreground">{scopeOptions?.find(s => s?.value === exportScope)?.count}</span></div>
              <div>Fields: <span className="text-foreground">{Object.values(customFields)?.filter(Boolean)?.length} selected</span></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Icon name="Download" size={16} />
            Export Data
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ExportModal;