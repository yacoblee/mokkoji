import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import { API_BASE_URL } from "../../service/app-config";
import { getStorageData } from '../../service/apiService';
import { apiCall } from '../../service/apiService';


import '../../css/mypage/subpage/MyPageAddress.css';
import MyPageAddressForm from './MyPageAddressForm';

function MyPageAddress({ userMain, userAddress, myPageAddress }) {

    useEffect(() => {
        myPageAddress("/mypage/address")
    }, [])



    //모달 상태창에 대한 true , false
    const [isModalOpen, setIsModalOpen] = useState(false);


    //모달창 오픈
    const openAddressForm = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };



    // Address 데이터들을 가져옴
    const addressDetail = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** addressDetail 성공 url=${url}`);
                setUserAddress(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** addressDetail 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //addressDetail




    return (
        <>
            {userAddress.map((address) => {
                return (
                    <table className="AddressListTable" key={address.isDefault}>
                        <tr>
                            <th className="AddressNameCell" rowspan="2">
                                <input type="radio" name="defaultAddress" />
                                <span>&nbsp;{address.locationName}</span>
                            </th>
                            <th>&nbsp;</th>
                            <td style={{ width: '100px' }} rowspan="4">
                                <button onClick={openAddressForm} className="MyInfoSetting">주소지 수정</button>
                            </td>
                        </tr>
                        <tr>
                            <th>[{address.postalCode}]</th>
                        </tr>
                        <tr>
                            <th>
                                <span>&nbsp;수취인 : {address.recipientName !== null ? address.recipientName : "미기입"}</span>
                            </th>
                            <td className="MainAddressCell">{address.streetAddress}</td>
                        </tr>
                        <tr>
                            <th>
                                <span>&nbsp;연락처 : {address.recipientPhone !== null ? address.recipientPhone : "미기입"}</span>
                            </th>
                            <td>{address.detailedAddress}</td>
                        </tr>
                    </table>
                )
            })}

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
                <MyPageAddressForm
                    addressDetail={addressDetail}
                />
            </Modal>
        </>
    )
}

export default MyPageAddress;
