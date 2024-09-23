package com.example.demo.repository;

import java.util.List;

import com.example.demo.entity.Member;

public interface MyRepository {
	
	List<Member> emMemberList();
	
	Member emMemberDetail(String id);
	
	List<Member> cbMemmberList();
}
