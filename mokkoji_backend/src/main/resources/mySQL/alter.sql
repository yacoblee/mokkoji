-- 240924 18:00
-- cart Table에 작성 시간을 저장하는 Col 추가
ALTER TABLE cart ADD cart_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NULL;

-- 240925 17:53
-- 구매내역 table 이름 변경
RENAME TABLE purchasehistorylist TO purchasedetail;
RENAME TABLE purchasehistory TO purchase;
RENAME TABLE favorite TO favorites;