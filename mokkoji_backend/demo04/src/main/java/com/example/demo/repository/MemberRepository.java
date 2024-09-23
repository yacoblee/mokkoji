package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Jo;
import com.example.demo.entity.Member;
import com.example.demo.entity.TestKey;
import com.example.demo.entity.TestKeyId;

import jakarta.transaction.Transactional;



public interface MemberRepository extends JpaRepository<Member, String>{


	
	 
	List<Member> findByJno(int jno);
	
	@Modifying
	@Transactional
	@Query("Update Member b Set b.password = :password Where b.id = :id")
	void updatePassword(@Param("id")String id , @Param("password") String password);
	
	
	
	// => 맴버변수 roleList 추가
    //      서버 restart 하면 
    //    아래 설정에 의해 member_role_list 테이블이 자동 생성됨
    //  (단, application.properties 의 hibernate.ddl-auto 속성확인
    //        테이블 생성 확인 후 다시 주석처리함.)
    // => "roleList": Member 엔티티의 
    //     @ElementCollection(fetch = FetchType.LAZY) 로 정의한 속성
	@EntityGraph(attributePaths = {"roleList"})
	@Query("select m from Member m where m.id = :id")
	Member getWithRoles(@Param("id") String id);
	
	
	
	
}
