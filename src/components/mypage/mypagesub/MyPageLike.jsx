import { useLocation } from 'react-router-dom';
import '../../../css/mypage/subpage/MyPageLike.css';

import React from 'react';


function MyPageLike() {

    const location = useLocation();

    let likedGoods = location.state;

    console.log(`likedGoods 길이 ${likedGoods[0].id} `)
    console.log(`likedGoods 길이 ${likedGoods[1].id} `)
    console.log(`likedGoods 길이 ${likedGoods[2].id} `) // 출력 확인함

    return (
        <div className='MyLikeList' >

            <div className='MyLikeHeader'>

                <div>
                    <input
                        type="checkbox"
                    // onChange={handleSelectAll}
                    // checked={selectedProducts.length === products.length}
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
                            <input type="checkbox" />
                        </div>

                        <div className="MyLikePhoto">
                            {/* <img src={item.photo} alt={item.name} /> */}
                        </div>

                        <div className="name">{goods.name}</div>

                        <div className="buy">
                            <button>장바구니 담기</button>
                        </div>

                    </div >  // mylikegird
                )
            })}

        </div>     // mylikelist

    );       // return

}
export default MyPageLike;
