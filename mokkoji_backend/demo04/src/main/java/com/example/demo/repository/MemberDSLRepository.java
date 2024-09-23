package com.example.demo.repository;

import java.util.List;

import com.example.demo.domain.JoDTO;
import com.example.demo.entity.Member;

public interface MemberDSLRepository {

	// Entity return
	List<Member> findMemberJnoDSL(int jno);
	
	// Join & DTO return
	List<JoDTO> findMemberJoinDSL();
	
	//
	List<JoDTO> findMemberJnoDSL2();
}
