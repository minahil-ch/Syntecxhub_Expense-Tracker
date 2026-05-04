import React from 'react';
import { motion } from 'framer-motion';

const SummaryCard = ({ title, amount, icon, gradient, trend }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 overflow-hidden relative group"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`}></div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          {icon}
        </div>
        <span className="text-text-muted font-medium">{title}</span>
      </div>
      
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold">
          ${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h2>
        {trend && (
          <span className={`text-sm font-semibold px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default SummaryCard;
