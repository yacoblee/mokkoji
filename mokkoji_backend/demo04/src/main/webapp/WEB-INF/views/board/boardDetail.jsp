<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring_Boot Mybatis BoardDetail **</title>
<link rel="stylesheet" type="text/css" 
		  href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Spring_Boot Mybatis BoardDetail **</h2>
<table>
<c:if test="${not empty requestScope.apple}">
	<tr height="40"><th bgcolor="#edd88f">Seq</th>
		<td>${requestScope.apple.seq}</td></tr>
	<tr height="40"><th bgcolor="Tan">I D</th>
		<td>${requestScope.apple.id}</td></tr>	
	<tr height="40"><th bgcolor="Tan">Title</th>
		<td>${requestScope.apple.title}</td></tr>
	<tr height="40"><th bgcolor="Tan">Content</th>
		<td><textarea rows="5" cols="50" readonly>
			${requestScope.apple.content}</textarea>
		</td></tr>
	<tr height="40"><th bgcolor="Tan">RegDate</th>
		<td>${requestScope.apple.regdate}</td></tr>
	<tr height="40"><th bgcolor="Tan">조회수</th>
		<td>${requestScope.apple.cnt}</td></tr>
</c:if>
<c:if test="${empty requestScope.apple}">
	<tr><td colspan="2">~~ 출력할 자료가 없습니다 ~~</td></tr>
</c:if>
</table>
<hr>
<c:if test="${!empty requestScope.message}">
=> ${requestScope.message}<br>
</c:if>
<hr>
<!-- 로그인 한 경우에는 새글등록, 답글작성 
=> 답글: 부모글의 root, step, indent 값이 필요하기 때문에
        쿼리스트링으로 서버로 보내줌.
-->
<c:if test="${!empty sessionScope.loginID}">
	&nbsp;<a href="boardInsert">새글등록</a>&nbsp;
	&nbsp;<a href="replyInsert?root=${apple.root}&step=${apple.step}&indent=${apple.indent}">답글등록</a>&nbsp;
</c:if>
<!-- 로그인id 와 글쓴이id 가 동일하면 수정, 삭제 가능  -->
<c:if test="${sessionScope.loginID==requestScope.apple.id}">
	&nbsp;<a href="detail?jCode=U&seq=${requestScope.apple.seq}">글수정</a>&nbsp;
	&nbsp;<a href="delete?seq=${apple.seq}&root=${apple.root}">글삭제</a>&nbsp;
</c:if>

<hr>
&nbsp;<a href="boardList">BList</a>&nbsp;
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>