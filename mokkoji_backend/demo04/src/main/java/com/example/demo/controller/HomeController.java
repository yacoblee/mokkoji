package com.example.demo.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.domain.GuestBookDTO;
import com.example.demo.domain.PageRequestDTO;
import com.example.demo.domain.PageResultDTO;
import com.example.demo.entity.GuestBook;
import com.example.demo.entity.TestKey;
import com.example.demo.entity.TestKeyId;
import com.example.demo.service.GuestBookService;
import com.example.demo.service.TestKeyService;


@Log4j2
@Controller
@RequiredArgsConstructor
public class HomeController {
	
	
	private final GuestBookService service;
	private final TestKeyService tservice;
	@GetMapping({"/", "/home"})
	public String home(Locale locale, Model model) {
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		String formattedDate = dateFormat.format(date);
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	} //home	
	
	@GetMapping("/axtestform")
	public String axTestForm() {
		return "axTest/axTestForm";
	}
	//*******JPA 복합키 Test***********************************************
	@GetMapping("/tsave")
	public String tsave() {
		System.out.println("tsave");
		TestKey entity = TestKey.builder()
							.id("test1")
							.no(1)
							.name("update")
							.count(1).build();
		try {
			tservice.save(entity);
			log.info("update 에 성공했습니다.");
		} catch (Exception e) {
			log.error("update 오류가 발생했습니다. "+e.toString());
		}
		
		
		return "redirect:home";
	}
	
	  @GetMapping("/tupdate")
	    public String tupdate() {
			TestKey entity = TestKey.builder()
					.id("test1")
					.no(1)
					.name("스티브")
					//.name(TestKey.builder().no(1).build().toString())
					.count(1).build();
				try {
					tservice.save(entity);
					log.info("save 에 성공했습니다.");
				} catch (Exception e) {
					log.error("save 오류가 발생했습니다. "+e.toString());
				}  
	        
	        return "redirect:home";
	    } //tupdate
	  
	    @GetMapping("/tlist")
	    public String tlist() {
	        List<TestKey> list = tservice.selectList();
	        
			for(TestKey g : list) {
				System.out.println(g);
			}
	        
	        return "redirect:home";
	    } //tlist
	
	    @GetMapping("/tdetail")
	    public String tdetail(TestKeyId key) {
	    	TestKey list = tservice.selectOne(key);
	        System.out.println("test key" + list);
	        
	        return "redirect:home";
	    } //tlist
	    
	    @GetMapping("/tdelete")
	    public String tdelete(TestKeyId key) {
	    	
	    	try {
				if(tservice.selectOne(key).toString() != null) {
					tservice.delete(key);
				}else {
					throw new Exception("null point exception");
				}
				log.info("delete sucess " +key);
			} catch (Exception e) {
				log.error("delete error " + e.toString());
			}
	        
	        return "redirect:home";
	    } //tdelete
	    /** count update 파라미터로 전달된 값들이 저장되어 있어야 함
	    	기존의 count += 전달된 count 값
	    	새로운 sql 구문이 필요
	   		TestKeyRepository 에 메서드 추가필요
	   		필요한 컬럼: id, no , count => 쿼리 스트링으로 전달
	    tupdatecount?id=test5&no=5&count=10
	    **/
	    @GetMapping("/tupdatecount") //duplicate update count 증가
	    public String tcountupdate(String id, int no, int count) {
	         
	    	try {
	    		tservice.updateCount(id, no,count);
				log.info("count sucess " +count);
			} catch (Exception e) {
				log.error("count error " + e.toString());
			}
	        return "redirect:home";
	    } //tdupupdate
	    
	    
	    
	    @GetMapping("/tdupupdate") //duplicate update count increase
	    public String tdupupdate(String id, int no, int count, String name) {
	    	try {
	    		tservice.dupUpdateCount(id, no, name, count);
				log.info("duplicate sucess " +id + ", " + no);
			} catch (Exception e) {
				log.error("duplicate error " + e.toString());
			}
	        
	        return "redirect:home";
	    } //tdupupdate
	    
	    @GetMapping("/tcalc")
	    public String tcalc(String id, int no, int count) {
	    	try {
	    		 
				log.info("duplicate sucess result = " +tservice.calcCount(id, no, count) );
			} catch (Exception e) {
				log.error("duplicate error " + e.toString());
			}
	        
	        
	        return "redirect:home";
	    } //tcalc
	    

	
	// *******JPA Start*****GuestBook Test*****************************
	@GetMapping("/ginsert")
	public String ginsert() {
		GuestBook entity = GuestBook.builder()
							.title("Jpa Insert Test")
							.content("작성자 테스트 중 입니다.")
							.writer("작성")
							.build();
			log.info("Guest Insert "+ service.register(entity));
		
		return "redirect:home";
	}
	@GetMapping("/gupdate")
	public String gupdate() {
		GuestBook entity = GuestBook.builder()
							.gno(3L)
							.title("JPA Update Test")
							.content("작성자 테스트 중 입니다.")
							.writer("작성")
							.build();
			log.info("guest update"+ service.register(entity));
		
		return "redirect:home";
	}
	@GetMapping("/glist")
	public String glist() {
		
		
		//ver1
		List<GuestBook> list = service.selectList();
		for(GuestBook g : list) {
			System.out.println(g+", regdate="+g.getRegdate() +" , mdate ="+ g.getModdate() );
		}
		//ver2 GuestBook
		List<GuestBookDTO> list2 = service.selectList2();
		for(GuestBookDTO g : list2) {
			System.out.println("service2"+g+", regdate="+g.getRegdate() +" , mdate ="+ g.getModdate() );
		}

		return "redirect:home";
	}
	
	@GetMapping("/gdelete") // 쿼리스트링
	public String gdelete(Long gno) {
		
		try {
			if(service.selectOne(gno).toString() != null) {
				service.delete(gno);
			}else {
				throw new Exception("null point exception");
			}
			log.info("delete sucess " +gno);
		} catch (Exception e) {
			log.error("delete error " + e.toString());
		}
		return "redirect:home";
	} //gdelete
	
	
	@GetMapping("/gpage") // 쿼리스트링
	public String gpage(int pageNo) {
		PageRequestDTO requestDTO = PageRequestDTO.builder()
										.page(pageNo)
										.size(5).build();
			
		PageResultDTO<GuestBookDTO,GuestBook> resultDTO = 
				service.pageList(requestDTO);
		System.out.println("JPA Paging " + resultDTO + "\n  pageNo" +pageNo);
		
		for(GuestBookDTO g : resultDTO.getDtoList()) {
			System.out.println(g);
		}
		
		
		return "redirect:home";
	}

	
	public String getMethodName(@RequestParam String param) {
		return new String();
	}
    // ** JPA Pageing & Sort
    // => PageRequestDTO(페이징 조건들) -> PageResultDTO(최종결과)
    // => 사용객체들 : Page<Entity>, Pageable(i) -> PageRequest(구현체) 등.
	
	
	
	
} //class
