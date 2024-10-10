import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from 'axios';

function ReviewPatchForm() {

    const [reviewPhoto, setReviewPhoto] = useState();

    const handleFileChange = (e) => {
        setReviewPhoto(e.target.files[0]);
    }


    return (
        <>
            <form onSubmit={handleSubmit} method="POST">
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
                    />
                </div>
                <div>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div></div>


                <button type="submit"></button>
            </form>
        </>
    )

}

export default ReviewPatchForm;
