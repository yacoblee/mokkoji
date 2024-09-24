package com.example.mokkoji_backend.domain;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductsDTO {
	private Long id;
	private String name;
	private int price;
	
	//private String size_info;
	private String guide;
	//private String main_description;
	//private String sub_description;
	private String mainImageName;
	//private int like_conut;
	//private int status;
	//private int stock_count;
	
	//private Timestamp uploadDate;
	private String categoryId;
	//p.id, p.name, p.price, p.mainImageName, p.categoryId
	public ProductsDTO(Long id,String name ,int price ,String mainImageName, String categoryId ) {
		this.id=id;
		this.name = name;
		this.price = price;
		this.mainImageName = mainImageName;
		this.categoryId = categoryId;
	}
	public ProductsDTO(Long id,String name ,int price ,String mainImageName, String categoryId ,String guide) {
		this.id=id;
		this.name = name;
		this.price = price;
		this.mainImageName = mainImageName;
		this.categoryId = categoryId;
	}


	
	
}
