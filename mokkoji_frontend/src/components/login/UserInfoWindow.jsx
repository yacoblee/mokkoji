import React from 'react';
import axios from 'axios';
const UserInfoWindow = ({ users, onClose }) => {

	React.useEffect(() => {
		console.log("UserInfoWindow opened with user:", users); // 확인용 로그
		const newWindow = window.open("", "_blank", "width=600,height=400");

		console.log("New window object:", newWindow); // 새 창 객체가 제대로 생성되는지 확인

		if (newWindow) {
			const windowContent = `
        <html>
          <head>
            <title>User Info</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .user-info { margin-bottom: 20px; }
              .user-info h2 { margin: 0; }
              .close-btn { padding: 10px; background-color: #f44336; color: white; border: none; cursor: pointer; }
              .user-subTitle { position: relative; padding-left: 8px; margin: 15px 0;}

              .user-subTitle::before { display: inline-block;position: absolute; left: 0; top: 0; width: 4px; height: 100%; background: #1a4f9981; content: '';}

              .tableoutline {border-collapse: collapse;}
              .tableoutline th{border: 1px solid black; }
               .tableoutline td{border: 1px solid black; }

               .table2 th{border: 1px solid black;}
               .table2 td{border: 1px solid black;}
            </style>
              <script src="../../src/service/apiService.js"></script>
          </head>
          <body>

          <h2>회원정보수정</h2>
          <hr>
           <h3 class="user-subTitle">기본정보</h3>
           <hr>
            <div class="user-info">
           <form name="fmemberform" id="fmemberform" action="./pop_memberformupdate.php" method="post">
<input type="hidden" name="mb_id" value="tubeweb3">

<div id="memberform_pop" class="new_win">
	<section class="new_win_desc marb50">
	<div>
		<table class='tableoutline'>
		<tbody>
		<tr>
			<th>회원명</th>
			<td>
				${users.name}
								<button type="button">회원탈퇴</button>
			</td>
			<th>아이디</th>
			<td>${users.userId}</td>
		</tr>

		<tr>
      <th>생년월일</th>
			<td>${users.birthDate}</td>
      <th>성별</th>
			<td>${users.gender}</td>
		</tr>
	<tr>
			<th>비밀번호</th>
			<td><input type="text" name="passwd" value="************" class="frm_input"> </td>
			<th scope="row">E-Mail</th>
			<td><input type="text" name="email" value="${users.email}" email itemname="E-Mail" class="frm_input" size="30"></td>
		</tr>

		<tr>
    <th>휴대전화</th>
    <td><input type="text" name="cellphone" value="${users.phoneNumber}" class="frm_input"></td>
  
   <th>레벨</th>
			<td>${users.isAdmin}</td>
		</tr>

		<tr>
			<th>주소</th>
			<td colspan="3">
				<input type="text" name="zip" value="${users}" class="frm_input" size="8" maxlength="5">
				<a href="javascript:win_zip('fmemberform', 'zip', 'addr1', 'addr2', 'addr3', 'addr_jibeon');" class="btn_small grey">주소검색</a>
				<p class="mart5"><input type="text" name="addr1" value="${users}" class="frm_input" size="60"> 기본주소</p>
				<p class="mart5"><input type="text" name="addr2" value="${users}" class="frm_input" size="60"> 상세주소</p>
				<p class="mart5"><input type="text" name="addr3" value="${users}" class="frm_input" size="60"> 참고항목
				<input type="hidden" name="addr_jibeon" value="R"></p>
			</td>
		</tr>
		</tbody>
		</table>
	</div>

	<h3 class="user-subTitle">기타정보</h3>
	<div class="tbl_frm01">
		<table class="table2">
		<tbody>
		<tr>
			<th scope="row">회원가입일</th>
			<td>${users.createdAt}</td>
			<th scope="row">회원정보수정날짜</th>
			<td>${users.updatedAt}</td>
		</tr>
		<tr>
			<th scope="row">로그인횟수</th>
			<td>${users.loginCount} 회</td>
			<th scope="row">최근접속일</th>
			<td>${users}</td>
		</tr>
		<tr>
			<th scope="row">구매횟수</th>
			<td>${users}</td>
			<th scope="row">총구매금액</th>
			<td>${users}원</td>
		</tr>
		<tr>
			<th scope="row">접근차단일자</th>
			<td>
				<input type="text" name="intercept_date" value="" id="intercept_date" class="frm_input" size="10" maxlength="8">
				<input type="checkbox" value="20241011" id="mb_intercept_date_set_today" onclick="if(this.form.intercept_date.value==this.form.intercept_date.defaultValue) { this.form.intercept_date.value=this.value; } else {
this.form.intercept_date.value=this.form.intercept_date.defaultValue; }">
				<label for="mb_intercept_date_set_today">접근차단일을 오늘로 지정</label>
			</td>
		<th scope="row">1회 평균 금액</th>
			<td>${users}원</td>
		</tr>
    <tr>
      	<th>관리자메모</th>
			<td colspan="3"><textarea name="memo" class="frm_textbox" rows="3"></textarea></td>

    </tr>
		</tbody>
		</table>
	</div>

	<div class="btn_confirm">
		<input type="submit" value="저장" class="btn_medium" accesskey="s">
		<button type="button" class="btn_medium bx-white" onclick="window.close();">닫기</button>
	</div>
	</section>
</div>
</form>



           
            </div>
            <button class="close-btn" onclick="window.close()">창 닫기</button>
      <script>
  document.getElementById('fmemberform').onsubmit = function(event) {
    event.preventDefault(); // 폼의 기본 동작(페이지 리프레시) 방지

    const formData = new FormData(document.getElementById('fmemberform')); // 폼 데이터 수집

    // Axios를 사용한 서버 요청
    axios.post('https://localhost:3000/administrator/users', formData)
      .then(response => {
        alert('데이터가 성공적으로 전송되었습니다.');
        console.log('서버 응답:', response.data);
      })
      .catch(error => {
        alert('서버 전송에 실패했습니다.');
        console.error('서버 오류:', error);
      });
  };
</script>
            </body>
        </html>
      `;

			newWindow.document.write(windowContent);
			newWindow.document.close();


			if (newWindow.closed) {
				onClose();
				clearInterval(timer);
			}


			return () => {
				if (!newWindow.closed) {
					newWindow.close();
				}
			};
		} else {
			console.log("Pop-up was blocked."); // 팝업 차단 확인 로그
			alert("팝업이 차단되었습니다. 브라우저 설정을 확인하세요.");
		}
	}, [users, onClose]);

	return null; // 컴포넌트 자체는 렌더링하지 않음
};

export default UserInfoWindow;
