import { useLocation } from 'react-router-dom';
import '../../css/login/UserInfo.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>


const Userinfo = () => {

    const location = useLocation();
    let dbData = location.state;  // 전달된 dbData 객체
    const { users, userAddress } = location.state || {}; // 전달된 state가 없을 경우를 대비해 기본값 설정
    console.log(dbData);

    const getDefaultAddress = (addresses) => {
        if (addresses.length === 0) return null;

        // isDefault 값을 기준으로 오름차순 정렬한 후 첫 번째 항목 반환
        return addresses
            .slice()  // 원본 배열을 복사하여 정렬
            .sort((a, b) => a.isDefault - b.isDefault);
    };
    const defaultAddress = getDefaultAddress(userAddress) || [];
    console.log("000", defaultAddress);


    const [rows, setRows] = useState(defaultAddress);
    const [currentIndex, setCurrentIndex] = useState(null);  // 현재 선택한 인덱스를 저장하는 상태

    // 배송지 추가 함수
    const addRow = () => {
        const newAddress = {
            addressId: '',  // 고유한 id 생성
            locationName: '',
            postalCode: '',
            streetAddress: '',
            detailedAddress: '',
            recipientName: '',
            recipientPhone: ''
        };
        setRows([...rows, newAddress]); // 새 항목을 추가
    };

    // 주소 검색 버튼 클릭 이벤트 핸들러
    const openAddress = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    //배열 길이가 3이상일 경우 버튼 disable
    const isDisabled = rows.length >= 3;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        // 도로명 주소일 경우 extraAddress 설정
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname; // 동 이름
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName); // 건물 이름
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : ''); // 전체 주소
        }

        // 해당 인덱스의 주소를 업데이트

        // 해당 인덱스의 주소를 업데이트
        setRows(prevRows => {
            const updatedRows = [...prevRows];
            updatedRows[currentIndex] = {
                ...updatedRows[currentIndex],
                postalCode: data.zonecode,
                streetAddress: fullAddress
            };
            return updatedRows;
        });


        setIsModalOpen(false);  // 모달 닫기
    };


    // 주소 검색 버튼 클릭 시 모달을 열고, 인덱스를 저장함
    const openAddressSearch = (index) => {
        setCurrentIndex(index);  // 현재 인덱스를 상태로 저장
        setIsModalOpen(true);
    };



    return (
        <div className='userinfo-container'>
            <h2 className='userinfo-title'>회원정보수정</h2>

            <h3 className="user-subTitle">기본정보</h3>

            <div className="user-info">
                <form name="fmemberform" id="fmemberform" action="./pop_memberformupdate.php" method="post">
                    <input type="hidden" name="mb_id" value="tubeweb3" />
                    <div>

                        <div>
                            <table className='tableoutline'>
                                <tbody>
                                    <tr>
                                        <th>회원명</th>
                                        <td>
                                            {users.name}
                                            <button type="button" className='close-btn'>회원탈퇴</button>
                                        </td>
                                        <th>아이디</th>
                                        <td>{users.userId}</td>
                                    </tr>

                                    <tr>
                                        <th>생년월일</th>
                                        <td>{users.birthDate}</td>
                                        <th>성별</th>
                                        <td>{users.gender}</td>
                                    </tr>
                                    <tr>
                                        <th>비밀번호</th>
                                        <td><input type="text" name="passwd" defaultValue="************" className="frm_input" readOnly /> </td>
                                        <th scope="row">E-Mail</th>
                                        <td><input type="text" name="email" defaultValue={users.email} className="frm_input" size="30" /></td>
                                    </tr>

                                    <tr>
                                        <th>휴대전화</th>
                                        <td><input type="text" name="cellphone" defaultValue={users.phoneNumber} className="frm_input" /></td>
                                        <th>레벨</th>
                                        <td>{users.isAdmin ? "관리자" : "일반 회원"}</td>
                                    </tr>

                                    {rows.map((ad, index) => (
                                        <tr key={ad.addressId || index}>
                                            <th>배송지명<br />&#91; {ad.locationName || <input type="text" size="6" />} &#93;</th>
                                            <td colSpan="3">
                                                <p>우편번호 &nbsp; &nbsp;&nbsp; <input type="text" defaultValue={ad.postalCode} />&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className='userinfo-addressAdd' onClick={() => openAddressSearch(index)}>주소검색</span></p>
                                                <p>기본주소 &nbsp; &nbsp;&nbsp; <input type="text" defaultValue={ad.streetAddress} size="60" /></p>
                                                <p>상세주소 &nbsp; &nbsp;&nbsp; <input type="text" defaultValue={ad.detailedAddress} size="60" /></p>
                                                <p>받는 사람  &nbsp;  &nbsp; <input type="text" defaultValue={ad.recipientName} size="60" />
                                                </p>
                                                <p>핸드폰 번호 <input type="text" defaultValue={ad.
                                                    recipientPhone} size="60" />
                                                </p>
                                            </td>
                                        </tr>
                                    ))}

                                    {defaultAddress.length < 3 && (
                                        <tr>
                                            <td colSpan="4">
                                            <p   style={{  color: isDisabled ? 'red' : 'white', // 비활성화 시 색상 변경 
                                            }}>
                                                <sapn className={`userinfo-addressAdd ${isDisabled ? 'disabled' : ''}`} onClick={() => {
                                                    if (!isDisabled) {
                                                        addRow();
                                                    }
                                                }}
                                                    style={{
                                                        cursor: isDisabled ? 'not-allowed' : 'pointer', // 비활성화 시 커서 변경
                                                        color: isDisabled ? 'gray' : 'white', // 비활성화 시 색상 변경
                                                    }}
                                                >+ 배송지 추가</sapn>
                                               &nbsp;더 이상 배송지목록을 추가할 수 없습니다.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <h3 className="user-subTitle">기타정보</h3>
                        <div>
                            <table className="tableoutline">
                                <tbody>
                                    <tr>
                                        <th >회원가입일</th>
                                        <td>{users.createdAt}</td>

                                        <th >회원정보수정날짜</th>
                                        <td>{users.updatedAt}</td>
                                    </tr>

                                    <tr>
                                        <th >로그인횟수</th>
                                        <td>{users.loginCount} 회</td>

                                        <th >최근접속일</th>
                                        <td>{users.lastLogin}</td>
                                    </tr>

                                    <tr>
                                        <th >구매횟수</th>
                                        <td>{users.purchaseCount}</td>

                                        <th >총구매금액</th>
                                        <td>{users.totalPurchaseAmount}원</td>
                                    </tr>

                                    <tr>
                                        <th >접근차단일자</th>
                                        <td>
                                            <input type="text" name="intercept_date" defaultValue="" id="intercept_date" className="frm_input" size="10" maxLength="8" />
                                            <input type="checkbox" value="20241011" id="mb_intercept_date_set_today" />
                                            <label htmlFor="mb_intercept_date_set_today">접근차단일을 오늘로 지정</label>
                                        </td>

                                        <th>1회 평균 금액</th>
                                        <td>{users.averagePurchaseAmount}원</td>
                                    </tr>

                                    <tr>
                                        <th>관리자메모</th>
                                        <td colSpan="3"><textarea name="memo" className="frm_textbox" rows="3"></textarea></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className="btn_confirm">
                            <input type="submit" value="저장" className="btn_medium" accessKey="s" />
                            <button type="button" className="btn_medium bx-white" onClick={() => window.close()}>닫기</button>
                        </div>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="주소 검색"
                style={{

                    content: {
                        width: '500px',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <button className='modalbtn' onClick={() => setIsModalOpen(false)}>X</button>
                <DaumPostcode onComplete={handleComplete} />
            </Modal>
        </div>
    );
};

export default Userinfo;

