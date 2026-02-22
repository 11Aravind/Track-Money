import { useState } from 'react';
import TransactionItem from './TransactionItem';
import { Search, Filter } from 'lucide-react';
import { searchTransactions, filterByMonth, filterByCategory, filterByType } from '../../utils/calculations';
import { getMonthOptions } from '../../utils/formatters';

const TransactionList = ({ transactions, categories, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

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

  const getCategoryById = (id) => categories.find(cat => cat.id === id);

  return (
    <div>
      <div className="mb-4">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Filter size={20} />
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-primary-gray-50 rounded-lg animate-slide-down">
            <div>
              <label className="label text-xs">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="input"
              >
                <option value="all">All Months</option>
                {getMonthOptions().map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label text-xs">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label text-xs">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="card p-0">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center text-primary-gray-500">
            <p>No transactions found</p>
          </div>
        ) : (
          <div>
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
