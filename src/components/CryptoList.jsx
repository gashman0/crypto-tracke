import React from 'react'
import { useEffect, useState } from 'react'
import Spinners from './Spinners';

const CryptoList = () => {
    const [coins, setCoins] = useState([]);
    const [page, setPage] = useState(1); // Tracks the current page
    const [isLastPage, setIsLastPage] = useState(false);
    const perPage = 5;
    const [loading, setLoading] = useState(true);

    const fetchCoins = (pageNumber) => {
        setLoading(true);
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=${pageNumber}&sparkline=false`, {
        headers: {
            'x-cg-demo-api-key': 'CG-kPxhcSU5syzseJfrpVdgKqVv',
        },
        })
        .then(res => res.json())
        .then(data => {console.log(data);setCoins(data);setIsLastPage(data.length < perPage);})
        .catch(error => console.error('Error fetching data:', error));
        setLoading(false)
    };

    useEffect(() => {
        fetchCoins(page);
    }, [page]);

    return (
        <>
            <main className="container">
                <div className="crypto-table">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Coin</th>
                                <th className="symbol-col">Symbol</th>
                                <th>Price</th>
                                <th>24h Change</th>
                                <th>Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>
                                    <Spinners loading={loading} />
                                </td>
                                </tr>
                            ) : (
                                coins.map((coin) => (
                                <tr key={coin.id}>
                                    <td>{coin.market_cap_rank}</td>
                                    <td><img src={coin.image} alt={coin.name} width="24" /> {coin.name}</td>
                                    <td className="symbol-col">{coin.symbol.toUpperCase()}</td>
                                    <td>${coin.current_price.toLocaleString()}</td>
                                    <td style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                    </td>
                                    <td>{coin.market_cap.toLocaleString()}</td>
                                </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='pagination' style={{ marginTop: '1rem' }}>
                    <button className={`nav-button ${page === 1 ? 'disabled' : ''}`} onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
                    <button className={`nav-button ${isLastPage ? 'disabled' : ''}`} onClick={() => setPage(page + 1)} disabled={isLastPage}>Next</button>
                </div>
            </main>
        </>
    );
}

export default CryptoList

