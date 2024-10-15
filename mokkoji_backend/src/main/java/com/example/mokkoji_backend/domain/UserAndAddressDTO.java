package com.example.mokkoji_backend.domain;

import java.util.List;

import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.login.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder 
public class UserAndAddressDTO {
 private Users userinfo;
 private List<Address> userinfoAddress;
	
	
}
