import { Link } from 'react-router-dom';
import ProductMainSlide from '../ProductComponent/ProductMainSlide';
import ProductMain from '../ProductComponent/ProductMain';
import '../ProductCSS/ProductMain.css';


function ProductContainer() {
    return (
        <div className='ProductContainer'>
            <h1 style={{padding:"2% 0"}}>
            Choose your GOODS:
            </h1>
            <ProductMainSlide />
            
            <ProductMain title='베스트 상품' sort='count'/>
            
            <ProductMain title='신상품' />
            

        </div>
    );
};

export default ProductContainer;