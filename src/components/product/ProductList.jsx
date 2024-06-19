import React from 'react';
import { useParams, NavLink, Route, Routes, Link } from 'react-router-dom';
import GoodsItems from './ProductObject';
import ProductDetails from './ProductDetails';

const ProductList = () => {
    const { category } = useParams(); // useParams()를 통해 category 파라미터 가져오기
    console.log('dk');
    // 선택된 카테고리의 상품들만 필터링
    let selectItem = GoodsItems.filter((items) => items.category === category);
    console.log(`${selectItem[0]}`);
    return (
        <>
            <div className='productMenu' style={{ marginTop: "150px" }}>
                {GoodsItems.map((items, i) => (
                    <NavLink to={`/goods/${items.category}`} key={i}>{items.description}</NavLink>
                ))}
            </div>
            <div className="productListInfo">
                <span>{selectItem[0]?.description}</span>
            </div>
            <div className="productItemList">
                {/* 선택된 카테고리의 상품들을 보여줌 */}
                {selectItem.map((product, i) => (
                    <Link to={`/goods/${product.category}/${product.id}`} key={i}>
                        <div key={i} className="productItem">
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
    );
}

export default ProductList;
