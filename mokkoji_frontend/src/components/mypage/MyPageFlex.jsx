import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome, faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import '../../css/mypage/MyPageUser.css';

import React from 'react';
import { Link } from 'react-router-dom';

function MyPageFlex({ userMain }) {

    return (
        <div className='MyInfoFlex'>
            <div className="MyInfo">
                <h1>{userMain.userId}, 안녕하세요!</h1>

                <div className="MyInfoSet">
                    <Link to='/mypage/set'>
                        <button className="MyInfoSetting">회원정보 관리</button>
                    </Link>
                    <Link to='/mypage/address'>
                        <button className="MyInfoSetting">주소지 관리</button>
                    </Link>
                </div>

            </div>

            <div className="MyInfoBasic">
                <div>
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <span>
                        {userMain.name}
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faMobileScreenButton} />
                    </div>
                    <span>
                        {userMain.phoneNumber}
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <span>
                        {userMain.email}
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faHome} />
                    </div>
                    <span>
                        ({userMain.postalCode})&nbsp;{userMain.streetAddress}
                        <br />
                        {userMain.detailedAddress}
                    </span>
                </div>

            </div>

        </div>
    )
}

export default MyPageFlex;
