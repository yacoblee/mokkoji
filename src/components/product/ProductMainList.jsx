import { useState } from 'react';
import { Link } from "react-router-dom";
import GoodsItems from "./ProductObject";
const ProductMainList = ({ title, sort }) => {
    //필터를 위한 복사본 형성
    const sortItems = [...GoodsItems];

    if (sort === 'count') {
        sortItems.sort((a, b) => b.count - a.count);
    }
    //슬라이드 구현을 위한 state
    const [currentSlide ,setCurrentSlide] =useState(0);
    
    //버튼을 누르면 state값 증가와 감소
    const onclickMainList = (type)=>{
        if(type ==='+'){

            setCurrentSlide(currentSlide+1);
        }else{
            setCurrentSlide(currentSlide-1);
        }
    }
    return (
        <>
            <div className="productListInfo">
                이 달의 <span>{title}</span>을 만나보세요 !
            </div>
            <div className="productList">
                <button style={{left :0}}
                type='button'
                onClick={()=>{onclickMainList('-')}}>왼쪽</button>
                <div className="silder" 
                style={{ transform: `translateX(-${currentSlide * 245}px)` }}>
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
                <button type='button' 
                style={{right :0}}
                onClick={()=>{onclickMainList('+')}}>오른쪽</button>
            </div>
        </>
    );
}

export default ProductMainList;