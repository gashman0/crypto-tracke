import React from 'react'
import { useEffect, useState } from 'react'



const CryptoList = () => {

    const [coins, setCoins] = useState([]);


    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false', {
        headers: {
            'x-cg-demo-api-key': 'CG-kPxhcSU5syzseJfrpVdgKqVv',
        },
        })
        .then(res => {
            if (!res.ok) {
            throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            setCoins(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
        <h1>Top 10 Cryptos</h1>
        <ul>
            {coins.map(coin => (
            <li key={coin.id}>
                {coin.name} (${coin.current_price})
            </li>
            ))}
        </ul>
        
        </div>
    );
}

export default CryptoList