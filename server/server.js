const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

// Logging semua request
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

const API_BASE = 'https://windice.io/api/v1/api';

// Get balance
app.get('/api/user', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/user`, {
      headers: {
        'Authorization': req.headers.authorization,
        'User-Agent': 'Mozilla/5.0',
      },
    });
    const data = await response.json();
    console.log('🧾 Balance Response:', data);
    res.json(data);
  } catch (err) {
    console.error('❌ Balance Fetch Error:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Roll (betting)
app.post('/api/roll', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/roll`, {
      method: 'POST',
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    console.log('🎲 Roll Response:', data);
    res.json(data);
  } catch (err) {
    console.error('❌ Roll Error:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
