import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addCategory, updateCategory, deleteCategory } from '../../firebase/firestore';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import IconRenderer from '../common/IconRenderer';
import { FEATURED_ICONS, EMOJI_TO_LUCIDE } from '../../utils/iconMapping';

const CategoryManager = ({ categories }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    icon: '💰',
    color: '#FF6B6B'
  });
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      // Migrate emoji to Lucide if applicable
      const iconValue = EMOJI_TO_LUCIDE[category.icon] || category.icon;
      setFormData({
        name: category.name,
        type: category.type,
        icon: iconValue,
        color: category.color
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        type: 'expense',
        icon: 'Utensils',
        color: '#FF6B6B'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    let result;
    if (editingCategory) {
      result = await updateCategory(editingCategory.id, formData);
    } else {
      result = await addCategory(user.uid, formData);
    }

    if (result.success) {
      handleCloseModal();
    } else {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    await deleteCategory(categoryId);
  };

  const incomeCategories = categories.filter(cat => cat.type === 'income');
  const expenseCategories = categories.filter(cat => cat.type === 'expense');
  const savingsCategories = categories.filter(cat => cat.type === 'savings');
  const lentCategories = categories.filter(cat => cat.type === 'lent');
  const borrowCategories = categories.filter(cat => cat.type === 'borrow');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-black text-text-primary tracking-widest uppercase">
          System Segments<span className="text-cyber-accent-green">_</span>
        </h2>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={20} />
          <span className="hidden sm:inline">Initialize Segment</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: 'Inflow Vectors', items: incomeCategories, typeLabel: 'Income' },
          { title: 'Outflow Vectors', items: expenseCategories, typeLabel: 'Expense' },
          { title: 'Savings Buffers', items: savingsCategories, typeLabel: 'Savings' },
          { title: 'Lent Assets', items: lentCategories, typeLabel: 'Lent' },
          { title: 'Borrowed Liabilities', items: borrowCategories, typeLabel: 'Borrow' },
        ].map((group) => (
          group.items.length > 0 && (
            <div key={group.typeLabel} className="space-y-4">
              <h3 className="text-[10px] font-bold text-text-muted-70 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-1 h-1 bg-cyber-accent-blue rounded-full" />
                {group.title}
              </h3>
              <div className="space-y-3">
                {group.items.map((category) => (
                  <Card key={category.id} className="flex items-center justify-between group overflow-hidden border-surface-border-light bg-surface-overlay/20">
                    <div className="flex items-center gap-4">
                      <div 
                        className="p-2.5 rounded-xl border transition-all duration-500 group-hover:scale-110"
                        style={{ backgroundColor: `${category.color}15`, color: category.color, borderColor: `${category.color}30` }}
                      >
                        <IconRenderer iconName={category.icon} className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-primary uppercase tracking-widest group-hover:text-cyber-accent-green transition-colors">{category.name}</p>
                        <p className="text-[8px] font-mono text-text-muted-40 uppercase tracking-tighter">{group.typeLabel}_TYPE</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(category)}
                        className="p-2 hover:bg-surface-card/10 rounded-lg transition-all text-text-muted-40 hover:text-cyber-accent-blue"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-all text-text-muted-40 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Category Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Groceries"
            required
          />

          <div className="mb-4">
            <label className="label">Type</label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'expense', label: 'Expense' },
                { value: 'income', label: 'Income' },
                { value: 'savings', label: 'Savings' },
                { value: 'lent', label: 'Lent' },
                { value: 'borrow', label: 'Borrow' },
              ].map((typeOption) => (
                <label key={typeOption.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={typeOption.value}
                    checked={formData.type === typeOption.value}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>{typeOption.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="label">Icon</label>
            <div className="grid grid-cols-6 gap-2 mb-2">
              {FEATURED_ICONS.map((item) => (
                <button
                  key={item.icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon: item.icon }))}
                  className={`p-3 flex items-center justify-center rounded-xl border-2 transition-all ${
                    formData.icon === item.icon 
                      ? 'border-brand-primary bg-indigo-50 text-brand-primary' 
                      : 'border-slate-100 hover:border-slate-200 text-slate-500'
                  }`}
                  title={item.name}
                >
                  <IconRenderer iconName={item.icon} className="w-6 h-6" />
                </button>
              ))}
            </div>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Or enter custom emoji"
              className="input"
              maxLength="2"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="primary" disabled={loading} className="flex-1">
              {loading ? 'Saving...' : editingCategory ? 'Update' : 'Add'}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoryManager;
