package com.example.mokkoji_backend.repository.login;

import java.time.LocalDate;
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
public interface UsersRepository extends JpaRepository<Users, String> {

	Optional<Users> findByNameAndPhoneNumber(String name, String phoneNumber);

	Optional<Users> findByUserIdAndPhoneNumber(String userId, String phoneNumber);

	Users findByUserId(String userId);

	int countBy();

	@Modifying
	@Transactional
	@Query("UPDATE Users u SET u.password = :password, u.updatedAt = :updatedAt WHERE u.userId = :userId")
	void updatePassword(@Param("userId") String userId, @Param("password") String password,
			@Param("updatedAt") LocalDate updatedAt);

	@Modifying
	@Transactional
	@Query("UPDATE Users AS u SET u.phoneNumber = :phoneNumber, u.email = :email WHERE u.userId = :userId")
	void updateUser(@Param("userId") String userId, @Param("phoneNumber") String phoneNumber,
			@Param("email") String email);


	@Query("SELECT u FROM Users u WHERE "
			+ "(:searchType = 'all' AND (u.userId LIKE %:keyword% OR u.name LIKE %:keyword% OR u.phoneNumber LIKE %:keyword%))")
	List<Users> findBySearchAll(@Param("keyword") String keyword, @Param("searchType") String searchType);

	@Query("SELECT u FROM Users u WHERE (:searchType = 'userId' AND u.userId LIKE %:keyword%)")
	List<Users> findBySearchUserId(@Param("keyword") String keyword,@Param("searchType") String searchType);


	@Query("SELECT u FROM Users u WHERE :searchType = 'name' AND u.name LIKE %:keyword% ")
	List<Users> findBySearchUserName(@Param("keyword") String keyword, @Param("searchType") String searchType);

	@Query("SELECT u FROM Users u WHERE :searchType = 'phoneNumber' AND u.phoneNumber LIKE %:keyword% ")
	List<Users> findBySearchUserPhoneNumber(@Param("keyword") String keyword, @Param("searchType") String searchType);

	
	@Query(value = "SELECT "
	        + "RANK() OVER (ORDER BY total_purchase DESC) AS user_rank, "  // 'rank' -> 'user_rank'로 변경
	        + "user_id, "
	        + "total_purchase, "
	        + "(RANK() OVER (ORDER BY total_purchase DESC) / total_users) * 100 AS percentage_rank "
	        + "FROM ( "
	        + "    SELECT user_id, SUM(total) AS total_purchase "
	        + "    FROM orders "
	        + "    GROUP BY user_id "
	        + ") AS purchase_totals, "
	        + "(SELECT COUNT(DISTINCT user_id) AS total_users FROM orders) AS total_users "
	        + "WHERE user_id = :userId", nativeQuery = true)
	List<Object[]> findUserPurchaseRank(@Param("userId") String userId);
	
}
