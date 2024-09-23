package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.domain.JoDTO;
import com.example.demo.entity.Jo;
import com.example.demo.entity.TestKey;
import com.example.demo.entity.TestKeyId;

import jakarta.transaction.Transactional;



public interface JoRepository extends JpaRepository<Jo, Integer>{

	
	
	 // ** JoJoinMember 메서드추가
    //=> Member 의 name 출력을 위한 컬럼이 필요함
    //  - Entity에 출력만을 위한 컬럼추가는 불편함
    //    - 그러므로 결과를위해 ~DTO 사용
    //=> JPQL, DTO 사용하기
    //    - Entity 가 아닌 MemberDTO 로 return 받기위해 new 사용
    //    - Table 명 이아닌 Entity 명 사용
    @Query("SELECT NEW com.example.demo.domain.JoDTO(j.jno, j.jname, j.captain, m.name, j.project, j.slogan) FROM Jo j LEFT JOIN Member m ON j.captain=m.id")
    List<JoDTO> findAllJoin(); 
    
    //=> nativeQuery
    //   ~ConverterNotFoundException 발생
    //     ... No converter found capable of converting from type 
    //     ... to type [com.example.demo.domain.JoDTO] 
    // => DTO 직접 사용 불가능함 : 런타임 오류발생 
    @Query( nativeQuery=true, 
             value="select j.jno, j.jname, j.captain, m.name name, j.project, j.slogan from JO j LEFT JOIN MEMBER m ON j.captain=m.id")
    List<JoDTO> findAllJoin2(); 
}
