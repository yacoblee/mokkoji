import { Link } from 'react-router-dom';
import '../../../css/mypage/subpage/MyPageLike.css';

import React, { useEffect } from 'react';
import { API_BASE_URL } from "../../../service/app-config";

function MyPageLike({ userFavorites, productIdList, myPageLike, favoritesDelete, favoritesCheckDelete, favoritesCheckBoxChange, favoritesAllCheckBoxChange }) {

    useEffect(() => {
        myPageLike("/mypage/favorites")
    }, [])



    return (
        <div className='MyLikeList' >

            <div className='MyLikeHeader'>
                <div>
                    <input
                        type="checkbox"
                        checked={productIdList.length === userFavorites.length}
                        onChange={favoritesAllCheckBoxChange}
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
                                        checked={productIdList.includes(favorites.productId)}
                                        onChange={() => favoritesCheckBoxChange(favorites.productId)}
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
                        checked={productIdList.length === userFavorites.length}
                        onChange={favoritesAllCheckBoxChange}
                    />
                </div>
                <div></div>
                <div></div>
                <div>
                    <button
                        className='SelectDeleteButton'
                        onClick={() => favoritesCheckDelete("/mypage/favorites")}
                    >
                        선택 삭제
                    </button>
                </div>
            </div>

        </div>     // mylikelist
    );       // return
}   // MyPageLike

export default MyPageLike;
