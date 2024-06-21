import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import GoodsItems from './ProductObject';
import ProductListResult from './ProductListResult';

const ProductList = () => {
    const { category } = useParams(); // useParams()를 통해 category 파라미터 가져오기
    // 선택된 카테고리의 상품들만 필터링
    const productMenu = [
        {category: 'allGoods',description: '전체상품',},
        {category: 'stationeryGoods',description: '문구/사무',},
        {category: 'fashionGoods',description: '패션/생활',},
        {category: 'interiorGoods',description: '인테리어 소품',},
        {category: 'handicraftGoods',description: '공예품',},
        {category: 'kitchGoods',description: '주방/식기',},
    ];
    // search 창의 값 관리의 state
    const [filterItem , SetFilterItem] = useState({
                                            selectValue : 'allGoods',
                                            inputValue : '',
    }
    )
    // state 변경 함수
    const onChangeSelectValue = (e)=>{
        SetFilterItem(it =>({...it, selectValue : e.target.value}));
    }
    const onChangeinputValue = (e)=>{
        SetFilterItem(it =>({...it, inputValue : e.target.value}));
    }

    // 선택상품 에 대한 관리
    const [selectItem , setSelectItem] = useState([]);
    useEffect(()=>{

        //allGoods면 전체 선택상품
        if (category ==='allGoods'){
            setSelectItem(GoodsItems);
        }else{
            //아니면 각자의 카테고리 분류에 따른 선택상품
            setSelectItem(GoodsItems.filter((items) => items.category === category));
        }
    },[category]);//카테고리가 바뀔때 마다 실행



    const filterItems = () => {
        //필터링을 위한 새로운 GoodsItems 의 복사본
        let filteredItems = GoodsItems;

        //전체선택을 하지 않았을때 첫 필터링 진행
        if (filterItem.selectValue !== 'allGoods') {
            filteredItems = filteredItems.filter((items) => items.category === filterItem.selectValue);
        }
        // input 상자가 채워졌을때 두번째 필터링 진행
        if (filterItem.inputValue !== '') {
            filteredItems = filteredItems.filter((items) => items.name.includes(filterItem.inputValue));
        }

        //필터링을 마친 배열 반환
        return filteredItems;
    };

    //검색 버튼을 누르면 state 변경을 통해 필터링
    const onclickSearch = () => {
        setSelectItem(filterItems());
    };

    //검색바와 메뉴바 중 보여줄 부분에 대한 state
    const [showSearch , setShowSearch] = useState(false);
    
    //클릭하면 state 값 변경
    const onClickShowSearch = ()=>{
        setShowSearch(!showSearch);
    }
    
    return (
        <>  
            <div className="productListInfo" style={{ marginTop: "100px" }}>
                <span>
                {category === 'allGoods' ? '전체 상품' : (selectItem[0]?.description || '검색 결과가 없습니다.')}
                </span>
            </div>
            <div  className='SearchBar'  >
                <button
                onClick={onClickShowSearch}
                disabled={showSearch}>검색하기</button>
                <button
                onClick={onClickShowSearch}
                disabled={!showSearch}> 카테고리 보기</button>

            </div>
            
            {!showSearch ? 
            <div className='productMenu'>
                
                
                {productMenu.map((items, i) => (
                    <NavLink to={`/goods/${items.category}`} key={i}>{items.description}</NavLink>
                ))}
                {/* <button
                onClick={onClickShowSearch}>검색하기</button> */}
            </div>
            :
            <div className='productSearch' >
                <select name="productSearch" id="productSearch" 
                value={filterItem.selectValue}
                onChange={onChangeSelectValue}>

                    {productMenu.map((items, i)=><option value={items.category} key={i}>{items.description}</option>)}
                </select>

                <input type="text" name="productInput" id="productInput" 
                value={filterItem.inputValue}
                onChange={onChangeinputValue}/>
                <button
                onClick={onclickSearch}>검색</button>
            </div>  }
            <ProductListResult selectItem={selectItem} category={category}/>

        </>
    );
}

export default ProductList;
