package com.example.mokkoji_backend.repository.login;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.login.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {
	List<Address> findByUserId(String userId);

	// 마이페이지 : userDetail에서 완전 기본 주소 정보를 가져오기 위한 메서드
	Address findByUserIdAndIsDefault(String userId, int isDefault);
}
