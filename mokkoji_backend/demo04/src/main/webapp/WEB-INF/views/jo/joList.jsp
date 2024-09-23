<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>** JoList Spring_Boot Mybatis **</title>
	<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** JoList Spring_Boot Mybatis **</h2>
<br>
<c:if test="${not empty message}">
	${message}<br>
</c:if>
<hr>
<table width=100%> 
	<tr bgcolor="Gold" height="30">
		<th>Jno</th><th>JoName</th><th>CaptainID</th><th>조장명</th><th>Project</th><th>Slogan</th>
	</tr>
	<c:if test="${not empty banana}">
		<c:forEach  var="jo" items="${banana}" >
		<tr height="30">
			<td><a href="detail?jCode=D&jno=${jo.jno}">${jo.jno}</a></td>
			<td>${jo.jname}</td><td>${jo.captain}</td><td>${jo.name}</td> 
			<td>${jo.project}</td><td>${jo.slogan}</td>
		</tr>	
		</c:forEach>
	</c:if>
	<c:if test="${empty requestScope.banana}">
	<tr><td colspan="6">~~ 출력자료가 1건도 없습니다. ~~ </td>
	</tr>
</c:if>
</table>
<hr>
<hr>
&nbsp;<a href="joInsert">조등록</a>&nbsp;
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home">[Home]</a>
</body>
</html>