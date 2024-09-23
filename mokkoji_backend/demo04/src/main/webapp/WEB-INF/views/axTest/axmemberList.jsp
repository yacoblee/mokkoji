<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring Axios MemberList **</title>
<link rel="stylesheet" type="text/css" 
		href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Spring Axios MemberList **</h2>
<table border="1" style="width:100%">
<tr bgcolor="hotpink">
	<th>ID</th><th>Name</th><th>Age</th><th>Jno</th>
	<th>Info</th><th>Point</th><th>Birthday</th><th>추천인</th><th>Image</th><th>DELETE</th>
</tr>
<c:if test="${not empty requestScope.banana}">
	<c:forEach var="m" items="${requestScope.banana}" >
	<tr><td><a onclick="idbList('${m.id}')">${m.id}</a></td>
	
	<!-- ** idbList : id별 boardList 
		=> 선택된 id를 function 에 전달 (매개변수를 활용)
			idbList('banana')
			-> 비교 : idbList(${m.id}) -> idbList(banana) XXX 주의
			
		=> a Tag 에 이벤트 적용시 책갈피 기능 활용
			-> href : 적용하지않음 (이동하지 않음)
			-> href="#id" : id 위치로 이동,  "#": 최상단으로 이동 
			-> href="javascript:;" : 이동하지 않음   	
	-->
		<td>${m.name}</td><td>${m.age}</td>
		<td align="center">
			<span id="textlinks" onmouseover="showJnoDetail(event, ${m.jno})" 
				onmouseout="hideJnoDetail()">
			${m.jno} 
			</span>
		
		</td>
		
		<td>${m.jno}</td>
		<td>${m.info}</td><td>${m.point}</td><td>${m.birthday}</td><td>${m.rid}</td>
		<td><img alt="myImage" width="50" height="70"
				 src="/resources/uploadImages/${m.uploadfile}"></td>
		
	  <!--  ** Delete 기능 추가 
            => 선택된 id를 function 에 전달 (매개변수를 활용)
            => 결과는 성공/실패 여부만 전달: RESTController 로 
            => 성공 : Deleted 로 변경, onclick 이벤트 해제 
                     이를 위해 Delete Tag 를 function 에서 인식할수있어야함. 
                     
            ** function 에 이벤트객체 전달
            => 이벤트핸들러의 첫번째 매개변수에 event 라는 이름으로 전달함.
             => a Tag 와 span 사용시 e.target 값 비교
                 -> a Tag : "javascript:;" 
                 -> span  : [object HTMLSpanElement]          
        -->
		<td><span class="textlink" onclick="axiDelete(event, '${m.id}')" id="${m.id}" >Delete</span> </td>
	</tr>
	</c:forEach>
	
</c:if>
<c:if test="${empty requestScope.banana}">
	<tr><td colspan="9">~~ 출력할 자료가 없습니다. ~~</td>
	</tr>
</c:if>
</table>
<div id="content"></div>
<hr>
&nbsp;<a href="/home">Home</a>&nbsp;
&nbsp;<a href="javascript:history.go(-1)" >이전으로</a>&nbsp;
</body>
</html>