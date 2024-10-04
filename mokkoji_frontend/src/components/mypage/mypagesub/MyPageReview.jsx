import '../../../css/mypage/MyPageMain.css';
import '../../../css/mypage/subpage/MyPageReviews.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { API_BASE_URL } from "../../../service/app-config";

function MyPageReview({ userReview, myPageReview }) {

    useEffect(() => {
        myPageReview("/mypage/review")
    }, [])

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
                            <Link to='/goods'>
                                굿즈 둘러보러 가기
                            </Link>
                        </div>
                    </div>
                ) :
                (
                    userReview.map((reviews) => {
                        return (
                            <div className="MyCartReviews" key={reviews.reviewsId} >
                                <div className='MyCartCheck'>
                                    {reviews.likeDislike ? <FontAwesomeIcon icon={faThumbsUp} size="xl" /> : <FontAwesomeIcon icon={faThumbsDown} size="xl" />}
                                </div>

                                <div className="MyLikePhoto">
                                    <img src={`${API_BASE_URL}/resources/reviewsImages/${reviews.reviewPhoto}`} alt={reviews.productName} />
                                </div>
                                <div className='MyLikeInfo'>
                                    <h4>{reviews.productName}</h4>
                                </div>
                                <div className='ReviewsContainer'>
                                    {reviews.reviewContent}
                                </div>
                                <div className='MyLikeButton'>
                                    {reviews.reviewDate}
                                    <button >리뷰 삭제</button>
                                </div>
                            </div >  // mylikegird
                        )   // return
                    })  // map
                )
            }

            <div className='MyReviewsFooter'>

                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    {/* <button className='SelectBuyButton' >리뷰 작성</button> */}
                </div>
            </div>

        </div>
    )
}

export default MyPageReview;
