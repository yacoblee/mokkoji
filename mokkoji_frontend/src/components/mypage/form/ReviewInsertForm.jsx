import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from "../../../service/app-config";

function ReviewInsertForm({ userReviewInsert }) {

    const [reviewContent, setReviewContent] = useState('');
    const [likeDislike, setLikeDislike] = useState('true'); // 'true' 또는 'false'
    const [reviewPhoto, setReviewPhoto] = useState(null);

    const handleFileChange = (e) => {
        setReviewPhoto(e.target.files[0]); // 첫 번째 파일을 상태에 저장
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(document.getElementById("ReviewItem"));

        formData.append("productId", userReviewInsert.productId);
        formData.append("productName", userReviewInsert.productName);

        const token = JSON.parse(sessionStorage.getItem("userData"));
        try {
            const response = await axios.post(`${API_BASE_URL}/mypage/reviews`, formData, {
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
        <form id="ReviewItem" method="POST" onSubmit={handleSubmit}>
            <div>
                <label>리뷰 내용:</label>
                <textarea
                    name="reviewContent"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>좋아요/싫어요:</label>
                <label>
                    <input
                        name="likeDislike"
                        type="radio"
                        value="true"
                        checked={likeDislike === 'true'}
                        onChange={() => setLikeDislike('true')}
                    />
                    좋아요
                </label>
                <label>
                    <input
                        name="likeDislike"
                        type="radio"
                        value="false"
                        checked={likeDislike === 'false'}
                        onChange={() => setLikeDislike('false')}
                    />
                    싫어요
                </label>
            </div>
            <div>
                <label htmlFor="reviewPhotoF">사진 업로드:</label>
                <input
                    type="file"
                    id="reviewPhotoF"
                    name="reviewPhotoF"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <button type="submit">리뷰 제출</button>
        </form>
    );
};

export default ReviewInsertForm;
