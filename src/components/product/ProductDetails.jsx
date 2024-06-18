import React from 'react';

import { useParams } from "react-router-dom";
import GoodsItems from "./ProductObject";


const ProductDetails = ()=>{
    const { category, id } = useParams();
    
    const selectedProduct = GoodsItems.find((item) => item.category === category && item.id === parseInt(id));

    if (!selectedProduct) {
        return <div>Product not found</div>;
    }
    console.log(selectedProduct.name);
    return(
        <>
        <p>
        {selectedProduct.name}
        </p>
        </>
    );
}

export default ProductDetails;