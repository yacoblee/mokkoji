import React from 'react';
import { useParams } from 'react-router-dom';
import GoodsItems from './ProductObject';

// function findItem(){
// }
const ProductList = () => {
    const {category} = useParams();
    
    let selectItem = GoodsItems.filter((items)=>items.category === category);

    return (
        <>
            <div className="productListInfo">
                이 달의 <span>{selectItem[0].category}</span>을 만나보세요!
            </div>
            <div className="productList">
                {selectItem.map((product, i) => (
                    <div key={i} className="productItem">
                        <img src={product.slideSrc[0]} alt={product.name} />
                        <p>{product.name}</p>
                        <p>- {product.price}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProductList;