package com.example.mokkoji_backend.service.login;

import com.example.mokkoji_backend.entity.login.Users;
import com.example.mokkoji_backend.repository.login.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Service("UsersService")
@RequiredArgsConstructor
@Log4j2
public class UsersServiceImpl implements UsersService {

	@Autowired
	private final UsersRepository repository;
	@Autowired
	private Users users;

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

}
