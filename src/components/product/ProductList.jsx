import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import GoodsItems from './ProductObject';
import ProductListResult from './ProductListResult';

const ProductList = () => {
    const { category } = useParams();

    const [showSearch, setShowSearch] = useState(false);

    const productMenu = [
        { category: 'allGoods', description: '전체상품' },
        { category: 'stationeryGoods', description: '문구/사무' },
        { category: 'fashionGoods', description: '패션/생활' },
        { category: 'interiorGoods', description: '인테리어 소품' },
        { category: 'handicraftGoods', description: '공예품' },
        { category: 'kitchGoods', description: '주방/식기' },
    ];
    
    const sortOptions = [
        { value: 'count', label: '인기순' },
        { value: 'pricehigh', label: '높은가격순' },
        { value: 'pricelower', label: '낮은가격순' },
        { value: 'reviews', label: '리뷰순' }
    ];

    const [filterItem, SetFilterItem] = useState({
        selectValue: 'allGoods',
        sortOption: 'count',
        inputValue: '',
    });

    const [resultCount, setResultCount] = useState(0);

    const onChangeSelectValue = (e) => {
        SetFilterItem(it => ({ ...it, selectValue: e.target.value }));
    };
    const onChangeInputValue = (e) => {
        SetFilterItem(it => ({ ...it, inputValue: e.target.value }));
    };
    const onChangeSortOption = (e) => {
        SetFilterItem(it => ({ ...it, sortOption: e.target.value }));
    };

    const [selectItem, setSelectItem] = useState([]);
    const [displayMessage, setDisplayMessage] = useState('전체 상품');

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

    const updateDisplayMessage = (count) => {
        if (showSearch) {
            const selectedCategory = productMenu.find(menu => menu.category === filterItem.selectValue);
            const selectedSortOption = sortOptions.find(option => option.value === filterItem.sortOption)?.label;
            setDisplayMessage( <>
                <span className='NamedCategory'>카테고리:</span>
                <span className='NamedInfo'> {selectedCategory ? selectedCategory.description : '전체 상품'}</span>
                <br />
                <span className='NamedCategory'>정렬:</span>
                <span className='NamedInfo'> {selectedSortOption}</span>
                {count !== undefined && (
                    <>
                        <br />
                        <p> 검색결과 : {count}개</p>
                    </>
                )}
            </>);
        } else {
            const selectedCategory = productMenu.find(menu => menu.category === category);
            setDisplayMessage(<span className='NamedCategory'> {selectedCategory ? selectedCategory.description : '전체 상품'}</span>);
        }
    };

    useEffect(() => {
        SetFilterItem({
            selectValue: 'allGoods',
            sortOption: 'count',
            inputValue: '',
        });
        const filteredItems = filterItems();
        if (category === 'allGoods') {
            setSelectItem(filteredItems);
        } else {
            const categoryFilteredItems = filteredItems.filter((items) => items.category === category);
            setSelectItem(categoryFilteredItems);
        }
        updateDisplayMessage();
    }, [category , showSearch]);

    const onclickSearch = () => {
        const filteredItems = filterItems();
        setSelectItem(filteredItems);
        setResultCount(filteredItems.length);
        updateDisplayMessage(filteredItems.length);
    };

    const onClickShowSearch = () => {
        setShowSearch(!showSearch);
        updateDisplayMessage();
    };

    return (
        <>
            <div className='SearchBar' style={{ marginTop: "150px" }}>
                <button
                    onClick={onClickShowSearch}
                    disabled={showSearch}>검색하기</button>
                <button
                    onClick={onClickShowSearch}
                    disabled={!showSearch}>카테고리 보기</button>
            </div>

            {!showSearch ?
                <div className='productMenu'>
                    {productMenu.map((items, i) => (
                        <NavLink to={`/goods/${items.category}`} key={i}>{items.description}</NavLink>
                    ))}
                </div>
                :
                <div className='productSearch'>
                    <select name="productSearch" id="productSearch"
                        value={filterItem.selectValue}
                        onChange={onChangeSelectValue}>
                        {productMenu.map((items, i) => <option value={items.category} key={i}>{items.description}</option>)}
                    </select>

                    <select name="productSort" id="productSort"
                        value={filterItem.sortOption}
                        onChange={onChangeSortOption}>
                        {sortOptions.map((items , i)=> <option value={items.value} key={i}>{items.label}</option>)}
                    </select>

                    <input type="text" name="productInput" id="productInput"
                        value={filterItem.inputValue}
                        onChange={onChangeInputValue} />
                    <button
                        onClick={onclickSearch}>검색</button>
                </div>
            }
            <div className="productListInfo" >
                <span>{displayMessage}</span>
            </div>
            {selectItem.length > 0 && <ProductListResult selectItem={selectItem} category={category} />}
        </>
    );
}

export default ProductList;
