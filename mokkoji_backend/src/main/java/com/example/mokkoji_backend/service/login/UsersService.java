package com.example.mokkoji_backend.service.login;

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
	void updatePassword(String userId,String password);
	

	// ** 사용자 정보 마이페이지 전용 객체
	MyPageDTO findUser(String userId);

	// ** 사용자 정보 업데이트
	void updateUser(String userId, String phoneNumber, String email);
}
