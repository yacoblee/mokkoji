<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>** Jo Detail Spring_Boot Mybatis **</title>
	<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Jo Detail Spring_Boot Mybatis **</h2>
<hr>
<c:if test="${not empty requestScope.apple}"> 
	<table>
		<tr height="40"><td bgcolor="Lavender">Jno</td><td>${apple.jno}</td></tr>
		<tr height="40"><td bgcolor="Lavender">JoName</td><td>${apple.jname}</td></tr>
		<tr height="40"><td bgcolor="Lavender">CaptainID</td><td>${apple.captain}</td></tr>
		<tr height="40"><td bgcolor="Lavender">Project</td><td>${apple.project}</td></tr>
		<tr height="40"><td bgcolor="Lavender">Slogan</td><td>${apple.slogan}</td></tr>
	</table>
</c:if>
<c:if test="${empty requestScope.apple}">
	<hr>
	~~ 출력할 자료가 없습니다. ~~<br>
</c:if>
<hr>
<h3>** ${apple.jno} Jo MemberList **</h3>
<table width=100%> 
	<tr bgcolor="LavenderBlush" height="30">
		<th>I D</th><th>Name</th><th>Age</th>
		<th>Jno</th><th>Info</th><th>Point</th><th>Birthday</th><th>추천인</th>
	</tr>
	<c:if test="${not empty requestScope.banana}">
		<c:forEach  var="m" items="${requestScope.banana}" >
		<tr height="30">
		<td>${m.id}</td><td>${m.name}</td>
		<td>${m.age}</td><td>${m.jno}</td><td>${m.info}</td>
		<td>${m.point}</td><td>${m.birthday}</td><td>${m.rid}</td>
		</tr>
		</c:forEach>	
	</c:if>
	<c:if test="${empty requestScope.banana}">
		<tr><td colspan="9">~~ 출력할 자료가 없습니다. ~~</td></tr>
	</c:if>
</table>

<hr>
<c:if test="${not empty message}">
	${message}<br>
</c:if>
<hr>
&nbsp;<a href="joInsert">[조등록]</a>&nbsp;
&nbsp;<a href="detail?jCode=U&jno=${apple.jno}">[조수정]</a>&nbsp;
&nbsp;<a href="delete?jno=${apple.jno}">[조삭제]</a><br>
<hr>
&nbsp;<a href="joList">joList</a>&nbsp;
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home">[Home]</a>&nbsp;
</body>
</html>