export const exportTransactionsToCSV = (transactions, categories) => {
  const getCategoryName = (id) => {
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
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `trackify_transactions_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
