import React, { useEffect, useState } from 'react';
import { useParams, NavLink , useNavigate,} from 'react-router-dom';
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
    // let selectItem = GoodsItems.filter((items) => items.category === category);

    // 카테고리가 전체상품일때 , 객체 정보 모두를 가져옴.
    // if(category === 'allGoods' ){
    //     selectItem = GoodsItems;
    // }
    const [filterItem , SetFilterItem] = useState({
                                            selectValue : 'allGoods',
                                            inputValue : '',
    }
    )

    const onChangeSelectValue = (e)=>{
        SetFilterItem(it =>({...it, selectValue : e.target.value}));
    }
    const onChangeinputValue = (e)=>{
        SetFilterItem(it =>({...it, inputValue : e.target.value}));
    }
    const [selectItem , setSelectItem] = useState([]);
    useEffect(()=>{
        if (category ==='allGoods'){
            setSelectItem(GoodsItems);
        }else{
            setSelectItem(GoodsItems.filter((items) => items.category === category));
        }
    },[category]);
    const navigate = useNavigate();
    const onclickSearch = ()=>{
        let filterItems = GoodsItems;
        if(filterItem.selectValue !=='allGoods'){
            filterItems = filterItems.filter((items) => items.category === filterItem.selectValue);
            // navigate(`/goods/${filterItem.selectValue}`);
        }
        if(filterItem.inputValue !==''){
            filterItems = filterItems.filter((items) => items.name.includes(filterItem.inputValue));
        }
        setSelectItem(filterItems);
        console.log(filterItems);
    }
    console.log(filterItem.selectValue)


    return (
        <>
            <div className='productMenu' style={{ marginTop: "150px" }}>
                
                
                {productMenu.map((items, i) => (
                    <NavLink to={`/goods/${items.category}`} key={i}>{items.description}</NavLink>
                ))}
            </div>
            <div className='productSearch' style={{ margin: "30px" }} >
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
            </div>
            <ProductListResult selectItem={selectItem} category={category}/>

        </>
    );
}

export default ProductList;
