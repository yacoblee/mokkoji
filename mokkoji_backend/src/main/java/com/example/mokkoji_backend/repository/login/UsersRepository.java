package com.example.mokkoji_backend.repository.login;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.entity.login.Users;

import jakarta.transaction.Transactional;

@Repository
public interface UsersRepository extends JpaRepository<Users, String>{

	Optional<Users> findByNameAndPhoneNumber(String name, String phoneNumber);

	Optional<Users> findByUserIdAndPhoneNumber(String userId, String phoneNumber);
	
	@Modifying
	@Transactional
	@Query("UPDATE Users u SET u.password = :password, u.updatedAt = :updatedAt WHERE u.userId = :userId")
	void updatePassword(@Param("userId") String userId, @Param("password") String password, @Param("updatedAt") LocalDateTime updatedAt);
	
	@Modifying
	@Transactional
	@Query("UPDATE Users AS u SET u.phoneNumber = :phoneNumber, u.email = :email WHERE u.userId = :userId")
	void updateUser(@Param("userId") String userId, @Param("phoneNumber") String phoneNumber, @Param("email") String email);

	Users findByUserId(String userId);

	@Query("SELECT u FROM Users u WHERE " +
	       "(:searchType = 'all' AND (u.userId LIKE %:keyword% OR u.name LIKE %:keyword% OR u.phoneNumber LIKE %:keyword%)) OR " +
	       "(:searchType != 'all' AND " +
	       " CASE WHEN :searchType = 'userId' THEN u.userId LIKE %:keyword% " +
	       "      WHEN :searchType = 'name' THEN u.name LIKE %:keyword% " +
	       "      WHEN :searchType = 'phoneNumber' THEN u.phoneNumber LIKE %:keyword% " +
	       " ELSE false END)")
	List<Users> findBySearchUser(@Param("keyword") String keyword, @Param("searchType") String searchType);
	
	int countBy();
	
}
