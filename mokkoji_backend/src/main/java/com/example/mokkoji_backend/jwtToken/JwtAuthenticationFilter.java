//package com.example.mokkoji_backend.jwtToken;
//
//import java.io.IOException;
//import java.util.List;
//
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.util.StringUtils;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import com.example.mokkoji_backend.repository.UsersRepository;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.AllArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//
//@Component
//@Log4j2
//@AllArgsConstructor
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//	private TokenProvider tokenProvider;
//	private UsersRepository repository;
//
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//		try {
//			String token = parseBearerToken(request);
//			List<String> role;
//			log.info("JwtAuthenticationFilter doFilterInternal()" + token);
//
//			if (token != null) {
//				String userId = tokenProvider.validateAndGetUserId(token);
//				log.info("JwtAuthenticationFilter validateAndGetUserId" + userId);
//
//				if (repository.getReferenceById(userId).equals("1")) {
//					role.add("ROLE_ADMIN");
//
//				} else {
//					role.add("ROLE_USER");
//				}
//				log.info("userrole " +role );
//
//				// 인증 객체 생성
//				AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                        userId,
//                        null,
//                        AuthorityUtils.commaSeparatedStringToAuthorityList(role)
//                );
//				
//				// SecurityContext에 인증 정보 저장
//                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
//                securityContext.setAuthentication(authentication);
//                SecurityContextHolder.setContext(securityContext);
//
//			}
//
//		} catch (Exception e) {
//			   log.error("JwtAuthenticationFilter doFilterInternal() Exception => " + e.toString());
//		}
//        filterChain.doFilter(request, response);
//
//	}// doFilterInternal
//
//	// request Header에 있는 token을 return 하는함수
//	private String parseBearerToken(HttpServletRequest request) {
//
//		String bearerToken = request.getHeader("Authorization");
//		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
//			return bearerToken.substring(7);
//		}
//		return null;
//	} // parseBearerToken
//
//}
