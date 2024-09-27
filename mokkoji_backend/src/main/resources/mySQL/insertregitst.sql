-- 240924 18:00
-- cart Table에 작성 시간을 저장하는 Col 추가
ALTER TABLE cart ADD cart_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NULL;

-- 240925 17:53
-- 구매내역 table 이름 변경
RENAME TABLE purchasehistorylist TO purchasedetail;
RENAME TABLE purchasehistory TO purchase;
RENAME TABLE favorite TO favorites;
RENAME TABLE purchase TO orders;
RENAME TABLE purchasedetail TO ordersdetail;

-- 240926 13:03
-- regist table 구성 변경
ALTER TABLE regist ADD hightlight_1 varchar(150) NULL;
ALTER TABLE regist ADD hightlight_2 varchar(150) NULL;
ALTER TABLE regist ADD hightlight_3 varchar(150) NULL;
ALTER TABLE regist ADD hightlight_4 varchar(150) NULL;
ALTER TABLE regist ADD package_detail varchar(200) NULL;
ALTER TABLE regist ADD restrict_detail varchar(200) NULL;
ALTER TABLE regist ADD reserve_restrict varchar(200) NULL;
ALTER TABLE regist ADD etc_detail varchar(200) NULL;