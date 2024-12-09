import React from 'react';
import { FaFacebook, FaFlickr, FaGooglePlusG, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className={`footer`}>
      <div className="footer-container">
        <div className="footer-column">
          <h3>WonderBooks</h3>
          <ul>
            <li><Link to="/pre-sale-faqs">Read Books</Link></li>
            <li><Link to="/submit-ticket">Create Books</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Services</h3>
          <ul>
            <li><Link to="/theme-tweak">Read Books</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Showcase</h3>
          <ul>
            <li><Link to="/widgetkit">Widgetkit</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>About Us</h3>
          <ul>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/affiliates">Affiliates</Link></li>
            <li><Link to="/resources">Resources</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <ul className="social-icons">
            <li><Link to="/facebook"><FaFacebook /></Link></li>
            <li><Link to="/twitter"><FaTwitter /></Link></li>
            <li><Link to="/google-plus"><FaGooglePlusG /></Link></li>
            <li><Link to="/flickr"><FaFlickr /></Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className='copyright'>&copy; 2024 WonderBooks. All rights reserved.</p>
        <div style={{margin:'1% 0%'}}>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
