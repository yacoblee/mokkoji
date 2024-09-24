import { Link } from "react-router-dom";
import GoodsItems from "./ProductObject";
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../service/app-config";
import { getStorageData } from "../../service/apiService";
import axios from "axios";
//import { getStorageData } from '../service/apiService';

const ProductMainList = ({ title, sort }) => {
    //필터를 위한 복사본 형성

    const [list, setList] = useState([]);
    // => 출력할 Data list 정의
    //const sortItems = [...list];

    useEffect(() => {
        //if (getStorageData() !== null) setList(getStorageData());
        //else alert(' 출력할 내용이 없습니다 ~~ ');
        let uri = API_BASE_URL + "/goods";
        axios.get(uri)
            .then(response => {
                setList(response.data)
                console.log(response.data);
            })
            .catch(err => {
                //alert(err.message);
                console.log(err);
                setList([]);
            })
    }, []);


    //프롭스로 받은 값에 따라 필터링 적용
    if (sort === 'count') {
        list.sort((a, b) => b.count - a.count);
    }

    //슬라이드 구현을 위한 state
    const [currentSlide, setCurrentSlide] = useState(0);


    let visibleSlide = 4;//현재 보여지는 슬라이드 갯수

    //슬라이드 구현 횟수 = 전체 슬라이드 갯수 - 현재 보여지는 슬라이드 갯수
    const maxSlide = list.length - visibleSlide;

    //버튼을 누르면 state값 증가와 감소
    const onclickMainList = (type) => {
        if (type === '+') {
            if (currentSlide === maxSlide) return;
            setCurrentSlide(currentSlide + 1);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    }

    //버튼 호버시 true 아웃시 fasle  의 state
    const [hover, setHover] = useState(false);

    //버튼 호버시 true 설정
    const onMouseEnterHover = () => {
        setTimeout(() => {
            setHover(true);
        }, 0);
    }

    const onMouseOverHover = () => {
        setTimeout(() => {
            setHover(false);
        }, 0);
    }
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }
    if (list.length === 0) {
        return (
            <div style={{ fontWeight: 'bold', fontSize: 30, height: 600 }}>
                Loading...
            </div>
        );
    } else {
        return (
            <>
                <div className="productListInfo">
                    이 달의 <span className='NamedCategory'>{title}</span>을 만나보세요 !
                </div>
                <div className="productList">
                    <div className='secondContainerLeftBtn'>
                        {
                            currentSlide > 0 && <button style={{ left: 5, transform: 'rotateY(180deg)' }}
                                type='button'
                                onClick={() => { onclickMainList('-') }}
                                onMouseEnter={onMouseEnterHover}
                                onMouseOut={onMouseOverHover}>
                                <img src={hover ? "/images/buy/arrow-right-2.png" : "/images/buy/arrow-right-3.png"}
                                    alt="left" />
                            </button>
                        }
                    </div>

                    <div className="slider"
                    >

                        {list.map((product, i) => (
                            <Link to={`/goods/${product.categoryId}/${product.id}`} key={i}
                                style={{ transform: `translateX(-${currentSlide * 110}%)` }}
                                className="productItem">

                                <img src={`${API_BASE_URL}/resources/productImages/${product.mainImageName}`} alt={product.name} />

                                <div>
                                    <p >{product.name} </p>
                                    <p className='ProductPrice'>{formatNumber(Number(product.price))}</p>
                                    {/* <p>{product.count}</p> */}
                                </div>

                            </Link>
                        ))}
                    </div>
                    <div className='secondContainerRightBtn'>
                        {
                            currentSlide < maxSlide && <button style={{ right: 5 }}
                                type='button'
                                onClick={() => { onclickMainList('+') }}
                                onMouseEnter={onMouseEnterHover}
                                onMouseOut={onMouseOverHover}>
                                <img src={hover ? "/images/buy/arrow-right-2.png" : "/images/buy/arrow-right-3.png"}
                                    alt="right" />
                            </button>
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default ProductMainList;