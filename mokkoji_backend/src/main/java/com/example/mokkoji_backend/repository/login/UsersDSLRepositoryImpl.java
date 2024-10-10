package com.example.mokkoji_backend.repository.login;

import static com.example.mokkoji_backend.entity.login.QUsers.users;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.entity.login.Users;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UsersDSLRepositoryImpl implements UsersDSLRepository {
	private final JPAQueryFactory jpaQueryFactory;
	// 생성을 위한 Bean 설정을 DemoConfig에 추가해야함.

	@Override
	public List<Users> findUserinfoToSearch(PageRequestDTO requestDTO) {
		BooleanBuilder builder = new BooleanBuilder();
		String searchType = requestDTO.getSearchType();
		String keyword = requestDTO.getKeyword();
		LocalDate startDate = requestDTO.getStartDate();
		LocalDate endDate = requestDTO.getEndDate();
		String dateSearchType = requestDTO.getDateSearchType();

		if (keyword != null && !keyword.isEmpty()) {
			switch (searchType) {
			case "all":
				builder.and(users.userId.containsIgnoreCase(keyword)
						.or(users.name.containsIgnoreCase(keyword))
						.or(users.phoneNumber.containsIgnoreCase(keyword)));
				break;
			case "userId":
				builder.and(users.userId.containsIgnoreCase(keyword));
				break;
			case "phoneNumber":
				builder.and(users.phoneNumber.containsIgnoreCase(keyword));
				break;
			default:
				throw new IllegalArgumentException("Invalid searchType: " + searchType);
			}
		}
		if(dateSearchType !=null && !dateSearchType.isEmpty()) {
			switch (dateSearchType) {
			case "createdAt":
				builder.and(users.createdAt.between(startDate, endDate));
				break;
			case "updatedAt":
				builder.and(users.updatedAt.between(startDate, endDate));
				break;
			
			default:
				throw new IllegalArgumentException("dateSearchType value: " + dateSearchType);
			}
		}

		return jpaQueryFactory.selectFrom(users)
                .where(builder)
                .fetch();
	}

}
