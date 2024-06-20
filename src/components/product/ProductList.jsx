import React from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import GoodsItems from './ProductObject';
// import ProductDetails from './ProductDetails';

const ProductList = () => {
    const { category } = useParams(); // useParams()를 통해 category 파라미터 가져오기
    console.log('제품리스트');
    // 선택된 카테고리의 상품들만 필터링
    let selectItem = GoodsItems.filter((items) => items.category === category);

    const productMenu = [
        {category: 'stationeryGoods',description: '문구/사무',},
        {category: 'fashionGoods',description: '패션/생활',},
        {category: 'interiorGoods',description: '인테리어 소품',},
        {category: 'handicraftGoods',description: '공예품',},
        {category: 'kitchGoods',description: '주방/식기',},
    ];
    return (
        <>
            <div className='productMenu' style={{ marginTop: "150px" }}>
                {productMenu.map((items, i) => (
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
