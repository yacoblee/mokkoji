package com.example.mokkoji_backend.service.login;

import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.repository.login.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("AddressService")
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService{
	
	@Autowired
	private final AddressRepository repository;
	



	@Override
	public void register(Address entity) {
		repository.save(entity);
		
	}






	
}
