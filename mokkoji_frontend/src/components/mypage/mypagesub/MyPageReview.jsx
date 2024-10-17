import '../../../css/mypage/MyPageMain.css';
import '../../../css/mypage/subpage/MyPageReviews.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Link } from 'react-router-dom';
import { API_BASE_URL } from "../../../service/app-config";
import ReviewPatchForm from '../form/ReviewPatchForm';

function MyPageReview({ userReview, myPageReview }) {

    useEffect(() => {
        myPageReview("/mypage/review")
    }, [])

    const [userReviewDetail, setUserReviewDetail] = useState();

    //모달 상태창에 대한 true , false
    const [isModalOpen, setIsModalOpen] = useState(false);


    //모달창 오픈
    const openReviewForm = (e, reviewId) => {
        e.preventDefault();
        setUserReviewDetail(userReview.find((reviews) => reviewId === reviews.reviewId));
        setIsModalOpen(true);
    };

    return (

        <div className='MyPageReview'>

            <div className='MyReviewsHeader'>

                <div ></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>


            {userReview.length === 0 ?
                (
                    <div className='TextNoItems'>
                        <h2>작성한 리뷰가 존재하지 않습니다.</h2>
                        <div>
                            <Link to='/orders'>
                                리뷰 작성하러 가기
                            </Link>
                        </div>
                    </div>
                ) :
                (
                    userReview.map((reviews) => {
                        return (
                            <div className="MyCartReviews" key={reviews.reviewId} >
                                <div className='MyCartCheck'>
                                    {reviews.likeDislike ? <FontAwesomeIcon icon={faThumbsUp} size="xl" /> : <FontAwesomeIcon icon={faThumbsDown} size="xl" />}
                                </div>

                                <div className="MyLikePhoto">
                                    <img src={`${API_BASE_URL}/resources/reviewImages/${reviews.reviewPhoto}`} alt={reviews.productName} />
                                </div>
                                <div className='MyLikeInfo'>
                                    <h4>{reviews.productName}</h4>
                                </div>
                                <div className='ReviewsContainer'>
                                    {reviews.reviewContent}
                                </div>
                                <div className='MyLikeButton'>
                                    {reviews.reviewDate}
                                    <button onClick={(event) => openReviewForm(event, reviews.reviewId)} >리뷰 수정</button>
                                </div>
                            </div >  // mylikegird
                        )   // return
                    })  // map
                )
            }

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="주소 검색"
                style={{
                    content: {
                        width: '500px',
                        height: '500px',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <ReviewPatchForm
                    userReviewDetail={userReviewDetail}
                />
            </Modal>

        </div>
    )
}

export default MyPageReview;
