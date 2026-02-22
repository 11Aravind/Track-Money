import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addTransaction, updateTransaction } from '../../firebase/firestore';
import Input from '../common/Input';
import Button from '../common/Button';
import { formatDateInput } from '../../utils/formatters';

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

  // Filter categories by type
  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="label">Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={formData.type === 'expense'}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Expense</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="income"
              checked={formData.type === 'income'}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Income</span>
          </label>
        </div>
      </div>

      <Input
        label="Amount"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="0.00"
        required
        error={errors.amount}
        step="0.01"
        min="0"
      />

      <div className="mb-4">
        <label htmlFor="category" className="label">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className={`input ${errors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
        >
          <option value="">Select a category</option>
          {filteredCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-500">{errors.category}</p>
        )}
      </div>

      <Input
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        error={errors.date}
      />

      <div className="mb-4">
        <label htmlFor="note" className="label">
          Note (Optional)
        </label>
        <textarea
          id="note"
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Add a note..."
          rows="3"
          className="input resize-none"
        />
      </div>

      {errors.submit && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Saving...' : transaction ? 'Update' : 'Add Transaction'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
