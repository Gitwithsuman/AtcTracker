import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Icon from '../../../components/ui/AppIcon';
import Image from '../../../components/ui/AppImage';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataTable = ({
  data,
  sortConfig,
  onSort,
  selectedRecords,
  onRowSelect,
  onSelectAll,
  expandedRows,
  onToggleExpansion,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems
}) => {
  const getHealthStatusColor = (status) => {
    switch (status) {
      case 'Healthy': return 'text-success bg-success/10';
      case 'Alert': return 'text-warning bg-warning/10';
      case 'Monitor': return 'text-info bg-info/10';
      case 'Critical': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const renderExpandedRow = (record) => (
    <tr className="bg-muted/30">
      <td colSpan="8" className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Measurements */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Physical Measurements</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Body Length:</span>
                <span className="text-foreground">{record?.bodyLength} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Chest Width:</span>
                <span className="text-foreground">{record?.chestWidth} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Height at Withers:</span>
                <span className="text-foreground">{record?.heightAtWithers} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hip Height:</span>
                <span className="text-foreground">{record?.hipHeight} cm</span>
              </div>
            </div>
          </div>

          {/* Additional Traits */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Physical Traits</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Face Length:</span>
                <span className="text-foreground">{record?.faceLength} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Neck Length:</span>
                <span className="text-foreground">{record?.neckLength} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rump Angle:</span>
                <span className="text-foreground">{record?.rumpAngle}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Horn Shape:</span>
                <span className="text-foreground">{record?.hornShape}</span>
              </div>
            </div>
          </div>

          {/* Breed & Analysis */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Analysis Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size Category:</span>
                <span className="text-foreground">{record?.sizeCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Breed:</span>
                <span className="text-foreground">{record?.breedComposition?.primary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confidence:</span>
                <span className="text-foreground">{record?.breedComposition?.percentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">BPA Synced:</span>
                <span className={record?.bpaSync ? 'text-success' : 'text-error'}>
                  {record?.bpaSync ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {record?.notes && (
            <div className="md:col-span-2 lg:col-span-3">
              <h4 className="font-semibold text-foreground mb-2">Notes</h4>
              <p className="text-sm text-muted-foreground">{record?.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="md:col-span-2 lg:col-span-3 flex gap-2 pt-4 border-t border-border">
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors">
              Re-analyze
            </button>
            <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90 transition-colors">
              Compare
            </button>
            <button className="px-3 py-1 border border-border text-foreground rounded text-sm hover:bg-muted transition-colors">
              Export Details
            </button>
            {!record?.bpaSync && (
              <button className="px-3 py-1 bg-accent text-accent-foreground rounded text-sm hover:bg-accent/90 transition-colors">
                Sync to BPA
              </button>
            )}
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Upload Records</h3>
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-4 text-left">
                <Checkbox
                  checked={selectedRecords?.length === data?.length && data?.length > 0}
                  onChange={onSelectAll}
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Animal
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/50"
                onClick={() => onSort('uploadDate')}
              >
                <div className="flex items-center gap-1">
                  Upload Date
                  <Icon name={getSortIcon('uploadDate')} size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/50"
                onClick={() => onSort('atcScore')}
              >
                <div className="flex items-center gap-1">
                  ATC Score
                  <Icon name={getSortIcon('atcScore')} size={14} />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Health Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Breed
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                BPA Sync
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data?.map((record, index) => (
              <React.Fragment key={record?.id}>
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedRecords?.includes(record?.id)}
                      onChange={() => onRowSelect(record?.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={record?.image}
                          alt={record?.animalType}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{record?.animalType}</div>
                        <div className="text-sm text-muted-foreground">{record?.animalId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {format(new Date(record?.uploadDate), 'MMM dd, yyyy')}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(record?.uploadDate), 'HH:mm')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-foreground">{record?.atcScore}</span>
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${record?.atcScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(record?.healthStatus)}`}>
                      {record?.healthStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {record?.breedComposition?.primary}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {record?.breedComposition?.percentage}% confidence
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${record?.bpaSync ? 'bg-success' : 'bg-error'}`} />
                      <span className={`text-sm ${record?.bpaSync ? 'text-success' : 'text-error'}`}>
                        {record?.bpaSync ? 'Synced' : 'Pending'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onToggleExpansion(record?.id)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Icon 
                        name={expandedRows?.includes(record?.id) ? 'ChevronUp' : 'ChevronDown'} 
                        size={20} 
                      />
                    </button>
                  </td>
                </motion.tr>
                {expandedRows?.includes(record?.id) && renderExpandedRow(record)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-border rounded text-sm hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + Math.max(1, currentPage - 2);
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      page === currentPage
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-border rounded text-sm hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;