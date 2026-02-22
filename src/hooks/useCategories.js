import { useTransactionContext } from '../context/TransactionContext';

export const useCategories = () => {
  const { categories, loadingCategories: loading, error } = useTransactionContext();
  return { categories, loading, error };
};

export default useCategories;
