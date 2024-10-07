package com.example.mokkoji_backend.repository.login;

import com.example.mokkoji_backend.entity.login.Users;
import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, String>{

	Optional<Users> findByNameAndPhoneNumber(String name, String phoneNumber);

	Optional<Users> findByUserIdAndPhoneNumber(String userId, String phoneNumber);
	
	
	@Modifying
	@Transactional
	@Query("UPDATE Users u SET u.password = :password WHERE u.userId = :userId")
	void updatePassword(@Param("userId") String userId,@Param("password") String password);
	
	@Modifying
	@Transactional
	@Query("UPDATE Users AS u SET u.phoneNumber = :phoneNumber, u.email = :email WHERE u.userId = :userId")
	void updateUser(@Param("userId") String userId, @Param("phoneNumber") String phoneNumber, @Param("email") String email);

	Users findByUserId(String userId);

	
	
	
}
