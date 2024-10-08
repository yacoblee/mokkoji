package com.example.mokkoji_backend.repository.login;

import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.login.Address;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AddressRepository extends JpaRepository<Address, Integer> {
	List<Address> findByUserId(String userId);

	// 마이페이지 : userDetail에서 완전 기본 주소 정보를 가져오기 위한 메서드
	Address findByUserIdAndIsDefault(String userId, int isDefault);
	
	// 마이페이지 : 주소지 목록을 List로 끌고오기
	List<Address> findByUserIdOrderByIsDefault(String userId);
	
	// 마이페이지 : 주소지 업데이트
	@Modifying
	@Transactional
	@Query("UPDATE Address AS a SET a.postalCode = :postalCode, a.streetAddress = :streetAddress, a.detailedAddress = :detailedAddress, a.locationName = :locationName, a.recipientName = :recipientName, a.recipientPhone = :recipientPhone WHERE a.userId = :userId AND a.isDefault = :isDefault")
	void updateAddressDetail(@Param("postalCode") String postalCode, @Param("streetAddress") String streetAddress, @Param("detailedAddress") String detailedAddress, @Param("locationName") String locationName, @Param("recipientName") String recipientName , @Param("recipientPhone") String recipientPhone, @Param("userId") String userId, @Param("isDefault") int isDefault );
	
	//구매시 현재 있는 데이터에서 , id를 찾기위한 메서드 . (구매테이블에 넣어야됨)
	Address findByUserIdAndLocationName(String userId,String locationName);
}
