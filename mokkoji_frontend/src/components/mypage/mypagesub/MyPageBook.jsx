import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../../service/app-config";

import '../../../css/mypage/subpage/MyPageBook.css';

function MyPageBook({ myPageRegist, userRegist, bookUpdateAdult, bookUpdateTeen, bookDelete }) {

    useEffect(() => {
        myPageRegist("/mypage/book")
    }, [])



    return (
        <div>
            {userRegist.map((regist) => (
                <table className='BookTableList' key={regist.registId}>
                    <tr>
                        <td className='BookImageCell' rowSpan={2}>
                            <img src={`${API_BASE_URL}/resources/reserveImages/${regist.imageName}`} alt={regist.name} />
                        </td>
                        <td rowSpan={2}>{regist.name}</td>
                        <td>성인</td>
                        <td>청소년</td>
                        <td rowSpan={2}>총 금액 : {regist.registCnt}</td>
                        <td rowSpan={2}>
                            <button className='SelectDeleteButton' onClick={() => { bookDelete(`/mypage/cart/${regist.registId}`) }}>
                                삭제
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className='MyCartCount'>
                                <div className='MyProductCount'>
                                    <img src="/images/buy/minus.png" alt="minus" onClick={() =>
                                        bookUpdateAdult(`/mypage/adult/${regist.registId}/${regist.adultCnt - 1}`)} />
                                    <input type="text" min={1} value={regist.adultCnt} />
                                    <img src="/images/buy/plus.png" alt="plus" onClick={() =>
                                        bookUpdateAdult(`/mypage/adult/${regist.registId}/${regist.adultCnt + 1}`)} />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='MyCartCount'>
                                <div className='MyProductCount'>
                                    <img src="/images/buy/minus.png" alt="minus" onClick={() =>
                                        bookUpdateTeen(`/mypage/teen/${regist.registId}/${regist.teenagerCnt - 1}`)} />
                                    <input type="text" min={1} value={regist.teenagerCnt} />
                                    <img src="/images/buy/plus.png" alt="plus" onClick={() =>
                                        bookUpdateTeen(`/mypage/teen/${regist.registId}/${regist.teenagerCnt + 1}`)} />
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            ))}
        </div>
    );  //return

}

export default MyPageBook;
