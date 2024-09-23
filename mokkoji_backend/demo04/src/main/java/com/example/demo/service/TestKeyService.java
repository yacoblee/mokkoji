package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.TestKey;
import com.example.demo.entity.TestKeyId;


public interface TestKeyService {
	
	// ** selectList
	List<TestKey> selectList();

	// ** selectOne
	TestKey selectOne(TestKeyId testid);

	// ** insert
	void save(TestKey entity);
	
	// ** UPDATE Count 증가
	void updateCount(String id, int no, int count);
	
	// ** DUPLICATE KEY UPDATE 구문
	void dupUpdateCount(String id, int no, String name, int count);
	
	// ** default 메서드 활용 update
	int calcCount(String id, int no, int count);

	// ** delete
	void delete(TestKeyId testid);
 

} //class