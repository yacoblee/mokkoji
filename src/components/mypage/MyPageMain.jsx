import '../../css/mypage/MyPageIndex.css';

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function MyPageMain() {

    return (
        <div className='MyPageMain'>
            <div className='MyInfoGrid'>
                <div className="MyInfo">
                    <h1>@ 안녕하세요!</h1>
                    <div className="MyInfoSet">
                        <a href=''>내 정보 수정</a>
                    </div>
                </div>

                <div className="MyOrder">
                    <ul>
                        <li>
                            <span>
                                <h3>구매 대기</h3>
                            </span>
                            <span>
                                <a href="">0</a>
                            </span>
                        </li>
                        <li>
                            <span>
                                <h3>구매 완료</h3>
                            </span>
                            <span>
                                <a href="">0</a>
                            </span>
                        </li>
                        <li>
                            <span>
                                <h3>구매 확정</h3>
                            </span>
                            <span>
                                <a href="">0</a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyPageMain;
