import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import '../../css/administrator/admin.css'

const Admin = () => {
    const { category } = useParams();
    const navigate = useNavigate(); // useNavigate 훅 사용

    const AdminMenu = [
        { category: 'users', description: '회원정보관리' },
        { category: 'products', description: '상품' },
        { category: 'orders', description: '주문통계' },
        { category: 'reserve', description: '예약' },
    ];

    useEffect(() => {
       
        if (!category) {
            navigate('/administrator/users');
        }
    }, [category]);

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
