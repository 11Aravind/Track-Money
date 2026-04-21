import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useTransactions from '../hooks/useTransactions';
import useCategories from '../hooks/useCategories';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import CoinLoader from '../components/common/CoinLoader';
import { Plus } from 'lucide-react';

const TransactionsPage = () => {
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { categories, loading: categoriesLoading } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'all';
  const initialCategory = searchParams.get('category') || 'all';

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
        <CoinLoader message="Loading transactions..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-text-primary tracking-widest uppercase">
            Data Ledger<span className="text-cyber-accent-green">_</span>
          </h1>
          <p className="text-[10px] font-bold text-cyber-accent-blue tracking-[0.3em] uppercase mt-1 opacity-70">
            Historical Financial Records
          </p>
        </div>
        <Button onClick={() => setShowModal(true)} className="px-8 shadow-[0_0_20px_rgba(204,255,0,0.15)]">
          <Plus size={18} className="mr-2" />
          <span>New Record</span>
        </Button>
      </div>

      <div className="card border-white/5 bg-black/20 p-0 overflow-hidden">
        <TransactionList
          transactions={transactions}
          categories={categories}
          onEdit={handleEdit}
          initialType={initialType}
          initialCategory={initialCategory}
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingTransaction ? 'Modify_Entry' : 'Initialize_Entry'}
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
