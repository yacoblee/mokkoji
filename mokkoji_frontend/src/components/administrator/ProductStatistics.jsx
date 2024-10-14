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
    useEffect(() => {
        let uri = API_BASE_URL + "/administrator/statistics";
        axios.get(uri, {
            params: {
                id: productId
            },
        })
            .then(response => {
                const { selectProduct, genderPurchase, image } = response.data;

                // 응답 받은 데이터를 상태로 저장하고 페이지 이동
                setProduct(selectProduct);
                setGenderPurchases(genderPurchase);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    //console.log(genderPurchases);
    const PieChartExample = () => {
        // genderPurchases가 빈 배열일 때는 렌더링하지 않도록 조건부 렌더링
        if (!genderPurchases || genderPurchases.length === 0) {
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
                            <span>{(it.purchaseCount / totalCount * 100) + '%'} </span>

                        </div>
                    )
                })
            }
        </>;
    };

    console.log("**************")
    console.log(genderPurchases);


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
                    <span> 구매 이력이 없는 상품 입니다.</span> : PieChartExample()}
                {/* {genderPurchases.some(it => it.purchaseCount !== 0) &&
                    <div> 구매 이력 있음</div>} */}
            </div>
            </div>
        </div>
    )
}

export default ProductStatistics;