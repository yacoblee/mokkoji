package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.entity.Jo;
import com.example.demo.service.JoService;
import com.example.demo.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;


@Log4j2
@Controller
@AllArgsConstructor
@RequestMapping(value="/jo")
public class JoController {
	
	JoService service;	
	MemberService mservice;
	
	// ** JoList : Member 와 Join
	@GetMapping("/joList")
	public void joList(Model model) {
		//model.addAttribute("banana", service.selectList());
		model.addAttribute("banana", service.jointList());
	} //joList
	
	@GetMapping("/detail")
	public String detail(Model model, Jo entity, String jCode, int jno) {
		
		String uri = "jo/joDetail";
		model.addAttribute("apple", service.selectOne(jno));
		if ( "U".equals(jCode) ) uri = "jo/joUpdate";
		else {

			model.addAttribute("banana", mservice.findByJno(entity.getJno()));
		}
		return uri;
	} //detail
	

	@GetMapping(value="/joInsert")
	public void joInsert() {
	} //joInsert

	@PostMapping(value="/insert")
	public String insert(Model model, Jo entity, RedirectAttributes rttr) {
		String uri="redirect:joList";
		
		try {
			
			log.info("save success : "+ service.save(entity));
			rttr.addFlashAttribute("message", "~~ Jo_Insert 성공 ~~");
		}catch (Exception e) {
 
			model.addAttribute("message", "~~ Jo_Insert 실패 , 다시 하세요 ~~");
			uri="jo/joInsert";
		}
		
		// 3) View 처리
		return uri;
	} //insert	
	
	// ** Update
	@PostMapping(value="/update")
	public String update(Model model, Jo entity, RedirectAttributes rttr) {
		
		model.addAttribute("apple", entity);
		String uri="redirect:joList";
		
		try {
			
			log.info("save success : "+ service.save(entity));
			rttr.addFlashAttribute("message", "~~ Jo 정보 수정 성공 ~~");
		}catch (Exception e) {
			// 수정실패
			model.addAttribute("message", "~~ Jo 정보 수정 실패 , 다시 하세요 ~~");
			uri="jo/joUpdate";
		}
		
		return uri;
	} //update
	// ** Update

 
	@GetMapping(value="/delete")
	public String delete(HttpServletRequest request, RedirectAttributes rttr) {
		
		 
		String uri="redirect:joList";
		int jno = (Integer)request.getAttribute("jno");
		try {
			log.info("service save success =>"+ jno);
			rttr.addFlashAttribute("message", "~~ Jo 삭제 성공 !!! ~~");
		}catch (Exception e) {
			log.error(e.toString());
			rttr.addFlashAttribute("message", "~~ Jo 삭제 실패 !!! ~~");
		}
		// 3) View 처리
		return uri;
	} //delete

} //class
