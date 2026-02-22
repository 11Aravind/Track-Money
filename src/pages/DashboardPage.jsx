import { useState } from 'react';
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

const DashboardPage = () => {
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { categories, loading: categoriesLoading } = useCategories();
  const analytics = useAnalytics(transactions, categories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

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
          <h1 className="text-3xl font-bold text-primary-black">Dashboard</h1>
          <p className="text-primary-gray-600 mt-1">Welcome to your expense tracker</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          <span className="hidden md:inline">Add Transaction</span>
        </button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Total Balance"
          value={analytics.balance}
          icon={Wallet}
          type="neutral"
        />
        <StatsCard
          title="Total Income"
          value={analytics.totalIncome}
          icon={TrendingUp}
          type="income"
        />
        <StatsCard
          title="Total Expense"
          value={analytics.totalExpense}
          icon={TrendingDown}
          type="expense"
        />
      </div>

      {/* Monthly Overview */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary-black">Monthly Overview</h2>
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
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 mb-1">Income</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-700 mb-1">Expense</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(monthExpense)}</p>
          </div>
          <div className="p-4 bg-primary-gray-100 rounded-lg">
            <p className="text-sm text-primary-gray-700 mb-1">Balance</p>
            <p className="text-2xl font-bold text-primary-black">
              {formatCurrency(monthIncome - monthExpense)}
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {analytics.categoryTotals.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-primary-black mb-4">Category Breakdown</h2>
          <div className="space-y-3">
            {analytics.categoryTotals.slice(0, 5).map((cat) => (
              <div key={cat.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <p className="font-medium text-primary-black">{cat.name}</p>
                    <p className="text-sm text-primary-gray-600">{cat.count} transactions</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-primary-black">
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
