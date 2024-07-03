import { Link } from 'react-router-dom';
import ProductMainSlide from './ProductMainSlide';
import ProductMainList from './ProductMainList';
import '../../css/Product/ProductMain.css';
import TopButton from "../modules/ScrollToTopBtn";



function ProductContainer() {

    return (
        <div className='ProductContainer' style={{ marginTop: "100px" }}>
            <h1 style={{ padding: "4%" }}>
                Choose your GOODS:
            </h1>
            <ProductMainSlide />
            <TopButton/>
            <ProductMainList title='베스트 상품' sort='count' />

            <ProductMainList title='신상품' />
        </div>
    );
};

export default ProductContainer;