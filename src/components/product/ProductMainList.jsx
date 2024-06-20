
import { Link } from "react-router-dom";
import GoodsItems from "./ProductObject";
const ProductMainList = ({ title, sort }) => {

    const sortItems = [...GoodsItems];
    if (sort === 'count') {
        sortItems.sort((a, b) => b.count - a.count);
    }

    return (
        <>
            <div className="productListInfo">
                이 달의 <span>{title}</span>을 만나보세요 !
            </div>
            <div className="productList">
                {sortItems.map((product, i) => (
                    <Link to={`/goods/${product.category}/${product.id}`} key={i}>
                        <div key={i} className="productItem">
                            <img src={product.slideSrc[0]} alt={product.name} />
                            <div>
                                <p>{product.name} </p>
                                <p>- {product.price}</p>

                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default ProductMainList;