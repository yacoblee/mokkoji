package com.example.mokkoji_backend.repository.myPage;

import com.example.mokkoji_backend.entity.myPage.CartId;
import com.example.mokkoji_backend.entity.myPage.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, CartId> {

	List<Cart> findByUserIdOrderByCartDateDesc(String userId);

}
