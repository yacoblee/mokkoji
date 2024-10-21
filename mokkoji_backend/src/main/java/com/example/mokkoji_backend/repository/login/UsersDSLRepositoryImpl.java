package com.example.mokkoji_backend.repository.login;

import static com.example.mokkoji_backend.entity.login.QUsers.users;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.domain.PageRequestDTO;
import com.example.mokkoji_backend.domain.UserPurchaseRankDTO;
import com.example.mokkoji_backend.entity.login.Users;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UsersDSLRepositoryImpl implements UsersDSLRepository {
	private final JPAQueryFactory jpaQueryFactory;
	// 생성을 위한 Bean 설정을 DemoConfig에 추가해야함.

	@Override
	public Page<Users> findUserinfoToSearch(PageRequestDTO requestDTO) {
		BooleanBuilder builder = new BooleanBuilder();
		String searchType = requestDTO.getSearchType();
		String keyword = requestDTO.getKeyword();
		LocalDate startDate = requestDTO.getStartDate();
		LocalDate endDate = requestDTO.getEndDate();
		String dateSearchType = requestDTO.getDateSearchType();
		Pageable pagerable = requestDTO.getPageable();
		int isAdmin = requestDTO.getIsAdmin();

		if (keyword != null && !keyword.isEmpty()) {
			switch (searchType) {
			case "all":
				builder.and(users.userId.containsIgnoreCase(keyword).or(users.name.containsIgnoreCase(keyword))
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
		if (startDate != null && endDate != null) {
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
		if (isAdmin == 0) {
			builder.and(users.isAdmin.eq("0"));
		} else if (isAdmin == 1) {
			builder.and(users.isAdmin.eq("1"));
		} else if (isAdmin == 2) {

		} else {
			throw new IllegalArgumentException("isAdmin value: " + isAdmin);
		}

		QueryResults<Users> result = jpaQueryFactory.selectFrom(users).where(builder).offset(pagerable.getOffset())
				.limit(pagerable.getPageSize()).fetchResults();

		List<Users> users = result.getResults();
		long total = result.getTotal();

		return new PageImpl<>(users, pagerable, total);
	}


}
