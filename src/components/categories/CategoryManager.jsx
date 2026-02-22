import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addCategory, updateCategory, deleteCategory } from '../../firebase/firestore';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

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
      setFormData({
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        type: 'expense',
        icon: '💰',
        color: '#FF6B6B'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
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

  const commonIcons = ['💰', '🍔', '⛽', '🛍️', '📄', '💵', '💸', '🏠', '🚗', '🎮', '📱', '✈️', '🏥', '📚'];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary-black">Categories</h2>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={20} className="mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary-black">Income Categories</h3>
          <div className="space-y-3">
            {incomeCategories.map((category) => (
              <Card key={category.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <p className="font-medium text-primary-black">{category.name}</p>
                    <p className="text-sm text-primary-gray-600">Income</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(category)}
                    className="p-2 hover:bg-primary-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary-black">Expense Categories</h3>
          <div className="space-y-3">
            {expenseCategories.map((category) => (
              <Card key={category.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <p className="font-medium text-primary-black">{category.name}</p>
                    <p className="text-sm text-primary-gray-600">Expense</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(category)}
                    className="p-2 hover:bg-primary-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
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

          <div className="mb-4">
            <label className="label">Icon</label>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {commonIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`p-2 text-2xl rounded-lg border-2 transition-all ${
                    formData.icon === icon 
                      ? 'border-primary-black bg-primary-gray-100' 
                      : 'border-primary-gray-200 hover:border-primary-gray-400'
                  }`}
                >
                  {icon}
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
