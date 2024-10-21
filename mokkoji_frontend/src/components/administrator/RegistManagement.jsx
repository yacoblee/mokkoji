import React, { useState, useEffect } from 'react';
import '../../css/administrator/adminRegist.css';
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";

const RegistManagement = () => {
  const [reserveImage, setReserveImage] = useState([]);
  const [mainImages, setMainImages] = useState([]); // 메인 이미지 미리보기
  const [detailImages, setDetailImages] = useState([]); // 상세 이미지 미리보기
  const [registsData, setRegistsData] = useState([]);
  const [deleteImages , setDeleteImages ] = useState([]); // 삭제할 이미지 - 테스트중

  const [adultPrice, setAdultPrice] = useState(''); // 성인 가격
  const [teenagerPrice, setTeenagerPrice] = useState(''); // 청소년 가격

  const [registName, setRegistName] = useState('');
  // 예약 상세정보
  const [packageDetail, setPackageDetail] = useState('');
  const [restrictDetail, setRestrictDetail] = useState('');
  const [reserveRestrict, setReserveRestrict] = useState('');
  const [etcDetail, setEtcDetail] = useState('');

  // 하이라이트 정보 상태 추가
  const [highlights, setHighlights] = useState({
    hightlight1: '',
    hightlight2: '',
    hightlight3: '',
    hightlight4: ''
  });

  useEffect(() => {
    const uri = API_BASE_URL + "/reserve";
    axios.get(uri)
      .then(response => {
        const { regists, reserveImage } = response.data;
        setReserveImage(reserveImage);
        setRegistsData(regists);

        const filteredMainImages = reserveImage
          .filter(image => image.imageType === 'main')
          .sort((a, b) => a.imageOrder - b.imageOrder);
        setMainImages(filteredMainImages);

        const filteredDetailImages = reserveImage
          .filter(image => image.imageType === 'detail')
          .sort((a, b) => a.imageOrder - b.imageOrder);
        setDetailImages(filteredDetailImages);

        setRegistName(regists[0].name || ''); 

        // 가격 정보 설정
        setAdultPrice(regists[0].adult || ''); 
        setTeenagerPrice(regists[0].teenager || ''); 

        setPackageDetail(regists[0].packageDetail || '');
        setRestrictDetail(regists[0].restrictDetail || '');
        setReserveRestrict(regists[0].reserveRestrict || '');
        setEtcDetail(regists[0].etcDetail || '');

        // 하이라이트 정보 설정
        setHighlights({
          hightlight1: regists[0].hightlight1 || '',
          hightlight2: regists[0].hightlight2 || '',
          hightlight3: regists[0].hightlight3 || '',
          hightlight4: regists[0].hightlight4 || ''
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

   // 메인 이미지 업로드 핸들러
   const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageToDelete = mainImages[index];
      setDeleteImages([...deleteImages, imageToDelete]); 
      
      const reader = new FileReader();
      const modifiedFileName = `${file.name.split('.')[0]}_${index}.${file.name.split('.').pop()}`;
  
      const newFile = new File([file], modifiedFileName, { type: file.type });
  
      reader.onloadend = () => {
        const updatedMainImages = [...mainImages];
        updatedMainImages[index] = { ...updatedMainImages[index], file: newFile, preview: reader.result };
        setMainImages(updatedMainImages);
      };
  
      reader.readAsDataURL(file);
    }
  };

  // 새로운 메인 이미지 추가
  const handleNewImageUpload = (event) => {
    const file = event.target.files[0];
    const index = mainImages.length;

    if (file) {
      const reader = new FileReader();
      const modifiedFileName = `${file.name.split('.')[0]}_${index}.${file.name.split('.').pop()}`;
  
      const newFile = new File([file], modifiedFileName, { type: file.type });

      reader.onloadend = () => {
        const newImage = { file: newFile, preview: reader.result };
        setMainImages([...mainImages, newImage]); // 새 이미지 추가
      };

      reader.readAsDataURL(file);
    }
  };

  // 상세 이미지 업로드 핸들러
  const detailImageUpload = (index, event) => {
    const file = event.target.files[0];
  
    if (file) {
      const imageToDelete = detailImages[index];
      setDeleteImages([...deleteImages, imageToDelete]);

      const reader = new FileReader();
      const modifiedFileName = `${file.name.split('.')[0]}_${index}.${file.name.split('.').pop()}`;
  
      const newFile = new File([file], modifiedFileName, { type: file.type });
  
      reader.onloadend = () => {
        const updatedDetailImages = [...detailImages];
        updatedDetailImages[index] = { ...updatedDetailImages[index], file: newFile, preview: reader.result };
        setDetailImages(updatedDetailImages);
      };
  
      reader.readAsDataURL(file);
    }
  };

  // 새로운 상세 이미지 추가
  const detailNewImageUpload = (event) => {
    const file = event.target.files[0];
    const index = detailImages.length;

    if (file) {
      const reader = new FileReader();
      const modifiedFileName = `${file.name.split('.')[0]}_${index}.${file.name.split('.').pop()}`;

      const newFile = new File([file], modifiedFileName, { type: file.type });

      reader.onloadend = () => {
        const newImage = { file: newFile, preview: reader.result };
        setDetailImages([...detailImages, newImage]); // 새 이미지 추가
      };

      reader.readAsDataURL(file);
    }
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = (index, type) => {
    if (type === 'main') {
        const imageToDelete = mainImages[index];
        setDeleteImages([...deleteImages, imageToDelete]); // 삭제된 이미지를 deleteImages에 추가
        const newMainImages = mainImages.filter((_, imgIndex) => imgIndex !== index);
        setMainImages(newMainImages);

    } else if (type === 'detail') {
        const imageToDelete = detailImages[index];
        setDeleteImages([...deleteImages, imageToDelete]); // 삭제된 이미지를 deleteImages에 추가
        const newDetailImages = detailImages.filter((_, imgIndex) => imgIndex !== index);
        setDetailImages(newDetailImages);
    }
};

  // 데이터 전송 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    
     // 메인 이미지 전송 (기존 이미지 ID 포함)
    mainImages.forEach((image) => {
      if (image.file) {
        formData.append('mainImage', image.file); // 새 이미지 파일 전송
      } else if (image !=null) {
        formData.append('existingMainImageIds', JSON.stringify(image)); // 기존 이미지 ID 전송
      }
    });

    // 상세 이미지 전송 (기존 이미지 ID 포함)
    detailImages.forEach((image) => {
      if (image.file) {
        formData.append('detailImage', image.file); // 새 이미지 파일 전송
      } else if(image != null) {
        formData.append('existingDetailImageIds', JSON.stringify(image)); // 기존 이미지 ID 전송
        
      }
    });

    deleteImages.forEach((image) => {
      formData.append('deleteImageIds', image.imageName); // 삭제된 이미지 이름만 전송 - 다른 방법 찾는 중
    });

      
      const reserveData = {
        registName,
        adultPrice,
        teenagerPrice,
        packageDetail,
        restrictDetail,
        reserveRestrict,
        etcDetail,
        highlights: {
          hightlight_1: highlights.hightlight1,
          hightlight_2: highlights.hightlight2,
          hightlight_3: highlights.hightlight3,
          hightlight_4: highlights.hightlight4
        }
      };
    
      formData.append('reserveData', new Blob([JSON.stringify(reserveData)], { type: 'application/json' }));
  
      
    axios.post(`${API_BASE_URL}/regist/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      alert('수정에 성공했습니다.'+response.data);
    })
    .catch(error => {
      console.error('Error submitting data:', error);
    });
  };

  const handleHighlightChange = (e) => {
    const { name, value } = e.target;
    setHighlights((prevHighlights) => ({
      ...prevHighlights,
      [name]: value
    }));
  };

  return (
    <div className="regist-container">
      <h2 className="regist-title">예약 관리 페이지</h2>

      <form onSubmit={handleSubmit}>
        <h3 className="regist-subTitle">예약 메인 이미지</h3>
        <div className="image-upload-container">
          {mainImages.map((image, index) => (
            <div key={index} className="image-upload">
              <img
                src={image.preview || `${API_BASE_URL}/resources/reserveImages/${image.imageName}`}
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
                onClick={() => handleRemoveImage(index, 'main')}
              >
                X
              </button>
            </div>
          ))}

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

        {/* 예약페이지 제목/이름 수정란 */}
        <h3 className="regist-subTitle">제목 수정</h3>
        <div className="detail-inputs">
          <label htmlFor="registName">예약페이지 제목</label>
          <input
            type="text"
            id="registName"
            value={registName}
            onChange={(e) => setRegistName(e.target.value)}
          />

        </div>

        {/* 가격 정보 입력 필드 */}
        <h3 className="regist-subTitle">가격 수정</h3>
        <div className="price-info">
          <label htmlFor="adultPrice">성인 가격</label>
          <input
            type="text"
            id="adultPrice"
            value={adultPrice}
            onChange={(e) => setAdultPrice(e.target.value)}
          />

          <label htmlFor="teenagerPrice">청소년 가격</label>
          <input
            type="text"
            id="teenagerPrice"
            value={teenagerPrice}
            onChange={(e) => setTeenagerPrice(e.target.value)}
          />
        </div>

        {/* 하이라이트 입력 필드 */}
        <h3 className="regist-subTitle">하이라이트 문구</h3>
        <div className="highlight-inputs">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="highlight-input">
              <label htmlFor={`hightlight${num}`}>하이라이트 {num}:</label>
              <input
                type="text"
                id={`hightlight${num}`}
                name={`hightlight${num}`}
                value={highlights[`hightlight${num}`]}
                onChange={handleHighlightChange}
                placeholder={`하이라이트 ${num} 입력`}
              />
            </div>
          ))}
        </div>

        {/* 상세 정보 수정 필드 */}
        <h3 className="regist-subTitle">상세 정보 수정</h3>
        <div className="detail-inputs">
          <label htmlFor="packageDetail">패키지 상세정보</label>
          <input
            type="text"
            id="packageDetail"
            value={packageDetail}
            onChange={(e) => setPackageDetail(e.target.value)}
          />

          <label htmlFor="restrictDetail">규정 및 제한사항</label>
          <input
            type="text"
            id="restrictDetail"
            value={restrictDetail}
            onChange={(e) => setRestrictDetail(e.target.value)}
          />

          <label htmlFor="reserveRestrict">예약 제한사항</label>
          <input
            type="text"
            id="reserveRestrict"
            value={reserveRestrict}
            onChange={(e) => setReserveRestrict(e.target.value)}
          />

          <label htmlFor="etcDetail">편의성/접근성</label>
          <input
            type="text"
            id="etcDetail"
            value={etcDetail}
            onChange={(e) => setEtcDetail(e.target.value)}
          />
        </div>

        {/* 상세 이미지 업로드 섹션 */}
        <h3 className="regist-subTitle">상세 이미지</h3>
        <div className="image-upload-container">
          {detailImages.map((image, index) => (
            <div key={index} className="image-upload">
              <img
                src={image.preview || `${API_BASE_URL}/resources/reserveImages/${image.imageName}`}
                alt={`Detail ${index + 1}`}
                className="existing-image"
                style={{ width: '100px', maxHeight: '80px', marginRight: '10px' }}
              />
              <label className="file-input-label" htmlFor={`detailFileInput${index}`}>
                Upload Detail Image {index + 1}
              </label>
              <input
                type="file"
                id={`detailFileInput${index}`}
                accept="image/*"
                onChange={(event) => detailImageUpload(index, event)}
              />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => handleRemoveImage(index, 'detail')}
              >
                X
              </button>
            </div>
          ))}

          <div className="image-upload">
            <label className="file-input-label" htmlFor="newDetailImage">
              Add New Detail Image
            </label>
            <input
              type="file"
              id="newDetailImage"
              accept="image/*"
              onChange={detailNewImageUpload}
            />
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="buttonarea">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegistManagement;








