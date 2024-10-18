package com.example.mokkoji_backend.service.login;

import java.util.List;

import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.repository.login.AddressRepository;

import lombok.RequiredArgsConstructor;

@Log4j2
@Service("AddressService")
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService{
	

	private final AddressRepository repository;

	private final AddressRepository addressRepository;
	
	@Override
	public List<Address> findByuserId(String userId) {
		
		return repository.findByUserId(userId);
	}


	@Override
	public void register(Address entity) {
		repository.save(entity);
	}
	
//	@Override
//	public void userAdmimAddressUpdate(List<Address> addr) {
//	    String userId;
//	    List<Address> dbAddress;
//
//	    for (Address address : addr) {
//	        userId = address.getUserId();
//	        
//	        //  userId가 동일한 DB에 저장된 모든 주소를 가져옴
//	        dbAddress = repository.findByUserId(userId);
//
//	        
//	        // DB의 모든 주소와 입력한 주소의 isDefault를 비교
//	        for (Address dbAddr : dbAddress) {
////	            if (address.getIsDefault() == dbAddr.getIsDefault()) {
////	                // 동일한 isDefault 와 동일한 userId를 가진 주소를 삭제
////	                repository.delete(dbAddr);
////	            }
//	        	if(addr.size()!=dbAddress.size()) {
//	        		repository.deleteAll(dbAddress);
//	        	}
//	        	
//	        	
//	        }
//
//	        // 새로운 주소 저장
//	        repository.save(address);
//	    }
//	}

	@Override
	public void userAdmimAddressUpdate(List<Address> addr) {
		repository.saveAll(addr);
		
	}
	
	@Override
	public void deleteById(int id) {
		repository.deleteById(id);

	}
	
	@Override
	public Address findByUserIdAndLocationName(String userId, String locationName) {
		
		return repository.findByUserIdAndLocationName(userId, locationName);
	}


	// ** 마이페이지 사용 ============================================================================

	@Override
	public Address findUserHomeAddress(String userId) {
		return repository.findByUserIdAndIsDefault(userId, 0);
	}

	@Override
	public Address findUserAddressDetail(String userId, int isDefault) {
		return repository.findByUserIdAndIsDefault(userId, isDefault);
	}

	@Override
	@Transactional
	public List<Address> updateAddress(String postalCode, String streetAddress, String detailedAddress, String locationName, String recipientName, String recipientPhone, String userId, int isDefault, int addressId) {
		repository.updateAddressDetail(postalCode, streetAddress, detailedAddress, locationName, recipientName, recipientPhone, userId, isDefault, addressId);
		return repository.findByUserIdOrderByIsDefault(userId);
	}

	@Override
	@Transactional
	public List<Address> changeDefaultAddress(String userId, int addressId) {
		// 1단계 - 기존 기본주소의 isDefault 값을 3으로 설정
		repository.changeDefaultFirst(userId);
		// 2단계 - 선택한 주소지의 isDefault를 0으로 새로 설정
		repository.changeDefaultSecond(userId, addressId);
		// 3단계 - isDefault=3인 주소의 isDefault 값을 선택한 항목의 isDefault로 교체
//		repository.changeDefaultThird(userId, isDefault);
		return repository.findByUserIdOrderByIsDefault(userId);
	}

	@Override
	public List<Address> findUserAddress(String userId) {
		return repository.findByUserIdOrderByIsDefault(userId);
	}

	@Override
	@Transactional
	public List<Address> deleteAddress(String userId, int addressId) {
		repository.deleteById(addressId);
		return repository.findByUserIdOrderByIsDefault(userId);
	}

	@Transactional
	@Override
	public List<Address> createInsertAddress(String userId, String postalCode, String streetAddress, String detailedAddress, String locationName, String recipientPhone, String recipientName){
		repository.createAddress(userId, postalCode, streetAddress, detailedAddress, locationName, recipientPhone, recipientName);
		return repository.findByUserIdOrderByIsDefault(userId);
	}
}
