import '../../css/main.css'
import { useEffect } from "react";
import GoodsItems from "../product/ProductObject";
import { Link } from "react-router-dom";

const SlideSection = ({ title, sort }) => {
    const sortItems = [...GoodsItems];
    if (sort === 'count') {
        sortItems.sort((a, b) => b.count - a.count);
    }

    return (
        <>
            <div className="product_section">
                <span><h1>인기 상품</h1></span>
                {sortItems.map((product, i) => (
                    <div className='slide_item'>
                        <Link to={`/goods/${product.category}/${product.id}`} key={i}>
                            <div key={i} className="slide_inner">
                                <img src={product.slideSrc[0]} alt={product.name} />
                                <div className='slide_content'>
                                    <p className='slide_name'>{product.name} </p>
                                    <p className='slide_price'>{product.price}</p>

                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );

}


export default SlideSection