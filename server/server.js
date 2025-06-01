const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public/
app.use(express.static(path.join(__dirname, '..', 'public')));

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Proxy API to avoid CORS issues
const API_BASE = 'https://windice.io/api/v1/api';

app.post('/api/roll', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/roll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization,
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/api/user', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/user`, {
      headers: {
        'Authorization': req.headers.authorization,
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
