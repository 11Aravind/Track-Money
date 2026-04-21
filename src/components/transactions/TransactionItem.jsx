import { useState } from 'react';
import { deleteTransaction } from '../../firebase/firestore';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Edit2, Trash2 } from 'lucide-react';
import Button from '../common/Button';
import IconRenderer from '../common/IconRenderer';

const typeConfig = {
  income:  { border: 'border-cyber-accent-green/30', text: 'text-cyber-accent-green', sign: '+' },
  expense: { border: 'border-cyber-accent-blue/30',  text: 'text-cyber-accent-blue',  sign: '-' },
  savings: { border: 'border-cyber-accent-blue/30',  text: 'text-cyber-accent-blue',  sign: '-' },
  lent:    { border: 'border-cyber-accent-blue/30',  text: 'text-cyber-accent-blue',  sign: '-' },
  borrow:  { border: 'border-cyber-accent-green/30', text: 'text-cyber-accent-green', sign: '+' },
};

const TransactionItem = ({ transaction, category, onEdit }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Terminate this data entry?')) {
      return;
    }

    setDeleting(true);
    await deleteTransaction(transaction.id);
    setDeleting(false);
  };

  const config = typeConfig[transaction.type] || typeConfig.expense;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 hover:bg-surface-card/2 transition-colors duration-300 border-b border-surface-border-light group">
      <div className="flex items-center gap-4 flex-1 min-w-0 w-full sm:w-auto">
        <div 
          className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 flex-shrink-0 transition-all duration-500 group-hover:scale-110 ${config.border}`}
          style={{ backgroundColor: `${category?.color || '#007AFF'}15`, color: category?.color || '#007AFF' }}
        >
          <IconRenderer iconName={category?.icon} className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest truncate mb-0.5 group-hover:text-cyber-accent-green transition-colors">
            {category?.name || 'GENERIC_ENTRY'}
          </p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted-40 tracking-tighter overflow-hidden">
            <span className="flex-shrink-0">{formatDate(transaction.date)}</span>
            {transaction.note && (
              <>
                <span className="opacity-30">|</span>
                <span className="truncate italic group-hover:text-text-secondary transition-colors">{transaction.note}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        <div className="text-right">
          <p className={`text-lg font-heading font-black tracking-tighter ${config.text}`}>
            {config.sign}{formatCurrency(transaction.amount)}
          </p>
        </div>
        
        <div className="flex gap-2 min-opacity-0 md:opacity-0 group-hover:opacity-100 transition-all transform md:translate-x-2 group-hover:translate-x-0">
          <button
            onClick={() => onEdit(transaction)}
            className="w-8 h-8 flex border border-surface-border items-center justify-center hover:bg-surface-card/10 hover:border-cyber-accent-blue hover:text-cyber-accent-blue rounded-lg transition-all text-text-muted-40"
            title="Update Entry"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="w-8 h-8 flex border border-surface-border items-center justify-center hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 rounded-lg transition-all text-text-muted-40"
            title="Terminate Entry"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
