// import { Routes } from "react-router-dom";
import { Routes, Route ,Link, useParams} from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import GoodsItems from "./ProductObject";







function ImgSlideList() {

    return productSlide.map((image) => {               
        return (
            <Link to={`/goods/${image.category}`}  key={image.id} className="ImgSlideList"
            style={{ background: `url(${image.src}) center /cover `, opacity:'0.6'}}>

                <span style={{opacity:'1'}}>{image.description}</span>

            </Link>
        );
    });
}

const productSlide = [
    {
        id: 0,
        src: './images/product/pictureFlower2_6.jpg',
        category : 'stationeryGoods',
        description: '인테리어 소품', // flower
    },
    {
        id: 1,
        src: './images/product/characterNote2_4.jpg',
        category : 'stationeryGoods',
        description: '문구/사무', //note
    },
    {
        id: 2,
        src: './images/product/sillaKeyring2_1.jpg',
        category : 'fashionGoods',
        description: '패션/생활', // key-ring
    },
    {
        id: 3,
        src: './images/product/seonbiSojuCup2.jpg',
        category : 'kitchGoods',
        description: '주방/식기', //soju
    },
    {
        id: 4,
        src: './images/product/moonJar1.jpg',
        category : 'handicraftGoods',
        description: '공예품', //bronze
    },
];

const ProductMainSlide = () => {
    return (
        <div className="ProductMainSlide">
            <ImgSlideList />
            <Routes>
                <Route path="/goods/:category" element={<ProductList />} />
            </Routes>
        </div>
    );
};

export default ProductMainSlide ;