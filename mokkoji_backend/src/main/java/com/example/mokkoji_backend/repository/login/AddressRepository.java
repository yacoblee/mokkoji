package com.example.mokkoji_backend.repository.login;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.login.Address;

public interface AddressRepository extends JpaRepository <Address, Integer >{

}
