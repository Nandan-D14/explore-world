import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/contentStyle/footer.css'

function Footer() {
  return (
    <footer className="footer-home">
    <div className="footer-content">
      <p>&copy; 2024 Explore World. All rights reserved.</p>
      <div className="social-media-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <nav className="footer-nav">
        <Link to="/aboutus">About Us</Link>
        <Link to="/contact">Contact</Link>
        <Link to="">Privacy Policy</Link>
      </nav>
    </div>
  </footer>
  )
}

export default Footer;
