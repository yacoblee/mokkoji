import '../../../css/mypage/subpage/MyPageOrders.css'

import React, { useEffect, useState } from 'react';

function MyPageOrders({ userOrders, myPageOrders, myPageOrdersDetail }) {

    useEffect(() => {
        myPageOrders("/order/list")
    }, [])



    return (

        <div className='MyPageOrders'>
            {userOrders.map((orders) => {
                <div key={orders.regDate}>
                    <div>{orders.purchaseNumber}</div>
                    <div>safbjsdhfkjd</div>
                    <div>{orders.total}</div>
                </div>
            })}
        </div>
    )
}

export default MyPageOrders;
