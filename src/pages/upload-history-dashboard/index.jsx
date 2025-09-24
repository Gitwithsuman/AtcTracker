import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchFilterPanel from './components/SearchFilterPanel';
import DataTable from './components/DataTable';
import AnalyticsCards from './components/AnalyticsCards';
import ExportModal from './components/ExportModal';
import UploadTrendsChart from './components/UploadTrendsChart';
import HealthDistributionChart from './components/HealthDistributionChart';

const UploadHistoryDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    animalType: 'all',
    dateRange: 'all',
    healthStatus: 'all',
    atcScoreRange: [0, 100],
    breedType: 'all'
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'uploadDate',
    direction: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  // Mock data for upload history
  const uploadHistory = [
    {
      id: 1,
      uploadDate: '2024-01-15T14:30:00Z',
      animalType: 'Holstein Friesian Cow',
      animalId: 'HF-001',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=100&h=100&fit=crop',
      atcScore: 87.5,
      healthStatus: 'Healthy',
      bodyLength: 165,
      chestWidth: 68,
      rumpAngle: 28,
      heightAtWithers: 142,
      faceLength: 28,
      neckLength: 42,
      hipHeight: 144,
      hornShape: 'Curved Forward',
      sizeCategory: 'Large',
      breedComposition: { primary: 'Holstein Friesian', percentage: 85 },
      bpaSync: true,
      notes: 'Excellent condition, good breeding potential'
    },
    {
      id: 2,
      uploadDate: '2024-01-14T09:45:00Z',
      animalType: 'Murrah Buffalo',
      animalId: 'MB-002',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=100&h=100&fit=crop',
      atcScore: 92.3,
      healthStatus: 'Alert',
      bodyLength: 180,
      chestWidth: 75,
      rumpAngle: 25,
      heightAtWithers: 138,
      faceLength: 32,
      neckLength: 38,
      hipHeight: 140,
      hornShape: 'Straight Back',
      sizeCategory: 'Large',
      breedComposition: { primary: 'Murrah', percentage: 92 },
      bpaSync: true,
      notes: 'High milk production potential'
    },
    {
      id: 3,
      uploadDate: '2024-01-13T16:20:00Z',
      animalType: 'Jersey Cow',
      animalId: 'JC-003',
      image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=100&h=100&fit=crop',
      atcScore: 78.9,
      healthStatus: 'Healthy',
      bodyLength: 155,
      chestWidth: 62,
      rumpAngle: 30,
      heightAtWithers: 135,
      faceLength: 26,
      neckLength: 40,
      hipHeight: 137,
      hornShape: 'Small Curved',
      sizeCategory: 'Medium',
      breedComposition: { primary: 'Jersey', percentage: 78 },
      bpaSync: false,
      notes: 'Good dairy characteristics'
    },
    {
      id: 4,
      uploadDate: '2024-01-12T11:10:00Z',
      animalType: 'Gir Cow',
      animalId: 'GC-004',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=100&h=100&fit=crop',
      atcScore: 85.6,
      healthStatus: 'Healthy',
      bodyLength: 160,
      chestWidth: 65,
      rumpAngle: 27,
      heightAtWithers: 140,
      faceLength: 29,
      neckLength: 41,
      hipHeight: 142,
      hornShape: 'Large Curved',
      sizeCategory: 'Large',
      breedComposition: { primary: 'Gir', percentage: 88 },
      bpaSync: true,
      notes: 'Indigenous breed with heat tolerance'
    },
    {
      id: 5,
      uploadDate: '2024-01-11T13:55:00Z',
      animalType: 'Sahiwal Cow',
      animalId: 'SC-005',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=100&h=100&fit=crop',
      atcScore: 81.2,
      healthStatus: 'Monitor',
      bodyLength: 158,
      chestWidth: 64,
      rumpAngle: 29,
      heightAtWithers: 138,
      faceLength: 27,
      neckLength: 39,
      hipHeight: 140,
      hornShape: 'Medium Curved',
      sizeCategory: 'Medium-Large',
      breedComposition: { primary: 'Sahiwal', percentage: 82 },
      bpaSync: true,
      notes: 'Regular health monitoring required'
    }
  ];

  // Analytics data
  const analyticsData = {
    totalUploads: uploadHistory?.length,
    avgAtcScore: uploadHistory?.reduce((acc, item) => acc + item?.atcScore, 0) / uploadHistory?.length,
    healthyCount: uploadHistory?.filter(item => item?.healthStatus === 'Healthy')?.length,
    syncedToBpa: uploadHistory?.filter(item => item?.bpaSync)?.length,
    thisWeekUploads: 3,
    thisMonthUploads: uploadHistory?.length
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and search logic
  const filteredData = uploadHistory?.filter(item => {
    const matchesSearch = item?.animalType?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.animalId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesAnimalType = selectedFilters?.animalType === 'all' || 
                             item?.animalType?.toLowerCase()?.includes(selectedFilters?.animalType?.toLowerCase());
    
    const matchesHealthStatus = selectedFilters?.healthStatus === 'all' || 
                               item?.healthStatus === selectedFilters?.healthStatus;
    
    const matchesAtcScore = item?.atcScore >= selectedFilters?.atcScoreRange?.[0] && 
                           item?.atcScore <= selectedFilters?.atcScoreRange?.[1];

    return matchesSearch && matchesAnimalType && matchesHealthStatus && matchesAtcScore;
  });

  // Sort data
  const sortedData = [...filteredData]?.sort((a, b) => {
    if (sortConfig?.key === 'uploadDate') {
      const aDate = new Date(a[sortConfig?.key]);
      const bDate = new Date(b[sortConfig?.key]);
      return sortConfig?.direction === 'asc' ? aDate - bDate : bDate - aDate;
    }
    
    if (typeof a?.[sortConfig?.key] === 'number') {
      return sortConfig?.direction === 'asc' 
        ? a?.[sortConfig?.key] - b?.[sortConfig?.key]
        : b?.[sortConfig?.key] - a?.[sortConfig?.key];
    }
    
    const aValue = a?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
    const bValue = b?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
    
    if (sortConfig?.direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData?.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleExport = (format, selectedOnly = false) => {
    const dataToExport = selectedOnly ? 
      uploadHistory?.filter(item => selectedRecords?.includes(item?.id)) : 
      filteredData;
    
    console.log(`Exporting ${dataToExport?.length} records as ${format}`);
    setShowExportModal(false);
  };

  const handleRowSelect = (id) => {
    setSelectedRecords(prev => 
      prev?.includes(id) 
        ? prev?.filter(recordId => recordId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRecords(
      selectedRecords?.length === paginatedData?.length 
        ? [] 
        : paginatedData?.map(item => item?.id)
    );
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => 
      prev?.includes(id) 
        ? prev?.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                Loading Upload History
              </h2>
              <p className="text-muted-foreground">
                Fetching cattle and buffalo classification records...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Upload History Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive tracking and analysis of all cattle and buffalo classification data
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowExportModal(true)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Export Data
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/landing-dashboard')}
                  className="px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  New Upload
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Analytics Cards */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <AnalyticsCards data={analyticsData} />
          </motion.section>

          {/* Charts Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <UploadTrendsChart data={uploadHistory} />
              <HealthDistributionChart data={uploadHistory} />
            </div>
          </motion.section>

          {/* Search and Filter Panel */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <SearchFilterPanel
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={selectedFilters}
              onFiltersChange={setSelectedFilters}
              totalResults={filteredData?.length}
            />
          </motion.section>

          {/* Data Table */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <DataTable
              data={paginatedData}
              sortConfig={sortConfig}
              onSort={handleSort}
              selectedRecords={selectedRecords}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
              expandedRows={expandedRows}
              onToggleExpansion={toggleRowExpansion}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={sortedData?.length}
            />
          </motion.section>
        </div>
      </main>
      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
          selectedCount={selectedRecords?.length}
          totalCount={filteredData?.length}
        />
      )}
    </div>
  );
};

export default UploadHistoryDashboard;