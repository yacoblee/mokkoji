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


    let visibleSlide = 4;//현재 보여지는 슬라이드 갯수
    
    //슬라이드 구현 횟수 = 전체 슬라이드 갯수 - 현재 보여지는 슬라이드 갯수
    const maxSlide = sortItems.length - visibleSlide; 
    
    //버튼을 누르면 state값 증가와 감소
    const onclickMainList = (type)=>{
        if(type ==='+'){
            if(currentSlide === maxSlide) return;
            setCurrentSlide(currentSlide+1);
        }else{
            setCurrentSlide(currentSlide-1);
        }
    }

    //버튼 호버시 true 아웃시 fasle  의 state
    const [hover, setHover] = useState(false);

    //버튼 호버시 true 설정
    const onMouseEnterHover = ()=>{
        setTimeout(() => {
            setHover(true);
        }, 0);
    }

    const onMouseOverHover = ()=>{
        setTimeout(() => {
            setHover(false);
        }, 0);
    }
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }
    return (
        <>
            <div className="productListInfo">
                이 달의 <span className='NamedCategory'>{title}</span>을 만나보세요 !
            </div>
            <div className="productList">
                <div className='secondContainerLeftBtn'>
                {
                    currentSlide>0 && <button style={{left :5 ,transform: 'rotateY(180deg)'}}
                    type='button'
                    onClick={()=>{onclickMainList('-')}}
                    onMouseEnter={onMouseEnterHover}
                    onMouseOut={onMouseOverHover}>
                        <img src={hover ? "/images/buy/arrow-right-2.png" : "/images/buy/arrow-right-3.png" }
                        alt="left" />
                    </button> 
                }
                </div>

                <div className="slider" 
                >

                {sortItems.map((product, i) => (
                    <Link to={`/goods/${product.category}/${product.id}`} key={i}
                    style={{ transform: `translateX(-${currentSlide * 110}%)` }}
                    className="productItem">

                            <img src={product.slideSrc[0]} alt={product.name} />

                            <div>
                                <p >{product.name} </p>
                                <p className='ProductPrice'>{formatNumber(product.price)}</p>
                                {/* <p>{product.count}</p> */}
                            </div>
                        
                    </Link>
                ))}
                </div>
                <div className='secondContainerRightBtn'>
                {
                    currentSlide < maxSlide && <button style={{right :5}}
                    type='button'
                    onClick={()=>{onclickMainList('+')}}
                    onMouseEnter={onMouseEnterHover}
                    onMouseOut={onMouseOverHover}>
                        <img src={hover ? "/images/buy/arrow-right-2.png" : "/images/buy/arrow-right-3.png" }
                        alt="right" />
                    </button> 
                }
                </div>
            </div>
        </>
    );
}

export default ProductMainList;