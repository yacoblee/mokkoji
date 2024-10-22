package com.example.mokkoji_backend.repository.registration;

import com.example.mokkoji_backend.domain.DateCountDTO;
import com.example.mokkoji_backend.domain.RegistedHistoryDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

import static com.example.mokkoji_backend.entity.registration.QRegist.regist;
import static com.example.mokkoji_backend.entity.registration.QRegistImages.registImages;
import static com.example.mokkoji_backend.entity.registration.QRegistedhistory.registedhistory;


@Repository
@RequiredArgsConstructor
@Log4j2
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
	    

	// ** 마이페이지에서 사용 ============================================================

	// 1. 리스트 뽑아오기
    @Override
    @Modifying
    @Transactional
    public List<RegistedHistoryDTO> findByUserIdList(String userId){
		return queryFactory
			    .select(Projections.bean(RegistedHistoryDTO.class,
					    registedhistory.registId,
					    registedhistory.registCode,
					    regist.name,                       // JOIN을 통해 가져오는 이름
					    registedhistory.userId,
					    registedhistory.teenagerCnt,
					    registedhistory.adultCnt,
					    registedhistory.personCnt,
					    registedhistory.registCnt,
					    registedhistory.regDate,
					    registedhistory.activeDate,
					    regist.teenager,                   // JOIN을 통해 가져오는 teenager
					    regist.adult,                      // JOIN을 통해 가져오는 adult
					    registImages.imageName
			    ))
			    .from(registedhistory)
			    .leftJoin(regist).on(registedhistory.registCode.eq(regist.registCode))  // registCode로 JOIN
				.leftJoin(registImages)
				.on(registedhistory.registCode.eq(regist.registCode)
						.and(registImages.imageOrder.eq(1))
						.and(registImages.imageType.eq("main")))
				.where(registedhistory.userId.eq(userId))
			    .fetch();
    }
	
	// 2. 인원 업데이트
	// 2.1. Adult 업데이트
	@Override
	@Transactional
	@Modifying
	public void changeAdultCnt(String userId, String registId, int adultCnt) {
		// 1단계: adultCnt 업데이트
		long affectedRows = queryFactory.update(registedhistory)
				.set(registedhistory.adultCnt, adultCnt)
				.where(registedhistory.userId.eq(userId).and(registedhistory.registId.eq(registId)))
				.execute();

		log.info("1단계 - 업데이트된 행 수: {}", affectedRows);

		// 2단계: registCode 추출 및 regist entity에서 teenager와 adult값 찾기
		String registCode = queryFactory.select(registedhistory.registCode)
				.from(registedhistory)
				.where(registedhistory.userId.eq(userId).and(registedhistory.registId.eq(registId)))
				.fetchOne();

		// regist entity에서 teenager, adult 값 찾기
		Integer teenager = queryFactory.select(regist.teenager)
				.from(regist)
				.where(regist.registCode.eq(registCode))
				.fetchOne();

		Integer adult = queryFactory.select(regist.adult)
				.from(regist)
				.where(regist.registCode.eq(registCode))
				.fetchOne();

		log.info("2단계 - registCode: {}, teenager: {}, adult: {}", registCode, teenager, adult);

		// 3단계: 업데이트된 registedHistory entity에서 adultCnt와 teenagerCnt 추출
		Integer teenagerCnt = queryFactory.select(registedhistory.teenagerCnt)
				.from(registedhistory)
				.where(registedhistory.userId.eq(userId).and(registedhistory.registId.eq(registId)))
				.fetchOne();

		log.info("3단계 - teenagerCnt: {}", teenagerCnt);

		// 4단계: personCnt 업데이트
		queryFactory.update(registedhistory)
				.set(registedhistory.personCnt, adultCnt + teenagerCnt) // personCnt 업데이트
				.where(registedhistory.userId.eq(userId).and(registedhistory.registId.eq(registId)))
				.execute();

		log.info("4단계 - personCnt 업데이트 완료");

		// 5단계: registCnt 업데이트
		queryFactory.update(registedhistory)
				.set(registedhistory.registCnt,
						Expressions.numberTemplate(Integer.class,
								"{0} * {1} + {2} * {3}",
								adultCnt, adult, teenagerCnt, teenager)) // registCnt 업데이트
				.where(registedhistory.userId.eq(userId).and(registedhistory.registId.eq(registId)))
				.execute();

		log.info("5단계 - registCnt 업데이트 완료");
	}

	// 2.2. Teenager 업데이트
	@Override
	@Transactional
	@Modifying
	public void changeTeenCnt(String userId, String registId, int teenagerCnt) {
		// 1단계: teenagerCnt 업데이트
		long affectedRows = queryFactory.update(registedhistory)
				.set(registedhistory.teenagerCnt, teenagerCnt)
				.where(registedhistory.userId.eq(userId).and(registedhistory.registId.eq(registId)))
				.execute();

		log.info("1단계 - 업데이트된 행 수: {}", affectedRows);

		// 2단계: registCode 추출 및 regist entity에서 teenager와 adult값 찾기
		String registCode = queryFactory.select(registedhistory.registCode)
				.from(registedhistory)
				.where(registedhistory.userId.eq(userId).and(registedhistory.registId.eq(registId)))
				.fetchOne();

		// regist entity에서 teenager, adult 값 찾기
		Integer teenager = queryFactory.select(regist.teenager)
				.from(regist)
				.where(regist.registCode.eq(registCode))
				.fetchOne();

		Integer adult = queryFactory.select(regist.adult)
				.from(regist)
				.where(regist.registCode.eq(registCode))
				.fetchOne();

		log.info("2단계 - registCode: {}, teenager: {}, adult: {}", registCode, teenager, adult);

		// 3단계: 업데이트된 registedHistory entity에서 adultCnt와 teenagerCnt 추출
		Integer adultCnt = queryFactory.select(registedhistory.adultCnt)
				.from(registedhistory)
				.where(registedhistory.userId.eq(userId).and(registedhistory.registId.eq(registId)))
				.fetchOne();

		log.info("3단계 - adultCnt: {}", adultCnt);

		// 4단계: personCnt 업데이트
		queryFactory.update(registedhistory)
				.set(registedhistory.personCnt, adultCnt + teenagerCnt) // personCnt 업데이트
				.where(registedhistory.userId.eq(userId).and(registedhistory.registId.eq(registId)))
				.execute();

		log.info("4단계 - personCnt 업데이트 완료");

		// 5단계: registCnt 업데이트
		queryFactory.update(registedhistory)
				.set(registedhistory.registCnt,
						Expressions.numberTemplate(Integer.class,
								"{0} * {1} + {2} * {3}",
								adultCnt, adult, teenagerCnt, teenager)) // registCnt 업데이트
				.where(registedhistory.userId.eq(userId).and(registedhistory.registId.eq(registId)))
				.execute();

		log.info("5단계 - registCnt 업데이트 완료");
	}

}
