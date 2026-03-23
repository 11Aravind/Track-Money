import { useState } from 'react';
import { deleteTransaction } from '../../firebase/firestore';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Edit2, Trash2 } from 'lucide-react';
import Button from '../common/Button';

const typeConfig = {
  income:  { bg: 'bg-finance-income-light',  text: 'text-finance-income',  sign: '+' },
  expense: { bg: 'bg-finance-expense-light',  text: 'text-finance-expense',  sign: '-' },
  savings: { bg: 'bg-finance-savings-light',  text: 'text-finance-savings',  sign: '-' },
  lent:    { bg: 'bg-finance-lent-light',     text: 'text-finance-lent',     sign: '-' },
  borrow:  { bg: 'bg-finance-borrow-light',   text: 'text-finance-borrow',   sign: '+' },
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
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`p-2 rounded-lg flex-shrink-0 ${config.bg}`}>
          <span className="text-xl sm:text-2xl">{category?.icon || '💰'}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium text-primary-black truncate text-sm sm:text-base">
            {category?.name || 'Unknown'}
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-gray-600">
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

      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
        <p className={`text-base sm:text-lg font-semibold ${config.text}`}>
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
