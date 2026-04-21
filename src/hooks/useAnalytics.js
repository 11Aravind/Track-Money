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

    // Tag breakdown for overall stats
    const incomeTags = {
      income: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
      borrow: transactions.filter(t => t.type === 'borrow').reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
    };

    const expenseTags = {
      expense: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
      savings: transactions.filter(t => t.type === 'savings').reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
      lent: transactions.filter(t => t.type === 'lent').reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
    };

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
      incomeTags,
      expenseTags,
      categoryTotals,
      monthlyData,
      currentMonth,
      currentYear
    };
  }, [transactions, categories]);

  return analytics;
};

export default useAnalytics;
