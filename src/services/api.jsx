import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoins = async () => {
  const response = await axios.get(`${API_URL}/coins/markets?vs_currency=usd`);
  return response.data;
};