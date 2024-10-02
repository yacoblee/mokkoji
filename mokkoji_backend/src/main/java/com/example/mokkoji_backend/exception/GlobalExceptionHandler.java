package com.example.mokkoji_backend.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Slf4j
//@RestControllerAdvice
public class GlobalExceptionHandler {

 
	//@ExceptionHandler(MokkojiException.class)
	public ResponseEntity<ErrorResponse> mokkojiExceptionHandle(MokkojiException e) {
		return ResponseEntity
			.status(e.getHttpStatus())
			.body(new ErrorResponse(e.getHttpStatus().value(), e.getMessage()));
	}

	//@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> exceptionHandler(final RuntimeException exception) {
		log.error("[Exception] : 예외 발생 {}", exception.getMessage());
		return ResponseEntity
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(
				new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
					"예상하지 못한 에러입니다.")
			);
	}

 
//	@ExceptionHandler(MokkojiException.class)
//	public ResponseEntity<ErrorResponse> mokkojiExceptionHandle(MokkojiException e) {
//		return ResponseEntity
//			.status(e.getHttpStatus())
//			.body(new ErrorResponse(e.getHttpStatus().value(), e.getMessage()));
//	}
//
//	@ExceptionHandler(Exception.class)
//	public ResponseEntity<ErrorResponse> exceptionHandler(final RuntimeException exception) {
//		log.error("[Exception] : 예외 발생 {}", exception.getMessage());
//		return ResponseEntity
//			.status(HttpStatus.INTERNAL_SERVER_ERROR)
//			.body(
//				new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
//					"예상하지 못한 에러입니다.")
//			);
//	}
//
 
//	@ResponseBody
//	@ResponseStatus(HttpStatus.NOT_FOUND)
//	@ExceptionHandler(NotFoundException.class)
//	public ErrorResponse exceptionHandle(NotFoundException e) {
//		return ErrorResponse.builder()
//			.code(HttpStatus.NOT_FOUND.value())
//			.message(e.getMessage())
//			.build();
//	}
 
//	@ResponseBody
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	@ExceptionHandler(MethodArgumentNotValidException.class)
//	public ErrorResponse validExceptionHandle(MethodArgumentNotValidException e) {
//		ErrorResponse response = ErrorResponse.builder().
//			code(HttpStatus.BAD_REQUEST.value())
//			.message(e.getMessage())
//			.build();
//
//		for (FieldError fieldError : e.getFieldErrors()) {
//			response.addValidation(fieldError.getField(), fieldError.getDefaultMessage());
//		}
//
//		return response;
//	}
 
//	@ResponseBody
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	@ExceptionHandler({IllegalArgumentException.class, NotImageException.class})
//	public ErrorResponse illegalArgsExceptionHandle(RuntimeException e) {
//		return ErrorResponse.builder()
//			.code(HttpStatus.BAD_REQUEST.value())
//			.message(e.getMessage())
//			.build();
//	}
}
