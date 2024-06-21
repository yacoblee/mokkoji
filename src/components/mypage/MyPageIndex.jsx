import '../../css/mypage/MyPageIndex.css';

import React from 'react';

import MyPageMain from './MyPageMain';
import MyPageGrid from './MyPageGrid';

function MyPageIndex() {
    return (

        <div className='MyPage'>
            <h1>내 정보</h1>

            <div className='MyPageIndex'>

                <MyPageMain />
                <MyPageGrid />

            </div>
        </div>
    );
};

export default MyPageIndex;
