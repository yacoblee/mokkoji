package com.example.mokkoji_backend.jwtToken;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.repository.login.UsersRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenProvider {

	// 토큰 비밀번호
	private static final String SECRET_KEY ="DLTMDGUSQKQH0408";
	@Autowired
	private UsersRepository repository;
	
	//토큰 생성 
	public String jwtCreate(String id) {
		Date expriyDate = Date.from(Instant.now().plus(1,ChronoUnit.DAYS));
		Users user = repository.findById(id).get();
		String isAdmin =user.getIsAdmin();
           System.out.println("관리자야?" +isAdmin);
		    return Jwts.builder()
		            .signWith(SignatureAlgorithm.HS512, SECRET_KEY)  // 서명 알고리즘과 비밀 키
		            .setSubject(id)  // subject에 사용자 ID 설정
		            .claim("isAdmin", isAdmin)  // 'isAdmin' 클레임에 값을 추가
		            .setIssuer("MokkojiBackendApplication")  // 토큰 발행자 설정
		            .setIssuedAt(new Date())  // 토큰 발행 시간
		            .setExpiration(expriyDate)  // 만료 시간 설정
		            .compact();  // JWT 생성
	
	}//jwtCreate
	
	//토큰 생성 role 추가 
		public String jwtAddRoleCreate(String id) {
		
			Date expriyDate = Date.from(Instant.now().plus(1,ChronoUnit.DAYS));
		
			return Jwts.builder()
						.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
						.setClaims(null)
						.setSubject(id)
						.setIssuer("MokkojiBackendApplication")
						.setIssuedAt(new Date())
						.setExpiration(expriyDate)
						.compact();
		
		}//jwtCreate
	
	
	// 토큰 검증 및 id 반환 
	public String  validateAndGetUserId(String token) {
		Claims claims = Jwts.parser()
							.setSigningKey(SECRET_KEY)
							.parseClaimsJws(token)
							.getBody();
		return claims.getSubject(); // => id 반환 
	}
	
	public String validateAndGetAdmin(String token) {
		Claims claims = Jwts.parser()
				.setSigningKey(SECRET_KEY)
				.parseClaimsJws(token)
				.getBody();
		return claims.get("isAdmin",String.class);
	}
//	public String madeTokenUserId(String id) {
//	    Users user = repository.getById(id);
//	    return user.getIsAdmin();  // isAdmin 값 반환
//	}
	
	// 토큰 검증 및 id 반환 
	public String  validateAndGetIsadmin(String token) {
		Claims claims = Jwts.parser()
							.setSigningKey(SECRET_KEY)
							.parseClaimsJws(token)
							.getBody();
		
		String isAdmin = (String) claims.get("isAdmin");
		return isAdmin;
	}
	
}
