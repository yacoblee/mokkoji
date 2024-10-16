import React, { useState, useEffect } from "react";
import "../../css/administrator/orderManagement.css";
import { Chart, ArcElement, Tooltip, Legend, BarElement } from 'chart.js';
import { registerables, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";

Chart.register(
  ArcElement, Tooltip, Legend, BarElement, 
  ...registerables, 
  CategoryScale, LinearScale
);

const OrderManagement = () => {
  const [monthData, setMonthData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [yearMonthData, setYearMonthData] = useState([]);
  const [isMonthly, setIsMonthly] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear().toString();
    setSelectedYear(currentYear);
  }, []);

  useEffect(() => {
    const uri = API_BASE_URL + "/administrator/orders";
    axios.get(uri)
      .then(response => {
        console.log("API Response:", response.data);

        const { month, year, yearmonth, best } = response.data;

        setMonthData(month);
        setYearData(year);
        setYearMonthData(yearmonth);
        setBestSeller(best);
        console.log('best Data is : ', bestSeller);
        console.log("Year Month Data after setting state:", yearmonth);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const getFilteredMonthData = () => {
    return yearMonthData.filter(item => item.year === selectedYear);
  };

  const chartData = {
    labels: isMonthly 
      ? selectedYear 
        ? getFilteredMonthData().map(item => item.yearmonth) 
        : monthData.map(item => item.yearmonth) 
      : yearData.map(item => item.yearmonth),
    datasets: [
      {
        label: isMonthly ? "월별 누적 판매액" : "연도별 누적 판매액",
        data: isMonthly 
          ? selectedYear 
            ? getFilteredMonthData().map(item => item.totalPrice) 
            : monthData.map(item => item.totalPrice) 
          : yearData.map(item => item.totalPrice),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        barThickness: 40,
      },
    ],
  };

  const chartOptions = {
    responsive: true, 
    maintainAspectRatio: false,  
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="order-management">
      <h2>주문 통계 관리</h2>
      <div className="radio-group">
        <label>
          <input 
            type="radio" 
            value="monthly" 
            checked={isMonthly} 
            onChange={() => {
              setIsMonthly(true);
              setSelectedYear(new Date().getFullYear().toString());
            }} 
          /> 월별
        </label>
        <label>
          <input 
            type="radio" 
            value="yearly" 
            checked={!isMonthly} 
            onChange={() => setIsMonthly(false)} 
          /> 연도별
        </label>
      </div>
      
      {isMonthly && (
        <div className="year-select">
          <label htmlFor="year">Select Year: </label>
          <select 
            id="year" 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {[...new Set(yearMonthData.map(item => item.year))].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      )}

      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <h3 className="best-subTitle">Best Seller Top 5</h3>
      <div className="best-seller-container">
          {bestSeller.map((image, index) => (
            <div key={index} className="product-images">
              <div className="product-rank">
                {index + 1}
              </div>
              <img
                src={image.preview || `${API_BASE_URL}/resources/productImages/${image.mainImageName}`}
                alt={`Main ${index + 1}`}
                className="product-image-item"
              />
              <label className="best-product-detail">
                <p>{image.productName}</p>
                <p>₩ {image.productPrice.toLocaleString()}</p>
                <p>❤️ {image.likeCount} Likes</p>
              </label>
     
            </div>
          ))}

 
        </div>
    </div>
  );
};

export default OrderManagement;
