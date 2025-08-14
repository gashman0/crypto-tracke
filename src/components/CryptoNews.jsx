import React, { useState } from 'react';
import { useEffect } from 'react';
import { data, NavLink } from 'react-router-dom';







const styles = {
  page: {padding: "20px",backgroundColor: "black",minHeight: "100vh", width: "80%", margin: "auto"},
  heading: {textAlign: "center",marginBottom: "20px",fontSize: "2rem",color: "yellow"},
  newsGrid: {display: "grid",gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",gap: "20px"},
  card: {backgroundColor: "#fff",borderRadius: "10px",boxShadow: "0 4px 8px rgba(0,0,0,0.1)",overflow: "hidden",transition: "transform 0.2s"},
  image: {width: "100%",height: "180px",objectFit: "cover"},
  content: {padding: "15px"},
  title: {fontSize: "1.2rem",marginBottom: "10px",color: "#333"},
  description: {fontSize: "0.9rem",color: "#666",marginBottom: "10px"},
  link: {color: "#8fe81aff",fontWeight: "bold",textDecoration: "none"},
};

const CryptoNews = () => {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    
    useEffect(() => {
        const fetchNews = async (pageNumber) => {
            try{
                const response = await fetch(
                    `https://api.cryptonewsapi.online/api/v1/news?page=${pageNumber}&limit=${limit}&keyword=bitcoin&dateFrom=2023-01-01&dateTo=2025-12-31&sortOrder=desc&language=en`,{
                        headers: {
                            'X-API-Key': 'e434f663-ab66-4b45-855a-0c8735f506a8',
                        }
                    }
                );
                const data = await response.json();
                setNews(data.data.articles || []);
                setTotalPages(data.pagination?.total_pages || 148);
                console.log(data);
            }catch{
                console.error("Error in fetching data", error);
            }
        };
        fetchNews(page);
    }, [page]);





  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>📰 Latest Crypto News</h1>

      <div style={styles.newsGrid}>
        {news.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.content}>
              <h3 style={styles.title}>{item.title}</h3>
              <p style={styles.description}>
                {item.description?.slice(0, 100)}...
              </p>
              <p className="news-date">
                {new Date(item.pubDate).toLocaleString('en-US',{
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
              </p>
              <NavLink to={`/news/${item.id}`} state={{article: item}} rel="noopener noreferrer" style={styles.link}>
                Read More →
              </NavLink>
            </div>
          </div>
        ))}
      </div>

    <div className="pagination-container">
        <button
            className="pagination-btn prev"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
        >
            Previous
        </button>

        <span style={{ fontWeight: "bold" }}> Page {page} of {totalPages} </span>

        <button
            className="pagination-btn next"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
        >
            Next
        </button>
    </div>

    </div>
  )
}

export default CryptoNews