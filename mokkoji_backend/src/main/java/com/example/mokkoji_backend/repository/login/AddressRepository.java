package com.example.mokkoji_backend.repository.login;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.login.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {
	List<Address> findByUserId(String userId);

	// 마이페이지 : userDetail에서 완전 기본 주소 정보를 가져오기 위한 메서드
	Address findByUserIdAndIsDefault(String userId, int isDefault);
	
	// 마이페이지 : 주소지 목록을 List로 끌고오기
	List<Address> findByUserIdOrderByIsDefault(String userId);
	
	//구매시 현재 있는 데이터에서 , id를 찾기위한 메서드 . (구매테이블에 넣어야됨)
	Address findByUserIdAndLocationName(String userId,String locationName);
}
