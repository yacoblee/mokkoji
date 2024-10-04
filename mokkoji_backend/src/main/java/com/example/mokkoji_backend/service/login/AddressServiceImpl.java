package com.example.mokkoji_backend.service.login;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.repository.login.AddressRepository;

import lombok.RequiredArgsConstructor;

@Service("AddressService")
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService{
	
	@Autowired
	private final AddressRepository repository;
	
	@Override
	public List<Address> findByuserId(String userId) {
		
		return repository.findByUserId(userId);
	}


	@Override
	public void register(Address entity) {
		repository.save(entity);
		
	}

	@Override
	public Address findUserAddress(String userId) {
		return repository.findByUserIdAndIsDefault(userId, 0);
	}

	@Override
	public void deleteById(int id) {
		repository.deleteById(id);
//		try { 
//			List<Address> entities =  findByuserId(userId);
//			for (Address add : entities) {
//			}
//			System.out.println("AddressServiceImpl_deleteById 성공");
//		} catch (Exception e) {
//			System.out.println("AddressServiceImpl_deleteById 실패");
//		}
		 //repository.deleteById(addressId);
	}

	
}
