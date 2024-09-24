let backendHost;

const hostname = window && window.location && window.location.hostname;
// => 모두 true면 (존재하면) 가장 우측의 값이 할당됨

// ** && 활용
// => 논리 AND 연산자
// => ex1 && ex2
//    ex1 이 false -> ex1 반환
//    ex1 이 true  -> ex2 반환

// => 위의 문장처럼 피연산자 중 하나의 값을 반환하는 용도로 사용하는 경우,
//    피연산자가 참인지 거짓인지의 정의를 정확하게 알아야 사용할 때
//    예상하지 못한 문제가 발생하는 것을 방지할 수 있습니다.

// => 논리연산자 활용 : https://html6.tistory.com/424
/*
      a1 = true  && true       // t && t returns true
      a2 = true  && false      // t && f returns false
      a3 = false && true       // f && t returns false
      a4 = false && (3 == 4)   // f && f returns false
      a5 = 'Cat' && 'Dog'      // t && t returns "Dog"
      a6 = false && 'Cat'      // f && t returns false
      a7 = 'Cat' && false      // t && f returns false
      a8 = ''    && false      // f && f returns ""
      a9 = false && ''         // f && f returns false
  
      ** 참과 거짓을 판별하는 정확한 정의
      =>  값을 true로 변환 가능하면 (값이 존재하는경우 'Cat' 등) 참, 
          값을 false로 변환 가능하면 (값이 존재안하는경우 '' 등) 거짓.

*/

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
}

export const API_BASE_URL = `${backendHost}`;
