package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.JoDTO;
import com.example.demo.entity.Member;
import com.example.demo.repository.GuestBookRepository;
import com.example.demo.repository.MemberDSLRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.MyRepository;
import com.example.demo.repository.MyRepositoryImpl;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;


//** Service
//=> 요청클래스 와 Model(~DAO)클래스 사이의 연결(완충지대) 역할
//=> 요청클래스(컨트롤러) 와 Model클래스 사이에서 변경사항이 생기더라도 서로 영향 받지 않도록해주는 역할
//	결합도는 낮추고, 응집도는 높인다

//** interface 자동완성 
//=> Alt + Shift + T  
//=> 또는 마우스우클릭 PopUp Menu 의  Refactor - Extract Interface...

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	// ** 전역변수 정의


	private final MemberRepository mapper;
	private final MyRepository emrepository;
	private final MemberDSLRepository dsrepository;
	// ** selectList
	@Override
	public List<Member> selectList() {
		//return mapper.findAll();
		//return emrepository.emMemberList();
		return emrepository.cbMemmberList();
	}
	// ** selectOne
	@Override
	public Member selectOne(String id) {
//		Optional<Member> result = mapper.findById(id);
//		if(result.isPresent()) {
//			return result.get();
//		}else {
//			return null;
//		}
		return emrepository.emMemberDetail(id);
	}
	// ** insert
	@Override
	public Member save(Member entity) {
		return mapper.save(entity);
	}

	// ** delete
	@Override
	public void deleteById(String id) {
		mapper.deleteById(id);
	}
	@Override
	public List<Member> findByJno(int jno) {
		 
		return mapper.findByJno(jno);
	}
	@Override
	public void updatePassword(String id, String password) {

		 mapper.updatePassword(id, password);
	}
	
	
	@Override
	public List<JoDTO> joinDSL() {
		 
		return dsrepository.findMemberJnoDSL2();
	}
}//class
