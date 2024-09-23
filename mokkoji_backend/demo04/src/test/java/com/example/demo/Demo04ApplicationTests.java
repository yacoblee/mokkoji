package com.example.demo;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.domain.MemberRole;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;

import lombok.extern.log4j.Log4j2;
@Log4j2
@SpringBootTest
class Demo04ApplicationTests {

	void contextLoads() {}

	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	 
	void insertMember() {
		 Member member = Member.builder()
	                .id("roletest")
	                .password(passwordEncoder.encode("12345!"))
	                .name("홍길동")
	                .age(22)
	                .jno(7)
	                .info("SpringBoot Security Test")
	                .point(300.5)
	                .birthday("2000-02-02")
	                .rid("apple")
	                .uploadfile("aaa.gif")
	                .build();
		 member.addRole(MemberRole.ADMIN);
		 member.addRole(MemberRole.MANAGER);				 
		 member.addRole(MemberRole.USER);
		 
		 
		 
		 memberRepository.save(member);
	}
	@Test
	void testRead() {
		String id = "roletest";
		Member member = memberRepository.getWithRoles(id);
		
		log.info("member Test " + member);
	}
	
	void addRole() {
		List<Member> list = memberRepository.findAll();
		
		for(Member l: list) {
		Member member =	Member.builder()
            .id(l.getId())
            .password(l.getPassword())
            .name(l.getName())
            .age(l.getAge())
            .jno(l.getJno())
            .info(l.getInfo())
            .point(l.getPoint())
            .birthday(l.getBirthday())
            .rid(l.getRid())
            .uploadfile(l.getUploadfile())
            .build();
			
			if(l.getJno() == 7) {
				member.addRole(MemberRole.ADMIN);
				member.addRole(MemberRole.MANAGER);				 
			}else if(l.getId().equals("21woo") ||
					 l.getId().equals("gydbs99") ||
					 l.getId().equals("chelsea") ||
					 l.getId().equals("qkdrlfh456")
					){
				member.addRole(MemberRole.MANAGER);				 
			} 
			member.addRole(MemberRole.USER);	
			memberRepository.save(member);
		}
		
		
	}
	

}
