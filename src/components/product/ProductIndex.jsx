import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './Routes/Header';
import ProductContainer from './ProductContainer';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

function ProductIndex() {

	return (
		<div className='ProductIndex'>
			
				{/* <Header /> */}

				<Routes>
					<Route path="/goods/:category" element={<ProductList />}></Route>
					<Route path="/goods/:category/:id" element={<ProductDetails/>} />
					<Route path="/goods" element={<ProductContainer />}></Route>
				</Routes>
			
		</div>
	);
};

export default ProductIndex;