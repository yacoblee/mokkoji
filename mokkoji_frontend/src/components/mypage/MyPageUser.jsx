import '../../css/mypage/MyPageUser.css';

import React from 'react';

import MyPageFlex from './MyPageFlex';
import MyPageSet from './MyPageSet'
import { Route, Routes, Link } from 'react-router-dom';
import MyPageAddress from './MyPageAddress';


function MyPageUser({ userMain }) {
    return (
        <div className='MyPageUser'>
            <Routes>
                <Route path='/' element={<MyPageFlex userMain={userMain} />} />
                <Route path='set' element={<MyPageSet userMain={userMain} />} />
                <Route path='address' element={<MyPageAddress userMain={userMain} />} />
            </Routes>
        </div>
    )
}

export default MyPageUser;
