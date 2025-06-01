const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const API_BASE = 'https://windice.io/api/v1/api';

// Check headers log (debugging)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// GET Balance
app.get('/api/user', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/user`, {
      headers: {
        'Authorization': req.headers.authorization,
        'User-Agent': 'Mozilla/5.0' // Tambahan opsional
      }
    });
    const data = await response.json();
    console.log('Windice Balance Response:', data);
    res.json(data);
  } catch (err) {
    console.error('Error fetching balance:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST Roll
app.post('/api/roll', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/roll`, {
      method: 'POST',
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    console.log('Windice Roll Response:', data);
    res.json(data);
  } catch (err) {
    console.error('Error posting roll:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
