<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>     
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>** Board Insert **</title>
	<link rel="stylesheet" type="text/css" 
		  href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Spring_Boot Mybatis Board Insert **</h2>
<form action="insert" method="post">
<table>
	<tr height="40">
		<td bgcolor="YellowGreen"><label for="id">I D</label></td>
		<td><input type="text" name="id" value="${sessionScope.loginID}" readonly size="20"></td>
	</tr>
	<tr height="40">
		<td bgcolor="YellowGreen"><label for="title">Title</label></td>
		<td><input type="text" name="title" id="title" placeholder="글제목 필수항목" size="50"></td>
	</tr> 
	<tr height="40">
		<td bgcolor="YellowGreen"><label for="ctt">Content</label></td>
		<td><textarea rows="5" cols="50" name="content" id="ctt"></textarea></td>
		<!-- ** 주의 : id를 name가 동일하게 content 로 하면 textarea 가 표시되지않음 -->
	</tr>
	<tr><td></td>
		<td><input type="submit" value="글등록">&nbsp;&nbsp;
			<input type="reset" value="취소">
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