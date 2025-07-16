import React from 'react'

const Footer = () => {
  return (
    <>
        <footer class="big-footer">
            <div class="container footer-grid">
                <div class="footer-brand">
                <h2>🪙 CryptoTracker</h2>
                <p>Track real-time prices, trends, and market caps of top cryptocurrencies with ease.</p>
                </div>

                <div class="footer-section">
                <h3>About</h3>
                <ul>
                    <li><a href="#">Company</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
                </div>

                <div class="footer-section">
                <h3>Resources</h3>
                <ul>
                    <li><a href="#">Market Overview</a></li>
                    <li><a href="#">API Access</a></li>
                    <li><a href="#">News Feed</a></li>
                </ul>
                </div>

                <div class="footer-section">
                <h3>Support</h3>
                <ul>
                    <li><a href="#">Help Center</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Report Issue</a></li>
                </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="container">
                <p>© 2025 CryptoTracker. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer