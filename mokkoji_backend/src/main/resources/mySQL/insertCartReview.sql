--  효윤 9.24 insert users

INSERT INTO `users` (`user_id`, `password`, `name`, `birth_date`, `gender`, `phone_number`, `email`, `is_withdrawn`, `withdrawal_date`, `created_at`, `updated_at`, `block_status`)
VALUES
('user1', 'password123', '홍길동', '1990-05-15', 'M', '010-1234-5678', 'hong@example.com', 0, NULL, NOW(), NOW(), 0),
('user2', 'password456', '김철수', '1988-08-23', 'M', '010-2345-6789', 'kim@example.com', 0, NULL, NOW(), NOW(), 0),
('user3', 'password789', '이영희', '1995-02-10', 'F', '010-3456-7890', 'lee@example.com', 0, NULL, NOW(), NOW(), 0);







-- Review 가데이터
INSERT INTO project.reviews (review_id,user_id,product_id,review_content)
VALUES (1,'user1',1,'뭔지 몰라도 좋아요');
INSERT INTO project.reviews (user_id,product_id,review_content,like_dislike)
VALUES ('user1',2,'뭔지 몰라도 나빠요',0);
INSERT INTO project.reviews (user_id,product_id,review_content,like_dislike)
VALUES ('user2',2,'뭔지 몰라도 좋아요',1);

--  Favorites 가데이터
INSERT INTO project.favorites (user_id,product_id)
VALUES ('user1',1);
INSERT INTO project.favorites (user_id,product_id)
VALUES ('user2',2);
INSERT INTO project.favorites (user_id,product_id)
VALUES ('user3',3);
INSERT INTO project.favorites (user_id,product_id)
VALUES ('user1',2);


