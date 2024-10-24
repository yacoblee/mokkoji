import React, { useEffect, useState } from 'react';

import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import '../../css/header.css'
import { apiCall } from '../../service/apiService';
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";

const Header = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState("");
    const locationNows = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const token = JSON.parse(sessionStorage.getItem('userData'));
    useEffect(() => {
        const fetchAdminState = async () => {
            try {
                const adminResponse = await apiCall('/adminstate', 'POST', null, token);
                const { isAdmin, isLogin } = adminResponse.data;
                setIsLoggedIn(isLogin);
                setIsAdmin(isAdmin);
            } catch (error) {
                setIsAdmin(false);
                setIsLoggedIn(false);
                //console.log('로그아웃상태')
            }
        }
        fetchAdminState();

    }, [token])

    //console.log(isAdmin ? '관리자 ' : '일반유저');
    //console.log(isLoggedIn ? '로그인상태 ' : '로그인하지않은상태');
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
    const administrator = locationNows.pathname.toLowerCase().includes('administrator');
    useEffect(() => {
        if ((!isLoggedIn && mypage) || (!isLoggedIn && buy) || (!isLoggedIn && administrator) || (!isAdmin && administrator)) {
            //setIsAdmin(false);
            // console.log('로그인상태 ', isLoggedIn)
            // console.log('관리자 상태 ', isAdmin)
            // console.log('administrator', administrator)
            navigate('/');
        }
    }, [isLoggedIn, mypage, buy, isAdmin]);

    if (locationNows.pathname.toLowerCase().includes('login')) return null;

    const logout = (e) => {
        let url = '/logout';
        apiCall(url, 'POST', null, null)
            .then((response) => {
                sessionStorage.setItem("isLoggedIn", "false");
                sessionStorage.removeItem("userData");
                //console.log(response);
                alert('로그아웃 성공');
                setIsLoggedIn(false);
                setLoginInfo('');
            }).catch((err) => {
                if (err === '502') {
                    alert("로그 아웃 실패, 다시하세요 ~~");
                } else { alert(`** onLogout 시스템 오류, err=${err}`); }
            }); //apiCall
    }



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
                                        <li><NavLink onClick={logout} className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink ></li>
                                        <li><NavLink to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}><p>Mypage</p></NavLink ></li>
                                        {isAdmin && <li><NavLink to="/administrator/users" className={({ isActive }) => (isActive ? 'active' : '')}><p>Admin</p></NavLink ></li>}
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
