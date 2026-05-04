import React from 'react';
import { Plus, Info } from 'lucide-react';

const Budgets = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Budget Planning</h2>
        <button className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
          <Plus size={16} />
          Create Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BudgetCard 
          category="Food & Dining" 
          spent={450} 
          limit={600} 
          color="rose" 
        />
        <BudgetCard 
          category="Transportation" 
          spent={200} 
          limit={250} 
          color="amber" 
        />
        <BudgetCard 
          category="Entertainment" 
          spent={550} 
          limit={500} 
          color="purple" 
          overBudget
        />
        <BudgetCard 
          category="Shopping" 
          spent={120} 
          limit={400} 
          color="indigo" 
        />
        <BudgetCard 
          category="Housing" 
          spent={1200} 
          limit={1200} 
          color="emerald" 
        />
      </div>

      <div className="glass-card p-6 bg-primary/5 border-primary/20 flex items-start gap-4">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Info size={20} />
        </div>
        <div>
          <h4 className="font-bold mb-1">Budget Optimization Tip</h4>
          <p className="text-sm text-text-muted">You've spent 85% of your entertainment budget. Consider reducing dining out for the next few days to stay within your overall monthly limit.</p>
        </div>
      </div>
    </div>
  );
};

function BudgetCard({ category, spent, limit, color, overBudget = false }) {
  const percentage = Math.min((spent / limit) * 100, 100);
  
  return (
    <div className="glass-card p-6 relative overflow-hidden group">
      {overBudget && (
        <div className="absolute top-0 right-0 bg-danger text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
          OVER BUDGET
        </div>
      )}
      <h4 className="font-bold text-lg mb-4">{category}</h4>
      
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-text-muted mb-1">Spent</p>
            <p className="text-xl font-bold">${spent}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-muted mb-1">Limit</p>
            <p className="font-semibold">${limit}</p>
          </div>
        </div>

        <div className="w-full bg-white/5 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${overBudget ? 'bg-danger' : `bg-${color}-500`}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className={`text-xs font-medium ${overBudget ? 'text-danger' : 'text-text-muted'}`}>
          {overBudget ? `$${spent - limit} over limit` : `$${limit - spent} remaining`}
        </p>
      </div>
    </div>
  );
}

export default Budgets;
