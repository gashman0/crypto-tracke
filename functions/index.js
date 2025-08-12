const functions = require("firebase-functions");
const fetch = require("node-fetch"); // already installed with Firebase functions
const cors = require("cors")({ origin: true });

exports.getCoins = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false"
      );
      const data = await response.json();
      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to fetch coins" });
    }
  });
});
