import '../../css/main.css'
import { useEffect, useRef } from "react";
import GoodsItems from "../product/ProductObject";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const SlideSection = ({ title, sort }) => {
    const sortItems = [...GoodsItems];
    if (sort === 'count') {
        sortItems.sort((a, b) => b.count - a.count);
    }

    // 슬라이드 기능 추가
    const slideContainerRef = useRef();
    const btnPreRef = useRef();
    const btnNextRef = useRef();
    const slideIndexRef = useRef(0);

    const handlePrevClick = () => {
        slideIndexRef.current--;
        slideContainerRef.current.style.left = `${-slideIndexRef.current * 25}%`;

        btnNextRef.current.classList.remove('nonVisible');
        if (slideIndexRef.current <= 0) {
            btnPreRef.current.classList.add('nonVisible');
        }
    };

    const handleNextClick = () => {
        slideIndexRef.current++;
        slideContainerRef.current.style.left = `${-slideIndexRef.current * 25}%`;

        btnPreRef.current.classList.remove('nonVisible');
        if (slideIndexRef.current >= 4) {  // 슬라이드 개수에 따라 조정
            btnNextRef.current.classList.add('nonVisible');
        }
    };
    return (
        <>
            <div className="product_section">
                <span><h1>인기 상품</h1></span>
                
                <div className="slide_container" ref={slideContainerRef}>
                    {sortItems.map((product, i) => (
                        <div className='slide_item' key={i}>
                            <Link to={`/goods/${product.category}/${product.id}`}>
                                <div className="slide_inner">
                                    <img src={product.slideSrc[0]} alt={product.name} />
                                    <div className='slide_content'>
                                        <p className='slide_name'>{product.name}</p>
                                        <p className='slide_price'>{product.price.toLocaleString()}원</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>


                <button className="btn_pre nonVisible" ref={btnPreRef} onClick={handlePrevClick}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className="btn_next" ref={btnNextRef} onClick={handleNextClick}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </>
    );

}


export default SlideSection