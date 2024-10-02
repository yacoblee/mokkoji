package com.example.mokkoji_backend.repository.login;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.login.Address;

public interface AddressRepository extends JpaRepository <Address, Integer >{
	List<Address> findByUserId(String userId);
}
