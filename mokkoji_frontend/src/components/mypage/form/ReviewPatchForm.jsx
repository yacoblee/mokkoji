import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from 'axios';

function ReviewPatchForm({ userReviewDetail }) {

    const [reviewInfo, setReviewInfo] = useState(userReviewDetail);

    const [reviewPhoto, setReviewPhoto] = useState();

    const handleFileChange = (e) => {
        setReviewPhoto(e.target.files[0]);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData 객체 생성
        const formData = new FormData(document.getElementById("detailReview"));
        // formData.append('file', file); // 파일 추가
        // formData.append('description', description); // 텍스트 데이터 추가

        const token = JSON.parse(sessionStorage.getItem("userData"));

        // const updateReviewInfo = {
        //     ...reviewInfo,
        // }

        try {
            // 서버에 파일 업로드 요청
            const response = await axios.patch('/mypage/review', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // 필요한 경우 토큰 추가
                    'Content-Type': 'multipart/form-data',
                }
            });
            alert("파일 업로드 성공:", response.data);
            window.location.href = '/mypage/review';
        } catch (error) {
            alert("파일 업로드 중 에러 발생:", error);
        }
    };



    return (
        <>
            <form id="detailReview" onSubmit={handleSubmit} method="POST">
                <div>상품명</div>
                <div>
                    <input type="radio" /><FontAwesomeIcon icon={faThumbsUp} size="xl" />
                    <input type="radio" /><FontAwesomeIcon icon={faThumbsDown} size="xl" />
                </div>
                <div>
                    <textarea
                        name="reviewContent"
                        rows="5"
                        cols="50"
                        value={reviewInfo.reviewContent}
                    />
                </div>
                <div>
                    <span>1111</span>
                    <input type="file" id="reviewFile" onChange={handleFileChange} />
                    <span>2222</span>
                </div>
                <div></div>

                <button type="submit">수정</button>
            </form>
        </>
    )

}

export default ReviewPatchForm;
