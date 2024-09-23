package com.example.demo.repository;

import java.util.List;

import org.springframework.stereotype.Repository;
import com.example.demo.entity.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;

@Transactional
@Repository
public class MyRepositoryImpl implements MyRepository{
	// 영속 컨텍스트에 접근하여 엔티티에 대한 DB 작업을 제공
	private final EntityManager em;
	
	public MyRepositoryImpl(EntityManager em) {
		this.em=em; 
	}

	@Override
	public List<Member> emMemberList() {

		return em.createQuery("Select m from Member m order by m.age asc", Member.class).getResultList();
	}
	 
	@Override
	public Member emMemberDetail(String id) {

		return em.createQuery("Select m from Member m Where m.id = :id order by m.age asc", Member.class)
										.setParameter("id", id)
										.getSingleResult();
	}


	@Override
	public List<Member> cbMemmberList() {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		
		CriteriaQuery<Member> query = builder.createQuery(Member.class);
		System.out.println("+++++++++++++ repository query : " + query.toString());
		Root<Member> m = query.from(Member.class);
		System.out.println("+++++++++++++ repository m : " + m);
		Predicate jnoEqual = builder.equal(m.get("jno"), 7);
		Order ageDesc = builder.desc(m.get("age"));

		query.select(m)
		.distinct(true)
		.where(jnoEqual)
		.orderBy(ageDesc);
		
		System.out.println("+++++++++++++ repository : " + query.toString());
		TypedQuery<Member> typeQuery = em.createQuery(query);
		List<Member> members = typeQuery.getResultList();
	
		return members;
	}
	

	
	
	
}
