const API_URL = 'http://localhost:5000/api';

export const mockApi = {
  fetchTransactions: async () => {
    try {
      const response = await fetch(`${API_URL}/transactions`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  },

  saveTransaction: async (transaction) => {
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) throw new Error('Failed to save');
      return await response.json();
    } catch (error) {
      console.error('Save error:', error);
      throw error;
    }
  },

  deleteTransaction: async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      return id;
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }
};
