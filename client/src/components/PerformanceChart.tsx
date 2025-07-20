import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function PerformanceChart() {
  const { data: marketStats } = useQuery({
    queryKey: ['/api/analytics/market-stats'],
  });

  // Generate mock performance data for demonstration
  const generatePerformanceData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      month,
      portfolio: 100 + (Math.random() * 50 + index * 15),
      market: 100 + (Math.random() * 30 + index * 8),
    }));
  };

  const data = generatePerformanceData();

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(139, 92, 246, 0.1)' }}
          />
          <YAxis 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(139, 92, 246, 0.1)' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--quantum-slate)', 
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="portfolio" 
            stroke="var(--quantum-blue)" 
            strokeWidth={2}
            name="Portfolio Performance"
            dot={{ fill: 'var(--quantum-blue)', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="market" 
            stroke="var(--quantum-purple)" 
            strokeWidth={2}
            name="Market Average"
            dot={{ fill: 'var(--quantum-purple)', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
