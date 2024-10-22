-- project.code definition

CREATE TABLE `code` (
                        `main_type` varchar(16) NOT NULL COMMENT '코드 대분류',
                        `main_type_name` varchar(32) DEFAULT NULL COMMENT '대분류 설명',
                        `sub_type` varchar(16) NOT NULL COMMENT '코드 소분류',
                        `sub_type_name` varchar(50) DEFAULT NULL COMMENT '소분류 설명',
                        PRIMARY KEY (`main_type`,`sub_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.packaging definition

CREATE TABLE `packaging` (
                             `packaging_option_content` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '포장 옵션 내용',
                             `packaging_option_price` int NOT NULL COMMENT '포장 옵션 가격',
                             PRIMARY KEY (`packaging_option_content`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.products definition

CREATE TABLE `products` (
                            `product_id` int NOT NULL AUTO_INCREMENT COMMENT '상품 pk',
                            `product_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '상품 이름',
                            `product_price` int NOT NULL COMMENT '상품 가격',
                            `product_size_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '사이즈정보',
                            `product_guide` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '상태 가이드',
                            `product_main_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '메인 설명',
                            `product_additional_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '서브 설명',
                            `main_image_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '대표 이미지 파일명',
                            `like_count` int DEFAULT '0' COMMENT '관심 수',
                            `status` int DEFAULT '0' COMMENT '상태',
                            `stock_count` int NOT NULL COMMENT '업데이트날짜',
                            `upload_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '업로드 날짜',
                            `category_id` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '카테고리',
                            PRIMARY KEY (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.regist definition

CREATE TABLE `regist` (
                          `regist_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                          `name` varchar(100) DEFAULT NULL,
                          `regist_option` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                          `teenager` int DEFAULT NULL COMMENT '청소년요금',
                          `adult` int DEFAULT NULL COMMENT '어른요금',
                          `hightlight_1` varchar(150) DEFAULT NULL,
                          `hightlight_2` varchar(150) DEFAULT NULL,
                          `hightlight_3` varchar(150) DEFAULT NULL,
                          `hightlight_4` varchar(150) DEFAULT NULL,
                          `package_detail` varchar(200) DEFAULT NULL,
                          `restrict_detail` varchar(200) DEFAULT NULL,
                          `reserve_restrict` varchar(200) DEFAULT NULL,
                          `etc_detail` varchar(200) DEFAULT NULL,
                          PRIMARY KEY (`regist_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.users definition

CREATE TABLE `users` (
                         `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '아이디',
                         `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '비밀번호',
                         `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '이름',
                         `birth_date` date NOT NULL COMMENT '생년월일',
                         `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '성별',
                         `phone_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '핸드폰번호',
                         `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '이메일',
                         `user_sequence` int NOT NULL AUTO_INCREMENT,
                         `is_withdrawn` tinyint(1) DEFAULT '0' COMMENT '탈퇴여부',
                         `withdrawal_date` timestamp NULL DEFAULT NULL COMMENT '탈퇴날짜',
                         `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '가입날짜',
                         `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '정보수정날짜',
                         `block_status` tinyint(1) DEFAULT NULL COMMENT '관리자 권한 접근제한',
                         `is_admin` tinyint(1) DEFAULT '0' COMMENT '관리자 여부 (1: 관리자, 0: 일반 사용자)',
                         `login_count` int NOT NULL DEFAULT '0' COMMENT '로그인횟수',
                         PRIMARY KEY (`user_id`),
                         UNIQUE KEY `user_sequence` (`user_sequence`),
                         CONSTRAINT `users_chk_1` CHECK ((`gender` in (_utf8mb4'M',_utf8mb4'F')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.address definition

CREATE TABLE `address` (
                           `address_id` int NOT NULL AUTO_INCREMENT COMMENT '주소pk',
                           `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '해당유저',
                           `postal_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '우편번호',
                           `street_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '도로명주소',
                           `detailed_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '상세주소',
                           `location_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '받는곳',
                           `recipient_phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '받는사람연락처',
                           `is_default` tinyint(1) DEFAULT '0' COMMENT '기본배송지',
                           `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성날짜',
                           `recipient_name` varchar(50) DEFAULT NULL COMMENT '수령인',
                           PRIMARY KEY (`address_id`),
                           KEY `user_id` (`user_id`),
                           CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.favorites definition

CREATE TABLE `favorites` (
                             `user_id` varchar(50) NOT NULL COMMENT '유저 아이디',
                             `product_id` int NOT NULL COMMENT '상품 아이디',
                             `favorite_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '좋아요 누른 날짜',
                             PRIMARY KEY (`user_id`,`product_id`),
                             KEY `favorite_products_FK` (`product_id`),
                             CONSTRAINT `favorite_products_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
                             CONSTRAINT `favorite_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.orders definition

CREATE TABLE `orders` (
                          `purchase_number` int NOT NULL AUTO_INCREMENT COMMENT '주문번호',
                          `user_id` varchar(100) DEFAULT NULL COMMENT '유저 아이디',
                          `street_address` varchar(255) NOT NULL COMMENT '배송지 아이디',
                          `total` int DEFAULT NULL COMMENT '구매발생 총 금액',
                          `method` varchar(150) DEFAULT NULL COMMENT '결제 방식',
                          `reg_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '구매 날짜',
                          `purchase_status` varchar(100) DEFAULT NULL COMMENT '구매 상태',
                          PRIMARY KEY (`purchase_number`),
                          KEY `orders_customer_FK` (`user_id`),
                          CONSTRAINT `orders_customer_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.productimages definition

CREATE TABLE `productimages` (
                                 `product_id` int NOT NULL COMMENT '무슨상품인지',
                                 `image_order` int NOT NULL COMMENT '이미지 순서',
                                 `image_type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '이미지 타입',
                                 `image_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '이미지 파일명',
                                 PRIMARY KEY (`product_id`,`image_order`,`image_type`),
                                 CONSTRAINT `FK_product_images_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.productoptions definition

CREATE TABLE `productoptions` (
                                  `product_id` int NOT NULL COMMENT '상품 아이디',
                                  `option_content` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '상품 옵션 내용',
                                  `option_price` int NOT NULL DEFAULT '0' COMMENT '옵션 가격',
                                  PRIMARY KEY (`product_id`,`option_content`),
                                  CONSTRAINT `productoptions_products_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.registedhistory definition

CREATE TABLE `registedhistory` (
                                   `regist_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                   `user_id` varchar(100) DEFAULT NULL,
                                   `teenager_cnt` int DEFAULT NULL COMMENT '청소년요금합',
                                   `adult_cnt` int DEFAULT NULL COMMENT '어른요금합',
                                   `person_cnt` int DEFAULT NULL,
                                   `regist_cnt` int DEFAULT NULL COMMENT '총합산금액',
                                   `reg_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                                   `active_date` timestamp NULL DEFAULT NULL,
                                   `regist_id` varchar(150) NOT NULL,
                                   PRIMARY KEY (`regist_id`),
                                   UNIQUE KEY `registedhistory_unique` (`reg_date`),
                                   KEY `registedhistory_regist_FK` (`regist_code`),
                                   KEY `registedhistory_customer_FK` (`user_id`),
                                   CONSTRAINT `registedhistory_customer_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
                                   CONSTRAINT `registedhistory_regist_FK` FOREIGN KEY (`regist_code`) REFERENCES `regist` (`regist_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.registimages definition

CREATE TABLE `registimages` (
                                `regist_code` varchar(100) NOT NULL COMMENT '예약상품분류코드',
                                `image_order` int NOT NULL COMMENT '이미지 순서',
                                `image_type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '이미지 타입',
                                `image_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '이미지 파일명',
                                PRIMARY KEY (`regist_code`,`image_order`,`image_type`),
                                CONSTRAINT `regist_image_FK` FOREIGN KEY (`regist_code`) REFERENCES `regist` (`regist_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.reviews definition

CREATE TABLE `reviews` (
                           `review_id` int NOT NULL AUTO_INCREMENT COMMENT '리뷰 아이디',
                           `user_id` varchar(50) NOT NULL COMMENT '유저 아이디',
                           `product_id` int NOT NULL COMMENT '상품 아이디',
                           `review_content` text NOT NULL COMMENT '리뷰 내용',
                           `review_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
                           `like_dislike` tinyint(1) NOT NULL DEFAULT '1' COMMENT '좋으면 1 싫으면 0',
                           `review_photo` varchar(100) DEFAULT NULL COMMENT '리뷰 사진',
                           PRIMARY KEY (`review_id`),
                           KEY `reviews_users_FK` (`user_id`),
                           KEY `reviews_products_FK` (`product_id`),
                           CONSTRAINT `reviews_products_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
                           CONSTRAINT `reviews_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.cart definition

CREATE TABLE `cart` (
                        `user_id` varchar(50) NOT NULL COMMENT '유저 아이디',
                        `product_id` int NOT NULL COMMENT '상품 아이디',
                        `option_content` varchar(16) NOT NULL COMMENT '상품 옵션 내용',
                        `packaging_option_content` varchar(32) NOT NULL COMMENT '포장 옵션 내용',
                        `product_cnt` int DEFAULT NULL COMMENT '선택 갯수',
                        `product_total_price` int DEFAULT NULL COMMENT '선택된 상품 총액',
                        `cart_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                        PRIMARY KEY (`user_id`,`product_id`,`option_content`,`packaging_option_content`),
                        KEY `cart_productoptions_FK` (`product_id`,`option_content`),
                        KEY `cart_packaging_FK` (`packaging_option_content`),
                        CONSTRAINT `cart_packaging_FK` FOREIGN KEY (`packaging_option_content`) REFERENCES `packaging` (`packaging_option_content`),
                        CONSTRAINT `cart_productoptions_FK` FOREIGN KEY (`product_id`, `option_content`) REFERENCES `productoptions` (`product_id`, `option_content`),
                        CONSTRAINT `cart_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- project.ordersdetail definition

CREATE TABLE `ordersdetail` (
                                `purchase_number` int NOT NULL AUTO_INCREMENT COMMENT '주문번호',
                                `product_id` int NOT NULL COMMENT '상품id',
                                `option_content` varchar(16) NOT NULL COMMENT '상품 옵션 내용',
                                `packaging_option_content` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '포장 옵션 내용',
                                `product_cnt` int DEFAULT NULL COMMENT '상품 갯수',
                                `product_total_price` int DEFAULT NULL COMMENT '선택 상품 총액',
                                PRIMARY KEY (`purchase_number`,`product_id`,`packaging_option_content`,`option_content`),
                                KEY `ordersdetail_product_FK` (`product_id`),
                                KEY `ordersdetail_packaging_FK` (`packaging_option_content`),
                                KEY `ordersdetail_orders_FK` (`purchase_number`),
                                KEY `ordersdetail_productoptions_FK` (`product_id`,`option_content`),
                                CONSTRAINT `ordersdetail_orders_FK` FOREIGN KEY (`purchase_number`) REFERENCES `orders` (`purchase_number`),
                                CONSTRAINT `ordersdetail_packaging_FK` FOREIGN KEY (`packaging_option_content`) REFERENCES `packaging` (`packaging_option_content`),
                                CONSTRAINT `ordersdetail_productoptions_FK` FOREIGN KEY (`product_id`, `option_content`) REFERENCES `productoptions` (`product_id`, `option_content`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;