import '../../css/Footer.css'
import React, { useMemo } from 'react';


const Footer = () => {

    return (

        <div className="main_footer">
            <div className="footer_section">
                <h3>About Us</h3>
                <p>We are a company dedicated to providing the best service in the industry. Our mission is to enrich lives by delivering top-notch products and services.</p>
            </div>
            <div className="footer_section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
            <div className="footer_section social_media">
                <h3>Contact Us</h3>
                <ul>
                    <li>경기 성남시 분당구 돌마로 46</li>
                    <li>yacobleee@naver.com</li>
                </ul>
            </div>
            <div className="footer_section">
                <h3>Subscribe</h3>
                <form className="subscribe_form">
                    <input type="email" placeholder="Your email address" />
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>
    );
}

export default React.memo(Footer)