import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome, faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import '../../css/mypage/MyPageMain.css';

// import userInfo from "../login/UserInforData";

import React from 'react';
import { Link } from 'react-router-dom';

function MyPageFlex() {

    const user = JSON.parse(sessionStorage.getItem("LoginUserInfo"));

    return (
        <div className='MyInfoFlex'>
            <div className="MyInfo">
                <h1>{user.id}, 안녕하세요!</h1>

                <div className="MyInfoSet">
                    <Link to='/mypage/set'>
                        <button className="MyInfoSetting">내 정보 수정</button>
                    </Link>
                </div>

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
                        {user.email}@{user.emailType}
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faHome} />
                    </div>
                    <span>
                        {user.address}
                        <br />
                        {user.addressDetail}
                    </span>
                </div>
            </div>

        </div>
    )
}

export default MyPageFlex;
