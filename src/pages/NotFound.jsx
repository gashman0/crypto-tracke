import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {

    const styles = {
        container: {
            textAlign: "center",
            padding: "50px",
            fontFamily: "Arial, sans-serif",
        },
        title: {
            fontSize: "5rem",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#ff4d4f",
            margin: "0"
        },
        text: {
            fontSize: "1.2rem",
            marginBottom: "30px",
            color: "#666",
        },
        link: {
            padding: "10px 20px",
            backgroundColor: "yellow",
            color: "#000",
            borderRadius: "5px",
            textDecoration: "none",
        },
    };



  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.text}>Oops! The page you’re looking for doesn’t exist.</p>
      <NavLink to="/" style={styles.link}>Go back Home</NavLink>
    </div>
  )
}

export default NotFound