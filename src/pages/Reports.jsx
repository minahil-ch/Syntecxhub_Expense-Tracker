import React from 'react';
import Charts from '../components/Charts';
import { Calendar, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';

const Reports = ({ transactions }) => {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Financial Analytics</h2>
        <button className="glass-card px-4 py-2 flex items-center gap-2 text-sm text-text-muted hover:text-white">
          <Calendar size={16} />
          Last 30 Days
          <ChevronRight size={16} />
        </button>
      </div>

      <Charts transactions={transactions} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6">Income vs Expenses</h3>
          <div className="space-y-6">
            <StatRow label="Monthly Income" value="$12,450" change="+15%" icon={<TrendingUp size={20} />} color="text-success" />
            <StatRow label="Monthly Expenses" value="$8,200" change="+2%" icon={<TrendingDown size={20} />} color="text-danger" />
            <StatRow label="Net Savings" value="$4,250" change="+24%" icon={<TrendingUp size={20} />} color="text-primary" />
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6">Top Spending Categories</h3>
          <div className="space-y-6">
            <CategoryItem label="Housing" amount="$3,200" percentage="39%" color="bg-indigo-500" />
            <CategoryItem label="Food & Dining" amount="$1,450" percentage="18%" color="bg-rose-500" />
            <CategoryItem label="Entertainment" amount="$980" percentage="12%" color="bg-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

function StatRow({ label, value, change, icon, color }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-md bg-white/5 ${color}`}>{change}</span>
    </div>
  );
}

function CategoryItem({ label, amount, percentage, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="text-lg font-bold">{amount}</p>
        </div>
        <span className="text-sm font-semibold text-text-muted">{percentage}</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: percentage }}></div>
      </div>
    </div>
  );
}

export default Reports;
