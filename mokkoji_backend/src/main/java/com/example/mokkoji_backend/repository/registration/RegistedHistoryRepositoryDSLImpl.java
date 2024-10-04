package com.example.mokkoji_backend.repository.registration;

import com.example.mokkoji_backend.domain.DateCountDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

import static com.example.mokkoji_backend.entity.registration.QRegistedhistory.registedhistory;


@Repository
@RequiredArgsConstructor
public class RegistedHistoryRepositoryDSLImpl implements RegistedHistoryRepositoryDSL {
	 private final JPAQueryFactory queryFactory;


	    @Override
	    public List<DateCountDTO> countByRegDate(Timestamp startDate, Timestamp endDate) {
	       

	        return queryFactory
	            .select(Projections.constructor(
	                DateCountDTO.class,
	                registedhistory.activeDate.as("date"), 
	                registedhistory.count().as("count")
	            ))
	            .from(registedhistory)
	            .where(registedhistory.activeDate.between(startDate, endDate))
	            .groupBy(registedhistory.activeDate)
	            .fetch();
	    }
	
}
