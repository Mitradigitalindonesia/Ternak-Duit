const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;
const WINDICE_API = 'https://windice.io/api/v1/api';

app.use(cors());
app.use(express.json());

// Log semua request
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Get balance dari Windice
app.get('/api/user', async (req, res) => {
  try {
    const response = await fetch(`${WINDICE_API}/user`, {
      headers: {
        'Authorization': req.headers.authorization || '',
        'User-Agent': 'Mozilla/5.0',
      },
    });
    const data = await response.json();
    console.log("User Balance Response:", data);
    res.json(data);
  } catch (err) {
    console.error('Error GET /api/user:', err);
    res.status(500).json({ error: err.message });
  }
});

// Roll/bet dari Windice
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
    console.log("Roll Response:", data);
    res.json(data);
  } catch (err) {
    console.error('Error POST /api/roll:', err);
    res.status(500).json({ error: err.message });
  }
});

// Serve file HTML dari public/
app.use(express.static(path.join(__dirname, '..', 'public')));

// Fallback untuk /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
