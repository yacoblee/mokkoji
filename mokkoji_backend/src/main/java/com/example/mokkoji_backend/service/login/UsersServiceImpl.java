package com.example.mokkoji_backend.service.login;



import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.mokkoji_backend.domain.MyPageDTO;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.repository.login.AddressRepository;
import com.example.mokkoji_backend.repository.login.UsersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service("UsersService")
@RequiredArgsConstructor
@Transactional
@Log4j2
public class UsersServiceImpl implements UsersService {

	private final UsersRepository userRepository;
	// private final Users users;
	private final AddressRepository addressRepository;
	private final PasswordEncoder passwordEncoder;

	private final FavoritesService favoritesService;
	private final CartService cartService;
	private final AddressService addressService;

	@Override
	public Users selectOne(String id) {
		return userRepository.findById(id)
				.orElseThrow(()->new NoSuchElementException("회원가입이 가능합니다."));
	}// selectOne


	@Override
	public void registerUserAndAddress(UsersDTO userDTO) {

			// 유저 정보 저장
			Users user = new Users();
			user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
			user.setName(userDTO.getName());
			user.setUserId(userDTO.getUserId());
			user.setGender(userDTO.getGender());
			user.setPhoneNumber(userDTO.getPhoneNumber());
			user.setEmail(userDTO.getEmail());
			user.setBirthDate(userDTO.getBirthDate());
			user.setCreatedAt(userDTO.getCreatedAt());
			user.setIsAdmin(userDTO.getIsAdmin() != null ? userDTO.getIsAdmin() : "0");
			userRepository.save(user);
			// 유저 주소 저장
			Address address = new Address();
			address.setUserId(userDTO.getUserId());
			address.setPostalCode(userDTO.getPostalCode());
			address.setStreetAddress(userDTO.getStreetAddress());
			address.setDetailedAddress(userDTO.getDetailedAddress());
			address.setRecipientPhone(userDTO.getPhoneNumber());
			address.setCreated_at(userDTO.getCreatedAt());
			addressRepository.save(address);
		    log.info("유저 및 주소 저장 완료", userDTO.getUserId());
	}//registerUserAndAddres


	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
	}


	@Override
	public Users findById(String name, String phonNumber) {
		return userRepository.findByNameAndPhoneNumber(name, phonNumber)
							  .orElseThrow(()->new NoSuchElementException("⚠️ 입력하신 정보와 일치하는 회원 정보를 찾을 수 없습니다"));
	}// findById



	@Override
	public Users findByUserIdAndPhoneNumber(String userId, String phoneNumber) {
		log.info("userServiceImpl  " + phoneNumber);
		Optional<Users> optionalUser = userRepository.findByUserIdAndPhoneNumber(userId, phoneNumber);
		if (optionalUser.isPresent()) {
			log.info(optionalUser);
			return optionalUser.get(); // 사용자가 있으면 반환
		} else {
			// 사용자가 없으면 기본값 반환
			Users emptyUser = new Users();
			emptyUser.setUserId("Not Found");
			return emptyUser;
		}
	}// findByUserIdAndPhoneNumber


	// *** 마이페이지에서 사용 =====================================================
	@Override
	public MyPageDTO findUser(String userId) {
		Users users = userRepository.findByUserId(userId);

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
		userRepository.updateUser(userId, phoneNumber, email);
	}

}
