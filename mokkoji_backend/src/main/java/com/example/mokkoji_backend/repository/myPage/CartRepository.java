package com.example.mokkoji_backend.repository.myPage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mokkoji_backend.entity.myPage.Cart;
import com.example.mokkoji_backend.entity.myPage.CartId;

public interface CartRepository extends JpaRepository<Cart, CartId> {

	List<Cart> findByUserIdOrderByCartDateDesc(String userId);

}
