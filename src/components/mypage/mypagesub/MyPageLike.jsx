import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../../css/mypage/subpage/MyPageLike.css';

import React, { useState } from 'react';

function MyPageLike() {

    const location = useLocation();
    let likedGoods = location.state.result;
    let userData = location.state.user;

    const navigate = useNavigate();

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

        navigate('/mypage/like', {
            state: {
                user: newUserData,
                result: newLikedItem
            }
        })
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
                            <img src={goods.productSrc[0]} alt={goods.name} />
                        </div>
                        <div className='MyLikeInfo'>
                            <h3>{goods.name}</h3>
                            <h4>{goods.price}원</h4>
                        </div>
                        <div>

                        </div>
                        <div className='MyLikeButton'>
                            <Link to={`/goods/${goods.category}/${goods.id}`}>
                                <button>상품 상세</button>
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
            </div>


        </div>     // mylikelist

    );       // return

}   // MyPageLike

export default MyPageLike;
