import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { apiCall } from '../../service/apiService';
import { API_BASE_URL } from '../../service/app-config';
import axios from 'axios';


const ProductImageSave = () => {
    // state: {
    //     selectproduct: selectProduct,
    //     mainImages: mainImages,
    //     slideImages: slideImages,
    //     sendcode: code
    //   }
    const location = useLocation();
    const { selectproduct, mainImages, slideImages, sendcode } = location.state || {};
    const [product, setProduct] = useState({});
    const [mainImage, setMainImage] = useState([]);
    const [slideImage, setSlideImage] = useState([]);
    const [code, setCode] = useState([]);
    useEffect(() => {
        setProduct(selectproduct)
        setMainImage(mainImages);
        setSlideImage(slideImages);
        setCode(sendcode);
    }, [])

    //console.log(code);

    const handleImageChange = (index, e, imageType) => {
        const { name, value, type, files } = e.target;

        let currentImages = imageType === 'mainImage' ? [...mainImage] : [...slideImage];
        let otherImages = imageType === 'mainImage' ? [...slideImage] : [...mainImage];

        if (name === 'type') {

            if (imageType == 'mainImage') {
                if (slideImage.length > 4) {
                    alert('슬라이드 이미지 갯수 초과'); return;
                }
                if (mainImage.length <= 3) {
                    alert('내용 이미지 갯수 미만'); return;
                }
            } else {
                if (mainImage.length < 3) {
                    alert('내용 이미지 갯수 미만'); return;
                }
                if (mainImage.length >= 4) {
                    alert('내용 이미지 갯수 초과'); return;
                }
            }
            // 타입 변경이 감지되었을 때 배열 이동 처리
            const movedImage = currentImages.splice(index, 1)[0]; // 현재 배열에서 이미지 제거
            //movedImage.type = value=='mainImage'? 'slideImage' : 'mainImage' ; // 타입 업데이트
            movedImage.type = value;
            movedImage.order = otherImages.length + 1;
            otherImages.push(movedImage); // 다른 배열에 추가

            // 현재 배열과 다른 배열을 모두 재정렬하여 order 값을 설정
            const updatedCurrentImages = currentImages.map((img, idx) => ({
                ...img,
                order: idx + 1, // 인덱스에 맞춰 order 재정렬
            }));

            const updatedOtherImages = otherImages.map((img, idx) => ({
                ...img,
                order: idx + 1, // 인덱스에 맞춰 order 재정렬
            }));


            if (imageType === 'mainImage') {
                setMainImage(updatedCurrentImages);
                setSlideImage(updatedOtherImages);

            } else {
                setMainImage(updatedOtherImages);
                setSlideImage(updatedCurrentImages);
            }
        } else {
            if (type === 'file') {
                const reader = new FileReader();
                currentImages[index][name] = files[0];  // 파일 저장
                reader.onloadend = () => {
                    currentImages[index].preview = reader.result;  // 미리보기 URL을 preview에 저장
                    // 상태 업데이트
                    if (imageType === 'mainImage') {
                        setMainImage([...currentImages]);
                    } else {
                        setSlideImage([...currentImages]);
                    }
                };
                reader.readAsDataURL(files[0]);  // 파일을 base64 URL로 변환
            } else {
                currentImages[index][name] = value;
            }
            if (imageType === 'mainImage') {
                setMainImage(currentImages);
            } else {
                setSlideImage(currentImages);
            }
        }

    };
    // useEffect(() => {
    //     console.log("메인", mainImage);
    // }, [mainImage]);

    // useEffect(() => {
    //     console.log("슬라이드", slideImage);
    // }, [slideImage]);


    const addImage = (string) => {
        if (string === 'mainImage') {
            setMainImage([...mainImage, { order: mainImage.length + 1, type: '', name: '' }]); // mainImage 배열에 이미지 추가
        } else {
            setSlideImage([...slideImage, { order: slideImage.length + 1, type: 'slide', name: '' }]); // slideImage 배열에 이미지 추가
        }
    };
    //이미지 순서는 추후에 컨트롤러에서 forEach 돌릴때 set해줘야 할것같은데.
    // 이미지 순서를 위로 이동
    const moveImageUp = (index, imageType) => {
        const images = imageType === 'mainImage' ? [...mainImage] : [...slideImage];
        if (index > 0) {
            [images[index - 1], images[index]] = [images[index], images[index - 1]]; // 위치 변경

            images[index - 1].order -= 1;
            images[index].order += 1;
            if (imageType === 'mainImage') {
                setMainImage(images);
            } else {
                setSlideImage(images);
            }
        }
    };

    // 이미지 순서를 아래로 이동
    const moveImageDown = (index, imageType) => {
        const images = imageType === 'mainImage' ? [...mainImage] : [...slideImage];
        if (index < images.length - 1) {
            [images[index + 1], images[index]] = [images[index], images[index + 1]]; // 위치 변경
            images[index + 1].order += 1;
            images[index].order -= 1;
            if (imageType === 'mainImage') {
                setMainImage(images);
            } else {
                setSlideImage(images);
            }
        }
    };
    const navigate = useNavigate();

    const handleDeleteImage = (index, imageType) => {
        if (imageType === 'mainImage') {
            // 삭제된 요소를 제외한 새로운 배열을 반환
            const updatedMainImage = mainImage.filter((_, imgIndex) => imgIndex !== index);
            setMainImage(updatedMainImage);
        } else {
            const updatedSlideImage = slideImage.filter((_, imgIndex) => imgIndex !== index);
            setSlideImage(updatedSlideImage);
        }
    };
    const handleSubmit = async () => {
        // FormData 생성
        const formData = new FormData();
        // 메인 이미지와 슬라이드 이미지를 합친다
        const combinedImages = [...mainImage, ...slideImage];

        // 파일과 JSON 데이터 처리
        // 서버로 전송할 데이터에서 preview 속성을 제외
        const imagesData = combinedImages.map((image) => {
            const { preview, ...rest } = image; // 구조분해 할당을 이용하여 preview 제거
            if (image.name instanceof File) {
                formData.append('files', image.name);  // 파일을 FormData로 전송
                return { ...rest, name: image.name.name };  // 파일 이름만 JSON에 추가
            }
            return rest;  // 파일이 아닌 경우 그대로 처리
        });
        //console.log('combinedImages', combinedImages);
        //console.log('formData_imagesData', imagesData);
        // JSON 데이터를 문자열로 변환하여 추가
        formData.append('images', JSON.stringify(imagesData));  // JSON으로 전송

        // 네트워크 요청을 보내기 전, FormData 내용 확인
        formData.forEach((value, key) => {
            //console.log(`Key: ${key}, Value: ${value}`);
        });


        // axios 요청으로 서버에 전송
        try {
            const response = await axios.post(`${API_BASE_URL}/administrator/imagesave`, formData);
            const { selectProduct } = response.data;
            alert(`${selectProduct.name}의 수정이 완료되었습니다.`);
            navigate('/administrator/products');
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };


    return (<>
        <h1 className="productMainTitle">이미지 수정</h1>
        <h3 className="productTitle">상품 내용</h3>
        <ul className="productDescription">
            <li>상품 이름 </li>
            <li>{product.name}</li>
            <li>상품 가격 </li>
            <li>{product.price}</li>
        </ul>
        <h3 className="productTitle">슬라이드 이미지</h3>
        <p>슬라이드이미지는 5개까지 가능합니다.</p>
        <div className="inserProductsForm3">

            {slideImage && slideImage.map((image, index) => (
                <>
                    <label>이미지 순서:</label>
                    <input

                        name="order"
                        value={image.order}
                        onChange={(e) => handleImageChange(index, e, 'slideImage')}
                    />

                    <label>이미지 타입:</label>
                    <select name="type"
                        value={image.type}
                        onChange={(e) => handleImageChange(index, e, 'slideImage')} >
                        {code && code.length > 0 && code.map((item, codeIndex) => (
                            <option key={codeIndex} value={item.sub_type}>
                                {item.sub_type_name}
                            </option>
                        ))}
                    </select>
                    <label>이미지 파일</label>
                    <img src={image.preview ? image.preview : `${API_BASE_URL}/resources/productImages/${image.name}`} alt={image.name} />
                    <input
                        name="name"
                        type="file"
                        onChange={(e) => handleImageChange(index, e, 'slideImage')}
                    />
                    <div>
                        <button onClick={() => moveImageUp(index, 'slideImage')}>위로 이동</button>
                        <button onClick={() => moveImageDown(index, 'slideImage')}>아래로 이동</button>
                    </div>
                    <button type="button" onClick={() => handleDeleteImage(index, 'slideImage')}> DELETE</button>
                </>
            ))}
            <button type="button" onClick={() => addImage('slideImage')}>이미지 추가</button>
        </div>

        <h3 className="productTitle">내용 이미지</h3>
        <p>본문 이미지는 3개 이상 4이하까지 가능합니다.</p>
        <div className="inserProductsForm3">

            {mainImage && mainImage.map((image, index) => (
                <>
                    <label>이미지 순서:</label>
                    <input

                        name="order"
                        value={image.order}
                        onChange={(e) => handleImageChange(index, e, 'mainImage')}
                    />

                    <label>이미지 타입:</label>
                    <select name="type"
                        value={image.type}
                        onChange={(e) => handleImageChange(index, e, 'mainImage')} >
                        {code && code.length > 0 && code.map((item, codeIndex) => (
                            <option key={codeIndex} value={item.sub_type}>
                                {item.sub_type_name}
                            </option>
                        ))}
                    </select>
                    <label>이미지 파일</label>
                    <img src={image.preview ? image.preview : `${API_BASE_URL}/resources/productImages/${image.name}`} alt={image.name} />
                    <input
                        name="name"
                        type="file"
                        onChange={(e) => handleImageChange(index, e, 'mainImage')}
                    />
                    <div>
                        <button onClick={() => moveImageUp(index, 'mainImage')}>위로 이동</button>
                        <button onClick={() => moveImageDown(index, 'mainImage')}>아래로 이동</button>
                    </div>
                    <button type="button" onClick={() => handleDeleteImage(index, 'mainImage')}> DELETE</button>
                </>
            ))}
            <button type="button" onClick={() => addImage('mainImage')}>이미지 추가</button>
        </div>

        <div>
            <button onClick={handleSubmit}>SAVE</button>
        </div>
    </>)
}
export default ProductImageSave;