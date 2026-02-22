import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency, getMonthName } from '../../utils/formatters';

const MonthlyBarChart = ({ data }) => {
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
      <RechartsBarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" stroke="#6B7280" />
        <YAxis stroke="#6B7280" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="income" fill="#10B981" name="Income" />
        <Bar dataKey="expense" fill="#EF4444" name="Expense" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;
