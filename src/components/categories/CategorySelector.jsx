import { useState, useMemo } from 'react';
import { Plus, ChevronLeft, Check, Edit2 } from 'lucide-react';
import IconRenderer from '../common/IconRenderer';
import { FEATURED_ICONS } from '../../utils/iconMapping';
import Button from '../common/Button';
import Input from '../common/Input';
import { addCategory, updateCategory } from '../../firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const TABS = [
  { id: 'expense', label: 'Expense', types: ['expense'] },
  { id: 'income', label: 'Income', types: ['income'] },
  { id: 'transfer', label: 'Transfer', types: ['savings', 'lent', 'borrow'] },
];

const COLORS = [
  '#CCFF00', '#007AFF', '#FF3B30', '#FF9500', '#5856D6', 
  '#AF52DE', '#34C759', '#5AC8FA', '#FF2D55', '#A2AAAD'
];

const CategorySelector = ({ selectedCategoryId, onSelect, categories }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('expense');
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    icon: 'Utensils',
    color: COLORS[0]
  });

  const filteredCategories = useMemo(() => {
    const activeTabConfig = TABS.find(t => t.id === activeTab);
    return categories.filter(cat => activeTabConfig.types.includes(cat.type));
  }, [categories, activeTab]);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', icon: 'Utensils', color: COLORS[0] });
    setIsAdding(true);
  };

  const handleOpenEdit = (e, category) => {
    e.stopPropagation();
    setEditingCategory(category);
    setFormData({
      name: category.name,
      icon: category.icon,
      color: category.color
    });
    setIsAdding(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || loading) return;
    
    setLoading(true);
    let result;
    
    if (editingCategory) {
      result = await updateCategory(editingCategory.id, formData);
    } else {
      const activeTabConfig = TABS.find(t => t.id === activeTab);
      const type = activeTabConfig.types[0]; 
      result = await addCategory(user.uid, { ...formData, type });
    }

    if (result.success) {
      setIsAdding(false);
      setEditingCategory(null);
    }
    setLoading(false);
  };

  if (isAdding) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setIsAdding(false)}
            className="w-10 h-10 flex border border-surface-border items-center justify-center hover:bg-surface-card/10 rounded-xl transition-all text-text-muted-70"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-xl font-heading font-black text-text-primary uppercase tracking-tight">
            {editingCategory ? 'Modify System' : 'Initialize New'} Category
          </h3>
        </div>

        <div className="space-y-8">
          <Input
            label="Designation"
            placeholder="e.g. DATA_STREAM, HARDWARE, etc."
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            autoFocus
          />

          <div>
            <label className="label mb-4 block text-text-secondary">Visual Identifier</label>
            <div className="grid grid-cols-6 gap-3 max-h-48 overflow-y-auto p-2 bg-black/20 rounded-xl border border-surface-border-light custom-scrollbar">
              {FEATURED_ICONS.map((item) => (
                <button
                  key={item.icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon: item.icon }))}
                  className={`p-3 flex items-center justify-center rounded-xl border-2 transition-all ${
                    formData.icon === item.icon 
                      ? 'border-cyber-accent-green bg-cyber-accent-green/10 text-cyber-accent-green' 
                      : 'border-surface-border-light hover:border-surface-border text-text-muted-40 hover:text-text-primary'
                  }`}
                >
                  <IconRenderer iconName={item.icon} className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label mb-4 block text-text-secondary">Core Signature</label>
            <div className="flex flex-wrap gap-4 p-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center relative ${
                    formData.color === color ? 'border-text-primary scale-110' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {formData.color === color && (
                    <div className="absolute -inset-1.5 border border-text-primary/20 rounded-full animate-ping opacity-20" />
                  )}
                  {formData.color === color && <Check size={14} className="text-text-inverse" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={handleSubmit} 
              className="flex-1" 
              disabled={loading || !formData.name.trim()}
            >
              {loading ? 'Processing...' : editingCategory ? 'Sync Changes' : 'Initialize'}
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setIsAdding(false)}
            >
              Abort
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex p-1 bg-surface-card/40 border border-surface-border-light rounded-xl">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
              activeTab === tab.id 
                ? 'bg-surface-card/10 text-cyber-accent-green border border-surface-border shadow-[0_0_15px_rgba(204,255,0,0.1)]' 
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-card/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid Container with scrollbar */}
      <div className="max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 py-2">
          {filteredCategories.map((category) => (
            <div key={category.id} className="relative group">
              <button
                onClick={() => onSelect(category.id)}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all w-full ${
                  selectedCategoryId === category.id
                    ? 'border-cyber-accent-green bg-cyber-accent-green/5'
                    : 'border-surface-border-light bg-surface-card hover:border-surface-border'
                }`}
              >
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 ${
                    selectedCategoryId === category.id ? 'scale-110 shadow-[0_0_20px_rgba(0,0,0,0.3)]' : ''
                  }`}
                  style={{ backgroundColor: `${category.color}20`, color: category.color, border: `1px solid ${category.color}40` }}
                >
                  <IconRenderer iconName={category.icon} className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-bold truncate w-full text-center uppercase tracking-tighter ${
                  selectedCategoryId === category.id ? 'text-cyber-accent-green' : 'text-text-secondary'
                }`}>
                  {category.name}
                </span>
                
                {selectedCategoryId === category.id && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-cyber-accent-green rounded-full flex items-center justify-center shadow-lg shadow-cyber-accent-green/20">
                    <Check size={10} className="text-text-inverse" />
                  </div>
                )}
              </button>

              {/* Edit Trigger */}
              <button
                onClick={(e) => handleOpenEdit(e, category)}
                className="absolute -top-1 -left-1 w-7 h-7 bg-surface-card border border-surface-border rounded-lg flex items-center justify-center text-text-muted-40 hover:text-text-primary hover:bg-cyber-accent-blue transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <Edit2 size={12} />
              </button>
            </div>
          ))}
          
          {/* Add Button */}
          <button
            onClick={handleOpenAdd}
            className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-dashed border-surface-border-light hover:border-cyber-accent-green hover:bg-cyber-accent-green/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-card/5 flex items-center justify-center text-text-muted-40 group-hover:bg-cyber-accent-green/10 group-hover:text-cyber-accent-green transition-colors border border-surface-border-light">
              <Plus size={24} />
            </div>
            <span className="text-[10px] font-bold text-text-muted-40 group-hover:text-cyber-accent-green uppercase tracking-tighter">Initialize</span>
          </button>
        </div>
      </div>
      
      {filteredCategories.length === 0 && (
        <div className="py-12 text-center bg-surface-card/5 rounded-xl border border-dashed border-surface-border-light">
          <p className="text-[10px] text-text-muted-40 font-bold uppercase tracking-widest italic animate-pulse">Waiting for Data Stream...</p>
        </div>
      )}

    </div>
  );
};

export default CategorySelector;
