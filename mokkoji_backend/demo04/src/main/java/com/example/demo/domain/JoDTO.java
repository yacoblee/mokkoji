package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JoDTO extends MemberDTO {
	
	// ** 맴버변수 정의
	private int jno;
	private String jname;
	private String captain;
	private String project;
	private String slogan;
	 
	// ** toString
	@Override
	public String toString() {
		return "JoDTO [jno=" + jno + ", jname=" + jname + ", captain=" + captain + 
				", name=" + getName() + ", age=" + getAge() + ", id = " + getId() +
				", project=" + project + ", slogan=" + slogan + "]";
	}

	// 조장이름 출력을 위한 joinList() 구문의 return 을 위해 return  값을 위해 추가함.
	// select 구문과 컬럼순서&type 이 같아야함
	public JoDTO(int jno, String jname, String captain, String name, String project, String slogan) {
		super.setName(name); // MemberDTO 의 값을 참조
		this.jno = jno;
		this.jname = jname;
		this.captain = captain;
		this.project = project;
		this.slogan = slogan;
	}
	
	
	
} //class
