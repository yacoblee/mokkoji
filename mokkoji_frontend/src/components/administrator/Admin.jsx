import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import '../../css/administrator/admin.css'
import { apiCall } from "../../service/apiService";

const Admin = () => {
    const { category } = useParams();
    const navigate = useNavigate(); // useNavigate 훅 사용

    const AdminMenu = [
        { category: 'users', description: '회원정보관리' },
        { category: 'products', description: '상품' },
        { category: 'orders', description: '주문통계' },
        { category: 'reserve', description: '예약' },
    ];
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);
    const token = JSON.parse(sessionStorage.getItem('userData'));
    useEffect(() => {
        const fetchAdminState = async () => {
            try {
                const adminResponse = await apiCall('/adminstate', 'POST', null, token);
                const { isAdmin, isLogin } = adminResponse.data;
                setIsLoggedIn(isLogin);
                setIsAdmin(isAdmin);
                //console.log('isAdmin', isAdmin)
                //console.log('isLogin', isLogin)
            } catch (error) {
                setIsAdmin(false);
                setIsLoggedIn(false);
                //console.log('로그아웃상태')
            }
        }
        fetchAdminState();

    }, [token])
    //console.log('isAdmin', isAdmin)
    // useEffect(() => {
    //     if (!category) {
    //         navigate('/administrator/users');
    //     }
    // }, [category]);


    useEffect(() => {
        // 로그인되지 않았거나 관리자가 아닌 경우 홈으로 리다이렉트
        if (!isLoggedIn || !isAdmin) {
            navigate('/'); // 로그인이 안되어 있으면 로그인 페이지로 이동
        }
    }, [isLoggedIn, isAdmin]);
    return (
        <>
            <div className="admin-layout">
                <aside className="admin-sidebar" style={{ marginTop: "150px" }}>
                    <h3 style={{ margin: "0px 0px 20px 0px" }}>Admin Dashboard</h3>
                    <div className='adminMenu'>
                        <ul>
                            {AdminMenu.map((items, i) => (
                                <li key={i}>
                                    <NavLink to={`/administrator/${items.category}`} key={i}>{items.description}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </>
    );


}

export default Admin;
