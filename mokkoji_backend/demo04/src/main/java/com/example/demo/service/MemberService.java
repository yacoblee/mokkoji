package com.example.demo.service;

import java.util.List;

import com.example.demo.domain.JoDTO;
import com.example.demo.entity.Member;


public interface MemberService {
	
	// ** selectList
	List<Member> selectList();

	// ** selectOne
	Member selectOne(String id);

	// ** insert
	Member save(Member entity);

	// ** delete
	void deleteById(String id);
	
	// JPARopository Memthoid naming 규정
	List<Member> findByJno(int jno);
	
	void updatePassword(String id, String password);
	
	List<JoDTO> joinDSL();
}