import React from 'react';
import { motion } from 'framer-motion';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { format, parseISO, eachWeekOfInterval, subWeeks } from 'date-fns';

const UploadTrendsChart = ({ data }) => {
  // Process data to show weekly upload trends
  const processUploadTrends = () => {
    const now = new Date();
    const twelveWeeksAgo = subWeeks(now, 12);
    const weeks = eachWeekOfInterval({
      start: twelveWeeksAgo,
      end: now
    });

    return weeks?.map(weekStart => {
      const weekEnd = new Date(weekStart);
      weekEnd?.setDate(weekStart?.getDate() + 6);
      
      const weekUploads = data?.filter(upload => {
        const uploadDate = parseISO(upload?.uploadDate);
        return uploadDate >= weekStart && uploadDate <= weekEnd;
      });

      const cattleCount = weekUploads?.filter(u => 
        u?.animalType?.toLowerCase()?.includes('cow') || 
        u?.animalType?.toLowerCase()?.includes('friesian') ||
        u?.animalType?.toLowerCase()?.includes('jersey') ||
        u?.animalType?.toLowerCase()?.includes('gir') ||
        u?.animalType?.toLowerCase()?.includes('sahiwal')
      )?.length;

      const buffaloCount = weekUploads?.filter(u => 
        u?.animalType?.toLowerCase()?.includes('buffalo') ||
        u?.animalType?.toLowerCase()?.includes('murrah')
      )?.length;

      return {
        week: format(weekStart, 'MMM dd'),
        cattle: cattleCount,
        buffalo: buffaloCount,
        total: weekUploads?.length,
        avgScore: weekUploads?.length > 0 
          ? weekUploads?.reduce((acc, u) => acc + u?.atcScore, 0) / weekUploads?.length 
          : 0
      };
    });
  };

  const chartData = processUploadTrends();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground mb-2">{`Week of ${label}`}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="inline-block w-3 h-3 rounded-full bg-primary mr-2"></span>
              Cattle: <span className="font-medium">{payload?.[0]?.value}</span>
            </p>
            <p className="text-sm">
              <span className="inline-block w-3 h-3 rounded-full bg-secondary mr-2"></span>
              Buffalo: <span className="font-medium">{payload?.[1]?.value}</span>
            </p>
            <p className="text-sm">
              <span className="inline-block w-3 h-3 rounded-full bg-accent mr-2"></span>
              Total: <span className="font-medium">{payload?.[2]?.value}</span>
            </p>
            {payload?.[3] && (
              <p className="text-sm">
                Avg ATC Score: <span className="font-medium">{payload?.[3]?.value?.toFixed(1)}%</span>
              </p>
            )}
          </div>
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Upload Trends</h3>
          <p className="text-sm text-muted-foreground">Weekly cattle and buffalo upload activity</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Cattle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-muted-foreground">Buffalo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span className="text-muted-foreground">Total</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="cattleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="buffaloGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="week" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="cattle"
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="url(#cattleGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="buffalo"
              stackId="1"
              stroke="hsl(var(--secondary))"
              fill="url(#buffaloGradient)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {data?.filter(u => u?.animalType?.toLowerCase()?.includes('cow') || 
                               u?.animalType?.toLowerCase()?.includes('friesian') ||
                               u?.animalType?.toLowerCase()?.includes('jersey') ||
                               u?.animalType?.toLowerCase()?.includes('gir') ||
                               u?.animalType?.toLowerCase()?.includes('sahiwal'))?.length}
          </div>
          <div className="text-sm text-muted-foreground">Total Cattle</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {data?.filter(u => u?.animalType?.toLowerCase()?.includes('buffalo') ||
                               u?.animalType?.toLowerCase()?.includes('murrah'))?.length}
          </div>
          <div className="text-sm text-muted-foreground">Total Buffalo</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {(data?.reduce((acc, u) => acc + u?.atcScore, 0) / data?.length)?.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground">Avg ATC Score</div>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadTrendsChart;