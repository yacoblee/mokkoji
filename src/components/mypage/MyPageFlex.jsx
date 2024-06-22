import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome, faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import '../../css/mypage/MyPageMain.css';

import userInfo from "../login/UserInforData";

import React from 'react';
import { Link } from 'react-router-dom';

function MyPageFlex() {

    const user = userInfo[0];   // 임의 지정

    return (
        <div className='MyInfoFlex'>
            <div className="MyInfo">
                <h1>{user.id}, 안녕하세요!</h1>

                <Link to='/mypage/set'>
                    <div className="MyInfoSet">
                        <button>내 정보 수정</button>
                    </div>
                </Link>

            </div>

            <div className="MyInfoBasic">
                <div>
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <span>
                        {user.name}
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faMobileScreenButton} />
                    </div>
                    <span>
                        {user.phoneNumber}
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <span>
                        유저.이메일
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faHome} />
                    </div>
                    <span>
                        {user.address}
                    </span>
                </div>
            </div>

        </div>
    )
}

export default MyPageFlex;
