import React from 'react';
import { useParams, NavLink, Link, Route ,Routes} from 'react-router-dom';
import GoodsItems from './ProductObject';
import ProductDetails from './ProductDetails';


// function findItem(){
// }
const ProductList = () => {
    const {category} = useParams();
    
    let selectItem = GoodsItems.filter((items)=>items.category === category);

    // let discription = GoodsItems.map((items)=>{items.description});

    return (
        <>  
            <div className='productMenu'>
            {GoodsItems.map((items, i)=>
                <NavLink to={`/goods/${items.category}`} key={i}>{items.description}</NavLink>
            )}
            </div>
            <div className="productListInfo">
                <span>{selectItem[0]?.description}</span>
            </div>
            <div className="productList">
                {selectItem.map((product, i) => (
                    <div key={i} className="productItem">
                        <NavLink to={`/goods/${product.category}/${product.id}`} key={i} selectItem={selectItem} >
                        <img src={product.slideSrc[0]} alt={product.name} />
                        <p>{product.name}</p>
                        <p>- {product.price}</p>
                        </NavLink>
                    </div>
                ))}

            </div>
                <Routes>
                    <Route path="/goods/:category/:id" element={<ProductDetails />}></Route>
                </Routes>
        </>
    );
}

export default ProductList;