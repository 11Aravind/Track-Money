import { useState } from 'react';
import useTransactions from '../hooks/useTransactions';
import useCategories from '../hooks/useCategories';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { Plus } from 'lucide-react';

const TransactionsPage = () => {
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { categories, loading: categoriesLoading } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const loading = transactionsLoading || categoriesLoading;

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
  };

  if (loading) {
    return (
      <div>
        <LoadingSkeleton type="transaction" count={5} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-black">Transactions</h1>
          <p className="text-primary-gray-600 mt-1">Manage your income and expenses</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={20} />
          <span className="hidden sm:inline">Add Transaction</span>
        </Button>
      </div>

      <TransactionList
        transactions={transactions}
        categories={categories}
        onEdit={handleEdit}
      />

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
        size="lg"
      >
        <TransactionForm
          transaction={editingTransaction}
          categories={categories}
          onSuccess={handleSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default TransactionsPage;
