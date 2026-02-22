import { useTransactionContext } from '../context/TransactionContext';

export const useTransactions = () => {
  const { transactions, loadingTransactions: loading, error } = useTransactionContext();
  return { transactions, loading, error };
};

export default useTransactions;
