
package com.example.mokkoji_backend.entity.registration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistImagesId implements Serializable{
	private static final long serialVersionUID = 1L;

	private String registCode;
	private int imageOrder;
	private String imageType;
}
