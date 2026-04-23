import { useState, useMemo } from 'react';
import useTransactions from '../hooks/useTransactions';
import useCategories from '../hooks/useCategories';
import useAnalytics from '../hooks/useAnalytics';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import TrendLineChart from '../components/charts/TrendLineChart';
import Card from '../components/common/Card';
import CoinLoader from '../components/common/CoinLoader';
import Button from '../components/common/Button';
import { getMonthName, getMonthOptions } from '../utils/formatters';
import { filterByMonth, filterByType, getCategoryTotals } from '../utils/calculations';
import { exportTransactionsToCSV } from '../utils/csvExporter';
import { Download, Filter, PieChart, BarChart3, TrendingUp } from 'lucide-react';

const ReportsPage = () => {
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { categories, loading: categoriesLoading } = useCategories();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedType, setSelectedType] = useState('expense');

  const loading = transactionsLoading || categoriesLoading;

  const filteredData = useMemo(() => {
    if (loading) return null;

    let monthData = filterByMonth(transactions, selectedMonth, selectedYear);
    
    // Filter by type for category breakdown
    const typeFilteredData = filterByType(monthData, selectedType);
    const categoryTotals = getCategoryTotals(typeFilteredData, categories);

    // Get current year data for monthly charts
    const currentYearTransactions = transactions.filter(t => {
      const date = t.date?.toDate ? t.date.toDate() : new Date(t.date);
      return date.getFullYear() === selectedYear;
    });

    return {
      categoryTotals,
      monthData,
      currentYearTransactions
    };
  }, [transactions, categories, selectedMonth, selectedYear, selectedType, loading]);

  const analytics = useAnalytics(transactions, categories);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <CoinLoader />
      </div>
    );
  }

  const handleExport = () => {
    exportTransactionsToCSV(filteredData.monthData, categories);
  };

  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-text-primary tracking-widest uppercase">
            Intelligence Reports<span className="text-cyber-accent-green">_</span>
          </h1>
          <p className="text-[10px] font-bold text-cyber-accent-blue tracking-[0.3em] uppercase mt-1 opacity-70">
            Deep-Dive Analytic Projection
          </p>
        </div>
        <Button onClick={handleExport} variant="secondary" className="px-6 border-surface-border hover:border-text-primary/30">
          <Download size={16} className="mr-2" />
          <span>Extract CSV Data</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="card border-surface-border-light bg-surface-overlay">
        <div className="flex items-center gap-3 mb-8">
          <Filter size={16} className="text-cyber-accent-blue" />
          <h2 className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Projection Parameters</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-3">
            <label className="label text-[8px] opacity-40">Temporal_Cycle</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="w-full bg-surface-card border border-surface-border rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-text-primary focus:outline-none focus:border-cyber-accent-blue"
            >
              {getMonthOptions().map((month) => (
                <option key={month.value} value={month.value} className="bg-surface-card">
                  {month.label.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <label className="label text-[8px] opacity-40">Year_Identifier</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full bg-surface-card border border-surface-border rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-text-primary focus:outline-none focus:border-cyber-accent-blue"
            >
              {yearOptions.map(year => (
                <option key={year} value={year} className="bg-surface-card">{year}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <label className="label text-[8px] opacity-40">Flow_Classification</label>
            <div className="flex bg-surface-card rounded-xl p-1 border border-surface-border">
              <button
                onClick={() => setSelectedType('expense')}
                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                  selectedType === 'expense' 
                    ? 'bg-cyber-accent-blue text-white shadow-[0_0_15px_rgba(0,122,255,0.2)]' 
                    : 'text-text-muted-40 hover:bg-surface-card/10'
                }`}
              >
                Expenses
              </button>
              <button
                onClick={() => setSelectedType('income')}
                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                  selectedType === 'income' 
                    ? 'bg-cyber-accent-green text-text-inverse shadow-[0_0_15_rgba(204,255,0,0.2)]' 
                    : 'text-text-muted-40 hover:bg-surface-card/10'
                }`}
              >
                Inflow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-surface-border-light bg-surface-overlay/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-surface-card/5 border border-surface-border flex items-center justify-center text-cyber-accent-blue">
              <PieChart size={20} />
            </div>
            <h2 className="text-xs font-bold text-text-primary uppercase tracking-widest leading-relaxed">
              {getMonthName(selectedMonth).toUpperCase()} {selectedType === 'expense' ? 'OUTFLOW' : 'INFLOW'} DISTRIBUTION
            </h2>
          </div>
          <CategoryPieChart data={filteredData.categoryTotals} />
        </Card>

        <Card className="border-surface-border-light bg-surface-overlay/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-surface-card/5 border border-surface-border flex items-center justify-center text-cyber-accent-green">
              <BarChart3 size={20} />
            </div>
            <h2 className="text-xs font-bold text-text-primary uppercase tracking-widest leading-relaxed">
               COMPARATIVE TELEMETRY ({selectedYear})
            </h2>
          </div>
          <MonthlyBarChart data={analytics.monthlyData} />
        </Card>

        <Card className="col-span-1 lg:col-span-2 border-surface-border-light bg-surface-overlay/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-surface-card/5 border border-surface-border flex items-center justify-center text-text-muted-40">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-xs font-bold text-text-primary uppercase tracking-widest leading-relaxed">
              LINEAR FLOW ANALYTICS
            </h2>
          </div>
          <TrendLineChart data={analytics.monthlyData} />
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
