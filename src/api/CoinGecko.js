export const fetchCoinData = async () => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&x_cg_demo_api_key=CG-kPxhcSU5syzseJfrpVdgKqVv`
  );
  if (!response.ok) throw new Error('Failed to fetch from CoinGecko');
  return response.json();
};