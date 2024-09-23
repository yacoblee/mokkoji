package com.example.demo.jwtToken;

import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

//** 토큰 기반 인증 방식 ***************************************
//=> 쿠키는 사용자 인증정보를 담아 HTTP통신을 하게되면, 제3자가 악의적인 공격으로 데이터를 엿볼수 있다.
// 세션은 쿠키보다 보안성이 강하지만, 세션ID에 대해 서버가 내부적으로 스토리지를 보유하고 있어야한다는 단점이 있다.
// 따라서 쿠키나 세션이 아닌 토큰 기반 인증방식을 통하게 되면 더욱 보안성이 강하고 효율적이다.

//=> JWT 와 Oauth 인증방식 이 대표적이다.
//=> OAuth(Open Authorization)
//	  인터넷 사용자들이 비밀번호를 제공하지 않고 다른 웹사이트 상의 자신들의 정보에 대해
//	  웹사이트나 애플리케이션의 접근 권한을 부여할수있는 공통적인 수단으로서 사용되는,
//	  접근 위임을 위한 개방형 표준이다.
// 예를 들어 페이스북과 트위터의 경우 굳이 페이스북과 트위터 각각에 로그인하지 않고도, 
// 다른 어플리케이션에서 인증 절차만 거치면 사용할수 있는것.
//=> https://blog.naver.com/ilovelatale/222398298416

//** JWT (JSON Web Token) ********************************** 
//=> JSON 형태로 된 토큰이며 {header}.{payload}.{signature} 로 구성됨.
//=> 토큰(Token) : 사용자를 구별할수 있는 문자열 
//=> 기본 동작
//	- 최초 로그인시 서버가 만들어줌 
//	- 클라이언트는 이후 매요청에 이 토큰을 담아 인증된 사용자임을 알린다.  
// request header에 "Authorization: Bearer+[accessToken]" 넣어줌.
// ( myreact03/src/service/apiService.js 의 function apiCall() 의 header 값 참고)
//=> Jwts 클래스 (JWT 관리 API) 
// JSON 생성, 서명, 인코딩, 디코딩, 파싱 등 토큰관리 기능 제공.

//** JWT Header
//=> typ: type, JWT가 아닌 객체와 구분하기 위해 사용
//=> alg: algorithm, 토큰 발행에 사용된 해시알고리즘의 종류를 의미. 

//** JWT Payload 의 Claims Set
//=> iss (Issuer) : 토큰 발급자 ( 예를들면 demo app )
//=> sub (Subject) : 토큰 제목 - 토큰에서 사용자에 대한 식별값이 되므로 유일해야됨
//=> aud (Audience) : 토큰 대상자
//=> exp (Expiration Time) : 토큰 만료 시간
//=> nbf (Not Before) : 토큰 활성 날짜 (이 날짜 이전의 토큰은 활성화 되지 않음을 보장)
//=> iat (Issued At) : 토큰발행 날짜와 시간
//=> jti (JWT Id) : JWT 토큰 식별자 (issuer가 여러명일 때 이를 구분하기 위한 값)
//=> 이 7가지를 모두 포함해야하는 것은 아니고, 상황에 따라 해당서버가 가져야할 인증체계에 따라 사용한다.

//** JWT Signature
//=> 토큰발행 주체(issuer) 가 발행한 서명, 토큰의 유효성 검사에 이용됨.

//** Bearer Token ********************************************
//=> HTTP통신에서 사용하는 인증 방식에 Bearer Authentication을 사용하는 것이다.
//=> Bearer Authentication이란, "이 토큰을 나르는(bearer) 사람에게 권한을 부여하시오"라는 것인데,
//	 앞서 살펴본 Oauth 역시 사용자가 아닌 소비자가 중간에서 사용자의 권한을 일부 부여받게 된다.
//Bearer Token은 JWT나 Oauth에서 사용되는 토큰을 모두 통칭하는 용어이다.

//** Claims (참고) ************************************************
//=> claim: 주장하다, (자기 권리나 재산이라고 여겨) 요구[요청]하다
//=> Claim은 key:value 의 쌍으로 이루어져있고, 서명 또는 암호화하는데에 사용되는 속성들을 의미하며
// 이들을 JWT Claims Set이라 하고 JSON 객체로 전달된다.
//=> 표준 스펙상 key는 3글자(sub, iss....) 이고, unique 해야함.
// 그렇지 않으면 파싱거부 되거나 마지막 key만 파싱될수있는데 이는 구현체에 따라 다르다.
// 또한 JWT가 이해할수없는 claim은 무시된다.
//=> JWT Claim Names는 세 가지로 분류되는데, registered, public, private이다.
//=> 위 JWT Payload 의 Claims Set 은 registered 에 해당. 

//*************************************************************

//** 시간 관련 API
//* ChronoUnit ( https://java119.tistory.com/52 )
//=> TemporalUnit 인터페이스를 구현한 Enum 클래스
//=> DAYS, HOURS, NANOS, MICROS 등등 다양한 시간 단위가 있고,
//=> 외부에서 사용할 수 있는 between, getDuration, isDurationEstimated 등 다양한 API 제공함
//=> ChronoUnit.DAYS : 일(Day) 의 차이

//* Instant
//=> 시간을 타임스탬프로 다루기 위해 사용한다. 
//UTC 기준으로 1970년 1월 1일 0시 0분 0초를 숫자 0으로 정하고 그로부터 경과된 시간을 양/음수로 표현한다. 
//=> Instant.now() : 현재 시간을 Instant 객체로 얻을 수 있음. 

@Service
public class TokenProvider {
	private static final String SECRET_KEY="NvKkSSSN@IO25f4&";
	
	public String create(String id) {
		// 1.1) 유효기간 설정
		// - 현재시간 으로부터 1일로 설정
		// (현재시간 으로부터 차이가 +1일 되는 날 설정)
		Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS)); // 일의 크기가 1이 되는 값을 의미
		
		
		// 1.2) Jwts ( JWT API 관리) 
		return Jwts.builder()
					.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
					// payload에 들어갈 내용
					.setClaims(null)
					.setSubject(id)				//sub: subject(유일해야함->userID 보관)
					.setIssuer("Demo App") 		//iss 발급 주체
					.setIssuedAt(new Date())	//iat 토큰 발급시간
					.setExpiration(expiryDate)	//exp 토큰 만료시간
					.compact();
	}// create
	
	
	// 2. 검증
	// -> 토큰을 디코딩 및 파싱 하여 토큰의 위조여부 확인 후 Subject 에 보관한 userID를 꺼내며 return
		public String validateAndGetUserId(String token) {
			Claims claims = Jwts.parser()
							.setSigningKey(SECRET_KEY)
							.parseClaimsJws(token)
							.getBody();
			
			return claims.getSubject();
		}
}


