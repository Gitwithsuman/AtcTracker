import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const HealthDistributionChart = ({ data }) => {
  // Process health status data
  const healthDistribution = data?.reduce((acc, item) => {
    const status = item?.healthStatus;
    acc[status] = (acc?.[status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(healthDistribution)?.map(([status, count]) => ({
    name: status,
    value: count,
    percentage: ((count / data?.length) * 100)?.toFixed(1)
  }));

  // Process ATC score distribution
  const atcRanges = [
    { range: '90-100', min: 90, max: 100, color: '#22c55e' },
    { range: '80-89', min: 80, max: 89, color: '#3b82f6' },
    { range: '70-79', min: 70, max: 79, color: '#f59e0b' },
    { range: '60-69', min: 60, max: 69, color: '#ef4444' },
    { range: '0-59', min: 0, max: 59, color: '#6b7280' }
  ];

  const atcDistribution = atcRanges?.map(range => {
    const count = data?.filter(item => 
      item?.atcScore >= range?.min && item?.atcScore <= range?.max
    )?.length;
    
    return {
      range: range?.range,
      count,
      percentage: ((count / data?.length) * 100)?.toFixed(1),
      fill: range?.color
    };
  });

  const HEALTH_COLORS = {
    'Healthy': '#22c55e',
    'Alert': '#f59e0b',
    'Monitor': '#3b82f6',
    'Critical': '#ef4444'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground">{data?.name || data?.range}</p>
          <p className="text-sm text-muted-foreground">
            Count: <span className="font-medium text-foreground">{data?.value || data?.count}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage: <span className="font-medium text-foreground">{data?.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Health & Performance Distribution</h3>
        <p className="text-sm text-muted-foreground">Overview of cattle and buffalo health status and ATC score ranges</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Status Pie Chart */}
        <div>
          <h4 className="text-md font-semibold text-foreground mb-4">Health Status Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData?.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={HEALTH_COLORS?.[entry?.name] || '#6b7280'}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Health Status Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData?.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: HEALTH_COLORS?.[item?.name] || '#6b7280' }}
                />
                <span className="text-sm text-foreground">
                  {item?.name} ({item?.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ATC Score Distribution Bar Chart */}
        <div>
          <h4 className="text-md font-semibold text-foreground mb-4">ATC Score Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={atcDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="range" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={4}>
                  {atcDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* ATC Score Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {atcDistribution?.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded" 
                  style={{ backgroundColor: item?.fill }}
                />
                <span className="text-sm text-foreground">
                  {item?.range}% ({item?.count} animals)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Summary Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-success">
            {healthDistribution?.Healthy || 0}
          </div>
          <div className="text-sm text-muted-foreground">Healthy Animals</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-warning">
            {(healthDistribution?.Alert || 0) + (healthDistribution?.Monitor || 0)}
          </div>
          <div className="text-sm text-muted-foreground">Need Attention</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">
            {data?.filter(item => item?.atcScore >= 80)?.length}
          </div>
          <div className="text-sm text-muted-foreground">High ATC (80%+)</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {(data?.reduce((acc, item) => acc + item?.atcScore, 0) / data?.length)?.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground">Average ATC</div>
        </div>
      </div>
    </motion.div>
  );
};

export default HealthDistributionChart;