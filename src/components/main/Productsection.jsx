import '../../css/main.css'
import { useEffect, useRef } from "react";
import GoodsItems from "../product/ProductObject";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
// Productsection
const Productsection = ({ title, sort }) => {
    const sortItems = [...GoodsItems];
    if (sort === 'count') {
        sortItems.sort((a, b) => b.count - a.count);
    }

    //버튼 스로틀
    const throlltle = (func) => {
        let timer;

        return () => {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    func();
                }, 300);
            }
        }
    };

    // 슬라이드 기능 추가
    const slideContainerRef = useRef(0);
    const btnPreRef = useRef();
    const btnNextRef = useRef();
    const slideIndexRef = useRef(0);

    const handlePrevClick = (e) => {
        slideIndexRef.current--;
        slideContainerRef.current.style.left = `${-slideIndexRef.current * 25}%`;

        btnNextRef.current.classList.remove('nonVisible');
        if (slideIndexRef.current <= 0) {
            btnPreRef.current.classList.add('nonVisible');
        }
    };

    const handleNextClick = (e) => {

        slideIndexRef.current++;
        slideContainerRef.current.style.left = `${-slideIndexRef.current * 25}%`;

        btnPreRef.current.classList.remove('nonVisible');
        if (slideIndexRef.current >= sortItems.length - 3) {
            btnNextRef.current.classList.add('nonVisible');
        }
    };
    return (
        <>
            <div className="product_section">
                <div className='product_head'>
                    <h1>Newest Items</h1>
                </div>

                <div className='slide_hidden'></div>

                <div className="slide_container" ref={slideContainerRef} >
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
                <div className='slide_hidden_right'></div>

                <button className="btn_pre nonVisible" ref={btnPreRef} onClick={throlltle(handlePrevClick)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button className="btn_next" ref={btnNextRef} onClick={throlltle(handleNextClick)}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>

            </div>
        </>
    );

}


export default Productsection