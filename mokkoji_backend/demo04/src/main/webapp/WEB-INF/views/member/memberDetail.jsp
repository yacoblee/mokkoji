<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring Member Detail **</title>
<link rel="stylesheet" type="text/css" 
		href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Spring MemberDetail **</h2>
<table>
<c:if test="${not empty requestScope.apple}">
	<tr height="40"><th bgcolor="SkyBlue">I D</th>
		<td>${requestScope.apple.id}</td></tr>
	<tr height="40"><th bgcolor="SkyBlue">Password</th>
		<td>${requestScope.apple.password}</td></tr>	
	<tr height="40"><th bgcolor="SkyBlue">Name</th>
		<td>${requestScope.apple.name}</td></tr>	
	<tr height="40"><th bgcolor="SkyBlue">Age</th>
		<td>${requestScope.apple.age}</td></tr>
	<tr height="40"><th bgcolor="SkyBlue">Jno</th>
		<td>${requestScope.apple.jno}</td></tr>
	<tr height="40"><th bgcolor="SkyBlue">Info</th>
		<td>${requestScope.apple.info}</td></tr>
	<tr height="40"><th bgcolor="SkyBlue">Point</th>
		<td>${requestScope.apple.point}</td></tr>
	<tr height="40"><th bgcolor="SkyBlue">Birthday</th>
		<td>${requestScope.apple.birthday}</td></tr>
	<tr height="40"><th bgcolor="SkyBlue">추천인</th>
		<td>${requestScope.apple.rid}</td></tr>	
	<tr height="40"><th bgcolor="SkyBlue">Image</th>
		<td><img alt="myImage" width="50" height="70"
				 src="/resources/uploadImages/${requestScope.apple.uploadfile}"></td></tr>									
</c:if>
<c:if test="${empty requestScope.apple}">
	<tr><td colspan="2">~~ 출력할 자료가 없습니다. ~~</td></tr>
</c:if>
</table>
<hr>
&nbsp;<a href="/home" >Home</a>&nbsp;
&nbsp;<a href="javascript:history.go(-1)" >이전으로</a>&nbsp;
</body>
</html>