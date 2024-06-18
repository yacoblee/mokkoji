import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './Routes/Header';
import ProductContainer from './ProductContainer';
import ProductList from './ProductList';

function ProductIndex() {

	return (
		<div className='App'>
			<BrowserRouter>
				{/* <Header /> */}
				<Routes>
					<Route path="/:category" element={<ProductList />}></Route>
					<Route path="/*" element={<ProductContainer />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default ProductIndex;