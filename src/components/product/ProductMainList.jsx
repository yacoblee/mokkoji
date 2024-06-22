import { useState } from 'react';
import { Link } from "react-router-dom";
import GoodsItems from "./ProductObject";
const ProductMainList = ({ title, sort }) => {
    //필터를 위한 복사본 형성
    const sortItems = [...GoodsItems];

    //프롭스로 받은 값에 따라 필터링 적용
    if (sort === 'count') {
        sortItems.sort((a, b) => b.count - a.count);
    }

    //슬라이드 구현을 위한 state
    const [currentSlide ,setCurrentSlide] =useState(0);

    //슬라이드 구현 횟수 = 전체 슬라이드 갯수 - 현재 보여지는 슬라이드 갯수
    const maxSlide = sortItems.length - 4; 
    
    //버튼을 누르면 state값 증가와 감소
    const onclickMainList = (type)=>{
        if(type ==='+'){
            if(currentSlide === maxSlide) return;
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
                {
                    currentSlide>0 && <button style={{left :0}}
                    type='button'
                    onClick={()=>{onclickMainList('-')}}>왼쪽</button> 
                }

                <div className="slider" 
                style={{ transform: `translateX(-${currentSlide * 23.7}vw)` }}>

                {sortItems.map((product, i) => (
                    <Link to={`/goods/${product.category}/${product.id}`} key={i}
                    className="productItem">

                            <img src={product.slideSrc[0]} alt={product.name} />

                            <div>
                                <p>{product.name} </p>
                                <p className='ProductPrice'>{product.price}</p>
                                {/* <p>{product.count}</p> */}
                            </div>
                        
                    </Link>
                ))}
                </div>
                {
                    currentSlide < maxSlide && <button style={{right :0}}
                    type='button'
                    onClick={()=>{onclickMainList('+')}}>오른쪽</button> 
                }
            </div>
        </>
    );
}

export default ProductMainList;