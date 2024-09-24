package com.example.mokkoji_backend.domain;

import java.sql.Timestamp;

import com.example.mokkoji_backend.entity.ProductOptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductsDTO extends ProductOptions{
	private Long id;
	private String name;
	private int price;
	
	private String size_info;
	private String guide;
	private String main_description;
	private String sub_description;
	
	private int like_conut;
	private int status;
	private int stock_count;
	
	private Timestamp uploadDate;
	private String category_id;
	@Override
	public String toString() {
		return "ProductsDTO [id=" + id + ", name=" + name + ", price=" + price + ", size_info=" + size_info + ", guide="
				+ guide + ", main_description=" + main_description + ", sub_description=" + sub_description
				+ ", like_conut=" + like_conut + ", status=" + status + ", stock_count=" + stock_count + ", uploadDate="
				+ uploadDate + ", category_id=" + category_id + 
				 ", optionContent=" + getContent() + ", optionPrice=" + getPrice() + "]";
	}
	
	
}
