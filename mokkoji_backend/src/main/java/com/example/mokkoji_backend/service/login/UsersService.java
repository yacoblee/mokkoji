package com.example.mokkoji_backend.service.login;

import java.time.LocalDateTime;
import java.util.List;

import com.example.mokkoji_backend.domain.MyPageDTO;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Users;



public interface UsersService {

	// ** selectOne
	Users selectOne(String id);

	// ** insert, update
	void registerUserAndAddress(UsersDTO userDTO);


	// ** delete
	void deleteById(String id);

	// ** findById
	Users findById(String name, String phonNumber);


	//** 유저 이메일 반환
	Users findByUserIdAndPhoneNumber(String userId, String phonNumber);

	//** 유저 비밀번호 변경 
	void updatePassword(String userId,String password,LocalDateTime updatedAt);
	

	// ** 사용자 정보 마이페이지 전용 객체
	MyPageDTO findUser(String userId);

	// ** 사용자 정보 업데이트
	void updateUser(String userId, String phoneNumber, String email);
	
	// 유저 정보 찾기 
	List<Users> findUserinfoToSearch (String keyword, String searchType);
	
	int countBy();
	
	void updateLoginCount(Users entity);
}
