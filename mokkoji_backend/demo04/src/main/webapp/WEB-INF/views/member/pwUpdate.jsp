<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring_Boot JPA Password Update **</title>
<link rel="stylesheet" type="text/css" 
		    href="/resources/myLib/myStyle.css">
<script src="/resources/myLib/inCheck.js" ></script>	
<script>
	let pCheck=false;
	let p2Check=false;
	
	onload=function() {
		document.getElementById('password').focus();
		// => Password
		document.getElementById('password').addEventListener('keydown',
				(e)=>{
					if (e.which==13) {
						e.preventDefault();
						document.getElementById('password2').focus();
					}//if
				});
		// -> 무결성 점검 
		document.getElementById('password').addEventListener('focusout', ()=>{ pCheck=pwCheck(); });
		
		// => Password2
		document.getElementById('password2').addEventListener('keydown',
				(e)=>{
					if (e.which==13) {
						e.preventDefault();
						document.getElementById('submitTag').focus();
					}//if
				});
		// -> 무결성 점검 
		document.getElementById('password2').addEventListener('focusout', ()=>{ p2Check=pw2Check(); });
	} //onload
	
	function inCheck() {
		if (!pCheck) { document.getElementById('pMessage').innerHTML=' 필수입력, password 를 확인하세요~~'; }
		if (!p2Check) { document.getElementById('p2Message').innerHTML=' 필수입력, password2 를 확인하세요~~'; }
		
		if ( pCheck && p2Check ) {
			//=> submit 확인
			if ( confirm("정말 Password를 수정 하십니까? (Yes:확인/No:취소)") ) {
				//=> submit 진행
				return true;
			}else {
				alert("~~ 수정이 취소 되었습니다. ~~");
				return false;
			} //confirm
		}else {
			return false
		} //Check_조건
	} //inCheck

</script>	    
</head>
<body>
<h2>** SpringBoot JPA Password Update **</h2>
<div align="center">
<br><b>=> 새로운 Password 를 입력 하세요 ~~</b><br><br>
<form action="pwUpdate" method="post">
<table>
	<tr height="40">
		<td bgcolor="LightCyan"><label>Password</label></td>
		<td><input type="password" id="password" name="password">
			<br><span id="pMessage" class="eMessage"></span>
		 </td>
	</tr>
	<tr height="40">
		<td bgcolor="LightCyan"><label>재 확 인</label></td>
		<td><input type="password" id="password2" placeholder="반드시 입력 하세요">
			<br><span id="p2Message" class="eMessage"></span>
		 </td>
	</tr>
	<tr height="40">
		<td></td>
		<td><input type="submit" value="수정" id="submitTag"
								 onclick="return inCheck()">&nbsp;&nbsp;
			<input type="reset" value="취소">
		 </td>
	</tr>
</table>
</form>
</div>
<hr>
<c:if test="${!empty requestScope.message}">
=> ${requestScope.message}<br>
</c:if>
<hr>
&nbsp;<a href="pwUpdate">Password_수정</a>&nbsp;
&nbsp;<a href="/home">Home</a>&nbsp;
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;

</body>
</html>