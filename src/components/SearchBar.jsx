import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

const fetchCoinData = async (page = 1) => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=false`;
  try {
    const res = await fetch(url, {
      headers: {
        "x-cg-demo-api-key": "CG-kPxhcSU5syzseJfrpVdgKqVv",
      },
    });
    if (!res.ok) throw new Error(`Failed fetching page ${page}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("fetchCoinData error:", error);
    return [];
  }
};

const saveCoinsToFirestore = async (coins) => {
  const ref = doc(db, "crypto", "marketData");
  try {
    await setDoc(ref, {
      data: coins,
      timestamp: Date.now(),
    });
    console.log("Coins saved to Firestore");
  } catch (error) {
    console.error("Error saving coins to Firestore:", error);
  }
};

const SearchBar = ({ onSearchResults }) => {
  const [search, setSearch] = useState("");
  const [allCoins, setAllCoins] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNoResults, setShowNoResults] = useState(false);

  // Load coins
  useEffect(() => {
    const loadCoins = async () => {
      setLoading(true);
      setError(null);
      const ref = doc(db, "crypto", "marketData");
      try {
        const snapshot = await getDoc(ref);
        const now = Date.now();

        if (
          snapshot.exists() &&
          snapshot.data().timestamp &&
          now - snapshot.data().timestamp < CACHE_DURATION
        ) {
          setAllCoins(snapshot.data().data);
          console.log("Loaded coins from cache");
        } else {
          const page1 = await fetchCoinData(1);
          const page2 = await fetchCoinData(2);
          const combined = [...page1, ...page2];
          setAllCoins(combined);
          await saveCoinsToFirestore(combined);
          console.log("Fetched fresh coins and saved");
        }
      } catch (err) {
        console.error("Error loading coins:", err);
        setError("Failed to load coin data");
      } finally {
        setLoading(false);
      }
    };

    loadCoins();
  }, []);

  // Debounced search
  const debouncedSearch = React.useMemo(
    () =>
      debounce((query) => {
        if (query.length < 3) {
          setResults([]);
          setShowNoResults(false);
          return;
        }
        const filtered = allCoins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(query.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setShowNoResults(filtered.length === 0);
      }, 300),
    [allCoins]
  );

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search, debouncedSearch]);

  // Notify parent when results change
  useEffect(() => {
    onSearchResults?.(results);
  }, [results, onSearchResults]);

  return (
    <div className="search-bar" style={{ maxWidth: 700, margin: "auto" }}>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowNoResults(false);
          setError(null);
        }}
        placeholder="Search a coin (min 3 chars)..."
        aria-label="Search coins"
        style={{
          width: "100%",
          padding: "8px 12px",
          fontSize: "1rem",
          marginBottom: 12,
          borderRadius: 4,
          border: "1px solid #ccc",
        }}
      />

      {error && (
        <div role="alert" style={{ color: "red", marginBottom: 12 }}>
          Error: {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          Loading coins...
        </div>
      ) : (
        <>
        
          <div className="search-crypto-tab">
            {results.length > 0 && (
              <table className="search-table">
                <thead>
                  <tr>
                    <th>#(Market rank)</th>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Price (USD)</th>
                    <th>24h Change</th>
                    <th>Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((coin) => (
                    <tr key={coin.id}>
                      <td>{coin.market_cap_rank}</td>
                      <td><img src={coin.image} alt={coin.name} width="24" />{coin.name}</td>
                      <td>{coin.symbol.toUpperCase()}</td>
                      <td>${coin.current_price?.toLocaleString() || "N/A"}</td>
                      <td style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td>${coin.market_cap?.toLocaleString() || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        

          {!loading && showNoResults && (
            <div style={{ marginTop: 20, fontStyle: "italic" }}>
              No results found for "{search}"
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBar;
