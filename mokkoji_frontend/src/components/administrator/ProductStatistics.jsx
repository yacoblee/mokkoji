import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../service/app-config';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { registerables, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

// Chart.js의 ArcElement를 등록
Chart.register(ArcElement, Tooltip, Legend);
Chart.register(...registerables, CategoryScale);
function ProductStatistics({ productId }) {
    const [product, setProduct] = useState({});
    const [genderPurchases, setGenderPurchases] = useState([]);
    const [genderFavorites, setGenderFavorites] = useState([]);
    const [regDatePurchases, setRegDatePurchase] = useState([]);

    useEffect(() => {
        let uri = API_BASE_URL + "/administrator/statistics";
        axios.get(uri, {
            params: {
                id: productId
            },
        })
            .then(response => {
                const { selectProduct, genderPurchase, genderFavorite, regDatePurchase } = response.data;

                // 응답 받은 데이터를 상태로 저장하고 페이지 이동
                setProduct(selectProduct);
                setGenderPurchases(genderPurchase);
                setGenderFavorites(genderFavorite);
                setRegDatePurchase(regDatePurchase);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    console.log(genderFavorites);
    const emptyDataPie = (type) => {
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

    const regDatePurchasesLine = () => {

        // 최소값과 최대값 계산
        const dates = regDatePurchases.map(gp => new Date(gp.regDate));
        // const minDate = new Date(Math.min(...dates)); // 가장 작은 날짜
        // const maxDate = new Date(); // 오늘 날짜로 설정 (혹은 Math.max(...dates)로 특정 최대 날짜 설정 가능)
        const maxPurchaseCount = Math.max(...regDatePurchases.map(gp => gp.purchaseCount));
        const today = new Date(); // 오늘 날짜
        const todayString = today.toISOString().split('T')[0];
        const regDatePurchasesData = [...regDatePurchases];
        if (!regDatePurchases.some(gp => gp.regDate === todayString)) {
            regDatePurchasesData.push({
                regDate: todayString,
                purchaseCount: null, // 판매량 데이터가 없는 경우 null 또는 0을 사용
            });
        }
        const data = {
            labels: regDatePurchases.map(gp => gp.regDate),
            datasets: [
                {
                    label: '판매량',
                    data: regDatePurchasesData.map(gp => gp.purchaseCount),
                    fill: false,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)', // 포인트 색상
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'rgba(75, 192, 192, 0.2)',
                },
            ],
        };
        const options = {
            scales: {
                // x: {
                //     //type: 'time', // x축을 날짜 형식으로 설정
                //     time: {
                //         unit: 'day', // 하루 단위로 설정
                //     },
                //     min: minDate, // 시작 날짜를 원하는 날짜로 설정
                //     max: maxDate, // 오늘 날짜로 설정
                // },
                x: {
                    type: 'category', // x축을 category로 설정
                },
                y: {
                    beginAtZero: true, // y축이 0부터 시작하도록 설정
                    min: 0, // y축 최소값
                    max: maxPurchaseCount + 1, // y축 최대값(예: 판매량이 최대 100이라 가정)
                    ticks: {
                        stepSize: 10, // y축 간격을 고정
                    },
                },
            },
        };
        return <Line data={data} options={options} />;
    };
    const emptyDataLine = (type) => {
        const today = new Date(); // 오늘 날짜
        const todayString = today.toISOString().split('T')[0];
        const data = {
            labels: [todayString], // 날짜 레이블
            datasets: [
                {
                    label: '판매량',
                    data: [null], // 판매량 데이터가 없는 곳에 null 값
                    fill: false,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'rgba(75, 192, 192, 0.2)',
                    spanGaps: true, // null 데이터가 있어도 선이 이어지도록 설정
                },
            ],
        };

        const options = {
            scales: {
                x: {
                    type: 'category',
                },
                y: {
                    beginAtZero: true,
                },
            },
        };
        return (
            <>
                <Line data={data} options={options} />
                <span>해당 {type} 상태가 존재하지 않습니다.</span>
            </>
        )
    }

    return (
        <div className='ProductStatistics'>
            <h1 className="productMainTitle">상품 정보</h1>
            <h3 className="productTitle">상품 내용</h3>
            <ul className="productDescription">
                <li>상품 이름 </li>
                <li>{product.name}</li>
                <li>상품 가격 </li>
                <li>{product.price}</li>
                <li>상품 이미지</li>
                <li><img src={`${API_BASE_URL}/resources/productImages/${product.mainImageName}`} alt={product.name ? product.name : ''} /></li>
            </ul>
            <div className='piegender'>
                <div>
                    <h3 className="productTitle">구매 성비</h3>
                    <div className='genderPurchases' >
                        {genderPurchases.every(it => it.purchaseCount === 0) ?
                            emptyDataPie('구매') : genderPurchasesPie()}
                        {/* {genderPurchases.some(it => it.purchaseCount !== 0) &&
                    <div> 구매 이력 있음</div>} */}
                    </div>
                </div>
                <div>
                    <h3 className="productTitle">좋아요 성비</h3>
                    <div className='genderPurchases' >
                        {genderFavorites.every(it => it.favoriteCount === 0) ?
                            emptyDataPie('좋아요') : genderFavoritePie()}
                        {/* {genderPurchases.some(it => it.purchaseCount !== 0) &&
                    <div> 구매 이력 있음</div>} */}
                    </div>
                </div>
            </div>
            <div className='linePurchases'>
                <div>
                    <h3 className="productTitle">구매 그래프 </h3>
                    <div>
                        {
                            regDatePurchases.every(it => it.purchaseCount === 0) ?
                                emptyDataLine('판매량') :
                                regDatePurchasesLine()
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductStatistics;