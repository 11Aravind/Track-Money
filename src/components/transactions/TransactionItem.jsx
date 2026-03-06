import { useState } from 'react';
import { deleteTransaction } from '../../firebase/firestore';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Edit2, Trash2 } from 'lucide-react';
import Button from '../common/Button';

const typeConfig = {
  income:  { bg: 'bg-green-50',  text: 'text-green-600',  sign: '+' },
  expense: { bg: 'bg-red-50',    text: 'text-red-600',    sign: '-' },
  savings: { bg: 'bg-blue-50',   text: 'text-blue-600',   sign: '-' },
  lent:    { bg: 'bg-orange-50',  text: 'text-orange-600', sign: '-' },
  borrow:  { bg: 'bg-purple-50', text: 'text-purple-600', sign: '+' },
};

const TransactionItem = ({ transaction, category, onEdit }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    setDeleting(true);
    await deleteTransaction(transaction.id);
    setDeleting(false);
  };

  const config = typeConfig[transaction.type] || typeConfig.expense;

  return (
    <div className="transaction-item">
      <div className="flex items-center gap-3 flex-1">
        <div className={`p-2 rounded-lg ${config.bg}`}>
          <span className="text-2xl">{category?.icon || '💰'}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium text-primary-black truncate">
            {category?.name || 'Unknown'}
          </p>
          <div className="flex items-center gap-2 text-sm text-primary-gray-600">
            <span>{formatDate(transaction.date)}</span>
            {transaction.note && (
              <>
                <span>•</span>
                <span className="truncate">{transaction.note}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className={`text-lg font-semibold ${config.text}`}>
          {config.sign}{formatCurrency(transaction.amount)}
        </p>
        
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2 hover:bg-primary-gray-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 size={16} className="text-primary-gray-600" />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
