package com.example.mokkoji_backend.entity;

import java.io.Serializable;

import com.example.mokkoji_backend.entity.id.CodeId;
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
@Table(name = "code")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(CodeId.class)
public class Code implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name = "mainType")
	private String main_type;
	
	@Id
	@Column(name = "subType")
	private String sub_type;
	
	@Column(name = "mainTypeName")
	private String main_type_name;
	
	@Column(name = "subTypeName")
	private String sub_type_name;
}
