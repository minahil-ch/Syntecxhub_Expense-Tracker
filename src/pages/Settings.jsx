import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Smartphone, ChevronRight, Plus, Trash2, CheckCircle, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = ({ categories, setCategories, manualIncome, setManualIncome }) => {
  const { user, login } = useAuth();
  const [newName, setNewName] = useState(user?.name || '');
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newCat, setNewCat] = useState('');
  const [incomeVal, setIncomeVal] = useState(manualIncome || '');
  const [showSaved, setShowSaved] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    login({ name: newName, email: newEmail });
    setManualIncome(parseFloat(incomeVal) || 0);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const addCategory = () => {
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      setNewCat('');
    }
  };

  const removeCategory = (cat) => {
    setCategories(categories.filter(c => c !== cat));
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-20">
      <h2 className="text-2xl font-bold mb-8 text-white">Account Settings</h2>

      <AnimatePresence>
        {showSaved && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 bg-success text-white px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2"
          >
            <CheckCircle size={20} />
            Changes saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        {/* Profile Section */}
        <section className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
            <User size={20} className="text-primary" />
            Profile Information
          </h3>
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${newName}`} alt="avatar" />
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-muted">Full Name</label>
                  <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-muted">Email Address</label>
                  <input 
                    type="email" 
                    value={newEmail} 
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary font-medium" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <DollarSign size={20} className="text-success" />
                Financial Settings
              </h3>
              <div className="max-w-xs space-y-2">
                <label className="text-sm font-semibold text-text-muted">Fixed Monthly Income ($)</label>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={incomeVal}
                  onChange={(e) => setIncomeVal(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary font-bold text-xl"
                />
                <p className="text-[10px] text-text-muted uppercase tracking-wider">This will be added to your total income automatically.</p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" className="btn-primary px-8 py-3 text-lg font-bold">Save All Changes</button>
            </div>
          </form>
        </section>

        {/* Categories Section */}
        <section className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
            <Palette size={20} className="text-primary" />
            Manage Categories
          </h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="New Category Name" 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary font-medium"
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
              />
              <button 
                onClick={addCategory}
                className="btn-primary px-6 rounded-xl"
              >
                <Plus size={24} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map(cat => (
                <div key={cat} className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-lg group hover:border-primary hover:bg-primary/5 transition-all">
                  <span className="text-sm font-semibold text-white">{cat}</span>
                  <button onClick={() => removeCategory(cat)} className="text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Settings */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard icon={<Bell size={20} />} title="Notifications" desc="Configure alerts and reminders" />
          <SettingsCard icon={<Shield size={20} />} title="Security" desc="Password and 2FA settings" />
        </section>
      </div>
    </div>
  );
};

function SettingsCard({ icon, title, desc }) {
  return (
    <div className="glass-card p-6 flex items-center justify-between cursor-pointer group hover:border-primary/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-white/10 text-primary group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-white">{title}</h4>
          <p className="text-sm text-text-muted">{desc}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-text-muted group-hover:text-primary transition-all group-hover:translate-x-1" />
    </div>
  );
}

export default Settings;
