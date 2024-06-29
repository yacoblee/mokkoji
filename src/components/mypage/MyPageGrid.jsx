import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClockRotateLeft, faHeartCirclePlus, faListCheck, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import '../../css/mypage/MyPageGrid.css';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyPageGrid() {

    const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem("LoginUserInfo"));
    const items = JSON.parse(sessionStorage.getItem("goodsList"));


    // console.log(`확인용 1 ${user.id}, ${items.length}`)

    let result = []

    function getGoods(check) {
        result = items.filter((item) => {
            for (let i = 0; i < check.length; i++) {
                if (item.id === check[i])
                    return item;
            }
        })
    }

    const onLike = () => {
        getGoods(user.mypage.isLike)
        // console.log(`확인용 2 ${result.length}`)
        navigate('/mypage/like', {
            state: {
                user: user,
                result: result
            }
        })
    }


    // const onCart = () => {
    //     result = items.filter((item) => {
    //         for (let i = 0; i < user.mypage.basket.length; i++) {
    //             if (item.id === user.mypage.basket[i].productId)
    //                 return item;
    //         }
    //     })
    //     console.log(`확인용 3 ${result.length}`)
    //     navigate('/mypage/cart', { state: result })
    // }

    const onCart = () => {

        result = user.mypage.basket.map((bb) => {
            let findItem = items.find((item) =>
                item.id === bb.productId
            );     // findItem

            let cartItem = {}

            cartItem.photo = findItem.productSrc[0]
            cartItem.id = findItem.id
            cartItem.name = findItem.name
            cartItem.content = bb.options.contentSelect
            cartItem.package = bb.options.packagingSelect
            cartItem.contentCount = bb.quantity.contentSelect
            cartItem.packageCount = bb.quantity.packagingSelect
            cartItem.price = bb.totalPrice

            return cartItem;
        });     // map
        // console.log(`확인용 3 ${result.length}`)
        navigate('/mypage/cart', {
            state: {
                user: user,
                result: result
            }
        })
    }


    return (
        <div className='MyGrid'>
            <span onClick={onLike}>
                <div className='MyLike'>
                    <div className='IconLike'>
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
                        {user.mypage.isLike.length}
                    </div>
                    <span>찜목록</span>
                </div>
            </span>
            <span onClick={onCart}>
                <div className='MyCart'>
                    <div className='IconCart'>
                        <FontAwesomeIcon icon={faCartShopping} />
                        {user.mypage.basket.length}
                    </div>
                    <span>장바구니</span>
                </div>
            </span>
            <Link to='/mypage/post'>
                <div className='MyPost'>
                    <div className='IconPost'>
                        <FontAwesomeIcon icon={faTruckFast} />
                        {localStorage.length}
                    </div>
                    <span>배송 현황</span>
                </div>
            </Link>
            <Link to='/mypage/list'>
                <div className='MyList'>
                    <div className='IconList'>
                        <FontAwesomeIcon icon={faListCheck} />
                    </div>
                    <span>구매내역</span>
                </div>
            </Link>
            <Link to='/mypage/book'>
                <div className='MyBook'>
                    <div className='IconBook'>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                    </div>
                    <span>나의 예약</span>
                </div>
            </Link>
        </div>
    )

}

export default MyPageGrid;
