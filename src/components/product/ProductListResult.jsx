import { Link } from "react-router-dom";



const ProductListResult = ({selectItem ,category})=>{

    return(
    <>
        <div className="productItemList">
            {/* 선택된 카테고리의 상품들을 보여줌 */}
            {selectItem.map((product, i) => (
                <Link to={`/goods/${product.category}/${product.id}`} key={i}>
                    <div key={i} className="productItemResult">
                        <img src={product.slideSrc[0]} alt={product.name} />
                        <div>
                            <p>{product.name}</p>
                            <p>- {product.price}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

    
    </>
    )
}

export default ProductListResult;