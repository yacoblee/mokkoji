<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>     
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring Join Form **</title>
<link rel="stylesheet" type="text/css" 
		href="/resources/myLib/myStyle.css">
<script src="/resources/myLib/inCheck.js" ></script>		
<script>
"use strict"
//** ID 중복확인
// => UI 개선사항
// => 중복확인 버튼 추가
//    처음 : 중복확인버튼_enable / submit_disable
// => 중복확인 완료후 submit 이 가능하도록
//    중복확인버튼_disable / submit_enable
// => 중복확인 기능 : function idDupCheck()
//    id입력값의 무결성점검 -> id 확인요청 -> 서버로 전송 -> id , selectOne 결과 -> response: 사용가능/불가능 
// => 서버측 : 컨트롤러에 idDupCheck 요청을 처리하는 매핑메서드, view_Page(팝업창) 작성 
function idDupCheck() {
	// 1) id입력값의 무결성점검 
	if ( !iCheck ) { iCheck=idCheck() }
	else {
	// 2) 서버로 id 확인요청	
		let url="idDupCheck?id="+document.getElementById("id").value;
		window.open(url, '_blank', 'width=400,height=300,resizable=yes,scrollbars=yes,toolbar=no,menubar=yes');
	}
} //idDupCheck

//** 입력값의 무결성 점검
//=> ID 중복확인, 무결성 점검
//=> 주의: JS 에서는 변수명과 메서드명 같으면 안됨.

//1) 모든항목 focusout 이벤트핸들러
// => 개별항목 점검확인하는 boolean Type 변수 (스위치변수) 
// => 개별항목 점검 function() 작성
//2) submit 진행전에 점검확인
// => 모든항목의 점검이 완료된 경우에만  submit 진행
// => function inCheck() 로 확인
// => submit 버튼의 onclick 리스너에 등록
//    ( submit 의 default 이벤트 고려 )
// -----------------------------------------
// *** 실습
// 1) 전역변수 정의
	let iCheck=false;
	let pCheck=false;
	let p2Check=false;
	let nCheck=false;
	let aCheck=false; //age
	let poCheck=false;//point
	let bCheck=false;

// 2) 개별적인 이벤트 핸들러
//=> 이벤트: focusout, keydown_EnterKey 적용
//=> 오류가 없으면: switch 변수값을 true, 메시지삭제
//=> 오류가 있으면: switch 변수값을 false, 메시지출력
//=> 순서: Tag인식 -> Tag의 value 가져오기 -> 무결성확인
onload=function() {
//=> window.onload 에서  window는 생략가능
//=> body 의 Tag 들을 인식가능한 상태에서 실행되도록 하기위함

	//=> ID
	document.getElementById("id").focus(); // 첫포커스 지정
	document.getElementById("id").addEventListener('keydown', 
			(e)=>{ if ( e.which==13 ) {
					//=> form Tag 내에서는 enter 사용시 submit 이 발생됨
					//   그러므로 이 이벤트의 제거가 필요함.
					e.preventDefault();
					document.getElementById("password").focus();
					} //if 
			});
	//-> 무결성 점검
	document.getElementById("id").addEventListener('focusout', 
			() => { iCheck=idCheck() });
	
	//=> Password
	document.getElementById("password").addEventListener('keydown', 
			(e)=>{ if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById("password2").focus();
					} //if 
			});
	//-> 무결성 점검
	document.getElementById("password").addEventListener('focusout', 
			() => { pCheck=pwCheck() });
	//=> Password2
	document.getElementById("password2").addEventListener('keydown', 
			(e)=>{ if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById("name").focus();
					} //if 
			});
	//-> 무결성 점검
	document.getElementById("password2").addEventListener('focusout', 
			() => { p2Check=pw2Check() });
	
	// => Name
	document.getElementById('name').addEventListener('keydown',
			(e)=>{
				if (e.which==13) {
					e.preventDefault();
					document.getElementById('age').focus();
				}//if
			});
	// -> 무결성 점검 
	document.getElementById('name').addEventListener('focusout', ()=>{ nCheck=nmCheck(); });
	
	// => Age
	document.getElementById('age').addEventListener('keydown',
			(e)=>{
				if (e.which==13) {
					e.preventDefault();
					document.getElementById('jno').focus();
				}//if
			});
	// -> 무결성 점검 
	document.getElementById('age').addEventListener('focusout', ()=>{ aCheck=agCheck(); });
	
	// => Jno : Focus 이동만
	document.getElementById('jno').addEventListener('keydown',
			(e)=>{
				if (e.which==13) {
					e.preventDefault();
					document.getElementById('info').focus();
				}//if
			});
	// => Info : Focus 이동만
	document.getElementById('info').addEventListener('keydown',
		(e)=>{
			if (e.which==13) {
				e.preventDefault();
				document.getElementById('point').focus();
			}//if
		});
	
	// => Point
	document.getElementById('point').addEventListener('keydown',
			(e)=>{
				if (e.which==13) {
					e.preventDefault();
					document.getElementById('birthday').focus();
				}//if
			});
	// -> 무결성 점검 
	document.getElementById('point').addEventListener('focusout', ()=>{ poCheck=poiCheck(); });
	
	// => Birthday
	document.getElementById('birthday').addEventListener('keydown',
			(e)=>{
				if (e.which==13) {
					e.preventDefault();
					document.getElementById('rid').focus();
				}//if
			});
	// -> 무결성 점검 
	document.getElementById('birthday').addEventListener('focusout', ()=>{ bCheck=bdCheck(); });
	
	// => Rid : Focus 이동만
	document.getElementById('rid').addEventListener('keydown',
		(e)=>{
			if (e.which==13) {
				e.preventDefault();
				document.getElementById('submitTag').focus();
			}//if
		});
	
} //onload

// 3) submit 실행여부 판단 & 실행
//=> 모든 항목에 대한 무결성 확인
//=> 오류가 없으면 submit 진행
//=> 오류가 1개라도 있으면 submit 진행하지 않고 수정유도 
function inCheck() {
	
	if (!iCheck) {document.getElementById("iMessage").innerHTML='필수입력, id 를 확인하세요 ~~'}
	if (!pCheck) {document.getElementById("pMessage").innerHTML='필수입력, password 를 확인하세요 ~~'}
	if (!p2Check) {document.getElementById("p2Message").innerHTML='필수입력, password2 를 확인하세요 ~~'}
	if (!nCheck) {document.getElementById("nMessage").innerHTML='필수입력, name 을 확인하세요 ~~'}
	if (!aCheck) {document.getElementById("aMessage").innerHTML='필수입력, age 를 확인하세요 ~~'}
	if (!poCheck) {document.getElementById("poMessage").innerHTML='필수입력, point 를 확인하세요 ~~'}
	if (!bCheck) {document.getElementById("bMessage").innerHTML='필수입력, birthday 를 확인하세요 ~~'}
	
	if (iCheck && pCheck && p2Check && nCheck  
			   && aCheck && poCheck && bCheck) {
		if ( confirm("정말 가입하십니까 ? (Yes:확인/NO:취소)") ) {
			return true;
		}else {
			alert("~~ 가입이 취소 되었습니다. ~~");
			return false;
		}
	} else {
		return false;
	}
} //inCheck()

</script>		
</head>
<body>
<h2>** Spring JoinForm **</h2>

<!--  ** FileUpLoad Form **
=> form 과 table Tag 사용시 주의사항 : form 내부에 table 사용해야함
   -> form 단위작업시 인식안됨
   -> JQ 의 serialize, FormData 의 append all 등 

=> method="Post" : 255 byte 이상 대용량 전송 가능 하므로

=> <form enctype="속성값">
   <form> 태그의 데이터 (input 의 value)가 서버로 제출될때 해당 데이터가 인코딩되는 방법을 명시함.  
 
=> enctype="multipart/form-data" : 화일 upload 를 가능하게 해줌 
	** multipart/form-data는 파일업로드가 있는 입력양식요소에 사용되는 enctype 속성의 값중 하나이고, 
       multipart는 폼데이터가 여러 부분으로 나뉘어 서버로 전송되는 것을 의미
       이 폼이 제출될 때 이 형식을 서버에 알려주며, 
       multipart/form-data로 지정이 되어 있어야 서버에서 정상적으로 데이터를 처리할 수 있다.     
-->

<form action="mjoin" method="post" enctype="multipart/form-data" id="myform">
<table>
	<tr height="40">
		<td bgcolor="#bcdeff"><label for="id">I D</label></td>
		<td><input type="text" name="id" id="id" placeholder="영문과 숫자로 4~10글자" size="20">
			<button type="button" id="idDup" onclick="idDupCheck()">ID 중복확인</button>
			<br><span id="iMessage" class="eMessage"></span></td>
	</tr>
	<tr height="40">
		<td bgcolor="#bcdeff"><label for="password">Password</label></td>
		<td><input type="password" name="password" id="password" placeholder="특수문자 필수" size="20">
			<br><span id="pMessage" class="eMessage"></span></td>
	</tr>
	<tr height="40">
		<td bgcolor="#bcdeff"><label for="password2">Pw 확인</label></td>
		<td><input type="password" id="password2" placeholder="PW 재입력 확인" size="20">
			<br><span id="p2Message" class="eMessage"></span></td>
	</tr>
	
	<tr height="40">
		<td bgcolor="#bcdeff"><label for="name">Name</label></td>
		<td><input type="text" name="name" id="name" size="20">
			<br><span id="nMessage" class="eMessage"></span></td>
	</tr>
	<tr height="40">
		<td bgcolor="#bcdeff"><label for="age">Age</label></td>
		<td><input type="text" name="age" id="age" size="20">
			<br><span id="aMessage" class="eMessage"></span></td>
	</tr>
		<tr height="40">
		<td bgcolor="#bcdeff"><label for="jno">Jno</label></td>
		
		<!-- jo Table 에서 목록 읽어서 표시하기 
			=> MemberController 의 joinForm 에서 
				jo Table 의 selectList 필요 
			=> Old_version	
				<option value="1">1조: 우린팀이니까</option>
				<option value="2">2조: 모꼬지</option>
				<option value="3">3조: Object Of Coding</option>
				<option value="4">4조: 컴포NaN트</option>
				<option value="7">7조: 칠면조(관리팀)</option>	
		-->
			<td><select name="jno" id="jno">
			<c:forEach var="m" items="${requestScope.banana}">
				<option value="${m.jno}">${m.jno}조: ${m.jname}</option>
			</c:forEach>
			</select></td></tr>
	<tr height="40">
		<td bgcolor="#bcdeff"><label for="info">Info</label></td>
		<td><input type="text" name="info" id="info" placeholder="자기소개 & 희망사항" size="20"></td>
	</tr>
	<tr height="40">
		<td bgcolor="#bcdeff"><label for="point">Point</label></td>
		<td><input type="text" name="point" id="point" placeholder="실수 입력" size="20">
			<br><span id="poMessage" class="eMessage"></span></td>
	</tr>
	<tr height="40">
		<td bgcolor="#bcdeff"><label for="birthday">Birthday</label></td>
		<td><input type="date" name="birthday" id="birthday">
			<br><span id="bMessage" class="eMessage"></span></td>
	</tr>
	<tr height="40">
		<td bgcolor="#bcdeff"><label for="rid">추천인</label></td>
		<td><input type="text" name="rid" id="rid" size="20"></td>
	</tr>
	<!-- File Upload 기능추가 -->
	<tr height="40">
		<td bgcolor="#bcdeff"><label for="uploadfilef">Image</label></td>
		<td><img alt="myImage" src="" class="select_img" width="80" height="100"><br>
			<input type="file" name="uploadfilef" id="uploadfilef" size="20"></td>
		<script>
			document.getElementById('uploadfilef').onchange=function(e){
				if(this.files && this.files[0]) {
					let reader = new FileReader;
					reader.readAsDataURL(this.files[0]);
		 			reader.onload = function(e) {
		 				// => jQuery를 사용하지 않는경우 
		 				document.getElementsByClassName('select_img')[0].src=e.target.result;
		 				
						//$(".select_img").attr("src", e.target.result)
						//				.width(70).height(90); 
					} // onload_function
		 		} // if	
			  }; //change 
		</script>	
	</tr>
	
	<tr><td></td>
		<td><br><input type="submit" value="가입" id="submitTag" 
					onclick="return inCheck()" disabled>&nbsp;&nbsp;
		<!-- => Tag 의 onclick 이벤트를 작성하고, onclick 이벤트핸들러가 가지고있던
    			 기본동작인 submit 을 선택적으로 진행되도록 해준다. 
    			 - submit 진행 : default (또는 return true)
    			 - submit 정지 : submit 이벤트를 무효화 해야함 
    			 				(return false 또는 이벤트.preventDefault())  -->		
    	<!--
			<button onclick="inCheck()">ButtonTest</button>
			** Button Test
				=> default : form 내부에서는 submit 와 동일하게 작동됨 
					         inCheck() 의 return 값에 따라 (true 면) submit 진행됨 
				=> 단, type 속성을 선택하면 (button, reset, submit 등) 속성에 맞게 실행됨
				   예) button 을 선택하면 submit 은 실행되지않음   
				   
			** Enter_Key : form 내부에서는 누르면 submit이 진행됨.   
			-->		 					
			<input type="reset" value="취소">&nbsp;&nbsp;
			<!-- Axios Join Test -->
			<span class="textlink" onclick="axiJoin()">axiJoin</span>
		</td>
	</tr>
</table>
</form>
<br><hr>
<c:if test="${!empty requestScope.message}">
=> ${requestScope.message}<br>
</c:if>
<hr>
&nbsp;<a href="/home">Home</a>&nbsp;
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
</body>
</html>