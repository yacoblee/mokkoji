import GoodsItems from "../product/ProductObject"


const BuyComplete = ({ productPrice, totalPrice, username, options, buyPrice, checkedCartItems, selectedProduct }) => {


    console.log(checkedCartItems)
    return (<div className="CompleteBox">
        <p className="BuyCompleteName">
            구매리스트
        </p>
        <div className="BuyComplete">
            <ul>
                <li>상품명</li>
                <li className="BuyCompleteItem">{selectedProduct.name}</li>
                <li>상품 옵션</li>
                <li>{options.contentSelect}</li>
                <li>상품 갯수 </li>
                <li>{buyPrice.productPrice}</li>
                <li>포장 옵션</li>
                <li>{options.packagingSelect}</li>
                <li>포장 갯수</li>
                <li>{buyPrice.optionPrice}</li>
                <li>가격</li>
                <li>{productPrice}</li>
            </ul>

            {checkedCartItems.map(item => {
                const productName = GoodsItems.find(it => it.id === item.productId).name;

                return (<ul className="checkedCartItems">
                    <li>
                        상품명
                    </li>
                    <li className="BuyCompleteItem">
                        {productName}
                    </li>
                    <li>상품 옵션</li>
                    <li>{item.options.contentSelect}</li>
                    <li>상품 갯수</li>
                    <li>{item.quantity.contentSelect}</li>
                    <li>포장 옵션</li>
                    <li>{item.options.packagingSelect}</li>
                    <li>포장 갯수</li>
                    <li>{item.quantity.packagingSelect}</li>
                    <li>상품 가격</li>
                    <li>{item.totalPrice}</li>

                </ul>)
            })}
        </div>
            <p>
                총 가격 : <span className="TTPrice">{totalPrice}</span>
            </p>
        <p>
            {username}님의 결제가 완료되었습니다.
        </p>
    </div>)
}
export default BuyComplete;