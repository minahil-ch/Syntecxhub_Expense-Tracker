import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context & Services
import { AuthProvider, useAuth } from './context/AuthContext';
import { mockApi } from './services/mockApi';

// Layout & Components
import MainLayout from './layouts/MainLayout';
import TransactionForm from './components/TransactionForm';
import BudgetForm from './components/BudgetForm';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Budgets from './pages/Budgets';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [manualIncome, setManualIncome] = useState(0);
  const [totalBudget, setTotalBudget] = useState(2000);
  const [categories, setCategories] = useState(['Food', 'Work', 'Housing', 'Entertainment', 'Shopping', 'Other']);
  const [budgets, setBudgets] = useState([
    { id: '1', category: 'Food', limit: 600, spent: 0 },
    { id: '2', category: 'Housing', limit: 1200, spent: 0 }
  ]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Welcome to Syntecxhub!', time: '1h ago', read: false },
    { id: 2, text: 'You reached 80% of your Food budget', time: '2h ago', read: false }
  ]);

  // useEffect to fetch data
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      try {
        const data = await mockApi.fetchTransactions();
        setTransactions(data);
        
        // Load custom categories and budgets from localStorage
        const storedCats = localStorage.getItem('syntecxhub_categories');
        if (storedCats) setCategories(JSON.parse(storedCats));
        
        // Load settings
        const storedManualIncome = localStorage.getItem('syntecxhub_manual_income');
        if (storedManualIncome) setManualIncome(parseFloat(storedManualIncome));
        
        const storedTotalBudget = localStorage.getItem('syntecxhub_total_budget');
        if (storedTotalBudget) setTotalBudget(parseFloat(storedTotalBudget));
        
        if (storedBudgets) setBudgets(JSON.parse(storedBudgets));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user]);

  // Sync budgets with transactions
  const activeBudgets = useMemo(() => {
    return budgets.map(budget => {
      const spent = transactions
        .filter(t => t.category === budget.category && t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
      return { ...budget, spent };
    });
  }, [transactions, budgets]);

  // useMemo for summary calculations
  const summary = useMemo(() => {
    const transactionIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + Number(t.amount), 0);
    const totalIncome = transactionIncome + manualIncome;
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + Number(t.amount), 0);
    const balance = totalIncome - expenses;
    return { income: totalIncome, expenses, balance };
  }, [transactions, manualIncome]);

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

  if (user && loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              notifications={notifications}
              setNotifications={setNotifications}
            >
              <Dashboard 
                summary={summary}
                transactions={transactions}
                filteredTransactions={filteredTransactions}
                handleDeleteTransaction={handleDeleteTransaction}
                setShowForm={setShowForm}
                budgets={activeBudgets}
                totalBudget={totalBudget}
              />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/transactions" element={
          <ProtectedRoute>
            <MainLayout 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              notifications={notifications}
              setNotifications={setNotifications}
            >
              <Transactions 
                transactions={transactions}
                filteredTransactions={filteredTransactions}
                handleDeleteTransaction={handleDeleteTransaction}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                setShowForm={setShowForm}
                searchQuery={searchQuery}
                categories={categories}
              />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/reports" element={
          <ProtectedRoute>
            <MainLayout 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              notifications={notifications}
              setNotifications={setNotifications}
            >
              <Reports transactions={transactions} categories={categories} totalBudget={totalBudget} />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/budgets" element={
          <ProtectedRoute>
            <MainLayout 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              notifications={notifications}
              setNotifications={setNotifications}
            >
              <Budgets 
                budgets={activeBudgets} 
                setBudgets={(newBudgets) => {
                  setBudgets(newBudgets);
                  localStorage.setItem('syntecxhub_budgets', JSON.stringify(newBudgets));
                }}
                categories={categories}
                setShowBudgetForm={() => setShowBudgetForm(true)}
              />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <MainLayout 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              notifications={notifications}
              setNotifications={setNotifications}
            >
              <Settings 
                categories={categories}
                setCategories={(newCats) => {
                  setCategories(newCats);
                  localStorage.setItem('syntecxhub_categories', JSON.stringify(newCats));
                }}
                manualIncome={manualIncome}
                setManualIncome={(val) => {
                  setManualIncome(val);
                  localStorage.setItem('syntecxhub_manual_income', val.toString());
                }}
                totalBudget={totalBudget}
                setTotalBudget={(val) => {
                  setTotalBudget(val);
                  localStorage.setItem('syntecxhub_total_budget', val.toString());
                }}
              />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Shared Modals */}
      <AnimatePresence>
        {showForm && (
          <TransactionForm 
            onClose={() => setShowForm(false)} 
            onSubmit={handleAddTransaction} 
            categories={categories}
          />
        )}
        {showBudgetForm && (
          <BudgetForm 
            onClose={() => setShowBudgetForm(false)} 
            onSubmit={(newBudget) => {
              const updated = [...budgets, { ...newBudget, id: Date.now().toString(), spent: 0 }];
              setBudgets(updated);
              localStorage.setItem('syntecxhub_budgets', JSON.stringify(updated));
              setShowBudgetForm(false);
            }}
            categories={categories}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
