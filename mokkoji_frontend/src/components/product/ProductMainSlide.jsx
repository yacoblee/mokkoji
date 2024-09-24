import { Link } from 'react-router-dom';




const productSlide = [
    {
        id: 0,
        src: '/images/product/pictureFlower2_6.jpg',
        category: 'C3',
        description: '인테리어 소품', // flower
    },
    {
        id: 1,
        src: '/images/product/characterNote2_4.jpg',
        category: 'C1',
        description: '문구/사무', //note
    },
    {
        id: 2,
        src: '/images/product/sillaKeyring2_1.jpg',
        category: 'C2',
        description: '패션/생활', // key-ring
    },
    {
        id: 3,
        src: '/images/product/seonbiSojuCup2.jpg',
        category: 'C5',
        description: '주방/식기', //soju
    },
    {
        id: 4,
        src: '/images/product/moonJar1.jpg',
        category: 'C4',
        description: '공예품', //bronze
    },
];




function ImgSlideList() {

    return productSlide.map((image) => {
        return (
            <Link to={`/goods/${image.category}`} key={image.id} className="ImgSlideList"
                style={{ background: `url(${image.src}) center /cover `, opacity: '0.6' }}>

                <span style={{ opacity: '1' }}>{image.description}</span>

            </Link>
        );
    });
}

const ProductMainSlide = () => {

    return (
        <div className="ProductMainSlide" >
            <ImgSlideList />

        </div>
    );
};

export default ProductMainSlide;