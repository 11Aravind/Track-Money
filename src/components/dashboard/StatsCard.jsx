import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, type = 'neutral', className = '' }) => {
  const colorClasses = {
    income: 'text-finance-income bg-finance-income-light',
    expense: 'text-finance-expense bg-finance-expense-light',
    savings: 'text-finance-savings bg-finance-savings-light',
    lent: 'text-finance-lent bg-finance-lent-light',
    borrow: 'text-finance-borrow bg-finance-borrow-light',
    neutral: 'text-brand-primary bg-blue-50'
  };

  return (
    <div className={`stats-card hover-lift ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="stats-label">{title}</p>
          <h3 className="stats-value mt-2">{formatCurrency(value)}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[type]}`}>
          <Icon size={24} />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-1 text-sm">
          {trend > 0 ? (
            <>
              <TrendingUp size={16} className="text-finance-income" />
              <span className="text-finance-income">+{trend}%</span>
            </>
          ) : trend < 0 ? (
            <>
              <TrendingDown size={16} className="text-finance-expense" />
              <span className="text-finance-expense">{trend}%</span>
            </>
          ) : null}
          <span className="text-text-muted ml-1">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
