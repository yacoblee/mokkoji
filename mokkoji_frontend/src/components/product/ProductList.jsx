import React, { useCallback, useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import GoodsItems from './ProductObject';
import ProductListResult from './ProductListResult';
import '../../css/Product/ProductCategory.css'
// import Modal from 'react-modal';

const ProductList = () => {

    const { category } = useParams();

    //보여주는부분이 Menu 냐 , Search냐
    // const [showSearch, setShowSearch] = useState(false);

    //메뉴바의 구성
    const productMenu = [
        { category: 'allGoods', description: '전체상품' },
        { category: 'stationeryGoods', description: '문구/사무' },
        { category: 'fashionGoods', description: '패션/생활' },
        { category: 'interiorGoods', description: '인테리어 소품' },
        { category: 'handicraftGoods', description: '공예품' },
        { category: 'kitchGoods', description: '주방/식기' },
    ];
    //검색 조건에 대한 옵션
    const sortOptions = [
        { value: 'count', label: '인기순' },
        { value: 'pricehigh', label: '높은가격순' },
        { value: 'pricelower', label: '낮은가격순' },
        { value: 'reviews', label: '리뷰순' }
    ];
    //아이템을 필터할 state (옵션 선택1 , 옵션선택 2 , input 값)
    const [filterItem, SetFilterItem] = useState({
        selectValue: 'allGoods',
        sortOption: 'count',
        inputValue: '',
    });

    //아이템을 필터할 속성 변화.
    const onChangeSelectValue = (e) => {
        SetFilterItem(it => ({ ...it, selectValue: e.target.value }));
    };
    const onChangeSortOption = (e) => {
        SetFilterItem(it => ({ ...it, sortOption: e.target.value }));
    };
    const onChangeInputValue = (e) => {
        SetFilterItem(it => ({ ...it, inputValue: e.target.value }));
    };

    //타이틀에 대한 state
    const [displayMessage, setDisplayMessage] = useState('');

    //filterItems 함수. -> fileredItems 를 반환
    const filterItems = () => {
        let filteredItems = GoodsItems.slice();

        if (filterItem.selectValue !== 'allGoods') {
            filteredItems = filteredItems.filter((items) => items.category === filterItem.selectValue);
        }
        if (filterItem.inputValue !== '') {
            filteredItems = filteredItems.filter((items) => items.name.includes(filterItem.inputValue));
        }

        switch (filterItem.sortOption) {
            case 'pricehigh':
                filteredItems.sort((a, b) => b.price - a.price);
                break;
            case 'pricelower':
                filteredItems.sort((a, b) => a.price - b.price);
                break;
            case 'reviews':
                filteredItems.sort((a, b) => b.reviews - a.reviews);
                break;
            case 'count':
            default:
                filteredItems.sort((a, b) => b.count - a.count);
                break;
        }
        return filteredItems;
    };
    //타이틀을 바꾸는 state 함수, Search 가 보일 때 와 Menu가 보일 때
    //필터하고 난 아이템의 결과 배열.
    const [selectItem, setSelectItem] = useState([]);
    // console.log(selectItem.length);
    //필터하고난 filterItem의 길이
    const [resultCount, setResultCount] = useState(selectItem.length);
    const updateDisplayMessage = (count) => {
        // if (showSearch) {
        const selectedCategory = productMenu.find(menu => menu.category === filterItem.selectValue);
        const selectedSortOption = sortOptions.find(option => option.value === filterItem.sortOption)?.label;
        setDisplayMessage(<>
            <span className='NamedCategory'>카테고리:</span>
            <span className='NamedInfo'> {selectedCategory.description}</span>

            <span className='NamedCategory'>정렬:</span>
            <span className='NamedInfo'> {selectedSortOption}</span>
            {count !== undefined && (
                <>

                    {count > 0 ? (
                        <span className='searchResult'>: 검색결과: {count}개</span>
                    ) : (
                        <p>검색결과가 없습니다. 추천상품을 안내해드리겠습니다.</p>
                    )}
                </>
            )}
        </>);
        // }
        //  else {
        //     const selectedCategory = productMenu.find(menu => menu.category === category);
        //     setDisplayMessage(<span className='NamedCategory'> {selectedCategory ? selectedCategory.description : '전체 상품'}</span>);
        // }
    };

    //하위 페이지와 연동되어 페이지를 리셋시킬 state
    const [page, setPage] = useState(1);

    //카테고리가 변할때 필터 
    useEffect(() => {
        setPage(1);
        SetFilterItem({
            selectValue: 'allGoods',
            sortOption: 'count',
            inputValue: '',
        });

        setSelectItem(filterItems().filter((items) => items.category === category));
        // setSelectItem(GoodsItems.filter((items) => items.category === category));
        
        setDisplayMessage('');

    }, [category]);


    //클릭했을때의 함수 실행값을 넣어줌.
    const onclickSearch = () => {
        const filteredItems = filterItems();
        setSelectItem(filteredItems);
        setResultCount(filteredItems.length);
        updateDisplayMessage(filteredItems.length);
    };
    const onEnterSearch = (e)=>{
        if(e.key === "Enter") {
            onclickSearch();
        }
    }
    //서치바나 메뉴바를 클릭했을때 실행할 함수.
    // const onClickShowSearch = () => {
    //     setShowSearch(!showSearch);
    //     updateDisplayMessage();
    // };


    return (
        <>
            <div className='MenuNsearch' style={{ marginTop: "150px" }}>
                <div className='productMenu' >

                    {productMenu.map((items, i) => (
                        <NavLink to={`/goods/${items.category}`} key={i}  >{items.description}</NavLink>
                    ))}
                </div>
                <div className='productSearch'>
                    <select name="productSearch" id="productSearch"
                        value={filterItem.selectValue}
                        onChange={onChangeSelectValue}>
                        {productMenu.map((items, i) => <option value={items.category} key={i}>{items.description}</option>)}
                    </select>

                    <select name="productSort" id="productSort"
                        value={filterItem.sortOption}
                        onChange={onChangeSortOption}>
                        {sortOptions.map((items, i) => <option value={items.value} key={i}>{items.label}</option>)}
                    </select>

                    <input type="text" name="productInput" id="productInput"
                        value={filterItem.inputValue}
                        onChange={onChangeInputValue} 
                        onKeyDown={(e)=>onEnterSearch(e)}/>
                    <button
                        onClick={onclickSearch}>검색</button>
                    <span className='displayMessage'>{displayMessage}</span>
                </div>
            </div>
            <div className='displayMessage2'>{displayMessage}</div>
            {selectItem.length > 0 ?
                <ProductListResult selectItem={selectItem} category={category} page={page} setPage={setPage} />
                : <ProductListResult selectItem={GoodsItems.sort((a, b) => b.count - a.count)} page={page} setPage={setPage} />}
        </>
    );
}

export default ProductList;
