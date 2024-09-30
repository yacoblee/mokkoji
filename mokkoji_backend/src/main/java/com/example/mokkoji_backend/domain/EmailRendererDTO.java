package com.example.mokkoji_backend.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
public class EmailRendererDTO {
    private String name;
    private String title;
    private String message;
    
    //향후 여유가 되면 생성할 예정
    private List<String> items;
    private String company;
    
    
    
}