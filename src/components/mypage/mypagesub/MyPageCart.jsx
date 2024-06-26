import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import '../../../css/mypage/subpage/MyPageCart.css';

function MyPageCart() {
    const location = useLocation();
    let cartGoods = location.state;

    // console.log(`wqeadsfghjkl ${cartGoods[0].id}`)
    // console.log(`wqeadsfghjkl ${cartGoods[1].id}`)
    // console.log(`wqeadsfghjkl ${cartGoods[2].id}`)

    // 이 아래로 checkbox 전체선택 로직
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

    // 이 아래로 이미지/버튼 따라서 onClick로 value값 바뀌는 로직


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
                            <img src={goods.photo} alt={goods.name} />
                        </div>
                        <div className='MyCartInfo'>
                            <h3>{goods.name}</h3>
                            <h4>{goods.content}</h4>
                            <h4>{goods.package}</h4>
                        </div>
                        {/* <div className='MyCartCount'>
                            <div className='MyProductCount'>
                                <img src="/images/buy/minus.png" onClick={buttonMinus} />
                                <input type="text" value={goods.contentCount} />
                                <img src="/images/buy/plus.png" onClick={buttonPlus} />
                            </div>
                            <div className='MyPackageCount'>
                                <img src="/images/buy/minus.png" onClick={buttonMinus} />
                                <input type="text" value={goods.packageCount} />
                                <img src="/images/buy/plus.png" onClick={buttonPlus} />
                            </div>
                        </div> */}
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


        </div>  // mycartlist

    );  // return
}

export default MyPageCart;
