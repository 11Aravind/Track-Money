import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency, getMonthName } from '../../utils/formatters';

const MonthlyBarChart = ({ data }) => {
  const chartData = data.map((item) => ({
    month: getMonthName(item.month).substring(0, 3).toUpperCase(),
    income: item.income,
    expense: item.expense
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-card/90 backdrop-blur-xl p-4 rounded-xl border border-surface-border shadow-premium-xl">
          <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest mb-3 border-b border-surface-border-light pb-2">{label} TELEMETRY</p>
          <div className="space-y-1.5">
            <p className="text-xs font-mono text-cyber-accent-green flex justify-between gap-8">
              <span className="opacity-60 uppercase">Inflow:</span> 
              <span className="font-bold">{formatCurrency(payload[0].value)}</span>
            </p>
            <p className="text-xs font-mono text-cyber-accent-blue flex justify-between gap-8">
              <span className="opacity-60 uppercase">Outflow:</span> 
              <span className="font-bold">{formatCurrency(payload[1].value)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart 
        data={chartData} 
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        barGap={4}
        barCategoryGap="25%"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
        <XAxis 
          dataKey="month" 
          stroke="var(--surface-border)" 
          fontSize={10} 
          tick={{ fill: 'var(--text-secondary)', fontWeight: 700 }}
          axisLine={false}
          tickLine={false}
          dy={10}
          interval={0}
        />
        <YAxis 
          stroke="var(--surface-border)" 
          fontSize={10}
          tick={{ fill: 'var(--text-secondary)', fontWeight: 700 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--surface-border)' }} />
        <Bar 
          dataKey="income" 
          fill="var(--accent-green)" 
          radius={[4, 4, 0, 0]} 
          barSize={24}
        />
        <Bar 
          dataKey="expense" 
          fill="var(--accent-blue)" 
          radius={[4, 4, 0, 0]} 
          barSize={24}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;
