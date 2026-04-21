import { useState } from 'react';
import TransactionItem from './TransactionItem';
import { Search, Filter } from 'lucide-react';
import { searchTransactions, filterByMonth, filterByCategory, filterByType } from '../../utils/calculations';
import { getMonthOptions } from '../../utils/formatters';

const TransactionList = ({ transactions, categories, onEdit, initialType = 'all', initialCategory = 'all' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState(initialType);
  const [showFilters, setShowFilters] = useState(initialType !== 'all' || initialCategory !== 'all');

  // Apply filters
  let filteredTransactions = transactions;

  if (searchTerm) {
    filteredTransactions = searchTransactions(filteredTransactions, searchTerm);
  }

  if (selectedMonth !== 'all') {
    const now = new Date();
    filteredTransactions = filterByMonth(filteredTransactions, parseInt(selectedMonth), now.getFullYear());
  }

  if (selectedCategory !== 'all') {
    filteredTransactions = filterByCategory(filteredTransactions, selectedCategory);
  }

  if (selectedType !== 'all') {
    filteredTransactions = filterByType(filteredTransactions, selectedType);
  }

  const totalAmount = filteredTransactions.reduce((sum, t) => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'income' || t.type === 'borrow') return sum + amt;
    return sum - amt;
  }, 0);

  const getCategoryById = (id) => categories.find(cat => cat.id === id);
  const selectedCategoryData = selectedCategory !== 'all' ? getCategoryById(selectedCategory) : null;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted-40 group-focus-within:text-cyber-accent-green transition-colors" size={18} />
            <input
              type="text"
              placeholder="Query transaction database..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-input-bg border border-surface-border rounded-xl py-3.5 pl-12 pr-4 text-xs font-mono tracking-tighter text-text-primary focus:outline-none focus:border-cyber-accent-green transition-all placeholder:text-text-muted-40 placeholder:uppercase placeholder:font-bold placeholder:tracking-widest"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all ${
              showFilters 
                ? 'bg-cyber-accent-green border-cyber-accent-green text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]' 
                : 'bg-surface-card/5 border-surface-border text-text-muted-40 hover:border-text-primary/20 hover:text-text-primary'
            }`}
          >
            <Filter size={18} />
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-surface-overlay border border-surface-border-light rounded-2xl animate-scale-in">
            <div className="space-y-2">
              <label className="label text-[8px] opacity-40">Temporal_Filter</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full bg-input-bg border border-surface-border rounded-xl px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-text-primary focus:outline-none focus:border-cyber-accent-blue"
              >
                <option value="all" className="bg-surface-card">ALL_CYCLES</option>
                {getMonthOptions().map((month) => (
                  <option key={month.value} value={month.value} className="bg-surface-card">
                    {month.label.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="label text-[8px] opacity-40">Categorical_Filter</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-input-bg border border-surface-border rounded-xl px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-text-primary focus:outline-none focus:border-cyber-accent-blue"
              >
                <option value="all" className="bg-surface-card">ALL_SEGS</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-surface-card">
                    {cat.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="label text-[8px] opacity-40">Type_Identifier</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-input-bg border border-surface-border rounded-xl px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-text-primary focus:outline-none focus:border-cyber-accent-blue"
              >
                <option value="all" className="bg-surface-card">ALL_TYPES</option>
                <option value="income" className="bg-surface-card">INFLOW</option>
                <option value="expense" className="bg-surface-card">OUTFLOW</option>
                <option value="savings" className="bg-surface-card">SAVINGS</option>
                <option value="lent" className="bg-surface-card">LENT</option>
                <option value="borrow" className="bg-surface-card">BORROW</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {(selectedCategory !== 'all' || selectedType !== 'all' || selectedMonth !== 'all' || searchTerm) && (
        <div className="mb-8 p-6 bg-cyber-accent-blue/5 rounded-2xl border border-cyber-accent-blue/20 flex items-center justify-between animate-card-in overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyber-accent-blue opacity-40 group-hover:bg-text-primary transition-colors" />
          <div>
            <p className="text-[10px] font-bold text-cyber-accent-blue uppercase tracking-[0.2em] mb-1">
              {selectedCategory !== 'all' ? `SYSTEM_SEGMENT: ${getCategoryById(selectedCategory)?.name.toUpperCase()}` : 'FILTERED_TELEMETRY'}
            </p>
            <p className="text-[8px] font-mono text-text-muted-40 uppercase tracking-widest">{filteredTransactions.length} ENTRIES_LOCATED</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-text-muted-40 uppercase tracking-widest mb-1 font-mono">Net_Aggregation</p>
            <p className={`text-2xl font-heading font-black tracking-tighter ${totalAmount >= 0 ? 'text-cyber-accent-green' : 'text-cyber-accent-blue'}`}>
              {totalAmount >= 0 ? '+' : ''}{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalAmount)}
            </p>
          </div>
        </div>
      )}

      <div className="card p-0 border-surface-border bg-surface-overlay/20 overflow-hidden divide-y divide-surface-border">
        {filteredTransactions.length === 0 ? (
          <div className="p-16 text-center space-y-3">
             <div className="w-16 h-16 bg-surface-card/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-surface-border">
               <Search size={24} className="text-text-muted-40/30" />
             </div>
            <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest opacity-20 italic">No corresponding data stream found.</p>
          </div>
        ) : (
          <div className="divide-y divide-surface-border">
            {filteredTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                category={getCategoryById(transaction.category)}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
