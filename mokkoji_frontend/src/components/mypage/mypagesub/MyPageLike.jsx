import { Link, useNavigate } from 'react-router-dom';
import '../../../css/mypage/subpage/MyPageLike.css';

import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../../service/app-config";
import { apiCall } from '../../../service/apiService';

function MyPageLike({ change, setChange }) {

    const [userFavorites, setUserFavorites] = useState([]);
    const [productIdList, setProductIdList] = useState([]); // State to store checked product IDs

    // favorites 데이터들을 가져옴
    const myPageLike = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** myPageLike 성공 url=${url}`);
                setUserFavorites(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageLike 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageLike

    useEffect(() => {
        myPageLike("/mypage/favorites")
    }, [])

    // 개별 삭제
    const favoritesDelete = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'DELETE', null, userToken)
            .then((response) => {
                //alert(`** favoritesDelete 성공 url=${url}`);
                setUserFavorites(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** favoritesDelete 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //favoritesDelete



    // 체크 삭제
    const favoritesCheckDelete = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'DELETE', productIdList, userToken)
            .then((response) => {
                //alert(`** favoritesCheckDelete 성공 url=${url}`);
                setUserFavorites(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** favoritesCheckDelete 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //favoritesCheckDelete

    // 개별 체크박스
    const handleCheckboxChange = (productId) => {
        if (productIdList.includes(productId)) {
            setProductIdList(productIdList.filter((id) => id !== productId));
        } else {
            setProductIdList([...productIdList, productId]);
        }
    };

    // 전체 체크박스
    const handleAllCheckboxChange = () => {
        if (productIdList.length === userFavorites.length) {
            setProductIdList([]); // 전체 해제
        } else {
            const allProductId = userFavorites.map((favorite) => favorite.productId);
            setProductIdList(allProductId); // 전체 체크
        }
    };



    return (
        <div className='MyLikeList' >

            <div className='MyLikeHeader'>
                <div>
                    <input
                        type="checkbox"
                        checked={productIdList.length === userFavorites.length}
                        onChange={handleAllCheckboxChange}
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
                                        onChange={() => handleCheckboxChange(favorites.productId)}
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
                        onChange={handleAllCheckboxChange}
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
