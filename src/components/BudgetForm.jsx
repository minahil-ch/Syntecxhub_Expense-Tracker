import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const BudgetForm = ({ onClose, onSubmit, categories }) => {
  const [formData, setFormData] = useState({
    category: categories[0],
    limit: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.limit) return;
    onSubmit({
      ...formData,
      limit: parseFloat(formData.limit)
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
        <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Create Budget</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Category</label>
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Monthly Limit ($)</label>
            <input 
              type="number"
              placeholder="0.00"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
            <Save size={20} />
            Set Budget
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default BudgetForm;
