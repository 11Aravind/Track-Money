import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency, getMonthName } from '../../utils/formatters';

const TrendLineChart = ({ data }) => {
  const chartData = data.map((item) => ({
    month: getMonthName(item.month).substring(0, 3),
    income: item.income,
    expense: item.expense
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-premium border border-primary-gray-200">
          <p className="font-medium text-primary-black mb-2">{label}</p>
          <p className="text-sm text-green-600">
            Income: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-red-600">
            Expense: {formatCurrency(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" stroke="#6B7280" />
        <YAxis stroke="#6B7280" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="income" 
          stroke="#10B981" 
          strokeWidth={2}
          name="Income"
          dot={{ fill: '#10B981' }}
        />
        <Line 
          type="monotone" 
          dataKey="expense" 
          stroke="#EF4444" 
          strokeWidth={2}
          name="Expense"
          dot={{ fill: '#EF4444' }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default TrendLineChart;
