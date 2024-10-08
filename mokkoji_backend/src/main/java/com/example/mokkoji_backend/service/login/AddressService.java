package com.example.mokkoji_backend.service.login;

import java.util.List;

import com.example.mokkoji_backend.entity.login.Address;

public interface AddressService {

	// ** insert, update
	void register(Address entity);
	
	void deleteById(int id);

	// ** 해당 유저 아이디의 Address 리스트를 반환
	List<Address> findByuserId(String userId);
	
	// ** 구매페이지 넘어갈때 사용
	Address findByUserIdAndLocationName(String userId,String locationName);

	// ** 마이페이지에서 사용 ==============================================================================s
	// 1. 대표 주소 갖고오기
	Address findUserHomeAddress(String userId);

	// 2. 주소지 목록 들고오기
	List<Address> findUserAddress(String userId);

	// 3. 개별 주소지 정보 들고오기
	Address findUserAddressDetail(String userId, int isDefault);
	
	// 4. 주소지 수정
	List<Address> updateAddress(String postalCode, String streetAddress, String detailedAddress, String locationName, String recipientName, String recipientPhone, String userId, int isDefault);
}
