import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Plus, Wallet, TrendingUp, TrendingDown, Search, Filter, LogOut, Bell, Settings, PieChart as PieChartIcon, LayoutDashboard, History, WalletCards } from 'lucide-react';
import { mockApi } from './services/mockApi';
import SummaryCard from './components/SummaryCard';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import Charts from './components/Charts';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // useEffect to fetch data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await mockApi.fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // useMemo for summary calculations
  const summary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + Number(t.amount), 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + Number(t.amount), 0);
    const balance = income - expenses;
    return { income, expenses, balance };
  }, [transactions]);

  // useMemo for filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchQuery, filterCategory]);

  // useCallback for handlers
  const handleAddTransaction = useCallback(async (newTransaction) => {
    try {
      const saved = await mockApi.saveTransaction(newTransaction);
      setTransactions(prev => [saved, ...prev]);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add:', error);
    }
  }, []);

  const handleDeleteTransaction = useCallback(async (id) => {
    try {
      await mockApi.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 glass-card m-4 mr-0 hidden md:flex flex-col items-center lg:items-start p-6 sticky top-4 h-[calc(100vh-2rem)]">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">S</div>
          <span className="text-xl font-bold gradient-text hidden lg:block">Syntecxhub</span>
        </div>

        <nav className="flex-1 w-full space-y-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<History size={20} />} label="Transactions" />
          <NavItem icon={<PieChartIcon size={20} />} label="Reports" />
          <NavItem icon={<WalletCards size={20} />} label="Budgets" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="mt-auto w-full pt-6 border-t border-border">
          <NavItem icon={<LogOut size={20} />} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Expense Tracker</h1>
            <p className="text-text-muted">Welcome back! Here's your financial overview.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative glass-card px-4 py-2 flex items-center gap-2">
              <Search size={18} className="text-text-muted" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none text-sm w-32 lg:w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="glass-card p-2 text-text-muted hover:text-primary">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="rounded-full" />
            </div>
          </div>
        </header>

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
                <div className="flex gap-2">
                  <select 
                    className="glass-card bg-transparent text-sm px-3 py-1 border-none cursor-pointer"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    <option value="Work">Work</option>
                    <option value="Food">Food</option>
                    <option value="Housing">Housing</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                  </select>
                </div>
              </div>
              <TransactionList 
                transactions={filteredTransactions} 
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
              <h3 className="text-xl font-bold mb-4">Expense Categories</h3>
              <div className="space-y-4">
                <CategoryProgress label="Food" value={45} color="bg-rose-500" />
                <CategoryProgress label="Housing" value={70} color="bg-indigo-500" />
                <CategoryProgress label="Work" value={20} color="bg-emerald-500" />
                <CategoryProgress label="Leisure" value={55} color="bg-amber-500" />
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Transaction Form Modal */}
      <AnimatePresence>
        {showForm && (
          <TransactionForm 
            onClose={() => setShowForm(false)} 
            onSubmit={handleAddTransaction} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${active ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}>
      {icon}
      <span className="font-medium hidden lg:block">{label}</span>
    </div>
  );
}

function CategoryProgress({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-text-muted">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

export default App;
