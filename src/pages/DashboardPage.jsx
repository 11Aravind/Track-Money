import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTransactions from '../hooks/useTransactions';
import useCategories from '../hooks/useCategories';
import useAnalytics from '../hooks/useAnalytics';
import StatsCard from '../components/dashboard/StatsCard';
import TransactionForm from '../components/transactions/TransactionForm';
import Modal from '../components/common/Modal';
import CoinLoader from '../components/common/CoinLoader';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import { Wallet, TrendingUp, TrendingDown, Plus, ArrowRight, History } from 'lucide-react';
import { formatCurrency, getMonthName } from '../utils/formatters';
import { filterByMonth, calculateTotalIncome, calculateTotalExpense } from '../utils/calculations';
import Button from '../components/common/Button';
import TransactionItem from '../components/transactions/TransactionItem';
import IconRenderer from '../components/common/IconRenderer';

const DashboardPage = () => {
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { categories, loading: categoriesLoading } = useCategories();
  const analytics = useAnalytics(transactions, categories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const navigate = useNavigate();

  const loading = transactionsLoading || categoriesLoading;

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  const { monthIncome, monthExpense } = useMemo(() => {
    const monthTransactions = filterByMonth(transactions, selectedMonth, analytics.currentYear);
    return {
      monthIncome: calculateTotalIncome(monthTransactions),
      monthExpense: calculateTotalExpense(monthTransactions)
    };
  }, [transactions, selectedMonth, analytics.currentYear]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <CoinLoader />
      </div>
    );
  }

  const getCategoryById = (id) => categories.find(cat => cat.id === id);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-text-primary tracking-widest uppercase">
            Control Center<span className="text-cyber-accent-green">_</span>
          </h1>
          <p className="text-[10px] font-bold text-cyber-accent-blue tracking-[0.3em] uppercase mt-1 opacity-70">
            Real-time Financial Telemetry
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="px-8 shadow-[0_0_20px_rgba(204,255,0,0.15)]">
          <Plus size={18} className="mr-2" />
          <span>New Entry</span>
        </Button>
      </div>

      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Active Liquidity"
          value={analytics.balance}
          icon={Wallet}
          type="neutral"
          className="border-surface-border-light"
        />
        <StatsCard
          title="Positive Inflow"
          value={analytics.totalIncome}
          icon={TrendingUp}
          type="income"
          className="border-cyber-accent-green/10"
          tags={analytics.incomeTags}
        />
        <StatsCard
          title="Resource Outflow"
          value={analytics.totalExpense}
          icon={TrendingDown}
          type="expense"
          className="border-cyber-accent-blue/10"
          tags={analytics.expenseTags}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Spending Trend */}
        <div className="lg:col-span-8 space-y-8">
          <div className="card border-surface-border-light bg-surface-overlay/20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-bold text-text-primary uppercase tracking-widest">Temporal Analysis</h2>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-cyber-accent-blue uppercase tracking-widest opacity-60">Cycle 2026</span>
              </div>
            </div>
            <div className="h-[300px]">
              <MonthlyBarChart data={analytics.monthlyData} />
            </div>
          </div>

          <div className="card border-surface-border-light bg-surface-overlay/20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <History className="text-cyber-accent-green" size={16} />
                <h2 className="text-xs font-bold text-text-primary uppercase tracking-widest">Recent Buffers</h2>
              </div>
              <button 
                onClick={() => navigate('/transactions')}
                className="text-cyber-accent-blue text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-text-primary transition-colors"
              >
                Access Archives <ArrowRight size={12} />
              </button>
            </div>
            <div className="divide-y divide-surface-border-light">
              {recentTransactions.map(transaction => (
                <TransactionItem 
                  key={transaction.id}
                  transaction={transaction}
                  category={getCategoryById(transaction.category)}
                  onEdit={() => navigate(`/transactions?edit=${transaction.id}`)}
                />
              ))}
              {recentTransactions.length === 0 && (
                <p className="py-8 text-center text-text-muted italic">No transactions yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Breakdown & Monthly Recap */}
        <div className="lg:col-span-4 space-y-8">
          <div className="card border-surface-border-light bg-surface-card/40">
            <h2 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-8">Monthly Snapshot</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="input mb-8 bg-input-bg border-surface-border uppercase text-[10px] font-bold tracking-widest text-text-primary"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i} className="bg-surface-card">
                  {getMonthName(i)}
                </option>
              ))}
            </select>

            <div className="space-y-4">
              <div className="p-5 bg-surface-overlay/40 rounded-xl border border-surface-border-light relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1 h-full bg-cyber-accent-green opacity-20" />
                <p className="text-[10px] font-bold text-cyber-accent-green uppercase tracking-widest mb-2">Total Inflow</p>
                <p className="text-2xl font-heading font-black text-text-primary">{formatCurrency(monthIncome)}</p>
              </div>
              <div className="p-5 bg-surface-overlay/40 rounded-xl border border-surface-border-light relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1 h-full bg-cyber-accent-blue opacity-20" />
                <p className="text-[10px] font-bold text-cyber-accent-blue uppercase tracking-widest mb-2">Total Outflow</p>
                <p className="text-2xl font-heading font-black text-text-primary">{formatCurrency(monthExpense)}</p>
              </div>
              <div className="p-5 bg-surface-overlay/40 rounded-xl border border-surface-border-light relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1 h-full bg-surface-border opacity-20" />
                <p className="text-[10px] font-bold text-text-muted-40 uppercase tracking-widest mb-2">Net Variance</p>
                <p className={`text-2xl font-heading font-black ${monthIncome - monthExpense >= 0 ? 'text-cyber-accent-green' : 'text-cyber-accent-blue'}`}>
                  {formatCurrency(monthIncome - monthExpense)}
                </p>
              </div>
            </div>
          </div>

          <div className="card border-surface-border-light bg-surface-overlay/20">
            <h2 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-8">Traffic Distribution</h2>
            <div className="space-y-6">
              {analytics.categoryTotals
                .sort((a, b) => b.total - a.total)
                .slice(0, 5)
                .map((cat) => {
                  const percentage = Math.round((cat.total / analytics.totalExpense) * 100) || 0;
                  return (
                    <div 
                      key={cat.id} 
                      className="group cursor-pointer"
                      onClick={() => navigate(`/transactions?category=${cat.id}`)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-surface-card/5 border border-surface-border-light flex items-center justify-center group-hover:border-cyber-accent-green group-hover:bg-cyber-accent-green/10 transition-all duration-300">
                            <IconRenderer iconName={cat.icon} className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-text-primary uppercase tracking-tighter group-hover:text-cyber-accent-green transition-colors">{cat.name}</p>
                            <p className="text-[8px] font-bold text-text-muted-40 uppercase tracking-[0.1em]">{cat.count} txns • {percentage}%</p>
                          </div>
                        </div>
                        <p className="text-sm font-heading font-black text-text-primary">{formatCurrency(cat.total)}</p>
                      </div>
                      <div className="h-1 w-full bg-surface-card/10 rounded-full overflow-hidden border border-surface-border-light">
                        <div 
                          className="h-full bg-cyber-accent-green transition-all duration-1000 group-hover:shadow-[0_0_8px_rgba(204,255,0,0.6)]" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              {analytics.categoryTotals.length === 0 && (
                <p className="text-center text-text-muted py-4 italic">No data yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

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
