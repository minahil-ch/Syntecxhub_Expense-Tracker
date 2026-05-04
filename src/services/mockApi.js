import { v4 as uuidv4 } from 'uuid';

const INITIAL_DATA = [
  {
    id: uuidv4(),
    title: 'Salary',
    amount: 5000,
    type: 'income',
    category: 'Work',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Grocery Store',
    amount: 150,
    type: 'expense',
    category: 'Food',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Rent',
    amount: 1200,
    type: 'expense',
    category: 'Housing',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Freelance Project',
    amount: 800,
    type: 'income',
    category: 'Work',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Netflix Subscription',
    amount: 15,
    type: 'expense',
    category: 'Entertainment',
    date: new Date().toISOString(),
  }
];

const STORAGE_KEY = 'syntecxhub_expenses';

export const mockApi = {
  fetchTransactions: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          resolve(JSON.parse(storedData));
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
          resolve(INITIAL_DATA);
        }
      }, 800); // Simulate network delay
    });
  },

  saveTransaction: (transaction) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const newTransaction = { ...transaction, id: uuidv4(), date: new Date().toISOString() };
        const updatedData = [newTransaction, ...storedData];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        resolve(newTransaction);
      }, 500);
    });
  },

  deleteTransaction: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const updatedData = storedData.filter(t => t.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        resolve(id);
      }, 500);
    });
  }
};
