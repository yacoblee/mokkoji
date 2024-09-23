package com.example.demo.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.demo.domain.JoDTO;
import com.example.demo.entity.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;


import lombok.RequiredArgsConstructor;

// import static 사용시 클래스 클래스 명시 없이 static 변수나 메서드를 사용가능
//사용하지 않으면 QMember.member.age 식으로 접근    	
import static com.example.demo.entity.QMember.member;
import static com.example.demo.entity.QJo.jo;


@Repository
@RequiredArgsConstructor
public class MemberDSLRepositoryImpl implements MemberDSLRepository{
	
	
	private final JPAQueryFactory jpaQueryFactory;

	
	
	// 1) Entity return
    // => Q클래스로 SQL 구문 작성하고 Entity return
    // => Parameter로 전달된 조원들만 출력하기 
    @Override
    public List<Member> findMemberJnoDSL(int jno) {
    	
    	return 
    		jpaQueryFactory.selectFrom(member).where(member.jno.eq(7)
					    			.and(member.age.between(10, 60)))
					    			.orderBy(member.age.desc())
					    			.fetch();
    	
        
    }
    
    // 2) Join & DTO return
    // => QueryDSL 에서 DTO 적용하기
    // => 메모장 QueryDSL사용법.txt 참고  
    //    4종류 방법중 1) Setter 접근 , 2) 필드 직접접근 적용
    // 2.1) Setter 접근 
    // => joDTO의 setter 를 호출해서 ,  DTO 의 멤버변수에 injection 해주는 방식.
    // => Projections.bean(~~~)  로 접근
    @Override
    public List<JoDTO> findMemberJoinDSL() {
    	return 
			jpaQueryFactory.select(
	    		Projections.bean(
	    				JoDTO.class, member.id, member.name, member.jno, jo.jname, jo.project
				)).from(member)
				.leftJoin(jo)
				.on(member.jno.eq(jo.jno))
				.fetchJoin()
				.fetch();
    }
    
    // 2.2) 필드 직접 접근 
    // => 필드에 직접 접근해서 값을 injection 하는 방식.
    // =>Projections.fields(~~~) 로 접근
    //     그러므로 DTO 에 setter/getter 없어도 가능하며
    //     joDTO의 멤버변수에 값이 injection 된다.
    
    // => fetchJoin()
    //    - 조인하는 대상 데이터를 즉시 로딩해서 가져온다
    //    - JPA의 지연로딩을 피하고 N+1문제를 해결할 수 있음.
    //    ( MemberRepository 참고, https://jie0025.tistory.com/518 )
	 @Override
	public List<JoDTO> findMemberJnoDSL2() {
		 return 
					jpaQueryFactory.select(
			    		Projections.fields(
			    				JoDTO.class, member.id, member.name, member.jno, jo.jname, jo.project
						)).from(member)
						.leftJoin(jo)
						.on(member.jno.eq(jo.jno))
						.fetchJoin()
						.fetch();        
	}
	

	
	
	
}
