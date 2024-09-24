-- 240924 18:00
-- cart Table에 작성 시간을 저장하는 Col 추가
ALTER TABLE cart ADD cart_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NULL;