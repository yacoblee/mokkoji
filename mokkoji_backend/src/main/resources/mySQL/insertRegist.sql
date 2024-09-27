ALTER TABLE project.registedhistory MODIFY COLUMN regist_id int auto_increment auto_increment NOT NULL;

-- 240927
-- CODE 테이블 예약 코드
INSERT INTO project.code
(main_type, main_type_name, sub_type, sub_type_name)
VALUES('04RS', '예약', '1', '체험예약');


-- 예약 게시글 등록
INSERT INTO project.regist
(regist_code, name, regist_option, teenager, adult, hightlight_1, hightlight_2, hightlight_3, hightlight_4, package_detail, restrict_detail, reserve_restrict, etc_detail)
VALUES('04RS', '영롱한 자개소반 미니어처 만들기', '문화체험', 5000, 10000,
'빛에 따라 색이 달라지는 오묘한 매력의 자개로 나만의 나전칠기 작품을 만들어 보세요.',
'우리나라 전통 소반을 귀여운 미니어처로 제작하여 세상에 단 하나뿐인 작품을 간직할 수 있어요.',
'직접 디자인한 영롱한 자개소반을 소중한 사람에게 선물해보는 건 어떠세요?',
'소반 미니어처 외에 손거울, 스마트폰 그립톡, 머리끈 등 자개를 이용한 다양한 제품을 만들 수 있습니다.',
'자개로 굿즈 만들기 체험',
'음주 상태의 참여자는 서비스 이용이 거부될 수 있습니다. 이 경우 입장이 불가합니다.',
'그룹 규모: 참여자 수 1-25인.',
'유모차 및 휠체어 이용이 불가합니다.');

-- 예약 글 정보
INSERT INTO project.registedhistory
(regist_code, user_id, teenager_cnt, adult_cnt, person_cnt, regist_cnt, active_date)
VALUES('04RS', 'user1', 2,1, 3, 20000,   '2024-10-07');




-- 예약 페이지 이미지 정보
INSERT INTO project.registimages
(regist_code, image_order, image_type, image_name)
VALUES('04RS', 1, 'main', 'reserve01.jpg');
INSERT INTO project.registimages
(regist_code, image_order, image_type,image_name)
VALUES('04RS', 2, 'main', 'reserve02.JPG');
INSERT INTO project.registimages
(regist_code, image_order, image_type, image_name)
VALUES('04RS', 3, 'main', 'reserve03.JPG');
INSERT INTO project.registimages
(regist_code, image_order, image_type, image_name)
VALUES('04RS', 4, 'main', 'reserve04.JPG');
INSERT INTO project.registimages
(regist_code, image_order, image_type, image_name)
VALUES('04RS', 5, 'main', 'reserve05.JPG');
INSERT INTO project.registimages
(regist_code, image_order, image_type, image_name)
VALUES('04RS', 6, 'main', 'reserve06.JPG');
INSERT INTO project.registimages
(regist_code, image_order, image_type, image_name)
VALUES('04RS', 7, 'main', 'reserve07.JPG');
INSERT INTO project.registimages
(regist_code, image_order, image_type, image_name)
VALUES('04RS', 1, 'detail', '예약설명1.jpg');
INSERT INTO project.registimages
(regist_code, image_order, image_type, image_name)
VALUES('04RS', 2, 'detail', '예약설명2.jpg');
INSERT INTO project.registimages
(regist_code, image_order, image_type, image_name)
VALUES('04RS', 3, 'detail', '예약설명3.jpg');
 

