export interface Transaction {
  id?: string;
  amount: string | number;
  type: 'income' | 'expense' | 'borrow' | 'savings' | 'lent';
  category: string;
  date: any; // Can be Firebase Timestamp or Date
  note?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
}
