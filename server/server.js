const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;
const WINDICE_API = 'https://windice.io/api/v1/api';

// Middleware
app.use(cors());
app.use(express.json());

// Logging sederhana
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Proxy: Get user balance
app.get('/api/user', async (req, res) => {
  try {
    const response = await fetch(`${WINDICE_API}/user`, {
      headers: {
        'Authorization': req.headers.authorization || '',
        'User-Agent': 'Mozilla/5.0',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Proxy: Roll (bet)
app.post('/api/roll', async (req, res) => {
  try {
    const response = await fetch(`${WINDICE_API}/roll`, {
      method: 'POST',
      headers: {
        'Authorization': req.headers.authorization || '',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend dari folder public/
app.use(express.static(path.join(__dirname, '..', 'public')));

// Handle root / fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
