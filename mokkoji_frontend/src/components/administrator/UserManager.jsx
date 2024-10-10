import React, { useState, useEffect, useRef } from 'react';
import '../../css/administrator/adminUsers.css';
import { apiCall } from '../../service/apiService';
import moment from 'moment';
import { Modal } from 'react-modal';
import { Link } from 'react-router-dom';
import Membership from './../login/Membership';


const UserManagement = () => {
    const [list, setList] = useState([]);  // 리스트 상태 초기화
    const [count, setCount] = useState(0);
    const stday = useRef(null);
    const edday = useRef(null);
    const [responsLength, setResponseLength] = useState('');

    console.log(responsLength);
    const inputData = {
        keyword: '',
        searchType: 'all',
        dateSearchType: 'createdAt',
        startDate: '',
        endDate: '',
        isAdmin: 0,
        size: 5

    };
    const [input, setInput] = useState(inputData);  // 입력 상태 초기화

    // 입력 값 변경 핸들러
    const onChangeValue = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 선택 값 변경 핸들러
    const selectChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value);
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    console.log(input);

    // 날짜 버튼값 변경 핸들러
    const onClickDate = (value) => {
        let start, end;
        switch (value) {
            case '오늘':
                start = moment().format('YYYY-MM-DD');
                end = start;
                break;
            case '어제':
                start = moment().subtract(1, 'day').format('YYYY-MM-DD');
                end = moment().format('YYYY-MM-DD');
                break;
            case '일주일':
                start = moment().subtract(7, 'day').format('YYYY-MM-DD');
                end = moment().format('YYYY-MM-DD');
                break;
            case '한달':
                start = moment().subtract(1, 'months').format('YYYY-MM-DD');
                end = moment().format('YYYY-MM-DD');
                break;
            case '일년':
                start = moment().subtract(1, 'year').format('YYYY-MM-DD');
                end = moment().format('YYYY-MM-DD');
                break;
            case '전체':
                start = '';
                end = '';
                break;
            default:
                return;
        }
        setInput((it) => ({
            ...it,
            startDate: start,
            endDate: end
        }));
        stday.current.value = start;
        edday.current.value = end;

    }


    // 폼 제출 핸들러
    const onSubmitHandler = (e) => {
        e.preventDefault();
        serchDB();  // 검색 함수 호출
    };

    // 검색 DB 함수
    const serchDB = () => {
        let url = "/administrator/users";
        apiCall(url, 'POST', input, null)
            .then((response) => {

                console.log("Response data:", response);  // 응답의 data 확인
                setList(response.data.users);  // 리스트 상태 업데이트
                setCount(response.data.count);// 카운트 상태 업데이트
            })
            .catch((err) => {
                console.error("Error during API call:", err);  // 에러 로그 출력
                setList([]);  // 에러 발생 시 빈 배열로 설정
            });
    };

    // list가 변경된 후 실행되는 useEffect
    useEffect(() => {
        console.log("Updated list:", list);  // list 상태가 변경된 후 출력
        setResponseLength(list.length);
    }, [list]);  // list가 변경될 때마다 실행

    const reset = () => {
        setInput(inputData);
        console.log("초기화 버튼 클릭됨");
    }

    const openNewWindow = () => {
        const newWindow = window.open(
            "http://localhost:3000/Login/Membership",
            "_blank",
            "width=800,height=600"
        )

    }

    return (
        <div className="user-container">
            <h2 className="user-title">회원 정보관리</h2>

            <div className="user-subContainer">
                <h3 className="user-subTitle">기본검색</h3>

                <form onSubmit={onSubmitHandler}>
                    <table className="user-table">
                        <tr>
                            <th>검색어</th>
                            <td className="user-table-td">
                                <select name="searchType" id="searchType" value={input.searchType} onChange={selectChange}>
                                    <option value="all">전체검색</option>
                                    <option value="userId">아이디</option>
                                    <option value="name">회원명</option>
                                    <option value="phoneNumber">핸드폰번호</option>
                                </select>

                                <input type="text" name="keyword" id="keyword" value={input.keyword} className="seachvalue" onChange={onChangeValue} />
                            </td>
                        </tr>

                        <tr>
                            <th>기간검색</th>
                            <td className="user-table-td">
                                <select name="dateSearchType" id="dateSearchType" value={input.dateSearchType} onChange={selectChange}>
                                    <option value="createdAt" key="1">가입날짜</option>
                                    <option value="updatedAt" key="2">수정날짜</option>
                                </select>


                                <input type="date" name="startDate" onChange={selectChange} ref={stday} value={input.startDate}
                                />
                                ~
                                <input type="date" name="endDate" onChange={selectChange} ref={edday} value={input.endDate}
                                />
                                <input type="button" value="전체" onClick={(e) => onClickDate(e.target.value)}
                                />
                                <input type="button" value="오늘" onClick={(e) => onClickDate(e.target.value)}
                                />
                                <input type="button" value="어제" onClick={(e) => onClickDate(e.target.value)}
                                />
                                <input type="button" value="일주일" onClick={(e) => onClickDate(e.target.value)} />
                                <input type="button" value="한달" onClick={(e) => onClickDate(e.target.value)}
                                />
                                <input type="button" value="일년" onClick={(e) => onClickDate(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>레벨</th>
                            <td className="radio-group">
                                <label><input type="radio" name="isAdmin" value="0" onChange={selectChange} checked={input.isAdmin === '0'} /> 유저</label>
                                <label><input type="radio" name="isAdmin" value="1" onChange={selectChange} checked={input.isAdmin === '1'} /> 관리자</label>
                            </td>
                        </tr>

                        <tr>
                            <th>보기</th>
                            <td className="radio-group">
                                <label><input type="radio" name="size" value="5" onChange={selectChange} /> 5개</label>
                                <label><input type="radio" name="size" value="10" onChange={selectChange} /> 10개</label>
                                <label><input type="radio" name="size" value="15" onChange={selectChange} /> 15개</label>
                                <label><input type="radio" name="size" value="20" onChange={selectChange} /> 20개</label>
                            </td>
                        </tr>

                    </table>
                    <div className="user-button">
                        <button type="button" onClick={serchDB}>검색</button>
                        <button type="button" onClick={reset}>초기화</button>
                    </div>
                </form>
                <p>총 회원 수 : <span className="user-count">{count}</span> &nbsp;&nbsp; &nbsp;|&nbsp;&nbsp; 검색 회원 수 : <span className="user-count">{responsLength}</span> </p>

                <h3 className="user-subTitle">검색 결과</h3>
                <div className="user-button2">
                    <button type="button">전체메일 발송</button>
                    <button type="button" onClick={openNewWindow} >+ 회원추가</button>
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
                            <th>이메일</th>
                            <th>로그인</th>
                            <th>접근차단</th>
                        </tr>
                    </thead>
                    <tbody className="user-resultArea2">
                        {list.map(users => (
                            <tr key={users.userSequence}>
                                <td>{users.userSequence}</td>
                                <td> <a href="/" className="users-movimodal">{users.name}</a></td>
                                <td>{users.userId}</td>
                                <td>{users.isAdmin}</td>
                                <td>{users.phoneNumber}</td>
                                <td>{users.createdAt}</td>
                                <td>{users.email}</td>
                                <td>{users.loginCount}</td>
                                <td>{users.blockStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


    );
};

export default UserManagement;