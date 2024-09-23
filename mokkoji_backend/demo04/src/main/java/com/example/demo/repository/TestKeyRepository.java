package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.example.demo.entity.TestKey;
import com.example.demo.entity.TestKeyId;

import jakarta.transaction.Transactional;


//** JPA 복합키 실습 (@IdClass 방법) 과 count 값 수정하기  
//=> DML 사용시 @Modifying, @Transactional 적용 필수.
//1) JPQL : OK 	jpa쿼리 방법 - @query - entity 를 기준으로 생성, transaction 
//2) Native_SQL : OK db sql방법
//3) default 메서드로 구현
// => 복잡한 계산식에 활용
// => 계산식을 메서드로 구현하고, 쿼리 메서드를 호출하여 적용
//     -> 서비스는 default 메서드를 호출
public interface TestKeyRepository extends JpaRepository<TestKey, TestKeyId>{

	@Modifying
	@Transactional
	//@Query("Update TestKey t Set count=count+:count Where id=:id and no=:no") // jpql 방식 entiy 명 사용
	@Query(nativeQuery = true,
		value="update testkey set count=count+:count Where id=:id and no=:no") // jpql 방식 entiy 명 사용
	void updateCount(@Param("id") String id,@Param("no") int no,
									@Param("count") int count);
	
	
	
	@Modifying
	@Transactional
	//@Query("Insert into TestKey values (:id, : no, :count, :name) "
	//		+ "on DUPLICATE KEY UPDATE count = count+ :count") // jpql 방식 entiy 명 사용
	@Query(nativeQuery = true, value="INSERT INTO testkey values (:id,:no,:count,:name) "
				+ "on DUPLICATE KEY UPDATE count = count + :count") // jpql 방식 entiy 명 사용
	void dupUpdateCount(@Param("id") String id,@Param("no") int no, 
			@Param("name") String name,	@Param("count") int count);
	
	
	
	// 3) default 메서드 활용: 쿼리문 실행하면서 복잡한 계산을 같이 실행
	default int calcCount(String id,int no,int count) {
		// 3.1) 계산로직 현해서 Table 에 저장할 값 계산
		int result = count*no+100;
		System.out.println("calc Count result = "+result);
		
		return updateSql(id, no, result);
		
		 
		
	}
	// 3.2) 계산결과를 DB로 전달
	@Modifying
	@Transactional
	@Query("update TestKey t Set t.count = :result where t.id = :id and t.no = :no")
	int updateSql(@Param("id") String id, @Param("no") int no, @Param("result") int result);
	
}
