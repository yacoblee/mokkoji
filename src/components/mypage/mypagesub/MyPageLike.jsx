import { Link } from 'react-router-dom';
import '../../../css/mypage/subpage/MyPageLike.css';

import items from '../../product/ProductObject'

import React, { useEffect, useState } from 'react';

function MyPageLike({ change, setChange }) {

    const userData = JSON.parse(sessionStorage.getItem("LoginUserInfo"));
    // const items = JSON.parse(sessionStorage.getItem("goodsList"));

    const [user, setUser] = useState(userData)


    // 사진 이름 id 정보만 담긴 새로운 출력용 객체
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



    // 개별 삭제 버튼 로직(id값 비교)
    const handleDelete = (delId) => {        // 해당 번호가 없어진 새로운 찜 목록 배열을 생성
        const newLikedItem = likedGoods.filter((item) =>
            item.id !== delId
        )

        let newLiked = newLikedItem.map((item) =>
            item.id
        )

        let newMyPage = {
            ...userData.mypage,
            isLike: newLiked
        }

        let newUserData = {
            ...userData,
            mypage: newMyPage
        }

        sessionStorage.setItem("LoginUserInfo", JSON.stringify(newUserData));

        setUser(newUserData);
        setChange(!change);     // MyPageIndex에 대한 전체 렌더링
    }


    // 전체 선택, id값을 체크 배열에 넣는 로직
    const [checkedGood, setCheckedGood] = useState([]);

    const handleCheckGood = (id) => {
        setCheckedGood(prechecked => prechecked.includes(id) ? prechecked.filter(goodId => goodId !== id) : [...prechecked, id])
    }

    const handleCheckAll = (e) => {
        if (e.target.checked) {
            setCheckedGood(likedGoods.map(goods => goods.id));
        } else {
            setCheckedGood([]);
        }
    };


    // 선택 삭제 기능
    const onCheckedDelete = () => {
        if (checkedGood.length === 0) {
            alert('선택된 상품이 존재하지 않습니다.');
            return; // 함수 종료
        }

        let newIsLike = user.mypage.isLike.filter((id) => {
            if (!checkedGood.includes(id))
                return id
        }
        );  // newIsLike

        let newMyPage = {
            ...user.mypage,
            isLike: newIsLike
        }

        let newUser = {
            ...user,
            mypage: newMyPage
        }

        sessionStorage.setItem("LoginUserInfo", JSON.stringify(newUser))

        setUser(newUser);
        setCheckedGood([])
        setChange(!change);     // MyPageIndex에 대한 전체 렌더링
    }


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
