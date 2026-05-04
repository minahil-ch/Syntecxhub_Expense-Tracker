import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import TransactionList from '../components/TransactionList';
import Charts from '../components/Charts';

const Dashboard = ({ summary, transactions, filteredTransactions, handleDeleteTransaction, setShowForm, budgets }) => {
  return (
    <div className="animate-fade-in">
      {/* Summary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          trend="+12%"
        />
        <SummaryCard 
          title="Total Expenses" 
          amount={summary.expenses} 
          icon={<TrendingDown size={24} />} 
          gradient="from-rose-500 to-orange-600"
          trend="-8%"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <Charts transactions={transactions} />
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

        {/* Right Sidebar - Quick Add & Goals */}
        <aside className="space-y-8">
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
            <h3 className="text-xl font-bold mb-4">Budget Progress</h3>
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
