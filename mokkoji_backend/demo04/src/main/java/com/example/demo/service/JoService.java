package com.example.demo.service;

import java.util.List;

import com.example.demo.domain.JoDTO;
import com.example.demo.entity.Jo;


public interface JoService {

	// ** selectList
	List<Jo> selectList();
	
	List<JoDTO> jointList();

	// ** selectOne
	Jo selectOne(int jno);

	// ** insert, update
	Jo save(Jo entity);

	// ** delete
	void deleteById(int jno);

}