import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { subscribeToTransactions, subscribeToCategories } from '../firebase/firestore';

const TransactionContext = createContext({});

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionContext must be used within TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    transactions: true,
    categories: true
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setCategories([]);
      setLoading({ transactions: false, categories: false });
      return;
    }

    setLoading({ transactions: true, categories: true });

    // Global listener for transactions
    const unsubscribeTransactions = subscribeToTransactions(
      user.uid, 
      (data) => {
        setTransactions(data);
        setLoading(prev => ({ ...prev, transactions: false }));
      },
      (err) => {
        setError(err.message);
        setLoading(prev => ({ ...prev, transactions: false }));
      }
    );

    // Global listener for categories
    const unsubscribeCategories = subscribeToCategories(
      user.uid, 
      (data) => {
        setCategories(data);
        setLoading(prev => ({ ...prev, categories: false }));
      },
      (err) => {
        setError(err.message);
        setLoading(prev => ({ ...prev, categories: false }));
      }
    );

    return () => {
      unsubscribeTransactions();
      unsubscribeCategories();
    };
  }, [user]);

  const value = {
    transactions,
    categories,
    loadingTransactions: loading.transactions,
    loadingCategories: loading.categories,
    error
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
