import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import React, { useRef, useState, useEffect } from 'react';
import { API_BASE_URL } from "../../../service/app-config";
import { getStorageData } from '../../../service/apiService';
import { apiCall } from '../../../service/apiService';
import axios from 'axios'; // axios 추가

import '../../../css/mypage/subpage/MyPageAddress.css';


function MyPageAddressForm() {

    const [addressInfo, setAddressInfo] = useState({
        locationName: '',
        recipientName: '',
        recipientPhone: '',
        postalCode: '',
        streetAddress: '',
        detailedAddress: ''
    });

    //모달 상태창에 대한 true , false
    const [isModalOpen, setIsModalOpen] = useState(false);

    //모달창 오픈
    const openAddress = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    //모달창에서 클릭하고 나면 , 값을 가지고 userInfo에 저장 -> value 값으로 전송. / 모달창 닫음.
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

        setAddressInfo((info) => ({
            ...info,
            postalCode: data.zonecode,
            streetAddress: fullAddress,
        }));
        setIsModalOpen(false);
    };



    // userMain에 대한 data 해체+분해 : phoneNumber
    const [phoneParts, setPhoneParts] = useState(['', '', '']);

    // 전화번호 입력 처리
    const handlePhoneChange = (index, value) => {
        const updatedPhoneParts = [...phoneParts];
        updatedPhoneParts[index] = value;

        setPhoneParts(updatedPhoneParts);   // 마지막 set이 실행 안되는 오류 있음, 그러나 DB반영은 정상적

        setAddressInfo({
            ...addressInfo,
            recipientPhone: updatedPhoneParts.join('-'),
        });
    };



    const handleChange = (e) => {
        const { name, value } = e.target;

        // 일반 필드 업데이트
        setAddressInfo({
            ...addressInfo,
            [name]: value,
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작을 막음

        // FormData 객체 생성
        // const formData = new FormData(document.getElementById("addressDetailForm"));
        const formData = new FormData();
        Object.entries(addressInfo).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // 빈 값 체크
        for (const [key, value] of formData.entries()) {
            if (!value) {
                alert('모든 값을 입력해야합니다.'); // 어떤 값이 빈 값인지 알리기 위해 경고 표시
                return; // 빈 값이 있으면 함수를 종료
            }
        }

        const token = JSON.parse(sessionStorage.getItem("userData"));

        try {
            const response = await axios.post(`${API_BASE_URL}/mypage/address`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // 필요한 경우 토큰 추가
                    'Content-Type': 'application/json',
                },
            });

            window.location.href = '/mypage/address';
        } catch (error) {
            // console.error('Error:', error.response);
            alert("입력 실패")
        }
    };



    return (
        <>
            <form className="addressDetailForm" id="addressInsertForm" method="POST" onSubmit={handleSubmit}>
                <table className="AddressListTable">
                    <tr>
                        <th>주소지 이름</th>
                        <td>
                            <input type="text" name="locationName" onChange={handleChange} />
                        </td>
                        <td rowspan="5">
                            <button onClick={openAddress} className="MyInfoSetting">우편번호 검색</button>
                        </td>
                    </tr>

                    <tr>
                        <th>수취인 성명</th>
                        <td>
                            <input type="text" name="recipientName" onChange={handleChange} />
                        </td>
                    </tr>

                    <tr>
                        <th>수취인 연락처</th>
                        <td>
                            <input className="MyPagePhoneInput"
                                type="text"
                                value={phoneParts[0]}
                                onChange={(e) => handlePhoneChange(0, e.target.value)} // 앞자리
                                minLength={3} maxLength={3}
                            />
                            <span>&nbsp;-&nbsp;</span>
                            <input className="MyPagePhoneInput"
                                type="text"
                                value={phoneParts[1]}
                                onChange={(e) => handlePhoneChange(1, e.target.value)} // 중간자리
                                minLength={3} maxLength={4}
                            />
                            <span>&nbsp;-&nbsp;</span>
                            <input className="MyPagePhoneInput"
                                type="text"
                                value={phoneParts[2]}
                                onChange={(e) => handlePhoneChange(2, e.target.value)} // 뒷자리
                                minLength={4} maxLength={4}
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>주소</th>
                        <td>
                            <input
                                className="MyPagePhoneInput"
                                name="postalCode"
                                type="text"
                                readOnly
                                placeholder="우편번호"
                                value={addressInfo.postalCode}
                            />
                            <input type="text" name="streetAddress" readOnly placeholder="주소" value={addressInfo.streetAddress} />
                        </td>
                    </tr>

                    <tr>
                        <th>상세주소</th>
                        <td>
                            <input type="text" name="detailedAddress" onChange={handleChange} />
                        </td>
                    </tr>

                </table>

                <button
                    className='addressModalBtn'
                    type='submit'
                >
                    저장
                </button>

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
                    <button
                        className='modalbtn'
                        onClick={() => setIsModalOpen(false)}
                    >
                        X
                    </button>
                    <DaumPostcode onComplete={handleComplete} />
                </Modal>
            </form>
        </>
    )
}

export default MyPageAddressForm;
