import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../../css/header.css'
const Header = () => {
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
                            <li><a href="#"><p>
                                Login
                            </p></a></li>
                        </ul>
                    </nav>
                </div>
            </section>
        </header>
    );
};

export default Header;