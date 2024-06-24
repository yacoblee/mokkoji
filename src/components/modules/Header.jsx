import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './action';
import { Link, useLocation, NavLink } from 'react-router-dom';
import '../../css/header.css'

const Header = () => {

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



    const dispatch = useDispatch();
    const { isLoggedIn, userInfo } = useSelector(state => state);
    const locationNows = useLocation();

    if (locationNows.pathname.toLowerCase().includes('login')) return null;

    const handleLogout = () => {
        dispatch(logout());
    };
    // const user = JSON.parse(sessionStorage.getItem('LoginSuccess'));
    // const userInfo = sessionStorage.getItem('LoginId');
    // console.log('userInfo' + userInfo);

    // const logOut = () => {
    //     sessionStorage.removeItem('LoginSuccess');
    //     sessionStorage.removeItem('LoginId');
    // }





    return (
        <header id="header" className="deactive">
            <section className="main_header">
                <Link to={'/'}><div className="header_center">Header center</div></Link>
                <div className="header_left">
                    <nav className="header_nav">
                        <ul>
                            <li><NavLink to="/"><p>Introduction</p></NavLink></li>
                            <li><NavLink to="/goods" className={({ isActive }) => (isActive ? 'active' : '')}><p>Goods</p></NavLink></li>
                            <li><NavLink to="/reserve" className={({ isActive }) => (isActive ? 'active' : '')}><p>Reserve</p></NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="header_right">
                    <nav className="header_nav">
                        <ul>
                            {/* <li><Link to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}><p>mypage</p></Link></li>
                            <li><Link to="/Login" className={({ isActive }) => (isActive ? 'active' : '')}><p>Login</p></Link></li> */}
                            {
                                isLoggedIn ?
                                    <>
                                        <li><Link onClick={handleLogout} className={({ isActive }) => (isActive ? 'active' : '')}>Logout</Link></li>
                                        <li><Link to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}><p>mypage</p></Link></li>
                                    </>
                                    :
                                    <>
                                        <li><Link to="/Login" className={({ isActive }) => (isActive ? 'active' : '')}><p>Login</p></Link></li>
                                    </>
                            }
                        </ul>
                    </nav>
                </div>
            </section>
        </header>
    );
};

export default Header;