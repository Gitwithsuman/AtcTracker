import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/ui/AppIcon';

const HealthTrendsChart = ({ data, selectedMetrics, onMetricToggle }) => {
  const metrics = [
    { key: 'bcs', label: 'Body Condition Score', color: '#2D5A27' },
    { key: 'lameness', label: 'Lameness Score', color: '#FF8C00' },
    { key: 'overall', label: 'Overall Health', color: '#22C55E' },
    { key: 'weight', label: 'Weight Index', color: '#8B4513' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{`Date: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg">
            <Icon name="TrendingUp" size={24} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Health Trends</h3>
            <p className="text-sm text-muted-foreground">Historical health metrics over time</p>
          </div>
        </div>
      </div>
      {/* Metric Toggles */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics?.map((metric) => (
          <button
            key={metric?.key}
            onClick={() => onMetricToggle(metric?.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
              selectedMetrics?.includes(metric?.key)
                ? 'border-primary bg-primary/10 text-primary' :'border-border bg-muted/50 text-muted-foreground hover:border-primary/50'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: metric?.color }}
            />
            <span className="text-sm font-medium">{metric?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedMetrics?.includes('bcs') && (
              <Line
                type="monotone"
                dataKey="bcs"
                stroke="#2D5A27"
                strokeWidth={2}
                dot={{ fill: '#2D5A27', strokeWidth: 2, r: 4 }}
                name="Body Condition Score"
              />
            )}
            
            {selectedMetrics?.includes('lameness') && (
              <Line
                type="monotone"
                dataKey="lameness"
                stroke="#FF8C00"
                strokeWidth={2}
                dot={{ fill: '#FF8C00', strokeWidth: 2, r: 4 }}
                name="Lameness Score"
              />
            )}
            
            {selectedMetrics?.includes('overall') && (
              <Line
                type="monotone"
                dataKey="overall"
                stroke="#22C55E"
                strokeWidth={2}
                dot={{ fill: '#22C55E', strokeWidth: 2, r: 4 }}
                name="Overall Health"
              />
            )}
            
            {selectedMetrics?.includes('weight') && (
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#8B4513"
                strokeWidth={2}
                dot={{ fill: '#8B4513', strokeWidth: 2, r: 4 }}
                name="Weight Index"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Legend */}
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <div className="text-xs text-muted-foreground">
          <p className="mb-1"><strong>Chart Guide:</strong></p>
          <p>• BCS: Body Condition Score (1-5 scale, 3 is ideal)</p>
          <p>• Lameness: Mobility assessment (0-5 scale, lower is better)</p>
          <p>• Overall Health: Composite health score (0-100 scale)</p>
          <p>• Weight Index: Relative weight assessment (80-120 scale)</p>
        </div>
      </div>
    </div>
  );
};

export default HealthTrendsChart;