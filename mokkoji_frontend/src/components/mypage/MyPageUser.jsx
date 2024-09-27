import '../../css/mypage/MyPageUser.css';

import React from 'react';

import MyPageFlex from './MyPageFlex';
import MyPageSet from './MyPageSet'
import { Route, Routes, Link } from 'react-router-dom';


function MyPageUser() {
    return (
        <div className='MyPageUser'>
            <Routes>
                <Route path='/' element={<MyPageFlex />} />
                <Route path='set' element={<MyPageSet />} />
            </Routes>
        </div>
    )
}

export default MyPageUser;
