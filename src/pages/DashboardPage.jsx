import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTransactions from '../hooks/useTransactions';
import useCategories from '../hooks/useCategories';
import useAnalytics from '../hooks/useAnalytics';
import StatsCard from '../components/dashboard/StatsCard';
import TransactionForm from '../components/transactions/TransactionForm';
import Modal from '../components/common/Modal';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { Wallet, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { formatCurrency, getMonthName } from '../utils/formatters';
import { filterByMonth } from '../utils/calculations';
import Button from '../components/common/Button';

const DashboardPage = () => {
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { categories, loading: categoriesLoading } = useCategories();
  const analytics = useAnalytics(transactions, categories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const navigate = useNavigate();

  const loading = transactionsLoading || categoriesLoading;

  if (loading) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <LoadingSkeleton type="card" count={3} />
        </div>
      </div>
    );
  }

  const monthTransactions = filterByMonth(transactions, selectedMonth, analytics.currentYear);
  const monthIncome = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const monthExpense = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-1">Welcome to your expense tracker</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          <span className="hidden sm:inline">Add Transaction</span>
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Total Balance"
          value={analytics.balance}
          icon={Wallet}
          type="neutral"
          className="animate-card-in"
        />
        <StatsCard
          title="Total Income"
          value={analytics.totalIncome}
          icon={TrendingUp}
          type="income"
          className="animate-card-in-delay-1"
        />
        <StatsCard
          title="Total Expense"
          value={analytics.totalExpense}
          icon={TrendingDown}
          type="expense"
          className="animate-card-in-delay-2"
        />
      </div>

      {/* Monthly Overview */}
      <div className="card mb-6 animate-card-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Monthly Overview</h2>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="input w-auto"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {getMonthName(i)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className="p-4 bg-finance-income-light rounded-xl cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => navigate('/transactions?type=income')}
          >
            <p className="text-sm text-finance-income font-medium mb-1">Income</p>
            <p className="text-2xl font-bold text-finance-income">{formatCurrency(monthIncome)}</p>
          </div>
          <div 
            className="p-4 bg-finance-expense-light rounded-xl cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => navigate('/transactions?type=expense')}
          >
            <p className="text-sm text-finance-expense font-medium mb-1">Expense</p>
            <p className="text-2xl font-bold text-finance-expense">{formatCurrency(monthExpense)}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-brand-primary font-medium mb-1">Balance</p>
            <p className="text-2xl font-bold text-brand-primary">
              {formatCurrency(monthIncome - monthExpense)}
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {analytics.categoryTotals.length > 0 && (
        <div className="card animate-card-in">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Category Breakdown</h2>
          <div className="space-y-3">
            {analytics.categoryTotals.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-primary-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <p className="font-medium text-text-primary">{cat.name}</p>
                    <p className="text-sm text-text-secondary">{cat.count} transactions</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-text-primary">
                  {formatCurrency(cat.total)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Transaction"
        size="lg"
      >
        <TransactionForm
          categories={categories}
          onSuccess={() => setShowAddModal(false)}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
};

export default DashboardPage;
