package com.example.mokkoji_backend.domain;

import lombok.*;

import java.util.List;

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