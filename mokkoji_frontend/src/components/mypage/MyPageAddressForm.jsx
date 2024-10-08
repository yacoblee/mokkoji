import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import React, { useRef, useState } from 'react';
import { API_BASE_URL } from "../../service/app-config";
import { getStorageData } from '../../service/apiService';
import { apiCall } from '../../service/apiService';


function MyPageAddressForm({ addressDetail }) {

    const [addressInfo, setAddressInfo] = useState(addressDetail);

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
    const [phoneParts, setPhoneParts] = useState(addressInfo.recipientPhone.split('-'));

    // 전화번호 입력 처리
    const handlePhoneChange = (index, value) => {
        const updatedPhoneParts = [...phoneParts];
        updatedPhoneParts[index] = value;
        setPhoneParts(updatedPhoneParts);
    };



    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작을 막음

        const token = JSON.parse(sessionStorage.getItem("userData"));

        try {
            const updateAddressInfo = {
                ...addressInfo,
                phoneNumber: phoneParts.join('-'),
            };

            const response = await axios.patch(`${API_BASE_URL}/mypage/set`, updateAddressInfo, {
                headers: {
                    'Authorization': `Bearer ${token}`, // 필요한 경우 토큰 추가
                    'Content-Type': 'application/json',
                },
            });

            alert("개인정보 수정 성공");
            window.location.href = '/mypage/address';
        } catch (error) {
            console.error('Error:', error.response);
        }
    };



    return (
        <>
            <form className="" method="patch">
                <table className="AddressListTable">
                    <tr>
                        <th className="AddressNameCell" rowspan="2">
                            <input type="text" placeholder={userAddress.locationName} />
                        </th>
                        <th>&nbsp;</th>
                        <td style={{ width: '100px' }} rowspan="4">
                            <button onClick={openAddress} className="MyInfoSetting">우편번호 검색</button>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <input type="text" placeholder={userAddress.postalCode} />
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <input type="text" placeholder={userAddress.recipientName} />
                        </th>
                        <td className="MainAddressCell">
                            <input type="text" placeholder={userAddress.streetAddress} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <input
                                type="text"
                                value={phoneParts[0]}
                                onChange={(e) => handlePhoneChange(0, e.target.value)} // 앞자리
                                minLength={3} maxLength={3}
                            />
                            <span>&nbsp;-&nbsp;</span>
                            <input
                                type="text"
                                value={phoneParts[1]}
                                onChange={(e) => handlePhoneChange(1, e.target.value)} // 중간자리
                                minLength={3} maxLength={4}
                            />
                            <span>&nbsp;-&nbsp;</span>
                            <input
                                type="text"
                                value={phoneParts[2]}
                                onChange={(e) => handlePhoneChange(2, e.target.value)} // 뒷자리
                                minLength={4} maxLength={4}
                            />
                        </th>
                        <td>
                            <input type="text" placeholder={userAddress.detailedAddress} />
                        </td>
                    </tr>
                </table>

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
