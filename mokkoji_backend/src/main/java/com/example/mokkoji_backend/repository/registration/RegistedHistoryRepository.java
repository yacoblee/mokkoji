package com.example.mokkoji_backend.repository.registration;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.mokkoji_backend.entity.registration.Registedhistory;
import com.example.mokkoji_backend.entity.registration.RegistedhistoryId;

import jakarta.transaction.Transactional;



@Repository
public interface RegistedHistoryRepository extends JpaRepository<Registedhistory, String>{

	@Modifying
	@Transactional
	void deleteById(String registId);

}
