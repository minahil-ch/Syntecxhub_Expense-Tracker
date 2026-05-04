import React, { useMemo } from 'react';
import Charts from '../components/Charts';
import { Calendar, ChevronRight, TrendingUp, TrendingDown, Target, Info } from 'lucide-react';

const Reports = ({ transactions, categories, totalBudget }) => {
  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    
    // Category totals
    const catTotals = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
    });

    const topCategories = Object.entries(catTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: expenses > 0 ? Math.round((amount / expenses) * 100) : 0
      }));

    return { income, expenses, savings: income - expenses, topCategories };
  }, [transactions]);

  const budgetProgress = Math.min((stats.expenses / totalBudget) * 100, 100);

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Financial Analytics</h2>
        <button className="glass-card px-4 py-2 flex items-center gap-2 text-sm text-text-muted hover:text-white">
          <Calendar size={16} />
          Last 30 Days
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Charts transactions={transactions} />
        </div>
        
        <div className="glass-card p-6 flex flex-col justify-center border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-primary text-white">
              <Target size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Budget Utilization</h3>
              <p className="text-sm text-text-muted">Target: ${totalBudget.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full transition-all duration-1000 ${budgetProgress > 90 ? 'bg-danger' : 'bg-primary'}`}
                style={{ width: `${budgetProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Total Spent: <span className="text-white font-bold">${stats.expenses.toLocaleString()}</span></span>
              <span className="font-bold text-primary">{Math.round(budgetProgress)}%</span>
            </div>
            
            <div className="pt-4 border-t border-white/5">
              <div className="flex items-start gap-3">
                <Info size={16} className="text-primary mt-1" />
                <p className="text-xs text-text-muted leading-relaxed">
                  {budgetProgress > 100 
                    ? "You have exceeded your monthly budget. Review your top spending categories to cut back."
                    : `You have $${(totalBudget - stats.expenses).toLocaleString()} left in your budget for this month.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6">Income vs Expenses</h3>
          <div className="space-y-6">
            <StatRow label="Total Income" value={`$${stats.income.toLocaleString()}`} change="+15%" icon={<TrendingUp size={20} />} color="text-success" />
            <StatRow label="Total Expenses" value={`$${stats.expenses.toLocaleString()}`} change="+2%" icon={<TrendingDown size={20} />} color="text-danger" />
            <StatRow label="Net Savings" value={`$${stats.savings.toLocaleString()}`} change="+24%" icon={<TrendingUp size={20} />} color="text-primary" />
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6">Top Spending Categories</h3>
          <div className="space-y-6">
            {stats.topCategories.length > 0 ? stats.topCategories.map((cat, idx) => (
              <CategoryItem 
                key={cat.name}
                label={cat.name} 
                amount={`$${cat.amount.toLocaleString()}`} 
                percentage={`${cat.percentage}%`} 
                color={idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-secondary' : 'bg-accent'} 
              />
            )) : (
              <p className="text-center text-text-muted py-10">No expense data available</p>
            )}
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
          <p className="text-xl font-bold text-white">{value}</p>
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
          <p className="text-lg font-bold text-white">{amount}</p>
        </div>
        <span className="text-sm font-semibold text-text-muted">{percentage}</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2">
        <div className={`h-2 rounded-full ${color} transition-all duration-700`} style={{ width: percentage }}></div>
      </div>
    </div>
  );
}

export default Reports;
