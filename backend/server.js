// backend/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // allow calls from your frontend (localhost:5173)

const PORT = process.env.PORT || 5000;

// Simple endpoint that proxies CoinGecko markets (top 500 coins)
// Note: CoinGecko supports per_page up to 250, so we fetch page 1 + page 2.
app.get('/coins', async (req, res) => {
  try {
    // fetch two pages in parallel
    const reqs = [
      axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: { vs_currency: 'usd', per_page: 250, page: 1, sparkline: false }
      }),
      axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: { vs_currency: 'usd', per_page: 250, page: 2, sparkline: false }
      })
    ];

    const [r1, r2] = await Promise.all(reqs);
    const combined = [...r1.data, ...r2.data]; // 500 items

    res.json(combined);
  } catch (err) {
    console.error('Backend fetch error:', err.message || err);
    res.status(500).json({ error: 'Failed to fetch coin data' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy listening on http://localhost:${PORT}`);
});
