import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Target, PieChart as PieIcon } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import TransactionList from '../components/TransactionList';
import Charts from '../components/Charts';

const Dashboard = ({ summary, transactions, filteredTransactions, handleDeleteTransaction, setShowForm, budgets, totalBudget }) => {
  const budgetSpent = summary.expenses;
  const budgetRemaining = totalBudget - budgetSpent;
  const budgetPercentage = Math.min((budgetSpent / totalBudget) * 100, 100);

  return (
    <div className="animate-fade-in">
      {/* Summary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard 
          title="Total Balance" 
          amount={summary.balance} 
          icon={<Wallet size={24} />} 
          gradient="from-indigo-500 to-purple-600"
        />
        <SummaryCard 
          title="Total Income" 
          amount={summary.income} 
          icon={<TrendingUp size={24} />} 
          gradient="from-emerald-500 to-teal-600"
        />
        <SummaryCard 
          title="Total Expenses" 
          amount={summary.expenses} 
          icon={<TrendingDown size={24} />} 
          gradient="from-rose-500 to-orange-600"
        />
        <SummaryCard 
          title="Monthly Budget" 
          amount={totalBudget} 
          icon={<Target size={24} />} 
          gradient="from-amber-500 to-orange-600"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <PieIcon size={20} className="text-primary" />
                Spending Analytics
              </h3>
            </div>
            <Charts transactions={transactions} />
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recent Transactions</h3>
            </div>
            <TransactionList 
              transactions={filteredTransactions.slice(0, 5)} 
              onDelete={handleDeleteTransaction} 
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-8">
          {/* Total Budget Progress */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target size={20} className="text-primary" />
              Budget Health
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-text-muted">Spent</p>
                  <p className="text-lg font-bold">${budgetSpent.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-muted">Remaining</p>
                  <p className={`text-lg font-bold ${budgetRemaining < 0 ? 'text-danger' : 'text-success'}`}>
                    ${budgetRemaining.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${budgetPercentage > 90 ? 'bg-danger' : budgetPercentage > 70 ? 'bg-amber-500' : 'bg-primary'}`}
                  style={{ width: `${budgetPercentage}%` }}
                />
              </div>
              <p className="text-center text-sm font-semibold text-text-muted">{Math.round(budgetPercentage)}% of monthly budget used</p>
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h3 className="text-xl font-bold mb-4">Quick Action</h3>
            <button 
              onClick={() => setShowForm(true)}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Transaction
            </button>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4">Category Limits</h3>
            <div className="space-y-4">
              {budgets.length > 0 ? budgets.map(budget => (
                <CategoryProgress 
                  key={budget.id}
                  label={budget.category} 
                  spent={budget.spent}
                  limit={budget.limit}
                  color={budget.spent > budget.limit ? 'bg-danger' : 'bg-primary'} 
                />
              )) : (
                <p className="text-sm text-text-muted">No budgets set. Create one in the Budgets tab.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

function CategoryProgress({ label, spent, limit, color }) {
  const value = Math.min((spent / limit) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-text-muted">{label}</span>
        <span className="font-semibold">{Math.round(value)}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color} transition-all duration-500`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

export default Dashboard;
