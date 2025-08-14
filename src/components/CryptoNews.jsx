import React, { useState } from 'react';
import { useEffect } from 'react';
import { data } from 'react-router-dom';



const CryptoNews = () => {
    
    useEffect(() => {
        const fetchNews = async () => {
            try{
                const response = await fetch(
                    `https://api.cryptonewsapi.online/api/v1/news?page=2&limit=10&keyword=bitcoin&dateFrom=2023-01-01&dateTo=2025-12-31&sortOrder=desc&language=en`,{
                        headers: {
                            'X-API-Key': 'e434f663-ab66-4b45-855a-0c8735f506a8',
                        }
                    }
                );
                const data = await response.json();
                console.log(data);
            }catch{
                console.error("Error in fetching data", error);
            }
        };
        fetchNews();
    }, []);





  return (
    <div>CryptoNews</div>
  )
}

export default CryptoNews