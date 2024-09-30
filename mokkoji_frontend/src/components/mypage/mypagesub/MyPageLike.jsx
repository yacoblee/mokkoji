import { Link, useNavigate } from 'react-router-dom';
import '../../../css/mypage/subpage/MyPageLike.css';

import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../../service/app-config";
import { apiCall } from '../../../service/apiService';

function MyPageLike({ change, setChange }) {

    let userFavorites = JSON.parse(sessionStorage.getItem("userFavorites"));

    const navigate = useNavigate();

    // 개별 삭제
    const favoritesDelete = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'DELETE', null, userToken)
            .then((response) => {
                //alert(`** favoritesDelete 성공 url=${url}`);
                sessionStorage.setItem("userFavorites", JSON.stringify(response.data));
                navigate("/mypage/favorites");
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** favoritesDelete 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //favoritesDelete

    return (
        <div className='MyLikeList' >

            <div className='MyLikeHeader'>
                <div>
                    <input
                        type="checkbox"
                    // onChange={handleCheckAll}
                    // checked={userFavorites.length > 0 && checkedGood.length === userFavorites.length && userFavorites.length !== 0}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {userFavorites.length === 0 ?
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
                    userFavorites.map((favorites) => {
                        return (
                            <div className="MyLikeGrid" key={favorites.productId} >
                                <div className='MyLikeCheck'>
                                    <input
                                        type="checkbox"
                                    // checked={checkedGood.includes(favorites.productId)}
                                    // onChange={() => handleCheckGood(favorites.productId)}
                                    />
                                </div>
                                <div className="MyLikePhoto">
                                    <img src={`${API_BASE_URL}/resources/productImages/${favorites.mainImageName}`} alt={favorites.productName} />
                                </div>
                                <div className='MyLikeInfo'>
                                    <h4>{favorites.productName}</h4>
                                </div>
                                <div className='MyLikeButton'>
                                    <Link to={`/goods/${favorites.categoryId}/${favorites.productId}`}>
                                        <button className='ButtonDetail'>상품 상세</button>
                                    </Link>
                                    <button onClick={() => favoritesDelete(`/mypage/favorites/${favorites.productId}`)}>삭제</button>
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
                    // onChange={handleCheckAll}
                    // checked={userFavorites.length > 0 && checkedGood.length === userFavorites.length && userFavorites.length !== 0}
                    />
                </div>
                <div></div>
                <div></div>
                <div>
                    <button
                        className='SelectDeleteButton'
                    // onClick={onCheckedDelete}
                    >
                        선택 삭제
                    </button>
                </div>
            </div>

        </div>     // mylikelist
    );       // return
}   // MyPageLike

export default MyPageLike;
