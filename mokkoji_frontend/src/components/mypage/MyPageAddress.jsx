import React, { useState, useEffect } from 'react';

function MyPageAddress({ userMain, userAddress, myPageAddress }) {

    useEffect(() => {
        myPageAddress("/mypage/address")
    }, [])

    return (
        <>
            <div>

                Juso

            </div>
        </>
    )
}

export default MyPageAddress;
