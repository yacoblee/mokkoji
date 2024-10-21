import '../../css/mypage/MyPageUser.css';

import React from 'react';

import MyPageFlex from './MyPageFlex';
import MyPageSet from './form/MyPageSet'
import { Route, Routes, Link } from 'react-router-dom';
import MyPageAddress from './MyPageAddress';
import { useEffect } from 'react';


function MyPageUser({ userMain, userAddress, myPageAddress, changeDefaultAddress, addressDelete, myPageMain }) {

    return (
        <div className='MyPageUser'>
            <Routes>
                <Route path='/' element={<MyPageFlex
                    userMain={userMain}
                    myPageMain={myPageMain}
                />} />
                <Route path='set' element={<MyPageSet userMain={userMain} />} />
                <Route
                    path='address'
                    element={<MyPageAddress
                        userAddress={userAddress}
                        myPageAddress={myPageAddress}
                        changeDefaultAddress={changeDefaultAddress}
                        addressDelete={addressDelete}
                    />}
                />

            </Routes>
        </div>
    )
}

export default MyPageUser;
