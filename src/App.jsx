import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context & Services
import { AuthProvider, useAuth } from './context/AuthContext';
import { mockApi } from './services/mockApi';

// Layout & Components
import MainLayout from './layouts/MainLayout';
import TransactionForm from './components/TransactionForm';

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
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // useEffect to fetch data
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
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
  }, [user]);

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
            <MainLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
              <Dashboard 
                summary={summary}
                transactions={transactions}
                filteredTransactions={filteredTransactions}
                handleDeleteTransaction={handleDeleteTransaction}
                setShowForm={setShowForm}
              />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/transactions" element={
          <ProtectedRoute>
            <MainLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
              <Transactions 
                transactions={transactions}
                filteredTransactions={filteredTransactions}
                handleDeleteTransaction={handleDeleteTransaction}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                setShowForm={setShowForm}
              />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/reports" element={
          <ProtectedRoute>
            <MainLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
              <Reports transactions={transactions} />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/budgets" element={
          <ProtectedRoute>
            <MainLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
              <Budgets />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <MainLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
              <Settings />
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
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
