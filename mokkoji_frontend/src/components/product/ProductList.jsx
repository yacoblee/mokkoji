import React, { useEffect, useState, useRef } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import '../../css/Product/ProductCategory.css';
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";

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
        sortOption: 'uploadDateAsc',
        inputValue: '',
    });
    const [page, setPage] = useState(1);
    const [resultCount, setResultCount] = useState(0);
    const [displayMessage, setDisplayMessage] = useState('');
    const [pageMaker, setPageMaker] = useState({});

    useEffect(() => {
        let uri = API_BASE_URL + "/goods/" + category;
        axios.get(uri)
            .then(response => {
                const { productList } = response.data;
                setList(productList);
                setResultCount(productList.length);
                console.log(productList);
            })
            .catch(err => {
                console.log(err);
                setList([]);
            });
    }, [category]);

    useEffect(() => {
        onclickSearch();
    }, [page]);

    const onChangeSelectValue = (e) => {
        SetFilterItem(it => ({ ...it, selectValue: e.target.value }));
    };

    const onChangeSortOption = (e) => {
        SetFilterItem(it => ({ ...it, sortOption: e.target.value }));
    };

    const onChangeInputValue = (e) => {
        SetFilterItem(it => ({ ...it, inputValue: e.target.value }));
    };

    const onclickSearch = () => {
        let uri = API_BASE_URL + `/goods/${filterItem.selectValue}`;

        axios.get(uri, {
            params: {
                currentPage: page,
                rowsPerPageCount: 5,
                sortOption: filterItem.sortOption,
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

    const onEnterSearch = (e) => {
        if (e.key === "Enter") {
            onclickSearch();
        }
    };

    const updateDisplayMessage = (count) => {
        const selectedCategory = productMenu.find(menu => menu.category === filterItem.selectValue);
        const selectedSortOption = sortOptions.find(option => option.value === filterItem.sortOption)?.label;

        setDisplayMessage(
            <>
                <span className='NamedCategory'>카테고리:</span>
                <span className='NamedInfo'> {selectedCategory.description}</span>
                <span className='NamedCategory'>정렬:</span>
                <span className='NamedInfo'> {selectedSortOption}</span>
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
        for (let i = pageMaker.startPageNumber; i <= pageMaker.endPageNumber; i++) {
            pages.push(
                <button key={i} onClick={() => setPageAndFetch(i)}>{i}</button>
            );
        }

        return (
            <div className='pagination'>
                {pageMaker.hasPreviousPageBlock && <button onClick={() => setPageAndFetch(pageMaker.startPageNumber - 1)}>Prev</button>}
                {pages}
                {pageMaker.hasNextPageBlock && <button onClick={() => setPageAndFetch(pageMaker.endPageNumber + 1)}>Next</button>}
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
    const sortOptions = [
        { value: 'like_conutDesc', label: '인기순' },
        { value: 'priceDesc', label: '높은가격순' },
        { value: 'priceAsc', label: '낮은가격순' },
        { value: 'uploadDateAsc', label: '최신순' }
    ];

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

                    <select name="productSort" id="productSort" value={filterItem.sortOption} onChange={onChangeSortOption}>
                        {sortOptions.map((items, i) => <option value={items.value} key={i}>{items.label}</option>)}
                    </select>

                    <input type="text" name="productInput" id="productInput" value={filterItem.inputValue} onChange={onChangeInputValue} onKeyDown={onEnterSearch} />
                    <button onClick={onclickSearch}>검색</button>
                    <span className='displayMessage'>{displayMessage}</span>
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
                <button className='lastButton' onClick={() => setPageAndFetch(1)} style={{ transform: 'rotateY(180deg)' }}>
                    <img src="/images/buy/next.png" alt="1" />
                </button>
                {renderPagination()}
                <button className='lastButton' onClick={() => setPageAndFetch(pageMaker.lastPageNumber)}>
                    <img src="/images/buy/next.png" alt="last" />
                </button>
            </div>
        </>
    );
}

export default ProductList;
