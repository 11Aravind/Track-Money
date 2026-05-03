import { Transaction, Category } from './types';

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'income' || t.type === 'borrow')
    .reduce((sum, t) => sum + (parseFloat(t.amount.toString()) || 0), 0);
};

export const calculateTotalExpense = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'expense' || t.type === 'savings' || t.type === 'lent')
    .reduce((sum, t) => sum + (parseFloat(t.amount.toString()) || 0), 0);
};

export const calculateBalance = (transactions: Transaction[]): number => {
  const income = calculateTotalIncome(transactions);
  const expense = calculateTotalExpense(transactions);
  return income - expense;
};

export const filterByMonth = (transactions: Transaction[], month: number, year: number): Transaction[] => {
  return transactions.filter(t => {
    const date = t.date?.toDate ? t.date.toDate() : new Date(t.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });
};

export const filterByCategory = (transactions: Transaction[], categoryId: string): Transaction[] => {
  return transactions.filter(t => t.category === categoryId);
};

export const filterByType = (transactions: Transaction[], type: string): Transaction[] => {
  return transactions.filter(t => t.type === type);
};

export const filterByDateRange = (transactions: Transaction[], startDate: Date, endDate: Date): Transaction[] => {
  return transactions.filter(t => {
    const date = t.date?.toDate ? t.date.toDate() : new Date(t.date);
    return date >= startDate && date <= endDate;
  });
};

export const getCategoryTotals = (transactions: Transaction[], categories: Category[]) => {
  const categoryMap: Record<string, any> = {};
  
  categories.forEach(cat => {
    categoryMap[cat.id] = {
      ...cat,
      total: 0,
      count: 0
    };
  });
  
  transactions.forEach(t => {
    if (categoryMap[t.category]) {
      categoryMap[t.category].total += parseFloat(t.amount.toString()) || 0;
      categoryMap[t.category].count += 1;
    }
  });
  
  return Object.values(categoryMap).filter(cat => cat.total > 0);
};

export const getMonthlyData = (transactions: Transaction[], year: number) => {
  const monthlyData = Array(12).fill(null).map((_, index) => ({
    month: index,
    income: 0,
    expense: 0
  }));
  
  transactions.forEach(t => {
    const date = t.date?.toDate ? t.date.toDate() : new Date(t.date);
    if (date.getFullYear() === year) {
      const month = date.getMonth();
      const isInflow = t.type === 'income' || t.type === 'borrow';
      if (isInflow) {
        monthlyData[month].income += parseFloat(t.amount.toString()) || 0;
      } else {
        monthlyData[month].expense += parseFloat(t.amount.toString()) || 0;
      }
    }
  });
  
  return monthlyData;
};

export const searchTransactions = (transactions: Transaction[], searchTerm: string): Transaction[] => {
  const term = searchTerm.toLowerCase();
  return transactions.filter(t => 
    t.note?.toLowerCase().includes(term) ||
    t.amount?.toString().includes(term)
  );
};
