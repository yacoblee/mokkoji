package com.example.demo.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.domain.JoDTO;
import com.example.demo.domain.MemberDTO;
import com.example.demo.entity.Jo;
import com.example.demo.entity.Member;
import com.example.demo.service.JoService;
import com.example.demo.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@Log4j2
@AllArgsConstructor // 모든컬럼 생성자 주입됨, 개별적인 @Autowired 생략가능
@Controller
@RequestMapping(value ="/member")
public class MemberController {
	
	MemberService service;
	PasswordEncoder passwordEncoder;
	// = new BCryptPasswordEncoder(); 
	//	-> 주입받음
	//	-> 그러므로 생성되어있어야함 (JavaConfig 파일_DemoConfig.java 이용)
	
	JoService jservice;
	
	
	@GetMapping("/joindsl")
	public String joinDSL() {
		
		List<JoDTO> list = service.joinDSL();
		
		for(JoDTO j : list) {
			System.out.println("************ "+j);
		}
	
		return "redirect:/home";	
	}
	
	
	
	
	
	
	
	
	
	
	//** ID 중복확인
	@GetMapping("/idDupCheck")
	public void idDupCheck( String id, Model model) {
		// ** newID 존재여부 확인 & 결과전달
		if ( service.selectOne(id) != null ) {
			// => 사용 불가능
			model.addAttribute("idUse", "F");
		}else {
			// => 사용가능
			model.addAttribute("idUse", "T");
		}
	} //idDupCheck
	
	
	
	
	// ** MemberList
	@GetMapping("/memberList")
	public void mList(Model model) {
		model.addAttribute("banana", service.selectList());
	} //mList
	
	// ** Login & Logout
	//=> loginForm
	@GetMapping("/loginForm")
	public void loginForm() {
		System.out.println("** loginForm 출력 **");
	} //loginForm
	//=> login 
	@PostMapping("/login")
	public String login(HttpSession session, Model model, Member entity) {
		String password = entity.getPassword();   
		String uri = "redirect:/home"; 
		
		entity = service.selectOne(entity.getId());
 
		// ** passwordEncoder 적용
		if (entity!=null && passwordEncoder.matches(password, entity.getPassword())) {	
			// => 성공
			session.setAttribute("loginID", entity.getId());
			session.setAttribute("loginName", entity.getName());
		}else {
			// => 실패
			uri="member/loginForm";
			model.addAttribute("message", "~~ id 또는 password 오류 !! 다시하세요 ~ ");
		}
		return uri;
	} //login
	//=> logout 
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/home";
	} //logout
	
	
	@GetMapping("/memberDetail")
	public String detail(HttpSession session, Model model, String jCode ) {
		String uri = "member/memberDetail";
		model.addAttribute("apple", service.selectOne((String)session.getAttribute("loginID")));
		if ( "U".equals(jCode) ) {
			uri="member/updateForm" ; 
		 
			model.addAttribute("banana", jservice.selectList());
		}
		
		return uri;
	} //detail
	
 
	@GetMapping(value="/joinForm")
	public void joinForm(Model model) {

		model.addAttribute("banana", jservice.selectList());
	} //joinForm
	

	@PostMapping(value="/mjoin")
	public String mjoin(HttpServletRequest request,  
								Model model, Member entity) throws IOException {
		String uri="member/loginForm"; //성공시 
		
		// 1) passwordEncoder 적용
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));

		String realPath = request.getServletContext().getRealPath("/");
			realPath += "resources/uploadImages/" ;
		System.out.println("** realPath => "+realPath);
		
		File file = new File(realPath);
		if ( !file.exists() ) file.mkdir();
		// => 저장폴더가 존재하지 않으면 생성해줌. 
		

		file = new File(realPath+"basicman.png");
		if ( !file.exists() ) {
			String basicImagePath = "Users\\mac\\Documents\\Mtest\\myWork\\demo04\\src\\main\\webapp\\resources\\images\\basicman.png";
			FileInputStream fin = new FileInputStream(new File(basicImagePath));	
			FileOutputStream fout = new FileOutputStream(file);

			FileCopyUtils.copy(fin, fout);
		}
		

		String file1="", file2="basicman.png";
		
		MultipartFile uploadfilef = entity.getUploadfilef();

		if ( uploadfilef!=null && !uploadfilef.isEmpty() ) {
			// => imageFile 선택 -> 저장
			file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로(realPath + 화일명) 완성
			uploadfilef.transferTo(new File(file1)); // file1 경로에 저장(붙여넣기)
			
			// => Table 저장값 완성
			file2 = uploadfilef.getOriginalFilename();
		}
		
		entity.setUploadfile(file2);
		try {
			
			log.info("member insert Success "+ service.save(entity));
			model.addAttribute("message", "~~ 회원가입 성공, 로그인 후 이용하세요 ~~");
		} catch (Exception e) {
			model.addAttribute("message", "~~ 회원가입 실패, 다시 하세요 ~~ ~~");
			uri="member/joinForm";
		}
		// ****************************************************
		
		return uri;
	} //mjoin
	
	@GetMapping(value="/pwUpdate")
	public void pwupdate() {
	
	} //pwupdate
	
	@PostMapping(value="/pwUpdate")
	public String pwupdate(Model model, Member entity, HttpSession session) {
		// 1) 요청분석
		
		entity.setId((String)session.getAttribute("loginID"));
		System.out.println(entity.getPassword());
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		
		String url = "member/loginForm";
		try {
			service.updatePassword(entity.getId(), entity.getPassword());
			session.invalidate();	
		} catch (Exception e) {
			log.error("패스워드 업데이트 실패"+e.toString());
			
			model.addAttribute("message", "다시하세요");
			return "member/pwUpdate";
		}
		
		
		
		// 
		
		return url;
	} //
	@PostMapping(value="/mupdate")
	public String mupdate(HttpServletRequest request, HttpSession session,  
						Model model, Member entity) throws IOException {
		
		model.addAttribute("apple", entity);
		String uri="member/memberDetail"; //성공시 
		

 		MultipartFile uploadfilef = entity.getUploadfilef();
 		if ( uploadfilef!=null && !uploadfilef.isEmpty() ) {

 			String realPath = request.getServletContext().getRealPath("/");
 			realPath += "resources\\uploadImages\\";
 			System.out.println("realPath + " + realPath);
 	
 			if ( !"basicman.png".equals(entity.getUploadfile()) ) {
 				File delFile = new File(realPath+entity.getUploadfile());
 	 			if ( delFile.isFile() ) delFile.delete();
 			}
 			
 			// 3) newImage 물리적 저장
 			realPath += uploadfilef.getOriginalFilename(); // 저장경로 완성
 			uploadfilef.transferTo(new File(realPath));
 			
 			// 4) Table 의 저장값 수정
 			entity.setUploadfile(uploadfilef.getOriginalFilename());
 		}
 		
		try {
			log.info("service save success =>"+service.save(entity));
			session.setAttribute("loginName", entity.getName());
			model.addAttribute("message", "~~ 회원정보 수정 성공 ~~");
		} catch (Exception e) {
			log.error(e.toString());
			model.addAttribute("message", "~~ 회원정보 수정 실패, 다시 하세요 ~~ ~~");
			uri="member/updateForm";
		}
		
		return uri;
	} //mupdate
	

	// => 성공/실패: redirect:/home
	@GetMapping("/delete")
	public String delete(HttpSession session, RedirectAttributes rttr) {
		// 1) 요청분석
		String uri = "redirect:/home";
		String id = (String)session.getAttribute("loginId");
		
		try {
			service.deleteById(id);
			log.info("service save success =>"+ id);
			rttr.addFlashAttribute("message", "~~ 탈퇴 성공 !! 1개월 후 재가입 가능합니다. ~~");
			session.invalidate();
		} catch (Exception e) {
			log.error(e.toString());
			rttr.addFlashAttribute("message", "~~ 탈퇴 실패 !! 관리자에게 연락 하세요 ~~");
		}
		
	 
		return uri;
	} //delete

} //class
