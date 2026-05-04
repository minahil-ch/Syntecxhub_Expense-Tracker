import React from 'react';
import { Plus, Info, Trash2 } from 'lucide-react';

const Budgets = ({ budgets, setBudgets, categories, setShowBudgetForm }) => {
  const removeBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Budget Planning</h2>
        <button 
          onClick={setShowBudgetForm}
          className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
        >
          <Plus size={16} />
          Create Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map(budget => (
          <BudgetCard 
            key={budget.id}
            budget={budget}
            onRemove={() => removeBudget(budget.id)}
          />
        ))}
      </div>

      {budgets.length === 0 && (
        <div className="text-center py-20 glass-card">
          <p className="text-text-muted">No budgets found. Click "Create Budget" to start planning.</p>
        </div>
      )}

      <div className="glass-card p-6 bg-primary/5 border-primary/20 flex items-start gap-4">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Info size={20} />
        </div>
        <div>
          <h4 className="font-bold mb-1">Budget Optimization Tip</h4>
          <p className="text-sm text-text-muted">Keep your spending below 80% of your limits to ensure you stay within your overall monthly savings goals.</p>
        </div>
      </div>
    </div>
  );
};

function BudgetCard({ budget, onRemove }) {
  const { category, spent, limit } = budget;
  const percentage = Math.min((spent / limit) * 100, 100);
  const overBudget = spent > limit;
  
  return (
    <div className="glass-card p-6 relative overflow-hidden group hover:border-primary/30 transition-all">
      {overBudget && (
        <div className="absolute top-0 right-0 bg-danger text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
          OVER BUDGET
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-lg">{category}</h4>
        <button 
          onClick={onRemove}
          className="text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-text-muted mb-1">Spent</p>
            <p className="text-xl font-bold">${spent.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-muted mb-1">Limit</p>
            <p className="font-semibold">${limit.toLocaleString()}</p>
          </div>
        </div>

        <div className="w-full bg-white/5 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-700 ${overBudget ? 'bg-danger shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-primary'}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className={`text-xs font-medium ${overBudget ? 'text-danger' : 'text-text-muted'}`}>
          {overBudget ? `$${(spent - limit).toLocaleString()} over limit` : `$${(limit - spent).toLocaleString()} remaining`}
        </p>
      </div>
    </div>
  );
}

export default Budgets;
