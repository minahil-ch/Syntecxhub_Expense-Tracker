import React, { useState } from 'react';
import TransactionList from '../components/TransactionList';
import { Filter, Download, Plus } from 'lucide-react';

const Transactions = ({ transactions, filteredTransactions, handleDeleteTransaction, filterCategory, setFilterCategory, setShowForm, searchQuery }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <div className="flex items-center gap-3">
          <button className="glass-card flex items-center gap-2 px-4 py-2 text-sm text-text-muted hover:text-white">
            <Download size={16} />
            Export
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
          >
            <Plus size={16} />
            New
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-text-muted">
              <Filter size={18} />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            <div className="flex gap-2">
              {['All', 'Food', 'Work', 'Housing', 'Entertainment', 'Shopping'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filterCategory === cat ? 'bg-primary text-white' : 'bg-white/5 text-text-muted hover:bg-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-text-muted">
            Showing <span className="text-white font-bold">{filteredTransactions.length}</span> transactions
          </div>
        </div>

        <TransactionList 
          transactions={filteredTransactions} 
          onDelete={handleDeleteTransaction} 
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default Transactions;
