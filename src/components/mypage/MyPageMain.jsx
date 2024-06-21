import '../../css/mypage/MyPageMain.css';

import React from 'react';

import MyPageFlex from './MyPageFlex';
import MyPageSet from './MyPageSet'
import { Route, Routes } from 'react-router-dom';

function MyPageMain() {

    return (
        <div className='MyPageMain'>

            <Routes>
                <Route path='/' element={<MyPageFlex />} />
                <Route path='/asdf' element={<MyPageSet />} />
            </Routes>
        </div>
    )
}

export default MyPageMain;
