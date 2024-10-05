package com.example.mokkoji_backend.repository.registration;

 

 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

 
import com.example.mokkoji_backend.entity.registration.Regist;
import com.example.mokkoji_backend.entity.registration.Registedhistory;

@Repository
public interface RegistedHistoryRepository extends JpaRepository<Registedhistory, String>{
	
	
	
	
}
