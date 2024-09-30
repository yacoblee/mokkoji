import { Link } from 'react-router-dom';
import '../../../css/mypage/subpage/MyPageLike.css';

import items from '../../product/ProductObject'

import React, { useEffect, useState } from 'react';

function MyPageLike({ change, setChange }) {

    let userFavorite = JSON.parse(sessionStorage.getItem("userFavorite"));

    // userId, productId, favoriteDate, categoryId, mainImageName을 담은 새로운 객체
    let likedGoods = user.mypage.isLike.map((like) => {
        let findItem = items.find((item) =>
            item.id === like
        )   // findItem

        let likeItem = {}

        likeItem.photo = findItem.productSrc[0]
        likeItem.id = findItem.id
        likeItem.name = findItem.name
        likeItem.category = findItem.category

        return likeItem;
    })



    return (
        <div className='MyLikeList' >

            <div className='MyLikeHeader'>
                <div>
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={likedGoods.length > 0 && checkedGood.length === likedGoods.length && likedGoods.length !== 0}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {likedGoods.length === 0 ?
                (
                    <div className='TextNoItems'>
                        <h2>찜한 상품이 존재하지 않습니다.</h2>
                        <div>
                            <Link to='/goods'>
                                굿즈 둘러보러 가기
                            </Link>
                        </div>
                    </div>
                ) :
                (
                    likedGoods.map((goods) => {
                        return (
                            <div className="MyLikeGrid" key={goods.id} >
                                <div className='MyLikeCheck'>
                                    <input
                                        type="checkbox"
                                        checked={checkedGood.includes(goods.id)}
                                        onChange={() => handleCheckGood(goods.id)}
                                    />
                                </div>
                                <div className="MyLikePhoto">
                                    <img src={goods.photo} alt={goods.name} />
                                </div>
                                <div className='MyLikeInfo'>
                                    <h4>{goods.name}</h4>
                                </div>
                                <div className='MyLikeButton'>
                                    <Link to={`/goods/${goods.category}/${goods.id}`}>
                                        <button className='ButtonDetail'>상품 상세</button>
                                    </Link>
                                    <button onClick={() => handleDelete(goods.id)}>삭제</button>
                                </div>
                            </div >  // mylikegird
                        )   // return
                    })  // map
                )
            }

            <div className='MyLikeFooter'>
                <div>
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={likedGoods.length > 0 && checkedGood.length === likedGoods.length && likedGoods.length !== 0}
                    />
                </div>
                <div></div>
                <div></div>
                <div>
                    <button
                        className='SelectDeleteButton'
                        onClick={onCheckedDelete}
                    >
                        선택 삭제
                    </button>
                </div>
            </div>
        </div>     // mylikelist
    );       // return
}   // MyPageLike

export default MyPageLike;
