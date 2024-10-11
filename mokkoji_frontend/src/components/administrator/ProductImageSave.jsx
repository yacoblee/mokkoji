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

    console.log(code);

    const handleImageChange = (index, e, imageType) => {
        const { name, value, type, files } = e.target;

        let currentImages = imageType === 'mainImage' ? [...mainImage] : [...slideImage];
        let otherImages = imageType === 'mainImage' ? [...slideImage] : [...mainImage];

        if (name === 'type') {
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
                currentImages[index][name] = files[0];
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
    useEffect(() => {
        console.log("메인", mainImage);
    }, [mainImage]);

    useEffect(() => {
        console.log("슬라이드", slideImage);
    }, [slideImage]);


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
    const handleSubmit = async () => {
        // FormData 생성
        const formData = new FormData();
        // 메인 이미지와 슬라이드 이미지를 합친다
        const combinedImages = [...mainImage, ...slideImage];

        // 파일과 JSON 데이터 처리
        const imagesData = combinedImages.map((image, index) => {
            if (image.name instanceof File) {
                console.log(`files [${index}] added:`, image.name);
                formData.append(`files`, image.name);  // 파일을 FormData로 전송
                return { ...image, name: image.name.name };  // 파일 이름만 JSON에 추가
            } else {
                //formData.append(`files[${index}]`, null);  
                return image;  // 파일이 아닌 경우 그대로 처리
            }
        });

        // JSON 데이터를 문자열로 변환하여 추가
        formData.append('images', JSON.stringify(imagesData));  // JSON으로 전송

        // 네트워크 요청을 보내기 전, FormData 내용 확인
        formData.forEach((value, key) => {
            console.log(`Key: ${key}, Value: ${value}`);
        });
        // // 파일 데이터 추가
        // combinedImages.forEach((image, index) => {
        //     if (image.name instanceof File) {
        //         formData.append(`files`, image.name);  // 파일이 있으면 파일을 추가
        //     }
        // });

        // combinedImages.forEach((image, index) => {
        //     // formData.append(`images[${index}][productId]`, product.id);
        //     // formData.append(`images[${index}][order]`, image.order);
        //     // formData.append(`images[${index}][type]`, image.type);
        //     if (image.name instanceof File) {
        //         formData.append(`files[${index}]`, image.name);
        //     }
        //     // else{
        //     //     formData.append(`images[${index}][name]`, image.name);
        //     // }
        // });
        // formData.append('images', JSON.stringify(combinedImages));
        // 메인 이미지 배열 처리
        // mainImage.forEach((image, index) => {
        //     formData.append(`mainImage[${index}][productId]`, product.id);
        //     formData.append(`mainImage[${index}][order]`, image.order);
        //     formData.append(`mainImage[${index}][type]`, image.type);
        //     formData.append(`mainImage[${index}][name]`, image.name);
        //     if (image.name instanceof File) {
        //         formData.append(`mainImage[${index}][uploadfilef]`, image.name);
        //     }
        // });

        // // 슬라이드 이미지 배열 처리
        // slideImage.forEach((image, index) => {
        //     formData.append(`slideImage[${index}][productId]`, product.id);
        //     formData.append(`slideImage[${index}][order]`, image.order);
        //     formData.append(`slideImage[${index}][type]`, image.type);
        //     formData.append(`slideImage[${index}][name]`, image.name);
        //     if (image.name instanceof File) { // 파일인 경우만 append
        //         formData.append(`slideImage[${index}][uploadfilef]`, image.name);
        //     }
        // });

        // axios 요청으로 서버에 전송
        try {
            const response = await axios.post(`${API_BASE_URL}/administrator/imagesave`, formData, {
                headers: {
                    //'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
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
                    <img src={`${API_BASE_URL}/resources/productImages/${image.name}`} alt={image.name} />
                    <input
                        name="name"
                        type="file"
                        onChange={(e) => handleImageChange(index, e, 'mainImage')}
                    />
                    <div>
                        <button onClick={() => moveImageUp(index, 'mainImage')}>위로 이동</button>
                        <button onClick={() => moveImageDown(index, 'mainImage')}>아래로 이동</button>
                    </div>
                    <button type="button"> DELETE</button>
                </>
            ))}
            <button type="button" onClick={() => addImage('mainImage')}>이미지 추가</button>
        </div>

        <h3 className="productTitle">내용 이미지</h3>
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
                    <img src={`${API_BASE_URL}/resources/productImages/${image.name}`} alt={image.name} />
                    <input
                        name="name"
                        type="file"
                        onChange={(e) => handleImageChange(index, e, 'slideImage')}
                    />
                    <div>
                        <button onClick={() => moveImageUp(index, 'slideImage')}>위로 이동</button>
                        <button onClick={() => moveImageDown(index, 'slideImage')}>아래로 이동</button>
                    </div>
                    <button type="button"> DELETE</button>
                </>
            ))}
            <button type="button" onClick={() => addImage('slideImage')}>이미지 추가</button>
        </div>
        <div>
            <button onClick={handleSubmit}>SAVE</button>
        </div>
    </>)
}
export default ProductImageSave;