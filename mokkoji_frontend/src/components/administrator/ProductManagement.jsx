import React, { useState, useEffect } from "react";
import "../../css/administrator/adminProducts.css";
import { apiCall } from "../../service/apiService";
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";
import RenderPagination from "../product/RenderPagination";
import LoginValidityCheck from './../login/LoginValidityCheck';
import moment from 'moment';

const ProductManagement = () => {
  const [list, setList] = useState([]);
  const [pageMaker, setPageMaker] = useState({});
  const [page, setPage] = useState(1);
  const [code, setCode] = useState([]);
  //관리자 페이지 샘플 - > 샘플샵
  const [pageRequest, setPageRequest] = useState({
    size: 10,
    page: page,
    type: 'allGoods',
    ascending: true,
    ascendingSecond: 'true',
    keyword: '',
    sub_type: 'allGoods',
    startDate: '',
    endDate: '',
  });

  const searchData = async () => {
    let uri = API_BASE_URL + "/administrator/products";
    axios.get(uri, {
      params: {
        page: pageRequest.page,
        size: pageRequest.size,
        type: pageRequest.type,
        ascending: pageRequest.ascending,
        ascendingSecond: pageRequest.ascendingSecond,
        typeSecond: pageRequest.typeSecond,
        keyword: pageRequest.keyword,
        sub_type: pageRequest.sub_type == 'allGoods' ? null : pageRequest.sub_type,
        startDate: pageRequest.startDate,
        endDate: pageRequest.endDate,
      },
    })
      .then(response => {
        const { productList, pageMaker, code } = response.data;
        setList(productList);
        setPageMaker(pageMaker);
        setCode(code);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
        setList([]);
      });
  }
  useEffect(() => {
    // 페이지 변경 시 pageRequest를 업데이트하고 searchData 호출
    setPageRequest(prev => ({ ...prev, page: page }));
  }, [page]);
  // pageRequest가 변경될 때마다 searchData를 호출
  useEffect(() => {
    searchData();
  }, [pageRequest.page]);

  const selectorderBy = [
    {
      name: 'name',
      description: '상품 이름',
    },
    {
      name: 'price',
      description: '상품 가격',
    },
    {
      name: 'likeCount',
      description: '좋아요 갯수',
    },
    {
      name: 'stockCount',
      description: '재고',
    },
    {
      name: 'uploadDate',
      description: '최근 수정 날짜',
    },
  ]
  //string 으로 이루어진 컬럼들 .
  // const selectKeyword = [
  //   {
  //     name: 'name',
  //     description: '상품 이름',
  //   },
  //   {
  //     name: 'sizeInfo',
  //     description: '상품 사이즈 정보',
  //   },
  //   {
  //     name: 'mainDescription',
  //     description: '상품 메인 정보',
  //   },
  //   {
  //     name: 'subDescription',
  //     description: '상품 추가 정보',
  //   },
  // ]
  // 메뉴바의 구성 카테고리별 검색
  const productMenu = [
    { category: 'allGoods', description: '전체상품' },
    { category: 'C1', description: '문구/사무' },
    { category: 'C2', description: '패션/생활' },
    { category: 'C3', description: '인테리어 소품' },
    { category: 'C4', description: '공예품' },
    { category: 'C5', description: '주방/식기' },
  ];

  const onClickDate = (value) => {
    let start, end;
    switch (value) {
      case '오늘':
        start = moment().format('YYYY-MM-DD');
        end = start;
        break;
      case '어제':
        start = moment().subtract(1, 'days').format('YYYY-MM-DD');
        end = start;
        break;
      case '일주일':
        end = moment().format('YYYY-MM-DD');
        start = moment().subtract(7, 'days').format('YYYY-MM-DD');
        break;
      case '한달':
        end = moment().format('YYYY-MM-DD');
        start = moment().subtract(1, 'months').format('YYYY-MM-DD');
        break;
      case '전체':
        start = '';
        end = '';
        break;
      default:
        return;
    }


    setPageRequest((it) => ({
      ...it,
      startDate: start,
      endDate: end
    }))
  }
  const onChaneAsc = (value) => {

    setPageRequest((it) => ({
      ...it, ascendingSecond: value
    }))
  }
  const onchangeRequest = (e) => {
    const { name, value } = e.target;
    setPageRequest((it) => ({
      ...it, [name]: value
    }))
  }

  console.log(pageRequest);
  // const [pageRequest, setPageRequest] = useState({
  //   page: page,
  //   type: '',
  //   typeSecond: '',
  //   ascending: true,
  //   ascendingSecond: 'true',
  //   keyword: '',
  // });

  const searchProductAdmin = () => {
    // 기본 폼 제출 동작 막기
    setPageRequest(prev => ({ ...prev, page: 1 }));
    setPage(1);
    searchData();
  }
  const onEnterSearch = (e) => {
    if (e.key === "Enter") {
      searchProductAdmin();
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 막기
    searchProductAdmin(); // 검색 실행
  };
  return (
    <div className="searchProductAdmin">
      <h1>Product Management</h1>
      <div className="adminProductBox">
        <h3>검색</h3>
        <form className="searchgrid" onSubmit={onSubmitHandler}>
          <table className="searchProductBar">
            <tr>
              <th>검색어</th>
              <td>
                {/* <select name="typeSecond" id="productSearch"
                  value={pageRequest.typeSecond}
                  onChange={(e) => onchangeRequest(e)} >
                  {selectKeyword.map((items, i) => <option value={items.name} key={i}>{items.description}</option>)}
                </select> */}
                <input type="text" name="keyword" id="productInput" className="seachvalue"
                  value={pageRequest.keyword}
                  onChange={(e) => onchangeRequest(e)}
                  onKeyDown={onEnterSearch} />

              </td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>
                <select name="type" id="productSearch"
                  value={pageRequest.type}
                  onChange={(e) => onchangeRequest(e)} >
                  {productMenu.map((items, i) => <option value={items.category} key={i}>{items.description}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <th>정렬</th>
              <td>
                <select name="typeSecond" id="productSearch"
                  value={pageRequest.typeSecond}
                  onChange={(e) => onchangeRequest(e)} >
                  {selectorderBy.map((items, i) => <option value={items.name} key={i}>{items.description}</option>)}
                </select>
                <label htmlFor="ascending">
                  <input type="radio" id="ascending" name="ascending"
                    value="true" onChange={(e) => onChaneAsc(e.target.value)}
                    checked={pageRequest.ascendingSecond == 'true'} />
                  오름 차순</label>
                <label htmlFor="descending">
                  <input type="radio" id="descending" name="ascending" value="false"
                    checked={pageRequest.ascendingSecond == 'false'}
                    onChange={(e) => onChaneAsc(e.target.value)} />
                  내림 차순</label>
              </td>
            </tr>
            <tr>
              <th>기간검색</th>
              <td>
                <input type="date" name="startDate" value={pageRequest.startDate}
                  onChange={(e) => onClickDate(e.target.value)} />
                <input type="date" name="endDate" value={pageRequest.endDate}
                  onChange={(e) => onClickDate(e.target.value)} />
                <input type="button" value="전체"
                  onClick={(e) => onClickDate(e.target.value)} />
                <input type="button" value="오늘"
                  onClick={(e) => onClickDate(e.target.value)} />
                <input type="button" value="어제"
                  onClick={(e) => onClickDate(e.target.value)} />
                <input type="button" value="일주일"
                  onClick={(e) => onClickDate(e.target.value)} />
                <input type="button" value="1개월"
                  onClick={(e) => onClickDate(e.target.value)} />
                <input type="button" value="한달"
                  onClick={(e) => onClickDate(e.target.value)} />
              </td>
            </tr>
            {/* <tr>
              <th>상품 재고</th>
              <td className="seachStockCount">
                <input type="text" /> 개 이상
                <input type="text" /> 개 이하
              </td>
            </tr> */}
            <tr>
              <th>판매 여부</th>
              <td>
                <label htmlFor={`allGoods`}>
                  <input
                    type="radio"
                    name="sub_type"
                    id={`allGoods`}
                    value="allGoods"
                    checked={pageRequest.sub_type == 'allGoods'}
                    onChange={(e) => onchangeRequest(e)}
                  />
                  모든 상품
                </label>
                {code.map((item, index) => (
                  <label key={index} htmlFor={`code_${item.sub_type}`}>
                    <input
                      type="radio"
                      name="sub_type"
                      value={`${item.sub_type}`}
                      id={`code_${item.sub_type}`}
                      checked={pageRequest.sub_type == `${item.sub_type}`}
                      onChange={(e) => onchangeRequest(e)}
                    />
                    {item.sub_type_name}
                  </label>
                ))}
              </td>
            </tr>
          </table>
          <div className="buttonwrapper">
            <button type="button" onClick={searchProductAdmin}>검색</button>
            <button type="button">초기화</button>
          </div>
        </form>
        <h3>리스트</h3>
        <table className="productListUp">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RenderPagination pageMaker={pageMaker} page={page} setPage={setPage} />

    </div>
  );
};

export default ProductManagement;
