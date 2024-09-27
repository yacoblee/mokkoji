import React, { useEffect, useState, useRef } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import '../../css/Product/ProductCategory.css';
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";
import ProductMainGuide from './ProductMainGuide';

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

    useEffect(() => {
        // 카테고리 변경 시 검색어 초기화 및 첫 페이지로 설정
        SetFilterItem(it => ({ ...it, inputValue: '' }));
        SetFilterItem(it => ({ ...it, selectValue: 'allGoods' }));

        setPage(1);
        let uri = API_BASE_URL + "/goods/" + category;
        axios.get(uri, {
            params: {
                page: page, // 첫 페이지로 설정
                type: category,
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
        console.log(`카테고리 변했을때 pageMaker `)
        console.log(pageMaker);
    }, [category]);



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
        if (filterItem.inputValue.trim() === '') {
            // 검색어가 없을 때 카테고리 전체를 가져오기 위한 URI
            uri = `${API_BASE_URL}/goods/${filterItem.selectValue}`;
        } else {
            // 검색어가 있을 때 검색 API 호출
            uri = `${API_BASE_URL}/goods/search`;
        }
        axios.get(uri, {
            params: {
                page: page,
                type: filterItem.selectValue,
                keyword: filterItem.inputValue
            }
        })
            .then(response => {
                const { productList, pageMaker } = response.data;
                setList(productList);
                setResultCount(productList.length);
                updateDisplayMessage(productList.length);
                setPageMaker(pageMaker);
                console.log(pageMaker);
            })
            .catch(err => {
                console.log(err);
                setList([]);
                setResultCount(0);
                updateDisplayMessage(0);
            });
    };
    useEffect(() => {

        onclickSearch();

    }, [page]);

    const onEnterSearch = (e) => {
        if (e.key === "Enter") {
            onclickSearch();
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
                {count > 0 ? (
                    <span className='searchResult'>: 검색결과: {count}개</span>
                ) : (
                    <p>검색결과가 없습니다. 추천상품을 안내해드리겠습니다.</p>
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
            <div className='pagination'>
                {/* 첫 페이지로 이동 */}
                <button onClick={() => setPage(1)} disabled={pageMaker.currentPage === 1}>
                    First
                </button>
                {/* 이전 페이지 블록으로 이동 */}
                {pageMaker.hasprev && (
                    <button onClick={() => setPage(pageMaker.startPage - 1)}>Prev</button>
                )}
                {/* 페이지 번호 버튼들 */}
                {pages}
                {/* 다음 페이지 블록으로 이동 */}
                {pageMaker.hasnext && (
                    <button onClick={() => setPage(pageMaker.endPage + 1)}>Next</button>
                )}
                {/* 마지막 페이지로 이동 */}
                <button onClick={() => setPage(pageMaker.totalPage)} disabled={pageMaker.currentPage === pageMaker.totalPage}>
                    Last
                </button>
            </div>
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



    return (
        <>
            <div className='MenuNsearch' style={{ marginTop: "150px" }}>
                <div className='productMenu'>
                    {productMenu.map((items, i) => (
                        <NavLink to={`/goods/${items.category}`} key={i}>{items.description}</NavLink>
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
                    {/*span className='displayMessage'>{displayMessage}</span>*/}
                </div>
            </div>
            <div className='displayMessage2'>{displayMessage}</div>
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
                <button className='lastButton' onClick={() => setPage(1)} style={{ transform: 'rotateY(180deg)' }}>
                    <img src="/images/buy/next.png" alt="1" />
                </button>
                {renderPagination()}
                <button className='lastButton' onClick={() => setPage(pageMaker.lastPageNumber)}>
                    <img src="/images/buy/next.png" alt="last" />
                </button>
            </div>
        </>
    );
}

export default ProductList;
