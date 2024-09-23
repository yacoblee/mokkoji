/*
** 이클립스 자바스크립트 파일 내용이 흑백으로 나올때... 컬러로 고치기 
=> https://creampuffy.tistory.com/66

윈도우 - 프레퍼런스 - 제네럴 - 에디터스 - 파일 어소시에이션
	- add -> *.js 
	- 하단의 제네릭 텍스트 에디터 선택후 우측버튼 디폴트 클릭
******************************************** */

/**
** 입력값의 무결성 확인
** member 무결성 확인사항
// ID : 길이(4~10), 영문자,숫자 로만 구성
// Password : 길이(4~10), 영문,숫자,특수문자로 구성, 특수문자는 반드시 1개 이상 포함할것
// Password2: 재입력후 Password 와 일치성 확인
// Name : 길이(2이상), 영문 또는 한글로 만 입력
// Age: 정수의 범위  ( 숫자이면서, '.'이 없어야함 )  
// Point : 실수 ( 구간설정 100 ~ 10000 까지만 가능 )
// BirthDay : 입력 여부 확인  ( length == 10 )
// Jno : select 를 이용 (X)
// Info : (X)
// Rid : (X)

** 작성 규칙
   => JavaScript function 으로 정의 하고 
      결과를 true or false 로 return
   => 정규식을 활용한다.
   
** match 메서드 활용
   => 아래 조건에 true -> not (!)  match 적용해보면
   => 정확하지 않으므로 (부적절, replace 를 사용)
        ...       
        } else if (!id.match(/[a-z.0-9]/gi)) {
            alert(' ID는 영문자와 숫자로만 입력하세요. !!!')
            return false;
        }    

** test(검사대상문자) 메서드 활용 
	=> 정규식에 정의된 문자가 아닌 문자 있으면 false	, 
	=> 그러므로 false 면 오류 메시지 출력
		...
		} else if (!special.test(id)) { ...
	=> 그러나 불규칙하므로 하므로 replace 를 활용	

 */
"use strict"
// 1) ID
// => 길이, 영문과 숫자만 가능 
function idCheck() {
	let special = /[a-z.0-9]/gi ;
	let id=document.getElementById("id").value;
	if ( id.length<4 || id.length>10 ) {
		document.getElementById("iMessage").innerHTML='id 는 4~10 글자 입니다.';
		return false;
	} else if ( id.replace(special, '').length > 0 ) {
		document.getElementById("iMessage").innerHTML='id 는 영문과 숫자 만 가능 합니다.';
		return false;
	} else {
		document.getElementById("iMessage").innerHTML='';
		return true;
	}
} //idCheck

// 2) Password
// => input Tag 의 type="password" 인 경우 키보드는 자동 영문
function pwCheck() {
	let special = /[a-z.0-9.!-*.@]/gi;
	let pw=document.getElementById('password').value;
	if ( pw.length<4 || pw.length>10 ) {
		document.getElementById('pMessage').innerHTML='password 는 4~10 글자 입니다.';
		return false;
	// => 영문, 숫자, 특수문자로만 구성	
	//}else if( !special.test(pw) ) { => 불규칙헤서 잘 사용하지않음
	}else if( pw.replace(special,'').length > 0 ) {	
		document.getElementById('pMessage').innerHTML='password 는 영문, 숫자, 특수문자만 가능합니다.';
		return false;
	// => 특수문자는 반드시 포함 : replace 적용		
	}else if( pw.replace(/[!-*.@]/gi,'').length >= pw.length ) {
		document.getElementById('pMessage').innerHTML='password 는 특수문자가 반드시 포함 되어야 합니다.';
		return false;
	}else {
		document.getElementById('pMessage').innerHTML='';
		return true;
	}
} //pwCheck

// 3) Password2
// => password 와 동일성 확인
function pw2Check() {
	let pw=document.getElementById('password').value;
	let pw2=document.getElementById('password2').value;
	if ( pw2.length<4 || pw!=pw2 ) { 
		document.getElementById('p2Message').innerHTML='password 가 다릅니다.';
		return false;
	}else {
		document.getElementById('p2Message').innerHTML='';
		return true;
	}	
} //pw2Check

// 4) Name : 길이, 한글 또는 영문
function nmCheck() {
	let name=document.getElementById('name').value;
	if ( name.length < 2 ) {
		document.getElementById('nMessage').innerHTML='name은 2글자 이상 입니다.';
		return false;
	}else if( name.replace(/[a-z.가-힣]/gi, '').length > 0 ) {
		document.getElementById('nMessage').innerHTML='name은 한글 또는 영문 만 입력 가능합니다.';
		return false;
	}else {
		document.getElementById('nMessage').innerHTML='';
		return true;
	}
} //nmCheck

// 5) Age (정수)
// => 정수의 조건: 숫자이면서 소수점이 없어야함
// => Number.isInteger(n) : n 이 정수일때만 true
//	-> 단, n 은 숫자Type 이어야함
//	-> value 속성의 값은 문자 Type 이므로 숫자화_parseInt 가 필요함 
//	-> 단, parseInt(age) 사용시 주의
//		- 실수의 경우에는 정수만 사용 (123.56 -> 123)
//		- 숫자 뒤쪽에 문자가 포함되면 앞쪽의 숫자만 가져와 정수 return (123abc -> 123)
//		- 문자로 시작하면 문자로 취급, NaN(Not a Number) 을 return
// => 숫자 아닌값이 있는지 확인, Number.isInteger(....) 확인
function agCheck() {
	let age=document.getElementById('age').value;
	console.log(`** parseInt(age) => ${parseInt(age)}`);
	console.log(`** Number.isInteger(age) => ${Number.isInteger(age)}`);
	console.log(`** Number.isInteger(parseInt(age)) => ${Number.isInteger(parseInt(age))}`);
	
	if ( age.replace(/[^0-9]/, '').length < age.length ||
		 	Number.isInteger(parseInt(age))==false ) {
		document.getElementById('aMessage').innerHTML='age 는 정수만 입력 하세요 ~~';
		return false;
	}else {
		document.getElementById('aMessage').innerHTML='';
		return true;
	}
} //agCheck

// 6) Point
// => 정수 또는 실수 허용
// => 범위: 100 ~ 10000
// => parseFloat(point)
//		-> 오류 또는 입력값이 없는 경우 NaN return
//		-> 확인 : Number.isNaN(parseFloat(point)) 
//   	-> 단, 숫자로 시작하면 뒤쪽에 문자가 섞여있어도 숫자값만 사용함 ( NaN 을 return 하지않음 ) 
function poiCheck() {
	let point=document.getElementById('point').value;
	console.log(`** parseFloat(point) => ${parseFloat(point)}`);
	console.log(`** Number.isNaN(point) => ${Number.isNaN(point)}`);
	console.log(`** Number.isNaN(parseFloat(point)) => ${Number.isNaN(parseFloat(point))}`);
	
	// => 숫자 아닌값이 있는지 확인, Number.isNaN(...) 적용
	// => 단, 소숫점은 허용
	//    ( 비교값으로 소숫점을 사용하기위해 "\." 으로 표기함 )
	if ( point.replace(/[^0-9.\.]/g,'').length < point.length ||
		 Number.isNaN(parseFloat(point)) ) {
		document.getElementById('poMessage').innerHTML='point 는 정수 또는 실수만 입력 하세요.';
		return false;
	}else if(parseFloat(point)<100 || parseFloat(point)>10000) {
		document.getElementById('poMessage').innerHTML='point 값이 범위 (100~10000) 를 벗어납니다.';
		return false;	
	}else {
		document.getElementById('poMessage').innerHTML='';
		return true;
	}
} //poCheck

// 7) Birthday
function bdCheck() {
	let birthday=document.getElementById('birthday').value;
	if (birthday.length!=10) {
		document.getElementById('bMessage').innerHTML='Birthday (yyyy-mm-dd) 입력 확인하세요.';
		return false;
	}else {
		document.getElementById('bMessage').innerHTML='';
		return true;
	}
} //bdCheck

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
 ** Good 정리
 => https://inpa.tistory.com/entry/JS-📚-정규식-RegExp-누구나-이해하기-쉽게-정리
 
** 정규 표현식 (정규식:Regular Expression) 객체 : RegExp
=> 자바스크립트의 기본 내장 객체 중의 하나
=> 특정한 규칙을 가진 문자열 집합을 표현하는데 사용하는 형식
* 생성
	let regExp1= new RegExp('text') ;
	let regExp2= /text/ ; 
* 메서드	
	("문자열").replace(/정규표현식/, "대체문자열") : "정규표현식"에 매칭되는 항목을 "대체문자열"로 변환
	(정규표현식).test("문자열") : 정규식과 일치하는 문자열이 있으면 true 아니면  false 를 return 
	(정규표현식).exec("문자열") : 정규식과 일치하는 문자열을 return 
* 예제	
	let regExp= /script/ ; 
	let s='Javascript jQuery Ajax';
	
	let output = regExp.test(s) ;
	alert(output) ; 
* 그러나 주로 문자열의 메서드와 같이 사용됨
 	
/.../ : 정규식 RegExp 의 리터럴

** 플래그 문자 
g : global, 전역비교
i : 대문자는 소문자 변환후 비교 (대/소문자 구분 없음)
m : 여러줄의 검사 수행
   ( 각줄을 개별문자로 인식하고 검사해줌
    예 : 'JavaScript\njQuery\nAjax' )

\. : . 문자 (. 는 한 문자를 의미하나 \. 는 . 문자를 의미함)
a-z : abcdefghijklmnopqrstuvwxyz 와 같음
0-9 : 0123456789 와 같음
: : : 문자
_ : _ 문자
- : - 문자
[~.~] : ~ 와 ~ , Or 의 묶음
[..] : Or 의 묶음. 안에 기록된 1가지외 중복 적용됨.
[^...] : 내부내용의 부정. 기록된 이외의 것을 찾음.
+ : 하나 이상의 반복적용. (단어(?) 찾음)

*/

 