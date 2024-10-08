import { NavLink,Link, Outlet,useParams } from "react-router-dom";
import React, { useState } from "react";
import '../../css/administrator/admin.css'

const Admin = () => {
    const { category } = useParams();
    const AdminMenu = [
        { category: 'users', description: '회원정보관리' },
        { category: 'products', description: '상품' },
        { category: 'orders', description: '주문' },
        { category: 'interiorGoods', description: '주문 통합' },
        { category: 'dashboard', description: '대시보드' },
        { category: 'reserve', description: '예약' },
    ];

    const AdminSubMenu = [
        { category: 'users', description: '회원정보관리' },
        { category: 'products', description: '상품' },
        { category: 'orders', description: '주문' },
        { category: 'interiorGoods', description: '주문 통합' },
        { category: 'dashboard', description: '대시보드' },
        { category: 'kitchGoods', description: '테스트' },
    ];
    
    return (
    <>
        <div className="admin-layout">
        <aside className="admin-sidebar" style={{ marginTop: "150px" }}>
            <h3 style={{ margin: "0px 0px 20px 0px" }}>Admin Dashboard</h3>
            <div className='adminMenu' >
                <ul>
                {AdminMenu.map((items, i) => (
                    <li>
                        <NavLink to={`/administrator/${items.category}`} key={i}  >{items.description}
                        </NavLink></li>
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