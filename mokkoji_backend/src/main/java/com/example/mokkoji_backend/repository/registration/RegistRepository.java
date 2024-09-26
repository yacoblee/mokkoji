package com.example.mokkoji_backend.repository.registration;

 

 
import org.springframework.data.jpa.repository.JpaRepository;
 
import org.springframework.stereotype.Repository;

 
import com.example.mokkoji_backend.entity.registration.Regist;

@Repository
public interface RegistRepository extends JpaRepository<Regist, String>{
	
	
}
