const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Transaction = require('./models/Transaction');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expense-tracker';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/transactions', async (req, res) => {
  const transaction = new Transaction({
    title: req.body.title,
    amount: req.body.amount,
    type: req.body.type,
    category: req.body.category,
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
