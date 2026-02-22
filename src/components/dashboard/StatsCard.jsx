import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, type = 'neutral' }) => {
  const colorClasses = {
    income: 'text-green-600 bg-green-50',
    expense: 'text-red-600 bg-red-50',
    neutral: 'text-primary-black bg-primary-gray-100'
  };

  return (
    <div className="stats-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="stats-label">{title}</p>
          <h3 className="stats-value mt-2">{formatCurrency(value)}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[type]}`}>
          <Icon size={24} />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-1 text-sm">
          {trend > 0 ? (
            <>
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-green-600">+{trend}%</span>
            </>
          ) : trend < 0 ? (
            <>
              <TrendingDown size={16} className="text-red-600" />
              <span className="text-red-600">{trend}%</span>
            </>
          ) : null}
          <span className="text-primary-gray-600 ml-1">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
