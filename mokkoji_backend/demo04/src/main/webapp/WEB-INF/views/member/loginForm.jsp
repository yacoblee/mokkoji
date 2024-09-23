<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring LoginForm **</title>
<link rel="stylesheet" type="text/css" 
		href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Spring LoginForm **</h2>
<form action="login" method="post">
<table>
	<tr height="40"><td bgcolor="#66d9ff"><label for="id">I D</label></td>
		<td><input type="text" id="id" name="id"></td>
	</tr>
	<tr height="40"><td bgcolor="#66d9ff"><label for="password">Password</label></td>
		<td><input type="text" id="password" name="password"></td>
	</tr>
	<tr height="40"><td></td>
		<td><input type="submit" value="로그인">&nbsp;&nbsp;
			<input type="reset" value="취소">
		</td>
	</tr>
</table>
</form>
<hr>
<c:if test="${not empty requestScope.message}">
=> ${requestScope.message}<br>
</c:if>	
 <hr>
&nbsp;<a href="/home" >Home</a>&nbsp;
&nbsp;<a href="javascript:history.go(-1)" >이전으로</a>&nbsp;
</body>
</html>