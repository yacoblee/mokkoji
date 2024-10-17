package com.example.mokkoji_backend.repository.login;

import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.login.Address;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
	List<Address> findByUserId(String userId);

	@Query ("SELECT COUNT(a) FROM Address a WHERE a.userId = :userId AND a.isDefault = 0")
	 int countDefaultAddressesByUserId(@Param("userId") String userId);
	
	// 마이페이지 : userDetail에서 완전 기본 주소 정보를 가져오기 위한 메서드
	Address findByUserIdAndIsDefault(String userId, int isDefault);
	
	// 마이페이지 : 주소지 목록을 List로 끌고오기
	List<Address> findByUserIdOrderByIsDefault(String userId);
	
	// 마이페이지 : 주소지 업데이트
	@Modifying
	@Transactional
	@Query("UPDATE Address AS a SET a.postalCode = :postalCode, a.streetAddress = :streetAddress, a.detailedAddress = :detailedAddress, a.locationName = :locationName, a.recipientName = :recipientName, a.recipientPhone = :recipientPhone WHERE a.userId = :userId AND a.isDefault = :isDefault AND a.addressId = :addressId")
	void updateAddressDetail(@Param("postalCode") String postalCode, @Param("streetAddress") String streetAddress, @Param("detailedAddress") String detailedAddress, @Param("locationName") String locationName, @Param("recipientName") String recipientName , @Param("recipientPhone") String recipientPhone, @Param("userId") String userId, @Param("isDefault") int isDefault, @Param("addressId") int addressId );

	// 마이페이지 : 기본주소 변경 1단계 - 기존 기본주소의 isDefault 값을 3으로 설정
	@Modifying
	@Transactional
	@Query("UPDATE Address AS a SET a.isDefault = 1 WHERE a.userId = :userId AND a.isDefault = 0")
	void changeDefaultFirst(@Param("userId") String userId);

	// 마이페이지 : 기본주소 변경 2단계 - 선택한 주소지의 isDefault를 0으로 새로 설정
	@Modifying
	@Transactional
	@Query("UPDATE Address AS a SET a.isDefault = 0 WHERE a.userId = :userId AND a.addressId = :addressId")
	void changeDefaultSecond(@Param("userId") String userId, @Param("addressId") int addressId);

	// 마이페이지 : 기본주소 변경 3단계 - isDefault=3인 주소의 isDefault 값을 선택한 항목의 isDefault로 교체
	@Modifying
	@Transactional
	@Query("UPDATE Address AS a SET a.isDefault = :isDefault WHERE a.userId = :userId AND a.isDefault = 3")
	void changeDefaultThird(@Param("userId") String userId, @Param("isDefault") int isDefault);

	// 마이페이지 : 주소 입력
	@Modifying
	@Transactional
	default void createAddress(String userId, String postalCode, String streetAddress, String detailedAddress, String locationName, String recipientPhone, String recipientName){
		Address address = new Address().builder()
				.userId(userId)
				.postalCode(postalCode)
				.streetAddress(streetAddress)
				.detailedAddress(detailedAddress)
				.locationName(locationName)
				.recipientPhone(recipientPhone)
				.isDefault(1)
				.recipientName(recipientName)
				.build();

		this.save(address);
	}


	//구매시 현재 있는 데이터에서 , id를 찾기위한 메서드 . (구매테이블에 넣어야됨)
	Address findByUserIdAndLocationName(String userId,String locationName);
}
