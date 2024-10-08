import React, { useState, useEffect } from 'react';
import '../../css/administrator/adminUsers.css';
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";

const ProductManagement = () => {
  const [reserveImage, setReserveImage] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);  // 업로드된 새로운 이미지들
  const [mainImages, setMainImages] = useState([]);          // 필터링된 메인 이미지들

  // 서버에서 이미지를 가져옴
  useEffect(() => {
    const uri = API_BASE_URL + "/reserve";
    axios.get(uri)
      .then(response => {
        const { reserveImage } = response.data;
        console.log(reserveImage);
        setReserveImage(reserveImage);
        
        // 메인 이미지만 필터링하고 정렬하여 저장
        const filteredMainImages = reserveImage
          .filter(image => image.imageType === 'main')
          .sort((a, b) => a.imageOrder - b.imageOrder);
        setMainImages(filteredMainImages);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // 이미지 업로드 처리
  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // 미리보기 이미지 업데이트
        const updatedMainImages = [...mainImages];
        updatedMainImages[index] = { ...updatedMainImages[index], preview: reader.result };
        setMainImages(updatedMainImages);
      };

      reader.readAsDataURL(file); // 이미지를 읽어서 미리보기 생성
      const newUploadedImages = [...uploadedImages];
      newUploadedImages[index] = file;
      setUploadedImages(newUploadedImages);
    }
  };

  // 새로운 이미지 업로드 및 미리보기 추가 처리
  const handleNewImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // 새로운 이미지 미리보기와 함께 추가
        const newImage = { imageName: '', preview: reader.result };
        setMainImages([...mainImages, newImage]);

        const newUploadedImages = [...uploadedImages, file];
        setUploadedImages(newUploadedImages);
      };

      reader.readAsDataURL(file); // 이미지를 읽어서 미리보기 생성
    }
  };

  // 이미지 삭제 처리
  const handleRemoveImage = (index) => {
    const newMainImages = mainImages.filter((_, imgIndex) => imgIndex !== index);
    const newUploadedImages = uploadedImages.filter((_, imgIndex) => imgIndex !== index);

    setMainImages(newMainImages);
    setUploadedImages(newUploadedImages);
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    uploadedImages.forEach((file, index) => {
      if (file) {
        formData.append(`image${index}`, file);
      }
    });

    axios.post(`${API_BASE_URL}/regist/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Images uploaded successfully:', response.data);
    })
    .catch(error => {
      console.error('Error uploading images:', error);
    });
  };

  return (
    <div>
      <h1>Product Management</h1>

      <form className="upload-container" onSubmit={handleSubmit}>
        
        <div className="image-upload-container">

          {mainImages.map((image, index) => (
            <div key={index} className="image-upload">
              <img
                src={image.preview ? image.preview : `${API_BASE_URL}/resources/reserveImages/${image.imageName}`}
                alt={`Main ${index + 1}`}
                className="existing-image"
                style={{ width: '100px', maxHeight: '80px', marginRight: '10px' }}
              />

              <label className="file-input-label" htmlFor={`fileInput${index}`}>
                Upload Image {index + 1}
              </label>
              <input
                type="file"
                id={`fileInput${index}`}
                accept="image/*"
                onChange={(event) => handleImageUpload(index, event)}
              />

              <button
                type="button"
                className="remove-image-btn"
                onClick={() => handleRemoveImage(index)}
              > X
              </button>
            </div>
          ))}

          {/* 새로운 이미지를 추가할 수 있는 영역 */}
          <div className="image-upload">
            <label className="file-input-label" htmlFor="newImage">
              Add New Image
            </label>
            <input
              type="file"
              id="newImage"
              accept="image/*"
              onChange={handleNewImageUpload}
            />
          </div>

        </div>
        <br />
        
        <div className='buttonarea'>
          <button type='submit'>수정하기</button>
        </div>

      </form>

    </div>
  );
};

export default ProductManagement;
