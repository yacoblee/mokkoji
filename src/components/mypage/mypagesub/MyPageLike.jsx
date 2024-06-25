import '../../../css/mypage/subpage/MyPageLike.css';

import React from 'react';

import userInfo from '../../login/UserInforData';
import GoodsItems from '../../product/ProductObject';


function MyPageLike() {

    const user = userInfo[0];   // 임의 지정
    const item = GoodsItems;

    const result = [];

    function FindLikeItem() {
        result = item.filter((goods) => {
            if (user.mypage.isLike[0] === goods)
                return goods;
        })
    }


    return (
        <div className='MyLikeList'>

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

            {/* {user.mypage.isLike.forEach((isLikeNo) => {
                let findGoods = item.find((goods) => isLikeNo === goods.id)
                console.log(`출력됨${findGoods.id}`)
            })} */}




        </div >     // mylikelist

    );       // return

}
export default MyPageLike;
