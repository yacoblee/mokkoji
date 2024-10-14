import { useLocation } from 'react-router-dom';
import '../../css/login/UserInfo.css';
import React, { useState } from 'react';


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


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [streetAddress, setstreetAddress] = useState('');
    const [postalCode, setpostalCode] = useState('');

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setpostalCode(data.zonecode);
        setstreetAddress(fullAddress);
        setIsModalOpen(false); // 모달 닫기
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

                                    {defaultAddress.map(ad => (
                                        <tr>
                                            <th key={ad.addressId}>배송지명<br />  &#91; {ad.locationName}  &#93;  </th>
                                            <td colSpan="3">
                                                <input type="text" defaultValue={ad.postalCode} />
                                                <a href="/">주소검색</a>
                                                <p><input type="text" defaultValue={ad.streetAddress} size="60" /> 기본주소</p>
                                                <p><input type="text" defaultValue={ad.detailedAddress} size="60" /> 상세주소</p>
                                            </td>
                                        </tr>
                                    ))}

                                    {defaultAddress.length < 3 && (
                                        <tr>
                                            <td colSpan="4">
                                                <button onClick={handleComplete}>+ 배송지 추가</button>
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
            {/* <Modal
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}  // Modal을 닫는 함수
                title="주소 검색"
                footer={null}  // Footer 부분을 없앰
                style={{
                    width: '500px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <button className='modalbtn' onClick={() => setIsModalOpen(false)}>X</button>
                <DaumPostcode onComplete={handleComplete} />
            </Modal> */}
        </div>
    );
};

export default Userinfo;

