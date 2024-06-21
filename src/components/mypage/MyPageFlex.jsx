import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import '../../css/mypage/MyPageMain.css';

import React from 'react';
import { Link } from 'react-router-dom';

function MyPageFlex() {
    return (
        <div className='MyInfoFlex'>

            <div className="MyInfo">
                <h1>(아이디), 안녕하세요!</h1>

                <Link to='/mypage/asdf'>
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
                        (이름 나오는 곳)
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faMobileScreenButton} />
                    </div>
                    <span>
                        (전화번호 나오는 곳)
                    </span>
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <span>
                        (이메일 나오는 곳)
                    </span>
                </div>
            </div>

        </div>
    )
}

export default MyPageFlex;
