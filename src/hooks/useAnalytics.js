import { useMemo } from 'react';
import {
  calculateTotalIncome,
  calculateTotalExpense,
  calculateBalance,
  filterByMonth,
  getCategoryTotals,
  getMonthlyData
} from '../utils/calculations';

export const useAnalytics = (transactions, categories) => {
  const analytics = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Overall totals
    const totalIncome = calculateTotalIncome(transactions);
    const totalExpense = calculateTotalExpense(transactions);
    const balance = calculateBalance(transactions);

    // Current month data
    const currentMonthTransactions = filterByMonth(transactions, currentMonth, currentYear);
    const monthIncome = calculateTotalIncome(currentMonthTransactions);
    const monthExpense = calculateTotalExpense(currentMonthTransactions);

    // Category breakdown
    const categoryTotals = getCategoryTotals(transactions, categories);

    // Monthly data for charts
    const monthlyData = getMonthlyData(transactions, currentYear);

    return {
      totalIncome,
      totalExpense,
      balance,
      monthIncome,
      monthExpense,
      categoryTotals,
      monthlyData,
      currentMonth,
      currentYear
    };
  }, [transactions, categories]);

  return analytics;
};

export default useAnalytics;
