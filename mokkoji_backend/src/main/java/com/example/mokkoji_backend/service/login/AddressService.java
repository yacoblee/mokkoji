package com.example.mokkoji_backend.service.login;

import java.util.List;

import com.example.mokkoji_backend.entity.login.Address;

public interface AddressService {

	// ** insert, update
	void register(Address entity);

	// ** 해당 유저 아이디의 Address 리스트를 반환
	List<Address> findByuserId(String userId);

	// ** 마이페이지에서 사용
	Address findUserHomeAddress(String userId);
}
