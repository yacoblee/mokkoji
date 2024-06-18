import React from 'react';
import '../Header.css';

const Header = () => {
    return (
        <header id="header" className="deactive">
            <section className="main_header">
                <div className="header_left">
                    <nav className="header_nav">
                        <ul>
                            <li><a href="#"><p>con1</p></a></li>
                            <li><a href="#"><p>con2</p></a></li>
                            <li><a href="#"><p>con3</p></a></li>
                        </ul>
                    </nav>
                </div>
                <div className="header_center">Header center</div>
                <div className="header_right">
                    <nav className="header_nav">
                        <ul>
                            <li><a href="#"><p>con1</p></a></li>
                            <li><a href="#"><p>con2</p></a></li>
                            <li><a href="#"><p>con3</p></a></li>
                        </ul>
                    </nav>
                </div>
            </section>
        </header>
    );
};

export default Header;