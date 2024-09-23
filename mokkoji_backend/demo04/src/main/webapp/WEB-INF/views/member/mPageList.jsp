<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring MemberList **</title>
<link rel="stylesheet" type="text/css" 
		href="/resources/myLib/myStyle.css">
<script>
"use strict"
//1. keywordClear
function keywordClear() {
	if (document.getElementById("searchType").value=='all')
		document.getElementById("keyword").value='';
} //keywordClear
//2. searchDB 
function searchDB() {
	self.location='mPageList'
				+'?currPage=1&rowsPerPage=5'
				+'&searchType='+document.getElementById("searchType").value
				+'&keyword='+document.getElementById("keyword").value;
	
	//self.location='${pageMaker.makeQuery(1)}'; -> 사용불가
} 
// 3) Member Check_List Clear 
function checkClear() {
	let ck=document.querySelectorAll('.clear');
	for (let i=0; i<ck.length; i++) {
		ck[i].checked=false;
	}
	return false;
} 
</script>	  
		
</head>
<body>
<h2>** Spring MemberList **</h2>
<hr>
<div id="searchBar">
	<select name="searchType" id="searchType" onchange="keywordClear()" >
		<option value="all" ${pageMaker.cri.searchType=='all' ? 'selected' : ''}>전체</option>
		<option value="id" ${pageMaker.cri.searchType=='id' ? 'selected' : ''}>ID</option>
		<option value="name" ${pageMaker.cri.searchType=='name' ? 'selected' : ''}>Name</option>
		<option value="age" ${pageMaker.cri.searchType=='age' ? 'selected' : ''}>Age</option>
		<option value="birthday" ${pageMaker.cri.searchType=='birthday' ? 'selected' : ''}>Birthday</option>
		<option value="info" ${pageMaker.cri.searchType=='info' ? 'selected' : ''}>Info</option>
	</select>
	<input type="text" name="keyword" id="keyword" value="${pageMaker.cri.keyword}" size="33">
	<button id="searchBtn" onclick="searchDB()">Search</button>
	<hr>
	<!-- CheckBox Test -->
	<form action="mCheckList" method="get">
		<b>Jno: </b>
		<!-- check 의 선택값의 유지를 위한 확인코드 -->
		<c:set var="ck1" value="false" />
		<c:set var="ck2" value="false" />
		<c:set var="ck3" value="false" />
		<c:set var="ck4" value="false" />
		<c:set var="ck5" value="false" />
		<c:forEach var="jno" items="${pageMaker.cri.check}">
			<c:if test="${jno=='1'}"><c:set var="ck1" value="true" /></c:if>
			<c:if test="${jno=='2'}"><c:set var="ck2" value="true" /></c:if>
			<c:if test="${jno=='3'}"><c:set var="ck3" value="true" /></c:if>
			<c:if test="${jno=='4'}"><c:set var="ck4" value="true" /></c:if>
			<c:if test="${jno=='7'}"><c:set var="ck5" value="true" /></c:if>
		</c:forEach>
		<!-- ------------------------------- -->
		<input type="checkbox" name="check" class="clear" value="1" ${ck1 ? 'checked':''}>우린팀&nbsp;
		<input type="checkbox" name="check" class="clear" value="2" ${ck2 ? 'checked':''}>모꼬지&nbsp;
		<input type="checkbox" name="check" class="clear" value="3" ${ck3 ? 'checked':''}>OoC&nbsp;
		<input type="checkbox" name="check" class="clear" value="4" ${ck4 ? 'checked':''}>컴포NaN트&nbsp;
		<input type="checkbox" name="check" class="clear" value="7" ${ck5 ? 'checked':''}>관리팀&nbsp;
		<input type="submit" value="Search">&nbsp;
		<input type="reset" value="Clear" onclick="return checkClear()"><br>
	</form>
	<hr>
</div>
<table border="1" style="width:100%">
<tr bgcolor="DeepSkyBlue">
	<th>ID</th><th>Name</th><th>Age</th><th>Jno</th><th>Info</th>
	<th>Point</th><th>Birthday</th><th>Rid</th><th>Image</th>
</tr>
<c:if test="${not empty requestScope.banana}">
	<c:forEach var="m" items="${requestScope.banana}"      >
	<tr><td>${m.id}</td><td>${m.name}</td><td>${m.age}</td><td>${m.jno}</td>
		<td>${m.info}</td><td>${m.point}</td><td>${m.birthday}</td><td>${m.rid}</td>
		<td><img alt="myImage" width="50" height="70"
				 src="/resources/uploadImages/${m.uploadfile}"></td>
	</tr>
	</c:forEach>
</c:if>
<c:if test="${empty requestScope.banana}">
	<tr><td colspan="9">~~ 출력할 자료가 없습니다. ~~</td>
	</tr>
</c:if>
</table>
<hr>
<div align="center">
<!-- 1) FirstPage, Prev -->
  <c:choose>
	<c:when test="${pageMaker.prev && pageMaker.spageNo>1}">
	 	<a href="${pageMaker.makeQuery(1)}">FP</a>&nbsp;
		<a href="${pageMaker.makeQuery(pageMaker.spageNo-1)}">&LT;</a>&nbsp;&nbsp;  
	</c:when>	
	<c:otherwise>
		<font color="Gray">FP&nbsp;&LT;&nbsp;&nbsp;</font>
	</c:otherwise>
  </c:choose> 	 
<!-- 2) Display PageNo 
	=> currPage 제외한 PageNo 만 a Tag 적용 -->
  <c:forEach var="i" begin="${pageMaker.spageNo}" end="${pageMaker.epageNo}">
  	<c:if test="${i==pageMaker.cri.currPage}">
  		<font color="Orange" size="5"><b>${i}</b></font>&nbsp;
  	</c:if>
  	<c:if test="${i!=pageMaker.cri.currPage}">
  		<a href="${pageMaker.makeQuery(i)}">${i}</a>&nbsp;
  	</c:if>
  </c:forEach>
<!-- 3) Next, LastPage  -->
  <c:choose>
  	<c:when test="${pageMaker.next && pageMaker.epageNo>0}">
  		&nbsp;<a href="${pageMaker.makeQuery(pageMaker.epageNo+1)}">&GT;</a>
  		&nbsp;<a href="${pageMaker.makeQuery(pageMaker.lastPageNo)}">LP</a>
  	</c:when>
  	<c:otherwise>
  		<font color="Gray">&nbsp;&GT;&nbsp;LP</font>
  	</c:otherwise>
  </c:choose>



</div>
<hr>
&nbsp;<a href="/home">Home</a>&nbsp;
&nbsp;<a href="javascript:history.go(-1)" >이전으로</a>&nbsp;
</body>
</html>