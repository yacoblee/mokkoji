package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.TestKey;
import com.example.demo.entity.TestKeyId;
import com.example.demo.repository.TestKeyRepository;

import lombok.RequiredArgsConstructor;

//** JPA 복합키 실습 (@IdClass 방법)

@Service
@RequiredArgsConstructor 
public class TestKeyServiceImpl implements TestKeyService {

    private final TestKeyRepository repository;

    @Override
    public List<TestKey> selectList() {
    	
    	return repository.findAll();
    }
    
    @Override
    public TestKey selectOne(TestKeyId testid) {
    	Optional<TestKey> result = repository.findById(testid); //findById 하나의 인자만 받을 수 있는 복합키를 클래스로 묶었기 때문에 하나로 인식
    	if ( result.isPresent() ) return result.get();
    	else return null;
    }
    
    
    
    
    // => insert
    @Override
    public void save(TestKey entity) {
        repository.save(entity); // 저장 또는 수정
    }
 
	// => UPDATE
    @Override
    public void updateCount(String id, int no, int count) {
    	repository.updateCount(id, no, count);
    }
    
	// ** DUPLICATE KEY UPDATE 구문
    @Override
    public void dupUpdateCount(String id, int no, String name, int count) {
    	repository.dupUpdateCount(id, no, name, count);
    }
    
    // ** default 메서드 활용 update
    @Override
    public int calcCount(String id, int no, int count) {
    	return repository.calcCount(id, no, count);
    }
    
    @Override
    public void delete(TestKeyId testid) {
    	repository.deleteById(testid);
    }

} //class
