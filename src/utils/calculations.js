export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
};

export const calculateTotalExpense = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
};

export const calculateBalance = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expense = calculateTotalExpense(transactions);
  return income - expense;
};

export const filterByMonth = (transactions, month, year) => {
  return transactions.filter(t => {
    const date = t.date?.toDate ? t.date.toDate() : new Date(t.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });
};

export const filterByCategory = (transactions, categoryId) => {
  return transactions.filter(t => t.category === categoryId);
};

export const filterByType = (transactions, type) => {
  return transactions.filter(t => t.type === type);
};

export const filterByDateRange = (transactions, startDate, endDate) => {
  return transactions.filter(t => {
    const date = t.date?.toDate ? t.date.toDate() : new Date(t.date);
    return date >= startDate && date <= endDate;
  });
};

export const getCategoryTotals = (transactions, categories) => {
  const categoryMap = {};
  
  categories.forEach(cat => {
    categoryMap[cat.id] = {
      ...cat,
      total: 0,
      count: 0
    };
  });
  
  transactions.forEach(t => {
    if (categoryMap[t.category]) {
      categoryMap[t.category].total += parseFloat(t.amount) || 0;
      categoryMap[t.category].count += 1;
    }
  });
  
  return Object.values(categoryMap).filter(cat => cat.total > 0);
};

export const getMonthlyData = (transactions, year) => {
  const monthlyData = Array(12).fill(null).map((_, index) => ({
    month: index,
    income: 0,
    expense: 0
  }));
  
  transactions.forEach(t => {
    const date = t.date?.toDate ? t.date.toDate() : new Date(t.date);
    if (date.getFullYear() === year) {
      const month = date.getMonth();
      if (t.type === 'income') {
        monthlyData[month].income += parseFloat(t.amount) || 0;
      } else {
        monthlyData[month].expense += parseFloat(t.amount) || 0;
      }
    }
  });
  
  return monthlyData;
};

export const searchTransactions = (transactions, searchTerm) => {
  const term = searchTerm.toLowerCase();
  return transactions.filter(t => 
    t.note?.toLowerCase().includes(term) ||
    t.amount?.toString().includes(term)
  );
};
