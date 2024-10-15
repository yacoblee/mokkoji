import '../../../css/mypage/subpage/MyPageOrders.css'

import { API_BASE_URL } from "../../../service/app-config";
import React, { useEffect, useState } from 'react';

function MyPageOrders({ userOrders, myPageOrders, myPageOrdersDetail }) {

    useEffect(() => {
        myPageOrders("/order/list")
    }, [])

    // regDate로 그룹화
    const ordersByDate = userOrders.reduce((acc, order) => {
        const regDate = order.regDate;  // 조부모: regDate
        if (!acc[regDate]) {
            acc[regDate] = {};  // regDate가 없으면 빈 객체로 초기화
        }
        const purchaseNumber = order.purchaseNumber;
        if (!acc[regDate][purchaseNumber]) {
            acc[regDate][purchaseNumber] = { orderInfo: order, products: [] };  // 각 purchaseNumber로 묶음
        }
        acc[regDate][purchaseNumber].products.push(order);  // 같은 purchaseNumber에 대해 상품 추가
        return acc;
    }, {});



    return (
        <div className='MyPageOrders'>
            {Object.keys(ordersByDate).map((regDate) => (
                <div className='OrdersDateBox' key={regDate}>
                    {/* 조부모: regDate */}
                    <h1>{regDate}</h1>

                    {/* 부모: 각 purchaseNumber에 대해 locationName과 total을 한 번 출력 */}
                    {Object.keys(ordersByDate[regDate])
                        .sort((a, b) => b - a) // purchaseNumber를 내림차순으로 정렬
                        .map((purchaseNumber) => {
                            const { orderInfo, products } = ordersByDate[regDate][purchaseNumber];

                            return (
                                <div key={purchaseNumber} >
                                    {/* purchaseNumber, locationName, total은 한 번만 출력 */}
                                    <div>
                                        {/* <h4>주문 번호: {orderInfo.purchaseNumber}</h4> */}
                                        <h3>배송 주소: {orderInfo.streetAddress}</h3>
                                        <h3>총액: {orderInfo.total}원</h3>
                                        <br />
                                    </div>

                                    {/* 손자: 해당 purchaseNumber의 상품 목록 출력 */}
                                    <div>
                                        {products.map((orderItem, index) => (
                                            <>
                                                <table className='OrdersItem' key={index}>
                                                    <tr>
                                                        <td rowSpan={2}>
                                                            <img className='OrdersPhoto' src={`${API_BASE_URL}/resources/productImages/${orderItem.mainImageName}`} alt={orderItem.name} />
                                                        </td>
                                                        <td>
                                                            <h4>상품명: {orderItem.name}</h4>
                                                        </td>
                                                        <td>
                                                            <span>{orderItem.optionContent}/{orderItem.packagingOptionContent}</span>
                                                        </td>
                                                        <td rowSpan={2}>
                                                            <button className='MyInfoSetting'>리뷰 작성</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span>수량: {orderItem.productCnt}</span>
                                                        </td>
                                                        <td>
                                                            <span>상품 총액: {orderItem.productTotalPrice}원</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            ))}
        </div>
    );
}

export default MyPageOrders;
