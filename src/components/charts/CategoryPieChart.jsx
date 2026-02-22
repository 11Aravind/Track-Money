import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#000000', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB'];

const CategoryPieChart = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.total,
    icon: item.icon
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-premium border border-primary-gray-200">
          <p className="font-medium text-primary-black">
            {payload[0].payload.icon} {payload[0].name}
          </p>
          <p className="text-sm text-primary-gray-600">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-primary-gray-500">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
