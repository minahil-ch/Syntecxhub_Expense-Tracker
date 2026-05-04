import React from 'react';
import { Trash2, ShoppingBag, Coffee, Home, Briefcase, Film, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categoryIcons = {
  Food: { icon: <Coffee size={20} />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  Shopping: { icon: <ShoppingBag size={20} />, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  Housing: { icon: <Home size={20} />, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  Work: { icon: <Briefcase size={20} />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  Entertainment: { icon: <Film size={20} />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  Other: { icon: <ShoppingBag size={20} />, color: 'text-slate-500', bg: 'bg-slate-500/10' },
};

const HighlightText = ({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? <span key={i} className="bg-primary/30 text-white rounded px-0.5">{part}</span> : part
      )}
    </span>
  );
};

const TransactionList = ({ transactions, onDelete, searchQuery = '' }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-text-muted">
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
      <AnimatePresence initial={false}>
        {transactions.map((t) => {
          const category = categoryIcons[t.category] || categoryIcons.Other;
          const isIncome = t.type === 'income';

          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${category.bg} ${category.color}`}>
                  {category.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-text-main">
                    <HighlightText text={t.title} highlight={searchQuery} />
                  </h4>
                  <p className="text-xs text-text-muted">
                    {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} • {t.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className={`font-bold flex items-center gap-1 ${isIncome ? 'text-success' : 'text-danger'}`}>
                    {isIncome ? <ArrowUpCircle size={14} /> : <ArrowDownCircle size={14} />}
                    {isIncome ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">{t.type}</p>
                </div>
                
                <button 
                  onClick={() => onDelete(t.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-danger hover:bg-danger/10 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TransactionList;
