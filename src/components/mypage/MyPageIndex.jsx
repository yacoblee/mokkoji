import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from '../modules/Header';

function MyPageIndex() {

    return (
        <div className='App'>
            <BrowserRouter>
                {/* <Header /> */}
                <Routes>
                    <Route ></Route>
                    <Route ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default MyPageIndex;
