package com.example.mokkoji_backend.service.login;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.repository.UsersRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService{
	private final UsersRepository repository;
	
	@Override
	public Users selectOne(String id) {
		/*
		 * Users entity = repository.findById(id).get(); if(entity !=null) { return
		 * entity; }else return null;
		 */
		Optional<Users> result = repository.findById(id);
		if(result.isPresent()) {
			return result.get();
		}
		return null;
	}
	
	
	@Override
	public void register(Users entity) {
	repository.save(entity);
		
	}
	
	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		
	}

}

