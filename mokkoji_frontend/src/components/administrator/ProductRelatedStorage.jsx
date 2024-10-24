import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../service/app-config';
import { useNavigate } from 'react-router-dom';

function ProductRelatedStorage({ sendCode, setIsModalProductALLOpen }) {
    const [product, setProduct] = useState({});
    const [mainImage, setMainImage] = useState([]);
    const [slideImage, setSlideImage] = useState([]);
    const [options, setOptions] = useState([{ content: '', price: '' }]);
    const [code, setCode] = useState([]);
    const [imagePreview, setImagePreview] = useState(''); // 미리보기 이미지
    const navigate = useNavigate();
    //navigate('/administrator/products');
    const onChangeProduct = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    useEffect(() => {
        setCode(sendCode);
        //console.log("code :", code);
        setProduct((prevState) => ({
            ...prevState,
            status: '0',
        }));
    }, [sendCode])
    // 옵션 추가
    const addOption = () => {
        setOptions([...options, { content: '', price: '' }]);
    };

    // 파일 선택 시 미리보기 처리
    const handleFileChange = (e, imageType) => {
        const files = e.target.files;
        const fileArray = Array.from(files);
        if (imageType === 'mainImage' && fileArray.length < 3) {
            alert("메인 이미지는 최소 3개 등록 해주세요");
            setMainImage([]); return
        }
        if (imageType === 'mainImage' && fileArray.length > 4) {
            alert("메인 이미지는 4개까지 노출 됩니다.");
            setMainImage([]); return
        }
        if (imageType === 'slideImage' && fileArray.length < 1) {
            alert("슬라이드 이미지는 최소 1개 등록 해주세요");
            setMainImage([]); return
        }
        if (imageType === 'slideImage' && fileArray.length > 5) {
            alert("슬라이드 이미지는 5개까지 노출 됩니다.");
            setMainImage([]); return
        }
        const previews = fileArray.map((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file); // 파일을 base64 URL로 변환
            return file;
        });

        if (imageType === 'mainImage') {
            setMainImage([...mainImage, ...previews]);
        } else if (imageType === 'slideImage') {
            setSlideImage([...slideImage, ...previews]);
        } else {
            const file = e.target.files[0];
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
        }
    };

    // 폼 제출 시 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (product.name == null || product.price == null ||
            product.sizeInfo == null || product.stockCount == null || product.categoryId == null) {
            alert("상품 필수 정보를 등록해 주세요."); return
        }
        if (product.uploadfilef == null) {
            alert("상품 대표이미지를 등록해 주세요."); return
        }
        if (options.length < 1) {
            if (options[0].content == '' || options[0].price == '') {
                alert("옵션을 하나이상 등록해 주세요."); return
            }
        }
        if (mainImage.length > 4 || mainImage.length < 3) {
            alert("메인 이미지를 적절히 등록해 주세요."); return
        }
        if (slideImage.length > 5 || slideImage.length < 1) {
            alert("슬라이드 이미지를 적절히 등록해 주세요."); return
        }
        // 메인 이미지 추가
        mainImage.forEach((image, index) => {
            formData.append('mainImages', image);  // 파일들을 FormData에 추가
        });

        // 슬라이드 이미지 추가
        slideImage.forEach((image, index) => {
            formData.append('slideImages', image);  // 파일들을 FormData에 추가
        });

        // // 상품 데이터 추가
        // Object.keys(product).forEach((key) => {
        //     formData.append(key, product[key]);
        // });

        // // 옵션 데이터 추가
        // options.forEach((option, index) => {
        //     formData.append(`options[${index}][content]`, option.optionContent);
        //     formData.append(`options[${index}][price]`, option.optionPrice);
        // });
        const productData = {
            product: product,  // 상품 객체
            options: options,  // 옵션 배열
            //images: images     // 이미지 배열 (필요하다면)
        };
        formData.append("productData", new Blob([JSON.stringify(productData)], { type: "application/json" }));
        if (product.uploadfilef) {
            formData.append("uploadfilef", product.uploadfilef);
            //console.log("이미지 파일이 존재함.");
        } else {
            //console.log("이미지 파일이 존재하지 않음.");
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/administrator/saveallproduct`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(`${product.name}의 수정이 완료되었습니다.`);

            setIsModalProductALLOpen(false);
            window.location.href = '/administrator/products';
            //navigate('/administrator/products');
            //window.location.reload(true);
        } catch (error) {
            console.error('상품 저장 실패:', error);
        }
    };
    const productMenu = [

        { category: 'C1', description: '문구/사무' },
        { category: 'C2', description: '패션/생활' },
        { category: 'C3', description: '인테리어 소품' },
        { category: 'C4', description: '공예품' },
        { category: 'C5', description: '주방/식기' },
    ];

    //console.log(mainImage);
    //console.log(slideImage);
    //console.log(options);
    //console.log(product);
    return (
        <div className='ProductRelatedStorage'>
            <h1 className="productMainTitle">상품 등록</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* 상품 정보 입력 */}
                <h3 className="productTitle">상품 정보 입력</h3>
                <div className="inserProductsForm1">
                    <label>상품 이름 (*)</label>
                    <input name="name" value={product.name || ''} onChange={onChangeProduct} />

                    <label>상품 가격 (*)</label>
                    <input name="price" value={product.price || ''}
                        type="number" onChange={onChangeProduct} />

                    <label>상품 크기 정보 (*)</label>
                    <textarea name="sizeInfo"
                        value={product.sizeInfo || ''}
                        onChange={onChangeProduct} />

                    <label>상품 가이드 (*)</label>
                    <textarea name="guide"
                        value={product.guide || ''}
                        onChange={onChangeProduct} />

                    <label>메인 설명</label>
                    <textarea name="mainDescription"
                        value={product.mainDescription || ''}
                        onChange={onChangeProduct} />
                    <label>추가 설명</label>
                    <textarea name="subDescription"
                        value={product.subDescription || ''}
                        onChange={onChangeProduct} />
                    <label>상품 대표 이미지 (*)</label>
                    <div className="adminProductImage">
                        {/* 파일이 없을 때는 기존 이미지, 파일이 있으면 업로드된 파일의 미리보기 이미지 */}
                        {product.uploadfilef ? (
                            <img src={imagePreview} alt="미리보기 이미지" />
                        ) : (
                            <img src={`${API_BASE_URL}/resources/productImages/${product.mainImageName || ''}`} alt={product.mainImageName || ''} />
                        )}
                        <input name="uploadfilef"
                            type="file"
                            // value={product.uploadfilef}
                            onChange={(e) => handleFileChange(e, 'uploadfilef')}
                        />
                    </div>
                    <label>재고 수량 (*)</label>
                    <input name="stockCount"
                        type="number"
                        value={product.stockCount || ''}
                        onChange={onChangeProduct} />
                    <label>카테고리 ID</label>
                    <select name="categoryId" id="productSearch"
                        value={product.categoryId}
                        onChange={onChangeProduct} required >
                        <option disabled selected>카테고리를 입력해주세요</option>
                        {productMenu.map((items, i) => <option value={items.category} key={i}>{items.description}</option>)}
                    </select>

                    <label>제품 상태 </label>
                    <div>
                        {code && code.length > 0 && code.map((item, index) => (
                            <label key={index} htmlFor={`code_${item.sub_type}`}>
                                <input
                                    type="radio"
                                    name="status"
                                    value={item.sub_type}
                                    id={`code_${item.sub_type}`}
                                    checked={product.status == `${item.sub_type}`}
                                    onChange={onChangeProduct}
                                />
                                {item.sub_type_name}
                            </label>
                        ))}
                    </div>
                </div>
                {/* 옵션 입력 */}
                <h3 className="productTitle">상품 옵션</h3>
                {options.map((option, index) => (
                    <div key={index}>
                        <label>옵션 내용:</label>
                        <input
                            name="content"
                            value={option.content}
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[index].content = e.target.value;
                                setOptions(newOptions);
                            }}
                        />
                        <label>옵션 가격:</label>
                        <input
                            name="price"
                            value={option.price}
                            type="number"
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[index].price = e.target.value;
                                setOptions(newOptions);
                            }}
                        />
                    </div>
                ))}
                <button type="button" onClick={addOption}>옵션 추가</button>

                {/* 메인 이미지 파일 입력 */}
                <h3 className="productTitle">메인 이미지</h3>
                <input type="file" multiple onChange={(e) => handleFileChange(e, 'mainImage')} />
                <div className="fileResult">
                    {mainImage && mainImage.map((image, index) => (
                        <img src={URL.createObjectURL(image)} alt={`Main preview ${index}`} />
                    ))}
                </div>

                {/* 슬라이드 이미지 파일 입력 */}
                <h3 className="productTitle">슬라이드 이미지</h3>
                <input type="file" multiple onChange={(e) => handleFileChange(e, 'slideImage')} />
                <div className="fileResult">
                    {slideImage && slideImage.map((image, index) => (
                        <img src={URL.createObjectURL(image)} alt={`Slide preview ${index}`} />
                    ))}
                </div>



                <button type="submit">상품 저장</button>
            </form>
        </div>
    );
}

export default ProductRelatedStorage;
