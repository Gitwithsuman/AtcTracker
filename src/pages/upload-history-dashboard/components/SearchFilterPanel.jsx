import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/ui/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchFilterPanel = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFiltersChange, 
  totalResults 
}) => {
  const animalTypeOptions = [
    { value: 'all', label: 'All Animals' },
    { value: 'cow', label: 'Cattle' },
    { value: 'buffalo', label: 'Buffalo' },
    { value: 'holstein', label: 'Holstein Friesian' },
    { value: 'jersey', label: 'Jersey' },
    { value: 'gir', label: 'Gir' },
    { value: 'sahiwal', label: 'Sahiwal' },
    { value: 'murrah', label: 'Murrah' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const healthStatusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Healthy', label: 'Healthy' },
    { value: 'Alert', label: 'Alert' },
    { value: 'Monitor', label: 'Monitor' },
    { value: 'Critical', label: 'Critical' }
  ];

  const breedTypeOptions = [
    { value: 'all', label: 'All Breeds' },
    { value: 'dairy', label: 'Dairy Breeds' },
    { value: 'beef', label: 'Beef Breeds' },
    { value: 'dual', label: 'Dual Purpose' },
    { value: 'indigenous', label: 'Indigenous Breeds' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Search by animal type, ID, or breed..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10 pr-4 py-3 w-full"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex-shrink-0">
          <Select
            value={filters?.animalType}
            onChange={(value) => onFiltersChange({ ...filters, animalType: value })}
            options={animalTypeOptions}
            placeholder="Animal Type"
          />
          
          <Select
            value={filters?.dateRange}
            onChange={(value) => onFiltersChange({ ...filters, dateRange: value })}
            options={dateRangeOptions}
            placeholder="Date Range"
          />
          
          <Select
            value={filters?.healthStatus}
            onChange={(value) => onFiltersChange({ ...filters, healthStatus: value })}
            options={healthStatusOptions}
            placeholder="Health Status"
          />
          
          <Select
            value={filters?.breedType}
            onChange={(value) => onFiltersChange({ ...filters, breedType: value })}
            options={breedTypeOptions}
            placeholder="Breed Type"
          />
        </div>
      </div>
      {/* ATC Score Range Slider */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">
              ATC Score Range: {filters?.atcScoreRange?.[0]}% - {filters?.atcScoreRange?.[1]}%
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={filters?.atcScoreRange?.[0]}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  atcScoreRange: [parseInt(e?.target?.value), filters?.atcScoreRange?.[1]]
                })}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters?.atcScoreRange?.[1]}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  atcScoreRange: [filters?.atcScoreRange?.[0], parseInt(e?.target?.value)]
                })}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            <span className="font-medium text-foreground">{totalResults}</span> results found
          </div>
        </div>
      </div>
      {/* Quick Filter Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onFiltersChange({
            animalType: 'all',
            dateRange: 'all',
            healthStatus: 'all',
            atcScoreRange: [0, 100],
            breedType: 'all'
          })}
          className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors"
        >
          Clear All
        </button>
        <button
          onClick={() => onFiltersChange({ ...filters, healthStatus: 'Healthy' })}
          className="px-3 py-1 text-xs bg-success/10 text-success rounded-full hover:bg-success/20 transition-colors"
        >
          Healthy Only
        </button>
        <button
          onClick={() => onFiltersChange({ ...filters, atcScoreRange: [80, 100] })}
          className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
        >
          High ATC (80%+)
        </button>
        <button
          onClick={() => onFiltersChange({ ...filters, dateRange: 'week' })}
          className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full hover:bg-accent/20 transition-colors"
        >
          This Week
        </button>
      </div>
    </motion.div>
  );
};

export default SearchFilterPanel;