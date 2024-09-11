import GoodsItems from "../product/ProductObject"


const BuyComplete = ({ productPrice, totalPrice, username, options, amount, checkedCartItems, selectedProduct }) => {
    //
    // 숫자를 포맷팅하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }

    // console.log(selectedProduct)
    return (<div className="CompleteBox">
        <p className="BuyCompleteName">
            구매리스트
        </p>
        <div className="BuyComplete">
            {selectedProduct && selectedProduct.name && (
                <ul>
                    <li>상품명</li>
                    <li className="BuyCompleteItem">{selectedProduct.name}</li>
                    <li>상품 옵션</li>
                    <li>{options.contentSelect}</li>
                    <li>포장 옵션</li>
                    <li>{options.packagingSelect}</li>
                    <li>상품 갯수 </li>
                    <li>{amount}</li>
                    <li>가격</li>
                    <li>{formatNumber(productPrice)}</li>
                </ul>
            )
            }

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
                    <li>포장 옵션</li>
                    <li>{item.options.packagingSelect}</li>
                    <li>상품 갯수</li>
                    <li>{item.count}</li>
                    <li>상품 가격</li>
                    <li>{formatNumber(item.totalPrice)}</li>

                </ul>)
            })}
        </div>
        <p>
            총 가격 : <span className="TTPrice">{formatNumber(totalPrice)}</span>
        </p>
        <p>
            {username}님의 결제가 완료되었습니다.
        </p>
    </div>)
}
export default BuyComplete;
