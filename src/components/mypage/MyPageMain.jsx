import '../../css/mypage/MyPageMain.css';

import React from 'react';

function MyPageMain() {

    return (
        <div className='MyPageMain'>
            <div className='MyInfoGrid'>

                <div className="MyInfo">
                    <h1>{localStorage.id} 안녕하세요!</h1>
                    <div className="MyInfoSet">
                        <a href=''>내 정보 수정</a>
                    </div>
                </div>

                <div className="MyOrder">
                    <ul>
                        <li>
                            <span>
                                <h3>비밀번호</h3>
                            </span>
                            <span>
                                <a href="">0</a>
                            </span>
                        </li>
                        <li>
                            <span>
                                <h3>휴대폰번호</h3>
                            </span>
                            <span>
                                <a href="">0</a>
                            </span>
                        </li>
                        <li>
                            <span>
                                <h3>주소</h3>
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

export default React.memo(MyPageMain);
