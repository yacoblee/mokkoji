import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import '../../css/administrator/adminUsers.css';
const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  return (
    <div>
      <h1>User Management</h1>
      <div className="container">
          <form className="formcontainer" id='membership' method='post'>
              <label htmlFor ="name">이름</label>
              <input type="text"/>



              <label htmlFor="id">아이디</label>
              <div className="rowarea">
                  <input type="text"
                      name="id"
                      id="id"
                      maxLength={13}
                      placeholder='test'

                  />
                  <button
                      type='button'>검사</button>
              </div>



              <label htmlFor="pw">비밀번호</label>
              <input type="text"
                  placeholder='7~14글자 이하 영문 숫자 특수문자 조합으로 비밀번호를 입력해주세요'
                  maxLength={14}
                  name="pw"
                  id="pw"

              />
              <p>에러</p>

              <label htmlFor="checkPw">비밀번호 확인</label>
              <input type="text"
                  placeholder='위에서 입력한 비밀번호와 동일하게 입력해주세요'
                  name="checkPw"
                  id="checkPw"
                  maxLength={14}

              />



              <label>주소</label>
              <div className="rowarea address">
                  <input type="text"
                      placeholder='우편번호'
                      name='zoneCode'
                      maxLength={5} readOnly />
                  <button id='btn'>우편번호 검색</button>
              </div>
              <input type="text"
                  placeholder='주소'
                  name='address' readOnly />
              <input type="text"
                  name='addressDetail'
                  placeholder='주소'

              />
              <p></p>

              <label htmlFor="phoneNumeber">전화번호</label>
              <div className='phoneNumber'>
                  <input type="text"
                      id='phoneNumeber'
                      maxLength={5}
                      placeholder='2~5자리'
                      name='firstNumber'

                  />
                  <span>-</span>
                  <input type="text"
                      placeholder='3~4자리'
                      maxLength={4}
                      name='secondNumber'
       
                  />
                  <span>-</span>
                  <input type="text"
                      placeholder='4자리'
                      maxLength={4}
                      name='lastNumber'

                  />
              </div>
              <p>에러</p>

              <label htmlFor="birthDate">생년월일</label>
              <input type="date"
                  name="birthDate"
                  id="birthDate"

              />
              
              <p>에러</p>


              <label htmlFor="gender">성별</label>
              <div className='genderbutton'>
                  <button type='button'
                      id='gender'
                      name='gender'
                      value='M'
                  >
                      남성</button>

                  <button type='button'
                      name='gender'
                      value='F'

                  >여성</button>
              </div>
              <p></p>
              <label htmlFor='email'>이메일</label>
              <div className='emailArea'>
                  <input type="text" id='email' name='email' />
                  <span>@</span>
                  <input type="text"
                      name='emailType'
                  />
                  <select className="box"
                      id="domain-list" >
                      <option value="self">직접입력</option>
                      <option value="naver.com">naver.com</option>
                      <option value="google.com">google.com</option>
                      <option value="hanmail.net">hanmail.net</option>
                      <option value="nate.com">nate.com</option>
                      <option value="kakao.com">kakao.com</option>
                  </select>
              </div>
              <br />
              <div className='buttonarea'>
                  <button type='button' >가입하기</button>
              </div>
          </form>
      </div>

    </div>
  );
};

export default UserManagement;
