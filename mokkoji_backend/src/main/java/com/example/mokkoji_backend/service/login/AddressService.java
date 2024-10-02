package com.example.mokkoji_backend.service.login;

import com.example.mokkoji_backend.entity.login.Address;

public interface AddressService {

	// ** insert, update
		void register (Address entity);

	// ** 마이페이지에서 사용
	Address findUserAddress(String userId);
}
