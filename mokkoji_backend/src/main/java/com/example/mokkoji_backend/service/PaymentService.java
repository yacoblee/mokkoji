package com.example.mokkoji_backend.service;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.mokkoji_backend.domain.PaymentRequestDto;
import com.example.mokkoji_backend.entity.registration.Regist;
import com.example.mokkoji_backend.entity.registration.Registedhistory;
import com.example.mokkoji_backend.repository.registration.RegistRepository;
import com.example.mokkoji_backend.repository.registration.RegistedHistoryRepository;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.PrepareData;
@Service
public class PaymentService {

    private final IamportClient iamportClient;
    private final RegistRepository registRepository;
    private final RegistedHistoryRepository registedHistoryRepository;

    public PaymentService(RegistRepository registRepository, RegistedHistoryRepository registedHistoryRepository) {
        this.iamportClient = new IamportClient("2533046824212561", "Kc9bnIDch7znR6cdCX024s352Pq8YHDbfPDR0kCllDkvZEjY1iTweOxXcMHxUEX2LLa3ws5YhPYnySmk");
        this.registRepository = registRepository;
        this.registedHistoryRepository = registedHistoryRepository;
    }

    
    @Transactional  
    public void postPrepare(PaymentRequestDto request) throws IamportResponseException, IOException {
        // !....결제 준비 로직....!
        
    	PrepareData prepareData = new PrepareData(request.getMerchantUid(), request.getRegistCnt());
        iamportClient.postPrepare(prepareData);

        List<Regist> regists = registRepository.findAll();
        String registCode = regists.get(0).getRegistCode(); 
        request.setRegistCode(registCode);  
        
        String dateStr = request.getActiveDate(); // "2024-10-05"
        if (dateStr.length() == 10) {
            dateStr += " 00:00:00";
        }
        Timestamp activeDate = Timestamp.valueOf(dateStr);
        
        Registedhistory history = Registedhistory.builder()
            .registId(UUID.randomUUID().toString())  // Unique_ID 생성
            .registCode(request.getRegistCode())
            .userId(request.getUserId())
            .teenagerCnt(request.getTeenager())
            .adultCnt(request.getAdult())
            .personCnt(request.getPersonCnt())
            .registCnt(request.getRegistCnt().intValue())
            .regDate(new Timestamp(System.currentTimeMillis()))   
            .activeDate(activeDate)   
            .build();
       
        registedHistoryRepository.save(history);
    }
}
