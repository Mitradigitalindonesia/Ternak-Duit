const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const WINDICE_API = 'https://windice.io/api/v1/api';

// Middleware logging simple
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Endpoint get user balance
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

// Endpoint roll (bet)
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
