import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const TraitComparisonChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              <span style={{ color: entry?.color }}>{entry?.dataKey}: </span>
              {entry?.value} {entry?.payload?.unit}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <div className="w-6 h-6 bg-accent rounded"></div>
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Trait Comparison</h3>
          <p className="text-sm text-muted-foreground">Measured vs. benchmark values</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="measured" 
              fill="var(--color-primary)" 
              name="Measured"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="benchmark" 
              fill="var(--color-secondary)" 
              name="Benchmark"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TraitComparisonChart;