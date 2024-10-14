import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../service/app-config';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Chart.js의 ArcElement를 등록
Chart.register(ArcElement, Tooltip, Legend);

function ProductStatistics({ productId }) {
    const [product, setProduct] = useState({});
    const [genderPurchases, setGenderPurchases] = useState([]);
    const [genderFavorites, setGgenderFavorites] = useState([]);
    useEffect(() => {
        let uri = API_BASE_URL + "/administrator/statistics";
        axios.get(uri, {
            params: {
                id: productId
            },
        })
            .then(response => {
                const { selectProduct, genderPurchase, genderFavorite } = response.data;

                // 응답 받은 데이터를 상태로 저장하고 페이지 이동
                setProduct(selectProduct);
                setGenderPurchases(genderPurchase);
                setGgenderFavorites(genderFavorite);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    console.log(genderFavorites);
    const emptyData = (type) => {
        const data = {
            labels: ['M', 'F'],
            datasets: [
                {
                    data: [1, 1], // 비어있는 차트를 표시하기 위해 1:1 비율로 설정
                    backgroundColor: ['#E0E0E0', '#E0E0E0'], // 회색으로 비어있음을 시각적으로 표현
                },
            ],
        };
        return (
            <>
                <Pie data={data} />
                <span>해당 {type} 상태가 존재하지 않습니다.</span>
            </>
        );
    };
    const genderPurchasesPie = () => {
        // genderPurchases가 빈 배열일 때는 렌더링하지 않도록 조건부 렌더링
        if (!genderPurchases || genderPurchases.length === 0 || genderPurchases.every(gp => gp.purchaseCount === 0)) {
            return <p>Loading...</p>;
        }
        const data = {
            labels: ['M', 'F'],
            datasets: [
                {
                    data: genderPurchases.map(gp => gp.purchaseCount),
                    backgroundColor: ['#36A2EB', '#FF6384'],
                },
            ],
        };
        const totalCount = genderPurchases.reduce((acc, it) => acc + it.purchaseCount, 0);

        return <>
            <Pie data={data} />
            {
                genderPurchases.map((it) => {
                    return (
                        <div className='genderPurchasesresult'>
                            {it.gender === 'M' ? <span>남자</span> : <span>여자</span>} :
                            <span>{it.purchaseCount + '회'}</span>
                            <span>{(it.purchaseCount / totalCount * 100).toFixed(2) + '%'} </span>

                        </div>
                    )
                })
            }
        </>;
    };

    console.log("**************")
    console.log(genderPurchases);
    const genderFavoritePie = () => {
        // genderPurchases가 빈 배열일 때는 렌더링하지 않도록 조건부 렌더링
        if (!genderFavorites || genderFavorites.length === 0) {
            return <p>Loading...</p>;
        }
        const data = {
            labels: ['M', 'F'],
            datasets: [
                {
                    data: genderFavorites.map(gp => gp.favoriteCount),
                    backgroundColor: ['#36A2EB', '#FF6384'],
                },
            ],
        };
        const totalCount = genderFavorites.reduce((acc, it) => acc + it.favoriteCount, 0);

        return <>
            <Pie data={data} />
            {
                genderFavorites.map((it) => {
                    return (
                        <div className='genderPurchasesresult'>
                            {it.gender === 'M' ? <span>남자</span> : <span>여자</span>} :
                            <span>{it.favoriteCount + '회'}</span>
                            <span>{(it.favoriteCount / totalCount * 100).toFixed(2) + '%'} </span>

                        </div>
                    )
                })
            }
        </>;
    };

    return (
        <div className='ProductStatistics'>
            <h1 className="productMainTitle">상품 정보</h1>
            <h3 className="productTitle">상품 내용</h3>
            <ul className="productDescription">
                <li>상품 이름 </li>
                <li>{product.name}</li>
                <li>상품 가격 </li>
                <li>{product.price}</li>
            </ul>
            <div>
                <h3 className="productTitle">구매 성비</h3>
                <div className='genderPurchases' >
                    {genderPurchases.every(it => it.purchaseCount === 0) ?
                        emptyData('구매') : genderPurchasesPie()}
                    {/* {genderPurchases.some(it => it.purchaseCount !== 0) &&
                    <div> 구매 이력 있음</div>} */}
                </div>
                <h3 className="productTitle">좋아요 성비</h3>
                <div className='genderPurchases' >
                    {genderFavorites.every(it => it.favoriteCount === 0) ?
                        emptyData('좋아요') : genderFavoritePie()}
                    {/* {genderPurchases.some(it => it.purchaseCount !== 0) &&
                    <div> 구매 이력 있음</div>} */}
                </div>
            </div>
        </div>
    )
}

export default ProductStatistics;