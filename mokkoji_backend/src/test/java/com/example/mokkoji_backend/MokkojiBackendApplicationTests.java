package com.example.mokkoji_backend;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.repository.UsersRepository;


@SpringBootTest
class MokkojiBackendApplicationTests {
	
	@Autowired
	UsersRepository repository;
	@Test
	void contextLoads() {
		
	}
	
	/*
	 * @Test public void selectOne() { Optional <Users> user =
	 * repository.findById("user3"); log.info("*** User found: " + user); }
	 */
	
}
