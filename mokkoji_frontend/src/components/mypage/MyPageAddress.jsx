import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import { API_BASE_URL } from "../../service/app-config";
import { getStorageData } from '../../service/apiService';
import { apiCall } from '../../service/apiService';


import '../../css/mypage/subpage/MyPageAddress.css';
import MyPageAddressForm from './form/MyPageAddressForm';
import AddressInsertForm from './form/AddressInsertForm';

function MyPageAddress({ userMain, userAddress, myPageAddress, changeDefaultAddress, addressDelete }) {

    useEffect(() => {
        myPageAddress("/mypage/address")
    }, [])

    const [userAddressDetail, setUserAddressDetail] = useState();

    //모달 상태창에 대한 true , false
    const [isModalOpen, setIsModalOpen] = useState(false);


    //모달창 오픈
    const openAddressForm = (e, addressId) => {
        e.preventDefault();
        setUserAddressDetail(userAddress.find((address) => addressId === address.addressId));
        setIsModalOpen(true);
    };



    //모달 상태창에 대한 true , false
    const [isModalInsertOpen, setIsModalInsertOpen] = useState(false);


    //모달창 오픈
    const openAddressInsertForm = (e) => {
        e.preventDefault();
        setIsModalInsertOpen(true);
    };



    return (
        <>
            {userAddress.map((address) => {
                return (
                    <table className="AddressListTable" key={address.addressId}>
                        <tr>
                            <th className="AddressNameCell" rowspan="2">
                                <input
                                    type="radio"
                                    name="defaultAddress"
                                    checked={address.isDefault === 0}
                                    onChange={() => changeDefaultAddress(`/mypage/address/${address.addressId}`)}
                                />
                                <span>&nbsp;{address.locationName}</span>
                            </th>
                            <th>&nbsp;</th>
                            <td style={{ width: '100px' }} rowspan="4">
                                <button onClick={(event) => openAddressForm(event, address.addressId)} className="MyInfoSetting">주소지 수정</button>
                                {address.isDefault === 0 ?
                                    null : <button onClick={() => addressDelete(`/mypage/address/${address.addressId}`)} className="MyInfoSetting">주소지 삭제</button>}
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


            {
                userAddress.length < 3 ? <button onClick={(event) => openAddressInsertForm(event)} className="MyInfoSetting">주소지 등록</button> : null
            }

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="주소 수정"
                style={{
                    content: {
                        width: '1000px',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <MyPageAddressForm
                    userAddressDetail={userAddressDetail}
                />
            </Modal>

            <Modal
                isOpen={isModalInsertOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="주소 입력"
                style={{
                    content: {
                        width: '1000px',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <AddressInsertForm />
            </Modal>
        </>
    )
}

export default MyPageAddress;
