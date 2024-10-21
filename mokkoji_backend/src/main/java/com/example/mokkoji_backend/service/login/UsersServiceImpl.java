package com.example.mokkoji_backend.service.login;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.mokkoji_backend.domain.MyPageDTO;
import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.PageResultDTO;
import com.example.mokkoji_backend.domain.UserPurchaseRankDTO;
import com.example.mokkoji_backend.domain.UsersDTO;
import com.example.mokkoji_backend.entity.login.Address;
import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.repository.login.AddressRepository;
import com.example.mokkoji_backend.repository.login.UsersDSLRepository;
import com.example.mokkoji_backend.repository.login.UsersRepository;
import com.example.mokkoji_backend.service.myPage.CartService;
import com.example.mokkoji_backend.service.myPage.FavoritesService;

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
	private final UsersDSLRepository usersDSLRepository;

	@Override
	public Users selectOne(String id) {
		return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("회원가입이 가능합니다."));
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
		address.setDetailedAddress(userDTO.getRecipientName() != null ? userDTO.getRecipientName() : userDTO.getName());
		address.setRecipientName(userDTO.getName());
		address.setRecipientPhone(userDTO.getPhoneNumber());
		address.setCreated_at(userDTO.getCreatedAt());
		addressRepository.save(address);
		log.info("유저 및 주소 저장 완료", userDTO.getUserId());
	}// registerUserAndAddres

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
	}

	@Override
	public Users findById(String name, String phonNumber) {
		return userRepository.findByNameAndPhoneNumber(name, phonNumber)
				.orElseThrow(() -> new NoSuchElementException("⚠️ 입력하신 정보와 일치하는 회원 정보를 찾을 수 없습니다"));
	}// findById

	@Override
	public void updatePassword(String userId, String password, LocalDate updatedAt) {
		userRepository.updatePassword(userId, password, updatedAt);
	}

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

		return MyPageDTO.builder().userId(users.getUserId()).name(users.getName()).birthDate(users.getBirthDate())
				.gender(users.getGender()).phoneNumber(users.getPhoneNumber()).email(users.getEmail())
				.createdAt(users.getCreatedAt()).updatedAt(users.getUpdatedAt()).favoritesCnt(favoritesCnt)
				.cartCnt(cartCnt).postalCode(address.getPostalCode()).streetAddress(address.getStreetAddress())
				.detailedAddress(address.getDetailedAddress()).build();
	}

	@Override
	public void updateUser(String userId, String phoneNumber, String email) {
		userRepository.updateUser(userId, phoneNumber, email);
	}

//	@Override
//	public List<Users> findUserinfoToSearch(String keyword, String searchType) {
//		
//		switch(searchType) {
//			case "all":
//				return userRepository.findBySearchAll(keyword,searchType);
//			case "name":
//				return userRepository.findBySearchUserName(keyword,searchType);
//			case "userId":
//				return userRepository.findBySearchUserId(keyword,searchType);
//			case "phoneNumber":
//				return userRepository.findBySearchUserPhoneNumber(keyword,searchType);
//		}
//		
//		return null;
//	}

	@Override
	public int countBy() {
		return userRepository.countBy();
	}

	@Override
	public void updateLoginCount(Users entity) {
		userRepository.save(entity);
	}

	public UsersDTO entityToDto(Users user) {
		return UsersDTO.builder().userId(user.getUserId()).password(user.getPassword()).name(user.getName())
				.birthDate(user.getBirthDate()).gender(user.getGender()).phoneNumber(user.getPhoneNumber())
				.email(user.getEmail()).userSequence(user.getUserSequence()).isWithdrawn(user.getIsWithdrawn())
				.withdrawalDate(user.getWithdrawalDate()).updatedAt(user.getUpdatedAt()).createdAt(user.getCreatedAt())
				.blockStatus(user.getBlockStatus()).isAdmin(user.getIsAdmin()).loginCount(user.getLoginCount()).build();
	}

	@Override
	public PageResultDTO<UsersDTO, Users> findUserinfoToSearch(PageRequestDTO requestDTO) {
		Page<Users> result = usersDSLRepository.findUserinfoToSearch(requestDTO);
		return new PageResultDTO<>(result, e -> entityToDto(e));
	}

	@Override
	public void userIsWithdrawnUpdate(Users entity) {
		userRepository.save(entity);
	}

	@Override
	public void userAdmimInfoUpdate(Users entity) {
		userRepository.save(entity);
	}
	
	@Override
	public UserPurchaseRankDTO getUserPurchaseRank(String userId) {
	    // 쿼리 결과는 List<Object[]>로 반환됩니다.
	    List<Object[]> result = userRepository.findUserPurchaseRank(userId);

	    // 결과가 null이 아니고, 결과 리스트가 비어있지 않은지 확인
	    if (result != null && !result.isEmpty()) {
	        // 첫 번째 결과만 처리
	        Object[] row = result.get(0);

	        // Object[] 배열에서 각 값을 적절한 타입으로 변환
	        Long rank = ((Number) row[0]).longValue();  // 'rank'는 Long으로 변환
	        String resultUserId = (String) row[1];  // 'user_id'는 String으로 변환
	        BigDecimal totalPurchase = (BigDecimal) row[2];  // 'total_purchase'는 BigDecimal로 변환
	        BigDecimal percentageRank = (BigDecimal) row[3];  // 'percentage_rank'는 BigDecimal로 변환

	        // DTO로 변환하여 반환
	        return new UserPurchaseRankDTO(resultUserId, totalPurchase.doubleValue(), rank.intValue(), percentageRank.doubleValue());
	    }

	    // 결과가 없을 경우 null 반환 또는 적절한 예외 처리
	    return null;
	}

}
