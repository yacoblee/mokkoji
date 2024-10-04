-- 240924 18:00
-- cart Table에 작성 시간을 저장하는 Col 추가
ALTER TABLE cart ADD cart_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NULL;

-- 240925 17:53
-- 구매내역 table 이름 변경
# RENAME TABLE purchasehistorylist TO purchasedetail;
# RENAME TABLE purchasehistory TO purchase;
# RENAME TABLE favorite TO favorites;
# RENAME TABLE purchase TO orders;
# RENAME TABLE purchasedetail TO ordersdetail;

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

-- 효윤 9.27

ALTER TABLE users
    ADD COLUMN `is_admin` tinyint(1) DEFAULT 0 COMMENT '관리자 여부 (1: 관리자, 0: 일반 사용자)';

-- 효윤 10.02
ALTER TABLE users MODIFY user_sequence INT NOT NULL AUTO_INCREMENT;

WITH ranked_users AS (SELECT user_id,
                             ROW_NUMBER() OVER (ORDER BY user_id) +
                             (SELECT MAX(user_sequence) FROM users) AS new_sequence
                      FROM users
                      WHERE user_sequence = 0)
UPDATE users u
    JOIN ranked_users ru ON u.user_id = ru.user_id
SET u.user_sequence = ru.new_sequence;

-- 효윤 10.04
ALTER TABLE project.address CHANGE recipient_name `location_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '받는곳';
ALTER TABLE project.address MODIFY COLUMN `location_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '받는곳';
ALTER TABLE project.address ADD recipient_name varchar(50) NULL COMMENT '수령인';