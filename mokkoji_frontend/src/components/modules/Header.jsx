import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './action';
import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import '../../css/header.css'

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, userInfo } = useSelector(state => state);
    const locationNows = useLocation();


    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById('header');

            if (!header)
                return;

            if (window.scrollY > 10) {
                header.classList.remove('deactive');
                header.classList.add('headactive');
            } else {
                header.classList.remove('headactive');
                header.classList.add('deactive');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    const mypage = locationNows.pathname.toLowerCase().includes('mypage');
    const buy = locationNows.pathname.toLowerCase().includes('buy');

    useEffect(() => {
        if ((!isLoggedIn && mypage) || (!isLoggedIn && buy)) {
            navigate('/');
        }
    }, [isLoggedIn]);

    if (locationNows.pathname.toLowerCase().includes('login')) return null;

    const handleLogout = () => {
        dispatch(logout());

    };

    return (
        <header id="header" className="deactive">
            <section className="main_header">
                <Link to={'/'}><div className="header_center">Header center</div></Link>
                <div className="header_left">
                    <nav className="header_nav">
                        <ul>
                            <li><NavLink to="/introduction"><p>Introduction</p></NavLink></li>
                            <li><NavLink to="/goods" className={({ isActive }) => (isActive ? 'active' : '')}><p>Goods</p></NavLink></li>
                            <li><NavLink to="/reserve" className={({ isActive }) => (isActive ? 'active' : '')}><p>Reservation</p></NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="header_right">
                    <nav className="header_nav">
                        <ul>
                            {
                                isLoggedIn ?
                                    <>
                                        <li><NavLink onClick={handleLogout} className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink ></li>
                                        <li><NavLink to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}><p>Mypage</p></NavLink ></li>
                                        <li><NavLink to="/administrator" className={({ isActive }) => (isActive ? 'active' : '')}><p>Admin</p></NavLink ></li>
                                    </>
                                    :
                                    <>
                                        <li><NavLink to="/Login" className={({ isActive }) => (isActive ? 'active' : '')}><p>Login</p></NavLink ></li>
                                    </>
                            }
                        </ul>
                    </nav>
                </div>
            </section>
        </header>
    );
};

export default React.memo(Header);