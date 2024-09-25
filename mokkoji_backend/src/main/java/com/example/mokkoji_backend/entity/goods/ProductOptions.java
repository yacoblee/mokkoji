package com.example.mokkoji_backend.entity.goods;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "productoptions")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(ProductOptionsId.class)
public class ProductOptions implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="productId")
	private Long productId;
	@Id
	@Column(name="optionContent")
	private String content;
	@Column(name="optionPrice")
	private int price;
	
	@ManyToOne
	@JsonBackReference
    @JoinColumn(name = "productId")
	private Products product;
}
