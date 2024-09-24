package com.example.mokkoji_backend.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
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
@IdClass(ProductoptionsId.class)
public class Productoptions implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="productId")
	private Long productId;
	@Id
	@Column(name="optionContent")
	private String content;
	@Column(name="optionPrice")
	private int price;
}
