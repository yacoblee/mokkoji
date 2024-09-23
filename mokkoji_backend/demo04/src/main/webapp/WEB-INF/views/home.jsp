<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Home Spring **</title>
<link rel="stylesheet" type="text/css" 
		href="/resources/myLib/myStyle.css">
</head>
<body>
<h1>** JPA Page Demo04 **</h1>
<p>* Home_Time: ${requestScope.serverTime} </p>
<hr>
<c:if test="${!empty requestScope.message}">
	<h4>${requestScope.message}</h4>
</c:if>
<c:if test="${not empty sessionScope.loginName}">
=> ${sessionScope.loginName}님 안녕하세요~~ <br>
</c:if>
<hr>
<img alt="mainImage" src="/resources/images/tulips.png"  width="400" height="300">
<hr>
<c:if test="${not empty sessionScope.loginName}">
	&nbsp;<a href="member/memberDetail?jCode=D">MyInfo</a>&nbsp;
	&nbsp;<a href="member/memberDetail?jCode=U">내정보수정</a>&nbsp;
	&nbsp;<a href="member/logout">Logout</a>&nbsp;
	&nbsp;<a href="member/delete">탈퇴</a>&nbsp;
</c:if>
<c:if test="${empty sessionScope.loginName}">
	&nbsp;<a href="member/loginForm">LoginF</a>&nbsp;
	&nbsp;<a href="member/joinForm">JoinF</a>&nbsp;
</c:if>
<br>
&nbsp;<a href="member/memberList">MList</a>&nbsp;
&nbsp;<a href="jo/joList">JoList</a>&nbsp;
&nbsp;<a href="board/boardList">BList</a>&nbsp;
&nbsp;<a href="bcrypt">BCrypt</a><br>
&nbsp;<a href="member/mPageList">MPage</a>&nbsp;
&nbsp;<a href="board/bPageList">BPage</a>&nbsp;
&nbsp;<a href="/axtestform">AjaxTest</a>&nbsp;
&nbsp;<a href="/ginsert">Ginsert</a>&nbsp;
&nbsp;<a href="/glist">GList</a>&nbsp;
&nbsp;<a href="/gupdate">Gupdate</a>&nbsp;
&nbsp;<a href="/gpage?pageNo=2">Gpage</a>&nbsp;
&nbsp;<a href="member/joindsl">JOIN_DSL</a>&nbsp;
&nbsp;<a href="/tsave">Tsave</a>&nbsp;
&nbsp;<a href="/tupdate">Tupdate</a>&nbsp;
&nbsp;<a href="/tdupupdate">TDupUpdate</a>&nbsp;
&nbsp;<a href="/tcalc">TCalc</a>&nbsp;
&nbsp;<a href="/tlist">TList</a>&nbsp;
</body>
</html>