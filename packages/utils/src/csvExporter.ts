import { Transaction, Category } from './types';

export const exportTransactionsToCSV = (transactions: Transaction[], categories: Category[]) => {
  const getCategoryName = (id: string) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : 'Unknown';
  };

  const headers = ['Date', 'Category', 'Type', 'Amount', 'Note'];
  const rows = transactions.map(t => [
    t.date?.toDate ? t.date.toDate().toLocaleDateString() : new Date(t.date).toLocaleDateString(),
    getCategoryName(t.category),
    t.type,
    t.amount,
    t.note || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `trackify_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.warn('CSV Export is only supported in browser environments');
    return csvContent;
  }
};
