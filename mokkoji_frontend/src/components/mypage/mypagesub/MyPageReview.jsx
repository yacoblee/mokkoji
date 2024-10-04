import '../../../css/mypage/MyPageMain.css';

import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { API_BASE_URL } from "../../../service/app-config";

function MyPageReview({ userReview, myPageReview }) {

    useEffect(() => {
        myPageReview("/mypage/review")
    }, [])

    return (

        <div className='MyPageReview'>
        </div>
    )
}

export default MyPageReview;
