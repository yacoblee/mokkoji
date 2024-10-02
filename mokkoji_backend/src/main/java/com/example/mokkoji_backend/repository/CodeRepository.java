package com.example.mokkoji_backend.repository;

import com.example.mokkoji_backend.entity.Code;
import com.example.mokkoji_backend.entity.CodeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CodeRepository extends JpaRepository<Code, CodeId> {

	@Query(nativeQuery=true,value="select * from code where main_type='01PC'")
	List<Code> findPC();
}
