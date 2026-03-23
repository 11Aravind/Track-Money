import useTransactions from '../hooks/useTransactions';
import useCategories from '../hooks/useCategories';
import useAnalytics from '../hooks/useAnalytics';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import TrendLineChart from '../components/charts/TrendLineChart';
import Card from '../components/common/Card';
import CoinLoader from '../components/common/CoinLoader';

const ReportsPage = () => {
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { categories, loading: categoriesLoading } = useCategories();
  const analytics = useAnalytics(transactions, categories);

  const loading = transactionsLoading || categoriesLoading;

  if (loading) {
    return (
      <div>
        <CoinLoader message="Loading reports..." />
      </div>
    );
  }

  const expenseCategories = analytics.categoryTotals.filter(cat => cat.type === 'expense');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-black">Reports & Analytics</h1>
        <p className="text-primary-gray-600 mt-1">Visualize your financial data</p>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-semibold text-primary-black mb-4">
            Category-wise Expenses
          </h2>
          <CategoryPieChart data={expenseCategories} />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-primary-black mb-4">
            Monthly Income vs Expense
          </h2>
          <MonthlyBarChart data={analytics.monthlyData} />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-primary-black mb-4">
            Income & Expense Trend
          </h2>
          <TrendLineChart data={analytics.monthlyData} />
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
