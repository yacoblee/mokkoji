import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome, faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import '../../css/mypage/MyPageUser.css';

// import userInfo from "../login/UserInforData";

import React from 'react';
import { Link } from 'react-router-dom';

function MyPageFlex() {

    let userDetailData = JSON.parse(sessionStorage.getItem("userDetailData"));

    return (
        <div className='MyInfoFlex'>
            <div className="MyInfo">
                <h1>{userDetailData.userId}, 안녕하세요!</h1>

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
                        {userDetailData.name}
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faMobileScreenButton} />
                    </div>
                    <span>
                        {userDetailData.phoneNumber}
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <span>
                        {userDetailData.email}
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faHome} />
                    </div>
                    <span>
                        주소
                        <br />
                        상세주소
                    </span>
                </div>
            </div>

        </div>
    )
}

export default MyPageFlex;
