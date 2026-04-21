import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addTransaction, updateTransaction } from '../../firebase/firestore';
import Input from '../common/Input';
import Button from '../common/Button';
import { formatDateInput } from '../../utils/formatters';
import CategorySelector from '../categories/CategorySelector';

const TransactionForm = ({ transaction, categories, onSuccess, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    amount: transaction?.amount || '',
    type: transaction?.type || 'expense',
    category: transaction?.category || '',
    date: transaction?.date ? formatDateInput(transaction.date) : formatDateInput(new Date()),
    note: transaction?.note || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategorySelect = (categoryId) => {
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    if (!selectedCategory) return;

    setFormData(prev => ({
      ...prev,
      category: categoryId,
      type: selectedCategory.type
    }));

    if (errors.category) {
      setErrors(prev => ({
        ...prev,
        category: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (loading) return;
    setLoading(true);
    
    const transactionData = {
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: new Date(formData.date),
      note: formData.note
    };

    let result;
    if (transaction) {
      result = await updateTransaction(transaction.id, transactionData);
    } else {
      result = await addTransaction(user.uid, transactionData);
    }

    if (result.success) {
      onSuccess?.();
    } else {
      setErrors({ submit: result.error });
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <label className="label block border-b border-surface-border-light pb-2">
          1. System Classification <span className="text-cyber-accent-blue opacity-50">*</span>
        </label>
        <CategorySelector 
          categories={categories}
          selectedCategoryId={formData.category}
          onSelect={handleCategorySelect}
        />
        {errors.category && (
          <p className="mt-2 text-[10px] font-bold text-cyber-accent-blue uppercase tracking-widest animate-pulse">{errors.category}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="label block border-b border-surface-border-light pb-2">
            2. Quantum Amount <span className="text-cyber-accent-blue opacity-50">*</span>
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-accent-green font-heading font-black text-2xl group-focus-within:scale-110 transition-transform tracking-tighter">¥</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
              step="0.01"
              min="0"
              className="w-full bg-input-bg border border-surface-border rounded-xl py-4 pl-12 pr-4 text-3xl font-heading font-black text-text-primary focus:outline-none focus:border-cyber-accent-green transition-all placeholder:text-text-muted-40"
            />
          </div>
          {errors.amount && (
            <p className="mt-2 text-[10px] font-bold text-cyber-accent-blue uppercase tracking-widest animate-pulse">{errors.amount}</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="label block border-b border-surface-border-light pb-2">
            3. Temporal Marker <span className="text-cyber-accent-blue opacity-50">*</span>
          </label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            error={errors.date}
            className="py-4 bg-input-bg text-sm font-mono tracking-tighter"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label htmlFor="note" className="label block border-b border-surface-border-light pb-2">
          4. Buffer Metadata <span className="text-text-muted-40">(OPTIONAL)</span>
        </label>
        <textarea
          id="note"
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Append supplementary data..."
          rows="3"
          className="w-full px-4 py-4 border border-surface-border rounded-xl bg-input-bg focus:outline-none focus:border-cyber-accent-green transition-all text-text-primary placeholder:text-text-muted-40 resize-none font-mono text-xs tracking-tighter"
        />
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-pulse">
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">CRITICAL_ERROR: {errors.submit}</p>
        </div>
      )}

      <div className="flex gap-4 pt-4 border-t border-surface-border-light">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="flex-1 py-4 text-sm tracking-[0.2em]"
        >
          {loading ? 'PROCESSING...' : transaction ? 'SYNC_CHANGES' : 'INITIALIZE_ENTRY'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
            className="px-8 py-4 text-sm tracking-[0.2em] border-cyber-accent-blue/30 text-cyber-accent-blue hover:bg-cyber-accent-blue/10"
          >
            ABORT
          </Button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
