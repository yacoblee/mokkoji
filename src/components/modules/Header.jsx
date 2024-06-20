import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../../css/header.css'
import { useLocation } from 'react-router-dom';
const Header = () => {
    // if (window.location.pathname === "/login")
    //     console.log(window.location.pathname);
    //     return

    const locationNow = useLocation();
    if (locationNow.pathname.toLowerCase().includes('login')) return null;
    console.log(locationNow);
    return (
        <header id="header" className="deactive">
            <section className="main_header"><div className="header_center">Header center</div>
                <div className="header_left">
                    <nav className="header_nav">
                        <ul>
                            <li><Link to="/"><p>Introduction</p></Link></li>
                            <li><Link to="/goods"><p>Goods</p></Link></li>
                            <li><Link to="/reserve"><p>Reserve</p></Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="header_right">
                    <nav className="header_nav">
                        <ul>
                            <li><Link to="/mypage"><p>mypage</p></Link></li>
                            <li><Link to="/Login"><p>Login</p></Link></li>
                        </ul>
                    </nav>
                </div>
            </section>
        </header>
    );
};

export default Header;