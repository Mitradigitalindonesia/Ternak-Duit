const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const API_BASE = 'https://windice.io/api/v1/api';

app.post('/api/roll', async (req, res) => {
  const response = await fetch(`${API_BASE}/roll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers.authorization,  // Forward API key
    },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.json(data);
});

app.get('/api/user', async (req, res) => {
  const response = await fetch(`${API_BASE}/user`, {
    method: 'GET',
    headers: {
      'Authorization': req.headers.authorization,
    }
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
