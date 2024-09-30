import React, { useEffect, useState, useRef , useCallback } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import '../../css/Product/ProductCategory.css';
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";
//import ProductMainGuide from './ProductMainGuide.jsx'; // 현재 캐시 등의 문제로 에러 발생이 보임. 도로 가져옴
const ProductMainGuide = ({ text }) => {
    const guideRef = useRef(null);

    useEffect(() => {
        const guideElement = guideRef.current;
        const containerWidth = guideElement.offsetWidth;
        const animationDuration = containerWidth / 30;
        const animationDelay = -containerWidth / 50;

        guideElement.style.animation = 'none';
        guideElement.style.animation = `scrollText ${animationDuration}s linear infinite`;
        guideElement.style.animationDelay = `${animationDelay}s`;
    }, [text]);

    return (
        <p className="productMainGuide" ref={guideRef} style={{ animation: "scrollText linear infinite" }}>
            {text}
        </p>
    );
};
const ProductList = () => {
    const { category } = useParams();
    const [list, setList] = useState([]);
    const [filterItem, SetFilterItem] = useState({
        selectValue: 'allGoods',
        //sortOption: 'uploadDateAsc',
        inputValue: '',
    });
    const [page, setPage] = useState(1);
    const [resultCount, setResultCount] = useState(0);
    const [displayMessage, setDisplayMessage] = useState('');
    const [pageMaker, setPageMaker] = useState({});


    const axiosCall = useCallback(() => {
        console.log("axiosCall_ProductList.jsx _ inputValue : " + filterItem.inputValue.trim());
        let uri;
        if (filterItem.inputValue.trim() === '') {
            // 검색어가 없을 때 카테고리 전체를 가져오기 위한 URI
            uri = `${API_BASE_URL}/goods/${category}`;
            console.log(`axious요청 : 카테고리 별 검색`);
            //setDisplayMessage('');
        } else {
            // 검색어가 있을 때 검색 API 호출
            uri = `${API_BASE_URL}/goods/search`;
            console.log(`axious요청 : 서치 검색`);
            //updateDisplayMessage();
        }
        axios.get(uri, {
            params: {
                page: page, // 첫 페이지로 설정
                type: (filterItem.inputValue.trim() === '' ? category : filterItem.selectValue),
                ...(filterItem.inputValue.trim() ? { keyword: filterItem.inputValue } : {})
            }
        })
            .then(response => {
                const { productList, pageMaker } = response.data;
                setList(productList);
                setResultCount(productList.length);
                setPageMaker(pageMaker);
                console.log(productList);
            })
            .catch(err => {
                console.log(err);
                setList([]);
            });
        }, [category, filterItem, page]);
    useEffect(() => {
        // 카테고리 변경 시 검색어 초기화 및 첫 페이지로 설정 -> 비동기 처리시 박자가 늦는 감이 있음.
        SetFilterItem(it => ({ ...it, selectValue: 'allGoods', inputValue: '' }));
        setPage(1);
        axiosCall();
    }, [category]);

    useEffect(() => {
        axiosCall();
    }, [page]);
    const onChangeSelectValue = (e) => {
        SetFilterItem(it => ({ ...it, selectValue: e.target.value }));
    };

    // const onChangeSortOption = (e) => {
    //     SetFilterItem(it => ({ ...it, sortOption: e.target.value }));
    // };

    const onChangeInputValue = (e) => {
        SetFilterItem(it => ({ ...it, inputValue: e.target.value }));
    };

    const onclickSearch = () => {
        let uri;
        axiosCall();
    };

    const onEnterSearch = (e) => {
        if (e.key === "Enter") {
            axiosCall();
        }
    };

    const updateDisplayMessage = (count) => {
        const selectedCategory = productMenu.find(menu => menu.category === filterItem.selectValue);
        //const selectedSortOption = sortOptions.find(option => option.value === filterItem.sortOption)?.label;

        setDisplayMessage(
            <>
                <span className='NamedCategory'>카테고리:</span>
                <span className='NamedInfo'> {selectedCategory.description}</span>
                {/*<span className='NamedCategory'>정렬:</span>
                <span className='NamedInfo'> {selectedSortOption}</span>*/}
                {list.length > 0 ? (
                    <span className='searchResult'>"{filterItem.inputValue}"의 검색결과: {list.length}개</span>
                ) : (
                    <p>검색결과가 없습니다.</p>
                )}
            </>
        );
    };

    const renderPagination = () => {
        if (!pageMaker) return null;

        const pages = [];

        // 페이지 번호 버튼 생성
        for (let i = pageMaker.startPage; i <= pageMaker.endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setPage(i)}
                    style={{
                        boxShadow: page === i && 'inset 0px -5px 0px rgba(166, 255, 0, 0.233)',
                        color: page === i && 'red',
                        fontSize: page === i && '18px',
                        fontWeight: page === i && '700'
                    }} // 현재 페이지 강조
                >
                    {i}
                </button>
            );
        }

        return (
            <>
                {/* 첫 페이지로 이동 */}
                <button className='lastButton' onClick={() => setPage(1)} style={{ transform: 'rotateY(180deg)' }}>
                    <img src="/images/buy/next.png" alt="1" disabled={pageMaker.currentPage === 1} />
                </button>
                {/* 이전 페이지 블록으로 이동 */}
                {pageMaker.hasprev && (
                    <button className='nextButton' onClick={() => setPage(pageMaker.startPage - 1)} style={{ transform: 'rotateY(180deg)' }}>
                        <img src="/images/buy/next2.png" alt="1" />
                    </button>
                )}
                {/* 페이지 번호 버튼들 */}
                {pages}
                {/* 다음 페이지 블록으로 이동 */}
                {pageMaker.hasnext && (
                    <button className='nextButton' onClick={() => setPage(pageMaker.endPage + 1)}>
                        <img src="/images/buy/next2.png" alt="1" />
                    </button>
                )}
                {/* 마지막 페이지로 이동 */}
                <button className='lastButton' onClick={() => setPage(pageMaker.totalPage)}>
                    <img src="/images/buy/next.png" alt="last" disabled={pageMaker.currentPage === pageMaker.totalPage} />
                </button>
            </>
        );
    };

    const setPageAndFetch = (pageNum) => {
        setPage(pageNum);
    };

    // 메뉴바의 구성
    const productMenu = [
        { category: 'allGoods', description: '전체상품' },
        { category: 'C1', description: '문구/사무' },
        { category: 'C2', description: '패션/생활' },
        { category: 'C3', description: '인테리어 소품' },
        { category: 'C4', description: '공예품' },
        { category: 'C5', description: '주방/식기' },
    ];

    // 검색 조건에 대한 옵션
    // const sortOptions = [
    //     { value: 'like_conutDesc', label: '인기순' },
    //     { value: 'priceDesc', label: '높은가격순' },
    //     { value: 'priceAsc', label: '낮은가격순' },
    //     { value: 'uploadDateAsc', label: '최신순' }
    // ];

    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

    //<NavLink to={`/goods/${items.category}` 카테고리 검색시 내용이 사라지지 않는 문제 발생}
    //onClick={() => filterItem.inputValue  ? SetFilterItem({ selectValue:category, inputValue: '' }) : null}
    //key={i}>{items.description}</NavLink>
    return (
        <>
            <div className='MenuNsearch' style={{ marginTop: "150px" }}>
                <div className='productMenu'>
                    {productMenu.map((items, i) => (
                        <NavLink to={`/goods/${items.category}`}
                            onClick={() => {
                                if (filterItem.inputValue) {
                                    // 조건 변경후 axious 재요청. 안되는중...
                                    console.log(`nav의 axious 재요청`)
                                    try {
                                        SetFilterItem({ selectValue: 'allGoods', inputValue: '' });
                                    } finally {
                                        axiosCall();
                                    }
                                } else {
                                    axiosCall();
                                }
                            }}
                            key={i}>{items.description}</NavLink>
                    ))}
                </div>
                <div className='productSearch'>
                    <select name="productSearch" id="productSearch" value={filterItem.selectValue} onChange={onChangeSelectValue}>
                        {productMenu.map((items, i) => <option value={items.category} key={i}>{items.description}</option>)}
                    </select>

                    {/*<select name="productSort" id="productSort" value={filterItem.sortOption} onChange={onChangeSortOption}>
                        {sortOptions.map((items, i) => <option value={items.value} key={i}>{items.label}</option>)}
                    </select>*/}

                    <input type="text" name="productInput" id="productInput" value={filterItem.inputValue} onChange={onChangeInputValue} onKeyDown={onEnterSearch} />
                    <button onClick={onclickSearch}>검색</button>
                    {/*<span className='displayMessage'>{displayMessage}</span>*/}
                </div>
            </div>
            {/*<div className='displayMessage2'>{displayMessage}</div>*/}

            <div className="productItemList">
                {list.map((product, i) => (
                    <Link to={`/goods/${product.categoryId}/${product.id}`} key={product.id}>
                        <div className="productItemResult">
                            <img src={`${API_BASE_URL}/resources/productImages/${product.mainImageName}`} alt={product.name} />
                            <div>
                                <p style={{ fontSize: '16px', fontWeight: '600', wordBreak: 'keep-all' }}>{product.name}</p>
                                <p className="productMainGuideContainer">
                                    <ProductMainGuide text={product.mainDescription} />
                                </p>
                                <p style={{ color: 'red', fontWeight: '600' }}>{formatNumber(product.price)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="productPager">
                {renderPagination()}
            </div>
        </>
    );
}

export default ProductList;
