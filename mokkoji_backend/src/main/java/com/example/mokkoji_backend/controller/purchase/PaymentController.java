//package com.example.mokkoji_backend.controller.purchase;
//
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;
//
//import java.io.IOException;
//import java.util.List;
//import java.util.NoSuchElementException;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.mokkoji_backend.entity.myPage.Cart;
//import com.example.mokkoji_backend.repository.myPage.CartRepository;
//import com.siot.IamportRestClient.IamportClient;
//import com.siot.IamportRestClient.exception.IamportResponseException;
//import com.siot.IamportRestClient.response.IamportResponse;
//import com.siot.IamportRestClient.response.Payment;
//
//import jakarta.annotation.PostConstruct;
//import jakarta.servlet.http.HttpSession;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
//@RestController
//@RequestMapping("api/v1")
//@RequiredArgsConstructor
//@Slf4j
//public class PaymentController {
//    private final HttpSession httpSession;
//    //public final OrderRepository orderRepository;
//    //private final PaymentService paymentService;
//    //private final CartRepository cartRepository;
//    private IamportClient iamportClient;
// 
//    @Value("${IMP_API_KEY}")
//    private String apiKey;
// 
//    @Value("${imp.api.secretkey}")
//    private String secretKey;
// 
//    @PostConstruct
//    public void init() {
//        this.iamportClient = new IamportClient(apiKey, secretKey);
//    }
// 
//    @PostMapping("/order/payment/{imp_uid}")
//    public IamportResponse<Payment> validateIamport(@PathVariable String imp_uid) throws IamportResponseException , IOException {
// 
//        IamportResponse<Payment> payment = iamportClient.paymentByImpUid(imp_uid);;
// 
//        log.info("결제 요청 응답. 결제 내역 - 주문 번호: {}", payment.getResponse().getMerchantUid());
// 
//       // paymentService.processPaymentDone(request);
// 
//        return payment;
//    }
// 
//    // 결제 완료 화면에서 세션 저장값, 장바구니 삭제하는 로직
//    @GetMapping("/order/paymentconfirm")
//    public void deleteSession() {
//        List<Long>cartIds = (List<Long>) httpSession.getAttribute("cartIds");
// 
//        for(Long cartId : cartIds){
//           // Cart cart = cartRepository.findById(cartId)
//           //         .orElseThrow(() -> new NoSuchElementException("삭제할 장바구니를 찾을 수 없습니다."));
//           //cartRepository.delete(cart);
//        }
//        // 세션에서 임시 주문 정보 삭제
//        httpSession.removeAttribute("temporaryOrder");
//        httpSession.removeAttribute("cartIds");
//    }
// 
//    /**
//     * 결제내역 조회
//     * @param memberId
//     * @return
//     */
////    @GetMapping("/paymenthistory/{memberId}")
////    public ResponseEntity<List<PaymentHistoryDto>> paymentList(@PathVariable Long memberId) {
////        return ResponseEntity.status(HttpStatus.OK).body(paymentService.paymentHistoryList(memberId));
////    }
//}