import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { apiCall } from '../../service/apiService';
import { API_BASE_URL } from '../../service/app-config';
import axios from 'axios';

function ProductsInsert() {
    const location = useLocation();
    const navigate = useNavigate()
    const { selectproduct, option, image, sendcode } = location.state || {};
    const token = JSON.parse(sessionStorage.getItem('userData'));
    // 상태 정의
    const [options, setOptions] = useState([
        //{ optionContent: '', optionPrice: '' },
    ]);
    // const [images, setImages] = useState([
    //{ imageOrder: '', imageType: '', imageName: '' },
    // ]);
    const [product, setProduct] = useState({});
    const [code, setCode] = useState({});
    useEffect(() => {
        setProduct(selectproduct)
        setOptions(option)
        setCode(sendcode);
    }, [])





    // 핸들러 함수들
    const onChangeProduct = (e) => {
        const { name, value } = e.target;
        setProduct((it) => ({
            ...it,
            [name]: value,
        }));
    };
    const [imagePreview, setImagePreview] = useState(''); // 미리보기 이미지 URL 상태
    // 파일 업로드 핸들러
    const onClickFileUpload = (e) => {
        const file = e.target.files[0]; // 사용자가 선택한 파일
        if (file) {
            // 파일이 실제로 선택된 경우에만 상태 업데이트 및 미리보기 생성
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            // 파일을 product 객체에 저장
            setProduct((it) => ({
                ...it,
                uploadfilef: file, // 실제 파일이 있을 때만 업데이트
            }));
        } else {
            // 파일이 없을 경우(이미지 변경하지 않음)
            setProduct((it) => ({
                ...it,
                uploadfilef: null, // 기존 파일은 유지하지만 업로드는 하지 않음
            }));
        }
    };

    //console.log(options);
    const onChangeOption = (index, e) => {
        const { name, value } = e.target;
        const newOptions = [...options];
        //console.log(`name : ${name},value : ${value}`)
        newOptions[index][name] = value;
        setOptions(newOptions);
        // 2. product 객체 업데이트
        // setProduct((it) => ({
        //     ...it,
        //     options: newOptions // 업데이트된 options 배열을 product에 반영
        // }));
    };

    // const handleImageChange = (index, e) => {
    //     const { name, value } = e.target;
    //     const newImages = [...images];
    //     newImages[index][name] = value;
    //     setImages(newImages);
    // };

    // 폼 제출 핸들러
    const saveSubmit = async (e) => {
        e.preventDefault();

        // FormData 객체 생성 후 파일 및 데이터를 추가
        const formData = new FormData(document.getElementById("saveProduct"));
        // const formData = new FormData();
        // // product 상태에서 데이터를 formData에 추가
        // formData.append("id", product.id);
        // formData.append("name", product.name);
        // formData.append("price", product.price);
        // formData.append("sizeInfo", product.sizeInfo);
        // formData.append("guide", product.guide);
        // formData.append("mainDescription", product.mainDescription);
        // formData.append("subDescription", product.subDescription);
        // formData.append("categoryId", product.categoryId);

        // saveDTO로 데이터를 묶어서 보냄
        formData.append('saveDTO', new Blob([JSON.stringify({
            product: product,
            options: options,
            images: []  // 이미지 관련 데이터도 추가 가능
        })], { type: "application/json" }));


        // options.forEach((option, index) => {
        //     formData.append(`options[${index}].productId`, product.id);
        //     formData.append(`options[${index}].content`, option.content);
        //     formData.append(`options[${index}].price`, option.price);
        // });

        // 파일 추가
        if (product.uploadfilef) {
            formData.append("uploadfilef", product.uploadfilef);
            //console.log("이미지 파일이 존재함.");
        } else {
            //console.log("이미지 파일이 존재하지 않음.");
        }

        try {
            // 파일 업로드 API 호출 (백엔드에 파일 처리 로직 필요)
            const response = await axios({
                url: API_BASE_URL + '/administrator/insertproduct',
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data'
                    'Authorization': 'Bearer ' + token // 인증 토큰만 직접 설정
                },
                data: formData,
            });
            //const response = await axios('/insertproduct/image', formData, token);
            //console.log('업로드 성공:', response.data);
            const { selectProduct, option, image } = response.data;
            setProduct(selectProduct);
            setOptions(option);
            alert(`${selectProduct.name}의 수정이 완료되었습니다.`);
            navigate('/administrator/products');
        } catch (err) {
            console.error('업로드 실패:', err);
        }
    };

    const addOption = () => {
        setOptions([...options, { productId: product.id, content: '', price: '' }]);
    };

    // const addImage = () => {
    //     setImages([...images, { imageOrder: '', imageType: '', imageName: '' }]);
    // };
    //console.log(product);
    //console.log(product.options);
    const productMenu = [
        { category: 'allGoods', description: '전체상품' },
        { category: 'C1', description: '문구/사무' },
        { category: 'C2', description: '패션/생활' },
        { category: 'C3', description: '인테리어 소품' },
        { category: 'C4', description: '공예품' },
        { category: 'C5', description: '주방/식기' },
    ];
    return (
        <>
            <h1 className="productMainTitle">상품 & 옵션 수정</h1>
            <form onSubmit={saveSubmit} method="post" enctype="multipart/form-data" id="saveProduct">
                <h3 className="productTitle">상품 정보 입력</h3>
                <div className="inserProductsForm1">
                    {/* <label>상품 ID</label>
                <input name="id"
                    value={product.id}
                    onChange={onChangeProduct} /> */}
                    <input type="text" name="id" value={product.id} hidden />
                    <input type="text" name="mainImageName" value={product.mainImageName} hidden />
                    <input type="text" name="likeCount" value={product.likeCount} hidden />
                    <input type="date" name="uploadDate" value={product.uploadDate} hidden />
                    {/* <input type="text" name="uploadDate" hidden /> */}
                    <label>상품 이름</label>
                    <input name="name"
                        value={product.name}
                        onChange={onChangeProduct} />

                    <label>상품 가격</label>
                    <input name="price"
                        value={product.price} type="number"
                        onChange={onChangeProduct} />

                    <label>상품 크기 정보</label>
                    <textarea name="sizeInfo"
                        value={product.sizeInfo}
                        onChange={onChangeProduct} />

                    <label>상품 가이드</label>
                    <textarea name="guide"
                        value={product.guide}
                        onChange={onChangeProduct} />

                    <label>메인 설명</label>
                    <textarea name="mainDescription"
                        value={product.mainDescription}
                        onChange={onChangeProduct} />

                    <label>추가 설명</label>
                    <textarea name="subDescription"
                        value={product.subDescription}
                        onChange={onChangeProduct} />

                    <label>메인 이미지 파일명</label>
                    <div className="adminProductImage">
                        {/* 파일이 없을 때는 기존 이미지, 파일이 있으면 업로드된 파일의 미리보기 이미지 */}
                        {product.uploadfilef ? (
                            <img src={imagePreview} alt="미리보기 이미지" />
                        ) : (
                            <img src={`${API_BASE_URL}/resources/productImages/${product.mainImageName}`} alt={product.name} />
                        )}
                        <input name="uploadfilef"
                            type="file"
                            // value={product.uploadfilef}
                            onChange={onClickFileUpload} />
                    </div>

                    <label>재고 수량</label>
                    <input name="stockCount"
                        type="number"
                        value={product.stockCount}
                        onChange={onChangeProduct} />

                    {/* <label>업로드 날짜:</label>
            <input type="datetime-local" name="uploadDate" value={product.uploadDate} onChange={onChangeProduct} /> */}

                    <label>카테고리 ID</label>
                    <select name="categoryId" id="productSearch"
                        value={product.categoryId}
                        onChange={onChangeProduct} >
                        {productMenu.map((items, i) => <option value={items.category} key={i}>{items.description}</option>)}
                    </select>

                    <label>제품 상태 </label>
                    <div>
                        {code && code.length > 0 && code.map((item, index) => (
                            <label key={index} htmlFor={`code_${item.sub_type}`}>
                                <input
                                    type="radio"
                                    name="status"
                                    value={`${item.sub_type}`}
                                    id={`code_${item.sub_type}`}
                                    checked={product.status == `${item.sub_type}`}
                                    onChange={onChangeProduct}
                                />
                                {item.sub_type_name}
                            </label>
                        ))}
                    </div>
                </div>
                <h3 className="productTitle">상품 옵션</h3>
                <div className="inserProductsForm2">


                    {options.map((option, index) => (
                        <>
                            <input type="text" name="productId" value={product.id} hidden />
                            <label>옵션 내용:</label>
                            <input
                                name="content"
                                value={option.content}
                                onChange={(e) => onChangeOption(index, e)}
                            />
                            {/* <input
                            name={`product.options[${index}].content`}
                            value={product.options[index].content}
                            onChange={(e) => onChangeOption(index, e)}
                        /> */}
                            <label>옵션 가격:</label>
                            <input
                                name="price"
                                value={option.price}
                                onChange={(e) => onChangeOption(index, e)}
                            />
                            {/* <input
                            name={`options[${index}].price`}
                            value={product.options[index].price}
                            onChange={(e) => onChangeOption(index, e)}
                        /> */}
                        </>
                    ))}

                    <button type="button" onClick={addOption}>옵션 추가</button>
                </div>

                {/* <h3>상품 이미지</h3>
            <div className="inserProductsForm3">


                {images.map((image, index) => (
                    <>
                        <label>이미지 순서:</label>
                        <input

                            name="image_order"
                            value={image.image_order}
                            onChange={(e) => handleImageChange(index, e)}
                        />

                        <label>이미지 타입:</label>
                        <select name="image_type"
                        value={image.image_type}
                        onChange={(e) => handleImageChange(index, e)} >
                            <option value="slide">slide</option>
                            <option value="main">main</option>
                        </select>
                        <label>이미지 파일</label>
                        <input
                            name="imageName"
                            type="file"

                            onChange={(e) => handleImageChange(index, e)}
                        />
                    </>
                ))}
                <button type="button" onClick={addImage}>이미지 추가</button>
            </div> */}

                <button type="submit">저장</button>
            </form>
        </>
    );
}

export default ProductsInsert;
