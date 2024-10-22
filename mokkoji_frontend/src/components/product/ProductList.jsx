import React, { useEffect, useState, useRef } from 'react';
import { useParams, NavLink, Link, useNavigate } from 'react-router-dom';
import '../../css/Product/ProductCategory.css';
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";
import RenderPagination from "./RenderPagination";

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
    const [page, setPage] = useState(1); // 페이지 상태를 독립적으로 관리
    const [filterItem, setFilterItem] = useState({
        size: 4,
        categoryId: category,
        keyword: '',
    });
    const [resultCount, setResultCount] = useState(0);
    const [pageMaker, setPageMaker] = useState({});

    // API 호출 함수
    const axiosCall = () => {
        //console.log("axiosCall_ProductList.jsx _ keyword : " + filterItem.keyword.trim());

        let uri;
        if (filterItem.keyword.trim() === '') {
            // 카테고리 전체를 가져오기 위한 URI
            //uri = `${API_BASE_URL}/goods/${filterItem.categoryId}`;
            uri = `${API_BASE_URL}/goods/${category}`;
        } else {
            // 검색 API 호출
            uri = `${API_BASE_URL}/goods/search`;
        }

        axios.get(uri, {
            params: {
                size: filterItem.size,
                page: page, // 페이지 값은 별도 관리
                categoryId: filterItem.categoryId,
                keyword: filterItem.keyword.trim(),
            },
        })
            .then(response => {
                const { productList, pageMaker } = response.data;
                setList(productList);
                setResultCount(productList.length);
                setPageMaker(pageMaker);
            })
            .catch(err => {
                console.log(err);
                setList([]);
            });
    };
    const [currentCategory, setCurrentCategory] = useState(category);
    // NavLink 클릭 핸들러
    const navClick = (newCategory) => {
        //console.log('currentCategory', currentCategory)
        //console.log('newCategory', newCategory)
        //console.log('filterItem', filterItem)
        if (newCategory === currentCategory) {
            // 같은 카테고리를 두 번 클릭한 경우, 검색어 초기화 및 요청
            // if(filterItem.keyword){
            //     window.location.reload(); // 현재 페이지를 강제 새로고침
            // }else{
            //     setFilterItem({ ...filterItem, keyword: '' });
            //     navigate(`/goods/${newCategory}`);
            // }
            setFilterItem({ ...filterItem, keyword: '' })
            if(filterItem.keyword){
                window.location.reload();
            }else{
                navigate(`/goods/${newCategory}`);
            }
            //navigate(`/goods/${newCategory}`, { replace: true });
            // 상태 초기화 후 navigate로 다시 이동
            // setFilterItem({ ...filterItem, keyword: '' });
            // setPage(1);
            // setTimeout(() => {
            //     navigate(`/goods/${newCategory}`, { replace: true });
            // }, 100); // 딜레이를 줘서 부드럽게 리다이렉트
        } else {
            // 다른 카테고리를 클릭한 경우
            setFilterItem({ ...filterItem, keyword: '' })
            setCurrentCategory(newCategory);
            navigate(`/goods/${newCategory}`);
            //window.location.href = `/goods/${newCategory}`;
        }
    };
    // useEffect(() => {
    //     if (filterItem.keyword === '' || category !== currentCategory) {
    //         axiosCall(); // 검색어가 비었거나 카테고리가 변경된 경우에만 API 요청
    //     }
    // }, [filterItem.keyword]);
    // 카테고리 변경 시 필터와 페이지 초기화 및 API 호출
    useEffect(() => {
        setFilterItem(it => ({
            ...it,
            categoryId: 'allGoods', // URL에서 변경된 카테고리를 반영
            keyword: '', // 카테고리가 변경될 때 검색어를 초기화
        }));
        if (page == 1) {
            axiosCall();
        } else {
            setPage(1); // 카테고리가 변경될 때 페이지를 1로 초기화
        }

    }, [category]);

    // 페이지 또는 카테고리가 변경될 때 API 호출
    useEffect(() => {

        axiosCall();
    }, [page]); // 페이지와 카테고리 변경 시 호출

    // 카테고리 선택 변경 처리
    const onChangeCategoryId = (e) => {
        setFilterItem(it => ({
            ...it,
            categoryId: e.target.value,
        }));
        setPage(1); // 카테고리 변경 시 페이지를 1로 초기화
    };

    // 키워드 변경 처리
    const onChangeKeyword = (e) => {
        setFilterItem(it => ({
            ...it,
            keyword: e.target.value,
        }));
    };
    const navigate = useNavigate();
    // 검색 버튼 클릭 시 API 호출
    const onClickSearch = () => {
        if (filterItem.keyword.trim() === '') {
            navigate(`/goods/${filterItem.categoryId}`);
        } else {
            setPage(1); // 검색 시 첫 페이지로 초기화
            axiosCall();
        }
    };

    const onEnterSearch = (e) => {
        if (e.key === "Enter") {
            onClickSearch();
        }
    };

    // 메뉴바의 구성 카테고리별 검색
    const productMenu = [
        { category: 'allGoods', description: '전체상품' },
        { category: 'C1', description: '문구/사무' },
        { category: 'C2', description: '패션/생활' },
        { category: 'C3', description: '인테리어 소품' },
        { category: 'C4', description: '공예품' },
        { category: 'C5', description: '주방/식기' },
    ];

    // 숫자를 금액으로 포맷팅하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };
    return (
        <>
            <div className='MenuNsearch' style={{ marginTop: "150px" }}>
                <div className='productMenu'>
                    {productMenu.map((items, i) => (
                        <NavLink to={`/goods/${items.category}`}
                            onClick={() => {
                                // if (filterItem.keyword) {
                                //     // setFilterItem((it) => ({
                                //     //     ...it, keyword: '', categoryId: items.category
                                //     // }));
                                //     setFilterItem((it) => ({
                                //         ...it, keyword: '', categoryId: 'allGoods'
                                //     }));
                                //     // 카테고리 변경 시 필터의 categoryId 업데이트 및 페이지 초기화
                                //     // setFilterItem((it) => ({
                                //     //     ...it,
                                //     //     categoryId: items.category // 카테고리 업데이트
                                //     // }));
                                //     onClickSearch()
                                // }
                                navClick(items.category);
                            }}
                            key={i}>{items.description}</NavLink>
                    ))}
                </div>
                <div className='productSearch'>
                    <select name="productSearch" id="productSearch" value={filterItem.categoryId} onChange={onChangeCategoryId}>
                        {productMenu.map((items, i) => <option value={items.category} key={i}>{items.description}</option>)}
                    </select>

                    <input type="text" name="productInput" id="productInput" value={filterItem.keyword} onChange={onChangeKeyword} onKeyDown={onEnterSearch} />
                    <button onClick={onClickSearch}>검색</button>
                </div>
            </div>

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

            <RenderPagination pageMaker={pageMaker} page={page} setPage={setPage} />
        </>
    );
};

export default ProductList;
