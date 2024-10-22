import React, { useState, useEffect, useRef } from 'react';
import '../../css/administrator/adminUsers.css';
import { apiCall } from '../../service/apiService';
import moment from 'moment';
import RenderPagination from "../product/RenderPagination";
import { useNavigate } from 'react-router-dom';
import UserSendMail from './UserSendMail';

const UserManagement = () => {
    const [list, setList] = useState([]);  // 리스트 상태 초기화
    const [count, setCount] = useState(0);
    const stday = useRef(null);
    const edday = useRef(null);
    const [responsLength, setResponseLength] = useState('');
    const [pageMaker, setPageMaker] = useState({});
    const [page, setPage] = useState(1);
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    const [userAddress, setUsersAddress] = useState([]);
    const [userinfo, setUserinfo] = useState(list);

    const userOrder = {
        averagePurchaseAmount: '',// 평균 주문 금액
        orderCount: '', // 구매 횟수
        totalPurchaseAmount: '', // 유저 기준 총 구매금액
        purchaseRank: '',// 구매 금액 기준 순위
        percentapercentageRankgeRank: '', // 백분위 순위 
        totalAmount: '' // order 기준 구매 총합 
    }
    const [userOrderinfo, setUsersOrderinfo] = useState(userOrder);
    const inputData = {
        keyword: '',
        searchType: 'all',
        dateSearchType: 'createdAt',
        startDate: '',
        endDate: '',
        isAdmin: "0",
        size: "5",
        page: 1,
    };
    const [input, setInput] = useState(inputData);  // 입력 상태 초기화
    const [pageRequest, setPageRequest] = useState(inputData);
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
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

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
                const { users, count, pageMaker } = response.data;
                setList(users);  // 리스트 상태 업데이트
                setCount(count);// 카운트 상태 업데이트
                setPageMaker(pageMaker);
                setResponseLength(pageMaker.totalElements);
            })
            .catch((err) => {
                setList([]);  // 에러 발생 시 빈 배열로 설정
            });
    };

    // list가 변경된 후 실행되는 useEffect
    useEffect(() => {
        setUserinfo(list);
    }, [list]);  // list가 변경될 때마다 실행

    useEffect(() => {
        // 페이지 변경 시 pageRequest를 업데이트하고 searchData 호출
        setInput(prev => ({ ...prev, page: page }));
    }, [page]);

    useEffect(() => {
        serchDB();
    }, [input.page]);


    const reset = () => {
        setPage(1);
        setInput(inputData);
    }

    const openNewWindow = () => {

        window.open(
            //로컬주소
            "http://localhost:3000/Login/Membership",
            //혜미주소
            //"http://13.209.236.187/Login/Membership",
            //승현주소
            // "http://15.164.55.161/Login/Membership",

            "_blank",
            "width=800,height=600"
        )
    }

    const moveToUserinfo = (targetUser) => {
        let url = "/administrator/users/address";
        // 사용자 정보 상태로 저장
        setSelectedUser(targetUser);
        // API 호출
        apiCall(url, 'POST', targetUser, null)
            .then((response) => {
                //console.log(response.data);
                const { address, orderCount, totalPurchaseAmount, averagePurchaseAmount, userPurchaseRank, totalAmount } = response.data;

                // console.log("888통계포함8888", response.data);
                // userPurchaseRank가 null일 경우 방어 코드로 기본값 설정
                const percentageRank = userPurchaseRank && userPurchaseRank.percentageRank ? userPurchaseRank.percentageRank : 0;

                // address 배열이 null이거나 비어 있는 경우 처리
                const userAddress = address && address.length > 0 ? address : [];
                // navigate 호출
                navigate(`/administrator/users/userinfo`, {
                    state: {
                        users: targetUser,
                        userAddress: userAddress,
                        orderCount: orderCount || 0,
                        totalPurchaseAmount: totalPurchaseAmount || 0,
                        percentageRank: percentageRank,
                        totalAmount: totalAmount || 0,
                        averagePurchaseAmount: averagePurchaseAmount || 0
                    }
                });

            })
            .catch((err) => {
                setUsersAddress(null);  // 에러 발생 시 주소 정보 초기화
            });
    }

    const [selectUser, setSelcetUser] = useState([]);
    const [isAllCheckUser, setIsAllCheckUser] = useState(false)
    const allUserCheck = () => {
        if (isAllCheckUser) {
            // 전체 선택 해제
            setSelcetUser([]);
            setIsAllCheckUser(false)
        } else {
            const allUser = list.map(users => users);
            setSelcetUser(allUser);
            setIsAllCheckUser(true);
        }
    }

    // 개별 유저 선택/해제 함수
    const checkSendMailUser = (user) => {
        setSelcetUser((prevSelectedUsers) => {
            // 유저가 이미 선택되어 있는지 확인
            if (prevSelectedUsers.some(selected => selected.userId === user.userId)) {
                // 선택된 유저를 선택 해제
                const updatedUsers = prevSelectedUsers.filter(selected => selected.userId !== user.userId);
                // 전체 선택 체크 해제
                setIsAllCheckUser(updatedUsers.length === list.length);
                return updatedUsers;
            } else {
                // 선택되지 않은 유저 추가
                const updatedUsers = [...prevSelectedUsers, user];
                // 모든 유저가 선택되면 전체 선택 체크
                setIsAllCheckUser(updatedUsers.length === list.length);
                return updatedUsers;
            }
        });
    };

    const moveToSendMail = () => {
        if (selectUser.length > 0) {
            navigate('/administrator/users/userinfo/userSendMail', { state: { userId: selectUser } });
        } else {
            alert('메일을 발송할 유저를 선택하세요');
        }
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
                                <label><input type="radio" name="isAdmin" value="2" onChange={selectChange} checked={input.isAdmin === "2"} /> 전체</label>
                                <label><input type="radio" name="isAdmin" value="0" onChange={selectChange} checked={input.isAdmin === "0"} /> 유저</label>
                                <label><input type="radio" name="isAdmin" value="1" onChange={selectChange} checked={input.isAdmin === "1"} /> 관리자</label>
                            </td>
                        </tr>

                        <tr>
                            <th>보기</th>
                            <td className="radio-group">
                                <label><input type="radio" name="size" value="5" onChange={selectChange} checked={input.size === "5"} /> 5개</label>
                                <label><input type="radio" name="size" value="10" onChange={selectChange} checked={input.size === "10"} /> 10개</label>
                                <label><input type="radio" name="size" value="15" onChange={selectChange} checked={input.size === "15"} /> 15개</label>
                                <label><input type="radio" name="size" value="20" onChange={selectChange} checked={input.size === "20"} /> 20개</label>
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
                    <button type="button" onClick={moveToSendMail}>메일발송</button>
                    <button type="button" onClick={openNewWindow} >+ 회원추가</button>
                </div>
                <table className="user-resultArea">
                    <thead>
                        <tr>
                            <th><input type='checkbox' onChange={allUserCheck} checked={isAllCheckUser} />
                            </th>
                            <th>번호</th>
                            <th>회원명</th>
                            <th>아이디</th>
                            <th>레벨</th>
                            <th>핸드폰</th>
                            <th>가입일시</th>
                            <th>이메일</th>
                            <th>로그인</th>
                            <th>접근차단</th>
                            <th>탈퇴여부</th>
                        </tr>
                    </thead>
                    <tbody className="user-resultArea2">
                        {list.map(users => (
                            <tr key={users.userSequence}>
                                <td>  <input
                                    type="checkbox"
                                    checked={selectUser.some(selected => selected.userId === users.userId)}  // 개별 선택 상태
                                    onChange={() => checkSendMailUser(users)}  // 유저 선택/해제
                                /> </td>
                                <td>{users.userSequence}</td>
                                {/* onClick에서 users 객체를 moveToUserinfo로 전달 */}
                                <td><a onClick={() => {
                                    moveToUserinfo(users);
                                }}> {users.name} </a></td>
                                <td>{users.userId}</td>
                                <td>{users.isAdmin}</td>
                                <td>{users.phoneNumber}</td>
                                <td>{users.createdAt}</td>
                                <td>{users.email}</td>
                                <td>{users.loginCount}</td>
                                <td>{users.blockStatus}</td>
                                <td>{users.isWithdrawn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <RenderPagination pageMaker={pageMaker} page={page} setPage={setPage} />
        </div>


    );
};

export default UserManagement;