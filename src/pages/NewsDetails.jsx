import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const styles = {
  page: { padding: "20px", backgroundColor: "black", minHeight: "100vh", width: "80%", margin: "auto" },
  heading: { textAlign: "center", marginBottom: "20px", fontSize: "2rem", color: "yellow" },
  content: { backgroundColor: "#fff", padding: "20px", borderRadius: "10px" },
  image: { width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" },
  date: { color: "#666", fontSize: "0.9rem", margin: "10px 0" },
  description: { color: "#333", fontSize: "1rem", lineHeight: "1.6" },
  backBtn: { display: "inline-block", marginTop: "20px", color: "#8fe81aff", textDecoration: "none" },
};

export default function NewsDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!article);

  useEffect(() => {
    // If no article passed via state, try to refetch from API
    if (!article) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(
            `https://api.cryptonewsapi.online/api/v1/news?page=1&limit=100&keyword=bitcoin&dateFrom=2023-01-01&dateTo=2025-12-31&sortOrder=desc&language=en`,
            {
              headers: { "X-API-Key": "e434f663-ab66-4b45-855a-0c8735f506a8" }
            }
          );
          const data = await response.json();
          const found = data.data.articles.find(item => String(item.id) === String(id));
          if (found) {
            setArticle(found);
          } else {
            navigate("/"); // redirect if not found
          }
        } catch (error) {
          console.error("Error fetching article:", error);
          navigate("/");
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [article, id, navigate]);

  if (loading) {
    return <p style={{ color: "white", textAlign: "center" }}>Loading...</p>;
  }

  if (!article) {
    return <p style={{ color: "white", textAlign: "center" }}>Article not found</p>;
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>{article.title}</h1>
      {article.image_url && <img src={article.image_url} alt={article.title} style={styles.image} />}
      <p style={styles.date}>
        {new Date(article.pubDate).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })}
      </p>
      <div style={styles.content}>
        <p style={styles.description}>{article.description || "No description available"}</p>
      </div>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
    </div>
  );
}
