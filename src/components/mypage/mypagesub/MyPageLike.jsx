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

    // 이 아래로 checkbox 전체선택 + 선택 상품 삭제 로직(진행중: 체크된 id값이 매번 갱신되는 문제 있음=최근 체크한 1개만 삭제됨)
    const [checkedGoods, setCheckedGoods] = useState([]);

    const handleCheckAll = (e) => {
        if (e.target.checked) {
            setCheckedGoods(likedGoods.map(goods => goods.id));
        } else {
            setCheckedGoods([]);
        }
    };
    const handleCheckGood = (id) => {
        setCheckedGoods(prechecked => prechecked.includes(id) ? prechecked.filter(goodsId => goodsId !== id) : [...prechecked, id])
    }

    console.log(checkedGoods)

    let unCheckedGoods = []

    useEffect(() => {
        checkedGoods.map((id) => {
            let findItem = userData.mypage.isLike.filter((like) =>
                like !== id
            );      // findBasket
            unCheckedGoods = findItem
        })
    }, [checkedGoods]);

    console.log(unCheckedGoods)

    const onDelete = () => {
        let newMyPage = {
            ...userData.mypage,
            isLike: unCheckedGoods
        };

        let newUser = {
            ...userData,
            mypage: newMyPage
        }

        sessionStorage.setItem('LoginUserInfo', JSON.stringify(newUser));

        setUser(newUser);

    }



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


    return (
        <div className='MyLikeList' >

            <div className='MyLikeHeader'>

                <div>
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={checkedGoods.length === likedGoods.length}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>


            {likedGoods.map((goods) => {
                return (
                    <div className="MyLikeGrid" key={goods.id} >
                        <div>
                            <input
                                type="checkbox"
                                checked={checkedGoods.includes(goods.id)}
                                onChange={() => handleCheckGood(goods.id)}
                            />
                        </div>
                        <div className="MyLikePhoto">
                            <img src={goods.photo} alt={goods.name} />
                        </div>
                        <div className='MyLikeInfo'>
                            <h3>{goods.name}</h3>
                        </div>
                        <div>

                        </div>
                        <div className='MyLikeButton'>
                            <Link to={`/goods/${goods.category}/${goods.id}`}>
                                <button className='ButtonDetail'>상품 상세</button>
                            </Link>
                            <button onClick={() => handleDelete(goods.id)}>삭제</button>
                        </div>
                    </div >  // mylikegird
                )
            })}

            <div className='MyLikeFooter'>

                <div>
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={checkedGoods.length === likedGoods.length}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <button className='SelectDeleteButton' onClick={onDelete}>선택 삭제</button>
                </div>
            </div>


        </div>     // mylikelist

    );       // return

}   // MyPageLike

export default MyPageLike;
