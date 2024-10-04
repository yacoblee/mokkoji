package com.example.mokkoji_backend.service.login;


import java.util.Optional;

import com.example.mokkoji_backend.domain.MyPageDTO;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.repository.login.UsersRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;



@Service("UsersService")
@RequiredArgsConstructor
@Log4j2
public class UsersServiceImpl implements UsersService {

	@Autowired
	private final UsersRepository repository;
	@Autowired
	private Users users;

	private final FavoritesService favoritesService;
	private final CartService cartService;
	private final AddressService addressService;

	@Override
	public Users selectOne(String id) {
		return repository.findById(id).orElseGet(() -> {
			// 엔티티가 존재하지 않으면 기본값을 가진 새로운 객체 반환
			Users emptyUser = new Users();
			emptyUser.setUserId("Not Found");
			return emptyUser;
		});
	}// selectOne

	@Override
	public void register(Users entity) {
		repository.save(entity);

	}// register

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub

	}

	@Override
	public Users findById(String name, String phonNumber) {
		Optional<Users> optionalUser = repository.findByNameAndPhoneNumber(name, phonNumber);
		if (optionalUser.isPresent()) {
			return optionalUser.get();
		} else {
			Users emptyUser = new Users();
			emptyUser.setUserId("Not Found");
			return emptyUser;
		}
	}// findById

	
	@Override
	public Users findByUserIdAndPhoneNumber(String userId, String phoneNumber) {
		log.info("userServiceImpl  "+ phoneNumber);
	    Optional<Users> optionalUser = repository.findByUserIdAndPhoneNumber(userId, phoneNumber);
	    if (optionalUser.isPresent()) {
	    	log.info(optionalUser);
	        return optionalUser.get();  // 사용자가 있으면 반환
	    } else {
	        // 사용자가 없으면 기본값 반환
	        Users emptyUser = new Users();
	        emptyUser.setUserId("Not Found");
	        return emptyUser;
	    }
	}//findByUserIdAndPhoneNumber


	// *** 마이페이지에서 사용 =====================================================
	@Override
	public MyPageDTO findUser(String userId) {
		Users users = repository.findByUserId(userId);

		int favoritesCnt = favoritesService.countFavorites(users.getUserId());
		int cartCnt = cartService.countCart(users.getUserId());

		Address address = addressService.findUserHomeAddress(userId);

		return MyPageDTO.builder()
				.userId(users.getUserId())
				.name(users.getName())
				.birthDate(users.getBirthDate())
				.gender(users.getGender())
				.phoneNumber(users.getPhoneNumber())
				.email(users.getEmail())
				.createdAt(users.getCreatedAt())
				.updatedAt(users.getUpdatedAt())
				.favoritesCnt(favoritesCnt)
				.cartCnt(cartCnt)
				.postalCode(address.getPostalCode())
				.streetAddress(address.getStreetAddress())
				.detailedAddress(address.getDetailedAddress())
				.build();
	}

	@Override
	public void updateUser(String userId, String phoneNumber, String email) {
		repository.updateUser(userId, phoneNumber, email);
	}

}
