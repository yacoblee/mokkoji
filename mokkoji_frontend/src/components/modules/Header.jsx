import React, { useEffect, useState } from 'react';

import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import '../../css/header.css'
import { apiCall } from '../../service/apiService';

const Header = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState("");
    const locationNows = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return JSON.parse(sessionStorage.getItem("isLoggedIn")) || false;
    });
    useEffect(() => {
        const islogin = JSON.parse(sessionStorage.getItem("isLoggedIn")) || false;
        if (islogin) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [])

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
    }, [isLoggedIn, mypage, buy]);

    if (locationNows.pathname.toLowerCase().includes('login')) return null;

    const logout = (e) => {
        let url = '/logout';
        apiCall(url, 'POST', null, null)
            .then((response) => {
                sessionStorage.setItem("isLoggedIn", "false");
                sessionStorage.removeItem("userData");
                console.log(response);
                alert('로그아웃 성공');
                setIsLoggedIn(false);
                setLoginInfo('');
            }).catch((err) => {
                if (err === '502') {
                    alert("로그 아웃 실패, 다시하세요 ~~");
                } else { alert(`** onLogout 시스템 오류, err=${err}`); }
            }); //apiCall
    }


    // myPage로 넘어갈때 로그인된 사용자의 상세 정보를 담아서 이동
    const myPageMain = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** myPageMain 성공 url=${url}`);
                sessionStorage.setItem("userMainData", JSON.stringify(response.data));
                navigate("/mypage");
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageMain 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageMain



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
                                        <li><NavLink onClick={() => { myPageMain("/mypage/user") }} className={({ isActive }) => (isActive ? 'active' : '')}><p>Mypage</p></NavLink ></li>
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
