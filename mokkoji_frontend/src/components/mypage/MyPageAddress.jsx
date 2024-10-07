import React, { useState, useEffect } from 'react';

import '../../css/mypage/subpage/MyPageAddress.css';

function MyPageAddress({ userMain, userAddress, myPageAddress }) {

    useEffect(() => {
        myPageAddress("/mypage/address")
    }, [])

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
                                <button className="MyInfoSetting">주소지 수정</button>
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
        </>
    )
}

export default MyPageAddress;
