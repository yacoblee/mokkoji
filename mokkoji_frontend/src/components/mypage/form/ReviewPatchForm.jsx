import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from "../../../service/app-config";

function ReviewPatchForm({ userReviewDetail }) {

    const [reviewInfo, setReviewInfo] = useState(userReviewDetail);

    const [reviewPhoto, setReviewPhoto] = useState();
    const [likeDislike, setLikeDislike] = useState(reviewInfo.likeDislike);
    const [reviewContent, setReviewContent] = useState(reviewInfo.reviewContent);

    const handleFileChange = (e) => {
        setReviewPhoto(e.target.files[0]);
    }

    const handleCheckChange = (e) => {
        setLikeDislike(e.target.value === 'true');
    };

    const handleContentChange = (e) => {
        setReviewContent(e.target.value);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData 객체 생성
        const formData = new FormData(document.getElementById("detailReview"));

        formData.append("reviewId", reviewInfo.reviewId);


        // 사진 미추가시 리셋되는 문제 해결 필요
        // if (!reviewPhoto) {
        //     formData.delete("reviewPhotoF");
        //     formData.append("reviewPhotoF", reviewInfo.reviewPhoto); // 기존 사진 정보를 유지
        // }

        const token = JSON.parse(sessionStorage.getItem("userData"));

        try {
            // 서버에 파일 업로드 요청
            const response = await axios.patch(`${API_BASE_URL}/mypage/review`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // 필요한 경우 토큰 추가
                    'Content-Type': 'multipart/form-data',
                }
            });
            // alert("파일 업로드 성공:", response.data);
            window.location.href = '/mypage/review';
        } catch (error) {
            alert("파일 업로드 중 에러 발생:", error);
        }
    };



    return (
        <>
            <form id="detailReview" onSubmit={handleSubmit} method="PATCH">
                <div>{reviewInfo.productName}</div>
                <br />

                <div>
                    <input
                        name="likeDislike"
                        type="radio"
                        checked={likeDislike === true}
                        onChange={handleCheckChange}
                        value="true"
                    /><FontAwesomeIcon icon={faThumbsUp} size="xl" />
                    <input
                        name="likeDislike"
                        type="radio"
                        checked={likeDislike === false}
                        onChange={handleCheckChange}
                        value="false"
                    /><FontAwesomeIcon icon={faThumbsDown} size="xl" />
                </div>
                <br />

                <div>
                    <textarea
                        id="reviewContent"
                        name="reviewContent"
                        rows="5"
                        cols="50"
                        onChange={handleContentChange}
                        value={reviewContent}
                    />
                </div>
                <div>
                    <input type="file" id="reviewPhotoF" name="reviewPhotoF" onChange={handleFileChange} />
                </div>
                <div></div>

                <button type="submit">수정</button>
            </form>
        </>
    )

}

export default ReviewPatchForm;
