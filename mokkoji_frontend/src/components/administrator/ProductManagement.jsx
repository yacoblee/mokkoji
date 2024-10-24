import React, { useState, useEffect } from "react";
import "../../css/administrator/adminProducts.css";
import { apiCall } from "../../service/apiService";
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";
import RenderPagination from "../product/RenderPagination";
import LoginValidityCheck from './../login/LoginValidityCheck';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import TopButton from './../modules/ScrollToTopBtn';
import Modal from 'react-modal';
import ProductRelatedStorage from "./ProductRelatedStorage";
import ProductStatistics from "./ProductStatistics";


const ProductManagement = () => {

  const [list, setList] = useState([]);
  const [pageMaker, setPageMaker] = useState({});
  const [page, setPage] = useState(1);
  const [code, setCode] = useState([]);
  //Modal.setAppElement('#root');
  //관리자 페이지 샘플 - > 샘플샵

  //시간날짜 포멧
  const formatToKoreanTime = (dateString) => {
    // dateString을 Date 객체로 변환
    const date = new Date(dateString);

    // 한국 시간(UTC+9)으로 변환한 후 포맷팅
    return date.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  //초기 객체 상태
  const fistPageRequest = {
    size: 10,
    page: 1,
    categoryId: 'allGoods',
    ascendingFirst: false,
    sortingFirstColumn: 'id',
    keyword: '',
    state: 'allGoods',
    startDate: '',
    endDate: '',
  };
  const [pageRequest, setPageRequest] = useState(fistPageRequest);

  const searchData = async () => {
    let uri = API_BASE_URL + "/administrator/products";
    axios.get(uri, {
      params: {
        page: pageRequest.page,
        size: pageRequest.size,
        categoryId: pageRequest.categoryId == 'allGoods' ? null : pageRequest.categoryId,
        ascendingFirst: pageRequest.ascendingFirst,
        sortingFirstColumn: pageRequest.sortingFirstColumn == '' ? null : pageRequest.sortingFirstColumn,
        keyword: pageRequest.keyword.trim() == '' ? null : pageRequest.keyword.trim(),
        state: pageRequest.state == 'allGoods' ? null : pageRequest.state,
        startDate: pageRequest.startDate,
        endDate: pageRequest.endDate,
      },
    })
      .then(response => {
        const { productList, pageMaker, code } = response.data;
        setList(productList);
        setPageMaker(pageMaker);
        setCode(code);
        //console.log(response.data);
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
  const [searchRequest, setSearchRequest] = useState(false); // 검색 요청 여부를 추적
  const selectorderBy = [
    {
      order: 'name',
      description: '상품 이름',
    },
    {
      order: 'price',
      description: '상품 가격',
    },
    {
      order: 'likeCount',
      description: '좋아요 갯수',
    },
    {
      order: 'stockCount',
      description: '재고',
    },
    {
      order: 'uploadDate',
      description: '최근 수정 날짜',
    },
  ]
  //string 으로 이루어진 컬럼들 .
  const sizeArr = [
    {
      name: '5',
      description: '5개씩 보기',
    },
    {
      name: '10',
      description: '10개씩 보기',
    },
    {
      name: '15',
      description: '15개씩 보기',
    },
    {
      name: '20',
      description: '20개씩 보기',
    },
  ]
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
  const onChangeDateInput = (e) => {
    const { name, value } = e.target;
    setPageRequest((it) => ({
      ...it,
      [name]: value
    }));
  };
  const onChaneAsc = (value) => {

    setPageRequest((it) => ({
      ...it, ascendingFirst: value
    }))
  }
  const onchangeRequest = (e) => {
    const { name, value } = e.target;
    setPageRequest((it) => ({
      ...it, [name]: value
    }))
  }

  //console.log(pageRequest);

  const searchProductAdmin = () => {
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

  const resetPageRequest = () => {
    setPageRequest(fistPageRequest); // 초기 상태로 리셋
    setPage(1);  // 페이지도 초기화
    setSearchRequest(true);
  };
  //console.log(searchRequest);
  useEffect(() => {
    if (searchRequest) {
      searchData();
      setSearchRequest(false); // 플래그를 다시 false로 설정하여 다음 요청을 방지
    }
  }, [searchRequest])
  const navigate = useNavigate();

  // const [selectProduct, setSelectProduct] = useState({});
  // const [option, setOption] = useState([]);
  // const [image, setImage] = useState([]);
  function onClickInset(product) {
    let uri = API_BASE_URL + "/administrator/psave";

    // axios.get 요청 후 데이터를 받아온 후 navigate 호출
    axios.get(uri, {
      params: {
        id: product.id
      },
    })
      .then(response => {
        const { selectProduct, option, image } = response.data;

        // 응답 받은 데이터를 상태로 저장하고 페이지 이동
        navigate(`/administrator/products/insert`, {
          state: {
            selectproduct: selectProduct,
            option: option,
            //image: image,
            sendcode: code
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  //onClickImage(product) 
  function onClickImage(product) {
    let uri = API_BASE_URL + "/administrator/pimage";

    // axios.get 요청 후 데이터를 받아온 후 navigate 호출
    axios.get(uri, {
      params: {
        id: product.id
      },
    })
      .then(response => {
        const { selectProduct, mainImages, slideImages, code } = response.data;

        // 응답 받은 데이터를 상태로 저장하고 페이지 이동
        navigate(`/administrator/products/image`, {
          state: {
            selectproduct: selectProduct,
            mainImages: mainImages,
            slideImages: slideImages,
            sendcode: code
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  function onClickDelete(productId) {
    const uri = API_BASE_URL + "/administrator/deleteproduct?productId=" + productId;
    const con = confirm("정말 삭제 하시겠습니까 ?");

    if (con) {
      axios.delete(uri)
        .then(response => {
          // handle success
          //console.log(response);
          //window.location.reload(true);
          window.location.href = '/administrator/products';
          //navigate('/administrator/products');
          //window.location.reload(true);
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
    }

  }


  //모달창을 관리할 state
  //상품 등록.
  const [isModalProductALLOpen, setIsModalProductALLOpen] = useState(false);
  //상품 정보보기.
  const [isModalProductDetails, setIsModalProductDetails] = useState(false);
  //선택된 상품 아이디를 전송할 state
  const [selectedProductId, setSelectedProductId] = useState(null);


  const onClickProductDetail = (id) => {
    setSelectedProductId(id);
    setIsModalProductDetails(true);
  }
  return (
    <div className="searchProductAdmin">
      <h1 className="productMainTitle">Product Management</h1>
      <div className="adminProductBox">
        <h3 className="productTitle">검색</h3>
        <form className="searchgrid" onSubmit={onSubmitHandler}>
          <table className="searchProductBar">
            <tr>
              <th>검색어</th>
              <td>
                {/* <select name="sortingFirstColumn" id="productSearch"
                  value={pageRequest.sortingFirstColumn}
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
                <select name="categoryId" id="productSearch"
                  value={pageRequest.categoryId}
                  onChange={(e) => onchangeRequest(e)} >
                  {productMenu.map((items, i) => <option value={items.category} key={i}>{items.description}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <th>정렬</th>
              <td>
                <select name="sortingFirstColumn" id="productSearch"
                  value={pageRequest.sortingFirstColumn}
                  onChange={(e) => onchangeRequest(e)} >
                  {selectorderBy.map((items, i) => <option value={items.order} key={i}>{items.description}</option>)}
                </select>
                <label htmlFor="ascending">
                  <input type="radio" id="ascending" name="ascending"
                    value="true" onChange={(e) => onChaneAsc(e.target.value)}
                    checked={pageRequest.ascendingFirst == 'true'} />
                  오름 차순</label>
                <label htmlFor="descending">
                  <input type="radio" id="descending" name="ascending" value="false"
                    checked={pageRequest.ascendingFirst == 'false'}
                    onChange={(e) => onChaneAsc(e.target.value)} />
                  내림 차순</label>
              </td>
            </tr>
            <tr>
              <th>기간검색</th>
              <td>
                <input type="date" name="startDate" value={pageRequest.startDate}
                  onChange={onChangeDateInput} />
                <input type="date" name="endDate" value={pageRequest.endDate}
                  onChange={onChangeDateInput} />
                <input type="button" value="전체"
                  onClick={(e) => onClickDate(e.target.value)} />
                <input type="button" value="오늘"
                  onClick={(e) => onClickDate(e.target.value)} />
                <input type="button" value="어제"
                  onClick={(e) => onClickDate(e.target.value)} />
                <input type="button" value="일주일"
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
                    name="state"
                    id={`allGoods`}
                    value="allGoods"
                    checked={pageRequest.state == 'allGoods'}
                    onChange={(e) => onchangeRequest(e)}
                  />
                  모든 상품
                </label>
                {code.map((item, index) => (
                  <label key={index} htmlFor={`code_${item.sub_type}`}>
                    <input
                      type="radio"
                      name="state"
                      value={`${item.sub_type}`}
                      id={`code_${item.sub_type}`}
                      checked={pageRequest.state == `${item.sub_type}`}
                      onChange={(e) => onchangeRequest(e)}
                    />
                    {item.sub_type_name}
                  </label>
                ))}
              </td>
            </tr>
            <tr>
              <th>보기</th>
              <td>

                {sizeArr.map((item, index) => (
                  <label key={index} htmlFor={`size_${item.name}`}>
                    <input
                      type="radio"
                      name="size"
                      value={`${item.name}`}
                      id={`size_${item.name}`}
                      checked={pageRequest.size == `${item.name}`}
                      onChange={(e) => onchangeRequest(e)}
                    />
                    {item.description}
                  </label>
                ))}
              </td>
            </tr>
          </table>
          <div className="buttonwrapper">
            <button type="button" onClick={searchProductAdmin}>검색</button>
            <button type="button" onClick={resetPageRequest}>초기화</button>
            <button type="button" onClick={() => {
              setIsModalProductALLOpen(true);
              //console.log("모달 열림 상태:", isModalProductALLOpen); // 상태값 확인용
            }}>
              상품 등록
            </button>

            {/* <button type="button" onClick={() => setIsModalProductALLOpen(true)}>상품 등록</button> */}
            {/* <Link to="/administrator/products/allinsert">상품 등록</Link> */}
          </div>
        </form>
        <h3 className="productTitle">리스트</h3>
        <table className="productListUp">
          <thead>
            <tr>
              <th>ID</th>
              <th>status</th>
              <th>Name</th>
              <th>Price</th>
              <th>StockCount</th>
              <th>LikeCount</th>
              <th>UploadDate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{code.find((e) => e.sub_type == product.status).sub_type_name}</td>
                <td className="clickProductDetailTd"
                  onClick={() => onClickProductDetail(product.id)}>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stockCount}</td>
                <td>{product.likeCount}</td>
                <td>{formatToKoreanTime(product.uploadDate)}</td>
                <td className="buttonwrapper">
                  <button onClick={() => { onClickInset(product) }}>product & option Edit</button>
                  <button onClick={() => { onClickImage(product) }}>image Edit</button>
                  <button onClick={() => onClickDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RenderPagination pageMaker={pageMaker} page={page} setPage={setPage} />
      <Modal
        isOpen={isModalProductALLOpen}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsModalProductALLOpen(false)}
        contentLabel="로그인 필요"
        style={{
          content: {
            height: '80%',
            width: '50%',
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center',
            zIndex: '2000',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
          }
        }}
      >
        <div className='Modalbutton'>
          <button onClick={() => setIsModalProductALLOpen(false)}>닫기</button>
        </div>
        <ProductRelatedStorage sendCode={code} setIsModalProductALLOpen={setIsModalProductALLOpen} />
      </Modal>

      <Modal
        isOpen={isModalProductDetails}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsModalProductDetails(false)}
        contentLabel="로그인 필요"
        style={{
          content: {
            height: '80%',
            width: '80%',
            // display: 'flex',
            // flexDirection: 'column-reverse',
            alignItems: 'center',
            zIndex: '2000',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -44%)'
          }
        }}
      >
        <ProductStatistics productId={selectedProductId} />
        <div className='buttonwrapper'>
          <button onClick={() => setIsModalProductDetails(false)}>닫기</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductManagement;
