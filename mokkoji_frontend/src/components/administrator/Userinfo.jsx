import { useLocation } from 'react-router-dom';
import '../../css/login/UserInfo.css';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
import moment from 'moment';
import { apiCall } from '../../service/apiService';



const Userinfo = () => {
    //부모 컴포넌트에서 넘겨준 값 처리 
    const location = useLocation();
    let dbData = location.state;  // 전달된 dbData 객체
    const { users, userAddress } = location.state || {}; // 전달된 state가 없을 경우를 대비해 기본값 설정
    console.log(dbData);
    // 초기 유저 데이터 값 

    const firstAdminInputUserinfo = {
        email: '', // 이메일
        phoneNumber: '', // 핸드폰 번호
        updatedAt: '', // 수정 날짜
        blockStatus: users.blockStatus || '', // 접근 제한 
        isWithdrawn: '' // 회원 탈퇴 
    }
    const [adminInputUserinfo, setAdminInputUserinfo] = useState(users);

    const onChangeValue = (e) => {
        const { name, value } = e.target;
        setAdminInputUserinfo((it) => ({
            ...it,
            [name]: value,
            updatedAt: new Date().toISOString().slice(0, 10)
        }));
    };

    // idtDefault 크기 순으로 배열안에서 재정렬 
    const getDefaultAddress = (addresses) => {
        if (addresses.length === 0) return null;

        // isDefault 값을 기준으로 오름차순 정렬한 후 첫 번째 항목 반환
        return addresses
            .slice()  // 원본 배열을 복사하여 정렬
            .sort((a, b) => a.isDefault - b.isDefault);
    };
    const defaultAddress = getDefaultAddress(userAddress) || [];

    const [rows, setRows] = useState(defaultAddress);

    // 배송지 추가 함수
    const addRow = () => {
        const isDefaultValue = rows.length > 0
            ? (rows[rows.length - 1].isDefault + 1) // 마지막 항목의 isDefault 값에 +1
            : 1;  // 배열이 비어 있으면 기본값 1
        const newAddress = {
            addressId: '',  // 고유한 id 생성
            created_at: new Date().toISOString().slice(0, 10),
            isDefault: isDefaultValue,
            locationName: '',
            postalCode: '',
            streetAddress: '',
            detailedAddress: '',
            recipientName: '',
            recipientPhone: '',
            userId: users.userId
        };
        setRows([...rows, newAddress]); // 새 항목을 추가
    };

    const onChangeaddressValue = (e, index) => {
        const { name, value } = e.target;
        setRows((prevRows) =>
            prevRows.map((row, i) =>
                i === index ? {
                    ...row,
                    [name]: value,
                } : row
            ));
    };

    // 주소 검색 버튼 클릭 이벤트 핸들러
    const openAddress = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    //배열 길이가 3이상일 경우 버튼 disable
    const isDisabled = rows.length >= 3;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleComplete = (data, currentIndex) => {
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
        setRows((prevRows) =>
            prevRows.map((it, i) =>
                i === currentIndex ? {
                    ...it, postalCode: data.zonecode,
                    streetAddress: fullAddress
                } : it
            ));
        setIsModalOpen(false);  // 모달 닫기
    };

    useEffect(() => {
        if (!adminInputUserinfo.email) {
            setAdminInputUserinfo((prevState) => ({
                ...prevState,
                email: users.email,
            }));
        }
        if (!adminInputUserinfo.phoneNumber) {
            setAdminInputUserinfo((prevState) => ({
                ...prevState,
                phoneNumber: users.phoneNumber,
            }));
        }
    }, [users.email, users.phoneNumber]); // email과 phoneNumber 값이 변경될 때만 실행

    // 주소 검색 버튼 클릭 시 모달을 열고, 인덱스를 저장함
    const openAddressSearch = () => {
        setIsModalOpen(true);
    };

    // 체크박스를 클릭했을 때 실행되는 함수
    const blockStatusClick = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            // 체크박스가 체크되면 오늘 날짜로 설정
            setAdminInputUserinfo((prevState) => ({
                ...prevState,
                blockStatus: 1,
            }));
        } else {
            // 체크박스가 해제되면 접근 차단일 해제 (빈 문자열로 설정)
            setAdminInputUserinfo((prevState) => ({
                ...prevState,
                blockStatus: 0,
            }));
        }
    };

    //유효성 검사 


    const insertDB = (e) => {
        e.preventDefault();
        let url = '/administrator/users/userinfo/userinfoupdate';
        const data = {
            userinfo: adminInputUserinfo,
            userinfoAddress: rows
        };
        apiCall(url, 'POST', data, null)
            .then((response) => {
                alert('저장 완료')
                navigator('/');
            }).catch((err) => {
                console.error("Error during API call:", err);
            })
    }




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
                                        <td>***********</td>
                                        <th scope="row">E-Mail</th>
                                        <td><input type="text" name="email" id="email" value={adminInputUserinfo.email} // 입력 값이 변경될 때마다 상태 업데이트
                                            onChange={onChangeValue} size="30" /></td>
                                    </tr>

                                    <tr>
                                        <th>휴대전화</th>
                                        <td><input type="text" name="phoneNumber" id="phoneNumber"
                                            value={adminInputUserinfo.phoneNumber} // 핸드폰 번호 상태 반영
                                            onChange={onChangeValue} /></td>
                                        <th>레벨</th>
                                        <td>{users.isAdmin ? "관리자" : "일반 회원"}</td>
                                    </tr>

                                    {rows.map((ad, index) => (
                                        <tr key={ad.addressId || index} className='userinfo-address'>
                                            <th>배송지명<br />&#91; <input name="locationName" id="locationName" type="text" size="6" maxLength={7} value={ad.locationName || ''}
                                                onChange={(e) => onChangeaddressValue(e, index)} /> &#93;</th>
                                            <td colSpan="3">
                                                <p>우편번호 &nbsp; &nbsp;&nbsp;<input type="text" name="postalCode" value={ad.postalCode || ''} />&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className='userinfo-addressAdd' readOnly onClick={() => openAddressSearch(index)}>주소검색</span></p>
                                                <p>기본주소 &nbsp; &nbsp;&nbsp;
                                                    <input type="text" name="streetAddress" value={ad.streetAddress} size="60" readOnly /></p>
                                                <p>상세주소 &nbsp; &nbsp;&nbsp;
                                                    <input type="text" name="detailedAddress" id="detailedAddress" value={ad.detailedAddress || ''}  // value 추가
                                                        onChange={(e) => onChangeaddressValue(e, index)} size="60" /></p>
                                                <p>받는 사람  &nbsp;  &nbsp;
                                                    <input type="text" name="recipientName" id="recipientName" value={ad.recipientName || ''} size="60" onChange={(e) => onChangeaddressValue(e, index)} />
                                                </p>
                                                <p>핸드폰 번호 <input type="text" name="recipientPhone" id="recipientPhone" value={ad.
                                                    recipientPhone} size="60" onChange={(e) => onChangeaddressValue(e, index)} />
                                                </p>
                                            </td>
                                        </tr>
                                    ))}

                                    {defaultAddress.length < 3 && (
                                        <tr>
                                            <td colSpan="4">
                                                <p style={{
                                                    color: isDisabled ? 'red' : 'white', // 비활성화 시 색상 변경 
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
                                        <th >접근차단여부</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="blockStatus1"
                                                id="blockStatus1"
                                                value={adminInputUserinfo.blockStatus !== null ? adminInputUserinfo.blockStatus : users.blockStatus} // adminInputUserinfo 값을 우선으로 사용
                                                size="10"
                                                readOnly
                                            />
                                            <input
                                                type="checkbox"
                                                name="blockStatus"
                                                id="blockStatus"
                                                checked={adminInputUserinfo.blockStatus} // blockStatus가 1이면 체크, 0이면 해제
                                                onChange={blockStatusClick}
                                            />
                                            <label htmlFor="blockStatus">
                                                {adminInputUserinfo.blockStatus ? '접근차단 지정' : '접근차단 해제'}
                                            </label>
                                        </td>

                                        <th>1회 평균 금액</th>
                                        <td>{users.averagePurchaseAmount}원</td>
                                    </tr>
                                    {/* 
                                    <tr>
                                        <th>관리자메모</th>
                                        <td colSpan="3"><textarea name="memo" className="frm_textbox" rows="3"></textarea></td>
                                    </tr> */}

                                </tbody>
                            </table>
                        </div>

                        <div className="btn_confirm">
                            <input type="submit" onClick={insertDB} />

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
                <DaumPostcode onComplete={(data) => handleComplete(data, currentIndex)} />
            </Modal>
        </div>
    );
};

export default Userinfo;

