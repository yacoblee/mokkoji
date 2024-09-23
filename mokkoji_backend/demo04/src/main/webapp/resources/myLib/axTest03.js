
// ** Ajax_REST API, Axios Test **
// => Axios 메서드형식 적용
// => 1. List 출력
//	- axiMList : MemberController, Page response (axmemberList.jsp)

// => 2. 반복문에 이벤트 적용하기
//	- idbList(id별 boardList) : RESTController, List_Data response 
//	- Delete, JoDetail
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"use strict"
// 1. List 출력
// 1.1) Page Response
// => response 를 resultArea1에 출력
// => 요청 url: /member/aximlist
//    response: axmemberList.jsp
function axiMList(){
	let url="/member/aximlist";
	axios.get(url
	).then(response => {
		console.log("** response 성공 **");
		document.getElementById("resultArea1").innerHTML=response.data;
	}).catch(err => {
		alert(`** response 실패 => ${err.message}`);
	});
	document.getElementById("resultArea2").innerHTML='';
} //axiMList

// 2. 반복문에 이벤트 적용하기
//2.1) idbList(id별 boardList)
// => RESTController, PathVariable 처리,  List_Data response 
// => Server : service, Sql 구문 작성
// => request : id 를 path 로 전송 "/rest/idblist/banana"
// => Response 
//	-> 성공 : 반복분, Table로 List 출력문 완성, resultArea2 에 출력
//	-> 출력자료의 유/무 : Server 에서 status로 (없으면 502) 처리
//	-> 실패 : resultArea2 clear, alert 으로 에러메시지 출력 
function idbList(id) {
	let url="/rest/idblist/"+id;
	axios.get(url
	).then(response => {
		console.log(`** idblist 성공 => ${response.data}`);
		let listData = response.data;
		let resultHtml =
		`<table style="width:100%">
			<tr bgcolor="Khaki" >
				<th>Seq</th>
				<th>Title</th>
				<th>ID</th>
				<th>RegDate</th>
				<th>조회수</th>
			</tr>
			`
			for(let b of listData){
				resultHtml +=
				`<tr><td>${b.seq}</td>
					<td>${b.title}</td>
					<td>${b.id}</td>
					<td>${b.regdate}</td>
					<td>${b.cnt}</td>
				</tr>`	
			}
			resultHtml +=`</table>`;
			
		document.getElementById("resultArea2").innerHTML=resultHtml;
		
	}).catch(err => {
		// => response 의 status값이 502 면 "출력 자료 없음"
		if (err.response.status=='502') {
			document.getElementById("resultArea2").innerHTML
					= err.response.data;
		}else {
			document.getElementById("resultArea2").innerHTML
					= `** 시스템 오류, 잠시후 다시하세요 => ${err.message}`;
		}
	});
} //idbList


// 2.2) axiDelete
// 요청명: "rest/axidelete, Pathvariable 적용"
// => response: 성공/실패 여부만(그러므로 RestController 로)
// => 성공: Deleted 로 변경, OnClick 이벤트해제

function axiDelete(e, id){
	let url="/rest/axidelete/"+id;
	
	axios.delete(url
	).then(response =>{
		alert("삭제성공 => ${response.data}");
		// => 삭제 성공
		// 	- Delete ->deleted 로 변경, color_gray, Bold
		//  - Style 제거
//		document.getElementById(id).innerHTML = "Deleted";
//		document.getElementById(id).style.color = "gray";
//		document.getElementById(id).style.fontWeight = "bold";
		
		e.target.innerHTML = "Deleted";
		e.target.style.color = "gray";
		e.target.style.fontWeight = "bold";

		
		document.getElementById(id).removeAttribute('onclick');
		document.getElementById(id).classList.remove('textlink');
	}).catch(err =>{
		if(err.response.status == "502"){
			alert("삭제 실패${err.response.data}");
		}else{
			alert("삭제 실패 다시 작성하세요 => ${response.message}");
		}
		
	});
}
function showJnoDetail(e, jno) {
    let url = "/rest/jnoSelect/" + jno;
    
    let left = e.pageX;
    let top = e.pageY;
    
    axios.get(url)
    .then(response => {
		let listData = JSON.stringify(response.data);
        console.log(listData);
        let jo = response.data;
        
        let resultHtml = 
        `<table>
            <tr bgcolor="Khaki"> </tr>
              <th>jno</th>
              <th>jname</th> 
              <th>captain</th> 
              <th>name</th> 
              <th>age</th> 
              <th>슬로</th> 
             </tr>
           `;
            
            resultHtml += 
           	`<tr height='10'>
           		<td>${jo.jno}</td>
           		<td>${jo.jname}</td>
				<td>${jo.captain}</td>
				<td>${jo.name}</td>
				<td>${jo.project}</td>
				<td>${jo.slogan}</td>
			</tr>`	
  
        resultHtml += `</table>`;

        
        document.getElementById("content").innerHTML=resultHtml;
        document.getElementById("content").style.top = top+"px"; // a small offset
 		document.getElementById("content").style.left=left+"px";
 		document.getElementById("content").style.display="block";
    })
    .catch(err => {
    
        
        if (err.response && err.response.status == 502) {
          alert(err.response.data);
        } else {
          alert(`** 시스템 오류, 잠시후 다시 시도하세요 => ${err.message}`);
        }
        
    
    });
}

function hideJnoDetail() {
    document.getElementById("content").style.display = "none";
}


// ** Ajax Member_PageList *********************
// => axiMList 에 Paging + 검색기능 추가
// => 검색조건 & Paging , Ajax 구현
//     -> 입력된 값들을 서버로 전송요청: axios
//    -> url 완성후 axios 호출

// => 1) 검색조건 입력 후 버튼클릭
//    -> jsp  문서내무의 script 구문을 외부문서로 작성 : EL Tag 적용안됨
//    ${pageMaker.makeQuery(1)} -> ?currPage=1&rowsPerPage=5 
// 3.1). searchDB 
function searchDB() {
	let url  = 'axmcri'
				+'?currPage=1&rowsPerPage=5'
				+'&searchType='+document.getElementById("searchType").value
				+'&keyword='+document.getElementById("keyword").value;

				axiMListCri(url);
} 
//3.2. keywordClear
function keywordClear() {
	if (document.getElementById("searchType").value=='all')
		document.getElementById("keyword").value='';
} //keywordClear

// 3.3) Axios 요청처리
function axiMListCri(url) {
	url = "/member/"+url;
	console.log('axiMListCri URL : '+url);
	
	axios.get( url
	).then(resposne => {
		console.log('axiMListCri URL : '+url);
		document.getElementById("resultArea1").innerHTML = resposne.data;	
	}).catch(err =>{
		document.getElementById("resultArea1").innerHTML = "axiMListCri 요청 실패"+err.message;
	});
	document.getElementById("resultArea2").innerHTML = '';
}
// url: /member/acxmcheck?currPage=1&rowsPerPage=5&check=1&check=2....
// MemberController 매핑메서드는 axmcri 를 같이 사용함
function axiMListCheck(){
	let checkAll = document.querySelectorAll(".check");
	let checkData = '';
	
	checkAll.forEach(check => {
		if(check.checked){
			checkData += "&check=" + check.value;
		}
	});
	
	// url 완성 & Axios 요청 axiMListCri() 매서드를 사용하므로 axmcheck 부터 ~~
	let url = "axmcheck"
				+"?currPage=1&rowsPerPage=5"
				+checkData;			
	axiMListCri(url);//axios 요청	
}	

function checkClear() {
	let ck=document.querySelectorAll('.clear');
	
	for (let i=0; i<ck.length; i++) {
		ck[i].checked=false;
	}
	return false;

}

