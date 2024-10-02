package com.example.mokkoji_backend.jwtToken;

import com.example.mokkoji_backend.repository.login.UsersRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class TokenProvider {

	// 토큰 비밀번호
	private static final String SECRET_KEY ="DLTMDGUSQKQH0408";
	private UsersRepository repository;
	
	//토큰 생성 
	public String jwtCreate(String id) {
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
}
