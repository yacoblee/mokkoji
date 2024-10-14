import '../../../css/mypage/subpage/MyPageOrders.css'

import React, { useEffect, useState } from 'react';

function MyPageOrders({ userOrders, userOrdersDetail, myPageOrders, myPageOrdersDetail }) {

    useEffect(() => {
        myPageOrders("/order/list")
        myPageOrdersDetail("/order/detail")
    }, [])



    return (

        <div className='MyPageOrders'>

            {userOrders.map((orders) => {
                <div key={orders.purchaseNumber}>
                    <div>{orders.regDate}</div>
                    <div>{ }</div>
                    <div>{orders.total}</div>
                </div>
            })}


        </div>
    )
}

export default MyPageOrders;
