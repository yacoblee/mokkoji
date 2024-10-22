import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/login/UserInfo.css';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
import moment from 'moment';
import { apiCall } from '../../service/apiService';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { registerables, CategoryScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// Chart.js의 ArcElement를 등록
Chart.register(ArcElement, Tooltip, Legend);
Chart.register(...registerables, CategoryScale);


const Userinfo = () => {
    //부모 컴포넌트에서 넘겨준 값 처리 
    const location = useLocation();
    let dbData = location.state;  // 전달된 dbData 객체
    //console.log('전달된 객체', dbData);
    const {
        users,
        userAddress,
        orderCount = 0,  // 기본값 설정
        totalPurchaseAmount = 0,  // 기본값 설정 (유저가 구매하지 않은 경우 0)
        // purchaseRank = 0,  // 기본값 설정
        percentageRank = 0,  // 기본값 설정
        totalAmount = 0,  // 기본값 설정
        averagePurchaseAmount = 0  // 기본값 설정
    } = location.state || {};

    const userPercentage = totalAmount > 0 ? (totalPurchaseAmount / totalAmount) * 100 : 0;

    // // 유저의 총 구매 금액
    // const userPurchase = totalPurchaseAmount || 0;  // 유저가 구매하지 않은 경우 0으로 처리

    // // 유저의 구매 비율 (총 구매 금액 중 유저가 차지하는 비율)
    // const userPercentage = totalAmount > 0 ? (userPurchase / totalAmount) * 100 : 0;  // 전체 구매 금액 대비 비율

    // // 나머지 구매 금액 (다른 구매자들이 차지하는 금액)
    // const otherPurchase = totalAmount - userPurchase;



    const [currentIndex, setCurrentIndex] = useState(0);
    const navigator = useNavigate();
    const firstAdminInputUserinfo = {
        email: '', // 이메일
        phoneNumber: '', // 핸드폰 번호
        updatedAt: '', // 수정 날짜
        blockStatus: users?.blockStatus || '',// 접근 제한 
        isWithdrawn: '' // 회원 탈퇴 
    }
    const [adminInputUserinfo, setAdminInputUserinfo] = useState(users);
    //console.log('adminInputUserinfo', adminInputUserinfo)
    //console.log('isCheckInputInfo', isCheckInputInfo)

    // 유효성 검사 함수
    const validateInput = (name, value) => {
        const regex = checkInputInfo[name]; // checkInputInfo에서 정규식 가져오기

        if (!regex) {
            //console.warn(`No validation rule found for field: ${name}`);
            return ''; // 기본적으로 true 반환 (유효성 검사가 없는 필드)
        }
        return regex.test(value); // 정규식이 존재하면 test 메서드 실행
    };

    const onChangeValue = (e) => {
        const { name, value } = e.target;
        setAdminInputUserinfo((it) => ({
            ...it,
            [name]: value,
            updatedAt: new Date().toISOString().slice(0, 10)
        }));
        const isValid = validateInput(name, value);
        //console.log('isValid', isValid)
        setUserInfoChecked((it) => ({
            ...it,
            [name]: isValid
        }));
    };


    //유효성 검사 
    const checkInputInfo = {
        phoneNumber: /^\d{2,5}-\d{3,4}-\d{4}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        recipientName: /^[가-힣]+$/,
        detailedAddress: /^.{3,}$/,
        recipientPhone: /^\d{2,5}-\d{3,4}-\d{4}$/,
        locationName: /^.{1,}$/,

    }

    const isCheckInputInfo = {
        phoneNumber: true,
        email: true,
        recipientName: true,
        detailedAddress: true,
        recipientPhone: true,
        locationName: true

    }
    // idtDefault 크기 순으로 배열안에서 재정렬
    const getDefaultAddress = (addresses) => {
        // addresses가 배열인지 확인하고, null 또는 undefined도 처리
        if (!Array.isArray(addresses) || addresses.length === 0) return [];

        // isDefault 값을 기준으로 오름차순 정렬한 후 배열 반환
        return addresses
            .slice()  // 원본 배열을 복사하여 정렬
            .sort((a, b) => a.isDefault - b.isDefault);
    };
    // userAddress가 undefined 또는 null일 경우에도 방어
    const defaultAddress = getDefaultAddress(userAddress) || [];
    // 초기화
    const [rows, setRows] = useState(defaultAddress);
    const [checked, setChecked] = useState(
        rows.map(() => ({
            recipientName: true,
            recipientPhone: true,
            detailedAddress: true,
            locationName: true
        }))
    );
    const [userInfoChecked, setUserInfoChecked] = useState(isCheckInputInfo);
    //console.log('checked', checked)









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

        // rows 배열에 새로운 주소 추가
        setRows([...rows, newAddress]);

        // checked 배열에도 기본 유효성 검사 상태 추가
        setChecked([...checked, {
            recipientName: '',
            recipientPhone: '',
            detailedAddress: '',
            locationName: ''
        }]);
    };

    const onChangeaddressValue = (e, index) => {
        const { name, value } = e.target;

        // rows 업데이트
        setRows((prevRows) =>
            prevRows.map((row, i) =>
                i === index ? { ...row, [name]: value } : row
            )
        );

        // 유효성 검사 실행
        const isValid = validateInput(name, value);

        // checked 상태 업데이트
        setChecked((prevChecked) => {
            //console.log("[아아]prevChecked : ", prevChecked);
            //console.log("[아아아]typeof prevChecked : ", typeof (prevChecked));
            //console.log("[아아아아아]index : ", index);

            return prevChecked.map((check, i) =>
                i === index ? { ...check, [name]: isValid } : check
            );
        });
    };

    //배열 길이가 3이상일 경우 버튼 disable
    const isDisabled = rows.length >= 3;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        // 도로명 주소일 경우 추가 정보 설정
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;  // 동 이름 추가
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);  // 건물 이름 추가
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');  // 전체 주소
        }

        // 선택된 행에 대한 주소 및 우편번호 업데이트
        setRows((prevRows) =>
            prevRows.map((row, i) =>
                i === currentIndex ? { ...row, postalCode: data.zonecode, streetAddress: fullAddress } : row
            )
        );

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
    const openAddressSearch = (index) => {
        setIsModalOpen(true);
        setCurrentIndex(index);
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



    const insertDB = (e) => {
        e.preventDefault();

        // checkedCondition 확인(배열)
        const checkedCondition = checked.every(it =>
            it.detailedAddress === true &&
            it.recipientName === true &&
            it.recipientPhone === true &&
            (it.locationName === undefined || it.locationName === true)
        );
        // isCheckInputInfo가 객체이므로, 그 값들이 모두 true인지 확인
        const isCheckInputInfoCondition = Object.values(isCheckInputInfo).every(value => value === true);

        if (checkedCondition && isCheckInputInfoCondition) {
            let url = '/administrator/users/userinfo/userinfoupdate';
            const data = {
                userinfo: adminInputUserinfo,
                userinfoAddress: rows
            };

            apiCall(url, 'POST', data, null)
                .then((response) => {
                    alert('저장 완료');
                    navigator('/administrator/users');
                }).catch((err) => {
                    console.error("Error during API call:", err);
                });
        } else {
            alert("값을 다시 입력해주세요");
        }
    };




    const removeAdress = (index) => {
        let url = '/administrator/users/userinfo/addressdelete'

        apiCall(url, 'POST', rows[index], null)
            .then((response) => {
                alert(response.data);
                navigator('/administrator/users');
            }).catch((err) => {
                console.error("Error during API call:", err);
            })
        // rows 배열에서 해당 인덱스의 항목 제거
        setRows((prevRows) => prevRows.filter((_, i) => i !== index));

        // checked 배열에서도 해당 인덱스의 항목 제거
        setChecked((prevChecked) => prevChecked.filter((_, i) => i !== index));
    }

    const isWithdrawn = () => {
        let url = '/administrator/users/userinfo/isWithdrawn';
        const data = {
            userId: users.userId,
            isWithdrawn: 1,
            withdrawalDate: new Date().toISOString().slice(0, 10)
        }
        apiCall(url, 'POST', data, null)
            .then((response) => {
                alert(response.data);
                navigator('/administrator/users');
            }).catch((err) => {
                console.error("Error during API call:", err);
            })

    }

    const totalMoneyAmountPie = () => {
        const data = {
            labels: ['전체', `${users.name}`],
            datasets: [
                {
                    data: [100 - userPercentage, userPercentage],
                    backgroundColor: ['#36A2EB', '#FF6384'],

                },
            ],
        };

        return <>
            <div style={{ width: '300px', height: '200px' }}>
                <Pie data={data} />
                {/* 유저 결제 비율 :{userPercentage.toFixed(2)} */}
            </div>
        </>;
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
                                            <button type="button" className='close-btn' onClick={isWithdrawn}>{users.isWithdrawn === 0 ? '회원탈퇴' : '회원 복구'}</button>
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
                                            onChange={onChangeValue} size="30"
                                            style={{ borderBottom: checked.email === false ? '1px solid red' : '' }} />   <p className='userinfo-errmessage'>@를 포함하여 이메일을 다시 입력하세요</p></td>
                                    </tr>

                                    <tr>
                                        <th>휴대전화</th>
                                        <td><input type="text" name="phoneNumber" id="phoneNumber"
                                            value={adminInputUserinfo.phoneNumber} // 핸드폰 번호 상태 반영
                                            onChange={onChangeValue}
                                            style={{ borderBottom: checked.phoneNumber === false ? '1px solid red' : '' }} />
                                            <p className='userinfo-errmessage'>-를 포함하여 핸드폰 번호를 다시 입력하세요</p>
                                        </td>

                                        <th>레벨</th>
                                        <td>{users.isAdmin ? "관리자" : "일반 회원"}</td>
                                    </tr>

                                    {rows.length === 0 ? (<tr className='notAddress'>
                                        <th colSpan="4" >
                                            등록된 주소가 없습니다.
                                        </th>
                                    </tr>) :
                                        (rows.map((ad, index) => (
                                            <tr key={ad.addressId || index} className='userinfo-address'>
                                                <th>배송지명<br />&#91; <input name="locationName" id="locationName" type="text" size="6" maxLength={7} value={ad.locationName || ''}
                                                    onChange={(e) => onChangeaddressValue(e, index)} /> &#93;<br />
                                                    <span className="address-remove" onClick={() => removeAdress(index)}> - 삭제</span></th>

                                                <td colSpan="3">
                                                    <p>우편번호 &nbsp; &nbsp;&nbsp;<input type="text" name="postalCode" value={ad.postalCode || ''} />&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span className='userinfo-addressAdd' readOnly onClick={() => openAddressSearch(index)}>주소검색</span></p>
                                                    <p>기본주소 &nbsp; &nbsp;&nbsp;
                                                        <input type="text" name="streetAddress" value={ad.streetAddress} size="60" readOnly /></p>
                                                    <p>상세주소 &nbsp; &nbsp;&nbsp;
                                                        <input type="text" name="detailedAddress" id="detailedAddress" value={ad.detailedAddress || ''}  // value 추가
                                                            onChange={(e) => onChangeaddressValue(e, index)} size="60"
                                                            style={{ borderBottom: checked[index].detailedAddress === false ? '1px solid red' : '' }} /></p>
                                                    <p className='userinfo-errmessage' style={{ display: checked[index].detailedAddress === false ? 'block' : 'none' }}>
                                                        3글자 이상 입력하세요
                                                    </p>
                                                    <p>받는 사람  &nbsp;  &nbsp;
                                                        <input type="text" name="recipientName" id="recipientName" value={ad.recipientName || ''} size="60" onChange={(e) => onChangeaddressValue(e, index)}
                                                            style={{ borderBottom: checked[index].recipientName === false ? '1px solid red' : '' }} />
                                                    </p>
                                                    <p className='userinfo-errmessage' style={{ display: checked[index].recipientName === false ? 'block' : 'none' }}>한글로 입력해주세요</p>
                                                    <p>핸드폰 번호 <input type="text" name="recipientPhone" id="recipientPhone" value={ad.
                                                        recipientPhone} size="60" onChange={(e) => onChangeaddressValue(e, index)}
                                                        style={{
                                                            borderBottom: checked[index].recipientPhone === false ? '1px solid red' : ''
                                                        }} />
                                                    </p>
                                                    <p className='userinfo-errmessage' style={{ display: checked[index].recipientPhone === false ? 'block' : 'none' }}>-를 포함하여 핸드폰 번호를 다시 입력하세요</p>
                                                </td>
                                            </tr>
                                        )))
                                    }

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

                                        <th >탈퇴날짜</th>
                                        <td>{users.withdrawalDate == null ? `[${users.name}]님은 탈퇴회원이 아닙니다` : users.withdrawalDate}</td>
                                    </tr>

                                    <tr>
                                        <th >구매횟수</th>
                                        <td>{orderCount} 회</td>

                                        <th >총구매금액</th>
                                        <td>
                                            {isNaN(totalPurchaseAmount) ? '0' : `${totalPurchaseAmount.toLocaleString('ko-KR')}`} 원
                                            <br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>구매 순위</th>
                                        <td>
                                            {percentageRank
                                                ? `상위 ${percentageRank} % 구매고객 입니다.`
                                                : '구매 내역이 없습니다'}
                                        </td>

                                        <th >구매 금액 비율</th>
                                        <td>{totalMoneyAmountPie()}</td>
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
                                        <td>
                                            {isNaN(averagePurchaseAmount)
                                                ? '구매 내역이 없습니다'
                                                : `${averagePurchaseAmount.toLocaleString('ko-KR')} 원`}
                                        </td>
                                    </tr>

                                    {/* <tr>
                                        <th>관리자메모</th>
                                        <td colSpan="3" >{totalMoneyAmountPie()}
                                        </td>
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

