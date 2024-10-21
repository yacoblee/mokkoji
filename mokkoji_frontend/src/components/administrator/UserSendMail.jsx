import React, { useEffect, useState, useNavigat } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/administrator/UserSendMail.css'
import { apiCall } from '../../service/apiService';

const UserSendMail = () => {
    const location = useLocation();
    const navigator = useNavigate();
    // location.state.userId에서 배열을 가져옴
    const users = location.state && Array.isArray(location.state.userId) ? location.state.userId : [];

    const [list, setList] = useState([]);

    const inputData = {
        mailTitle: '',
        mailContent: ''
    }

    const [mailData, setMailData] = useState(inputData);

    // users가 배열일 경우 list에 저장
    useEffect(() => {
        if (users.length > 0) {
            setList(users);
        } else {
            // console.error('users 배열이 전달되지 않았습니다.');
        }
    }, [users]);

    const onChangeValue = (e) => {
        const { name, value } = e.target;
        setMailData((it) => ({
            ...it,
            [name]: value
        }))
    }
    // location.state 데이터 확인용
    useEffect(() => {

    }, []);


    const formSubmit = (e) => {
        e.preventDefault();

        if (mailData.mailTitle.length < 5 || mailData.mailContent.length < 5) {
            alert('제목과 본문내용을 최소 5글자 이상 작성하세요');
            return;
        }
        let url = "/administrator/users/userinfo/sendMail"
        const data = {
            email: list.map(user => user.email),
            userId: list.map(user => user.userId),
            name: list.map(user => user.name),
            mailTitle: mailData.mailTitle,
            mailContent: mailData.mailContent
        }
        //console.log(data);
        apiCall(url, 'POST', data, null)
            .then((response) => {
                //console.log(response);
                alert(response.data);
                navigator('/administrator/users');

            })
            .catch((err) => {
                console.error("Error during API call:", err);
            });
    }

    return (
        <div>
            <div className="s_wrap">
                <h1 className='seM-title'>회원 일괄메일발송</h1>
                {/* 폼 제출 시 handleFormSubmit 함수 호출 */}
                <form
                    name="fmailform"
                    id="fmailform"
                    method="post"
                >
                    <input type="hidden" name="w" value="" />
                    <input type="hidden" name="sfl" value="" />
                    <input type="hidden" name="stx" value="" />
                    <input type="hidden" name="page" value="" />
                    <input type="hidden" name="ma_id" value="" />

                    <h2 className='seM-subTitle'>메일 정보</h2>
                    <div className="tbl_frm01">
                        <table className='seM-table'>
                            <tbody>

                                <tr>
                                    <th scope="row">발송유저정보</th>

                                    <td className='none-border'>
                                        {list.length > 0 ? (
                                            list.map((user, index) => (
                                                <tr key={`index-${user.userSequence}`}>
                                                    <td>{index + 1}</td> {/* 인덱스 값을 이용해 번호 출력 */}
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.userId}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4">데이터가 없습니다.</td>
                                            </tr>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label>메일 제목</label>
                                    </th>
                                    <td>
                                        <input
                                            type="text"
                                            name="mailTitle"
                                            id="mailTitle"
                                            size="60"
                                            maxLength="255"
                                            onChange={onChangeValue}
                                        />
                                        <span className="frm_info fc_125">
                                            <br />예) 최대 10,000포인트 득템찬스!! 이벤트에 참여하세요!
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label>메일 내용</label>
                                    </th>
                                    <td>
                                        <textarea name="mailContent" id="mailContent" className='m-textarea'
                                            maxLength="500" onChange={onChangeValue}></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="btn_confirm">
                        <input type="submit" value="보내기" onClick={(e) => formSubmit(e)} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserSendMail;