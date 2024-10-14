package com.example.mokkoji_backend.domain.productStatistics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FavoriteGenderDTO {
    private String gender;  // 성별
    private Long favoriteCount;  // 찜 횟수
}
