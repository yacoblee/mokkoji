import { useLocation } from 'react-router-dom';
import '../../../css/mypage/subpage/MyPageLike.css';

import React, { useState } from 'react';


function MyPageLike() {

    const location = useLocation();
    let likedGoods = location.state;

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

    // console.log(`likedGoods 길이 ${likedGoods[0].id} `)
    // console.log(`likedGoods 길이 ${likedGoods[1].id} `)
    // console.log(`likedGoods 길이 ${likedGoods[2].id} `) // 출력 확인함

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
                            <button>장바구니 담기</button>
                            <button>삭제</button>
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

}
export default MyPageLike;
