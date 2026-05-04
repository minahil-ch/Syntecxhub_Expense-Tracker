import React, { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const TransactionForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food'
  });

  const titleInputRef = useRef(null);

  // useRef to focus field management
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="glass-card w-full max-w-md p-8 relative z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Add Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Title</label>
            <input 
              ref={titleInputRef}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Starbucks Coffee"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Amount ($)</label>
              <input 
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Type</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            >
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Housing">Housing</option>
              <option value="Work">Work</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button 
            type="submit"
            className="btn-primary w-full py-4 flex items-center justify-center gap-2 mt-4"
          >
            <Plus size={20} />
            Save Transaction
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default TransactionForm;
