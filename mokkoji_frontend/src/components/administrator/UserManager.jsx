import React, { useState } from 'react';
const UserManagement = () => {


    return (
        <div className="user-container">
            <h2 className="user-title">회원 정보관리</h2>

            <div className="user-subContainer">
                <h3 className="user-subTitle">기본검색</h3>

                <form>
                    <table className="user-table">
                        <tr>
                            <th>검색어</th>
                            <td className="user-table-td">
                                <select name="categoryId" id="productSearch">
                                    <option value="" key="">아이디</option>
                                    <option value="" key="">회원명</option>
                                    <option value="" key="">핸드폰번호</option>
                                </select>

                                <input type="text" name="keyword" id="productInput" className="seachvalue" />
                            </td>
                        </tr>

                        <tr>
                            <th>기간검색</th>
                            <td className="user-table-td">
                                <select name="categoryId" id="productSearch">
                                    <option value="" key="">최근접속</option>
                                    <option value="" key="">가입날짜</option>
                                </select>


                                <input type="date" name="startDate"
                                />
                                ~
                                <input type="date" name="endDate"
                                />
                                <input type="button" value="전체"
                                />
                                <input type="button" value="오늘"
                                />
                                <input type="button" value="어제"
                                />
                                <input type="button" value="일주일"
                                />
                                <input type="button" value="한달"
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>레벨</th>
                            <td className="radio-group">
                                <label><input type="radio" name="categoryId" value="1" /> 유저</label>
                                <label><input type="radio" name="categoryId" value="2" /> 관리자</label>
                            </td>
                        </tr>

                    </table>
                    <div className="user-button">
                        <button type="button">검색</button>
                        <button type="button" >초기화</button>
                    </div>
                </form>
                <p className="user-count">총 회원 수 : { }</p>
                <h3 className="user-subTitle">검색 결과</h3>
                <div className="user-button2">
                    <button type="button">전체메일 발송</button>
                    <button type="button" > + 회원추가</button>
                </div>
                <table className="user-resultArea">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>회원명</th>
                            <th>아이디</th>
                            <th>레벨</th>
                            <th>핸드폰</th>
                            <th>가입일시</th>
                            <th>구매수</th>
                            <th>로그인</th>
                            <th>접근차단</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>


    );
};

export default UserManagement;
