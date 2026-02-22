export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date) => {
  if (!date) return '';
  
  // Handle Firestore Timestamp
  if (date?.toDate) {
    date = date.toDate();
  }
  
  // Handle string dates
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const formatDateInput = (date) => {
  if (!date) return '';
  
  // Handle Firestore Timestamp
  if (date?.toDate) {
    date = date.toDate();
  }
  
  // Handle string dates
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  // Format as YYYY-MM-DD for input[type="date"]
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const getMonthName = (monthIndex) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
};

export const getMonthOptions = () => {
  return [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' }
  ];
};
