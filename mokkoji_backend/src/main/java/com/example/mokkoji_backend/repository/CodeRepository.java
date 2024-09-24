package com.example.mokkoji_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.mokkoji_backend.entity.Code;
import com.example.mokkoji_backend.entity.id.CodeId;

public interface CodeRepository extends JpaRepository<Code, CodeId> {

	@Query(nativeQuery=true,value="select * from code where main_type='01PC'")
	List<Code> findPC();
}
