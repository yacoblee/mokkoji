import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import '../../../css/mypage/subpage/MyPageCart.css';

function MyPageCart() {
    const location = useLocation();
    let cartGoods = location.state;

    const [checkedGoods, setCheckedGoods] = useState([]);
    const handleCheckAll = (e) => {
        if (e.target.checked) {
            setCheckedGoods(cartGoods.map(goods => goods.id));
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
        <div className='MyCartList' >

            <div className='MyCartHeader'>

                <div>
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={checkedGoods.length === cartGoods.length}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>


            {cartGoods.map((goods) => {
                return (
                    <div className="MyCartGrid" key={goods.id} >
                        <div>
                            <input
                                type="checkbox"
                                checked={checkedGoods.includes(goods.id)}
                                onChange={() => handleCheckGood(goods.id)}
                            />
                        </div>
                        <div className="MyCartPhoto">
                            <img src={goods.slideSrc[0]} alt={goods.name} />
                        </div>
                        <div className='MyCartInfo'>
                            <h3>{goods.name}</h3>
                            <h4>{goods.price}원</h4>
                        </div>
                        <div className='MyCartCount'>
                            <input type="number" />
                        </div>
                        <div className='MyCartButton'>
                            <button>구매</button>
                            <button>삭제</button>
                        </div>
                    </div >  // mycartgird
                )
            })}

            <div className='MyCartFooter'>

                <div>
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={checkedGoods.length === cartGoods.length}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>


        </div>     // mycartlist

    );       // return
}

export default MyPageCart;
