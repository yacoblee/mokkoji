-- Review 가데이터
INSERT INTO project.reviews (review_id,user_id,product_id,review_content)
VALUES (1,'user1',1,'뭔지 몰라도 좋아요');
INSERT INTO project.reviews (user_id,product_id,review_content,like_dislike)
VALUES ('user1',2,'뭔지 몰라도 나빠요',0);
INSERT INTO project.reviews (user_id,product_id,review_content,like_dislike)
VALUES ('user2',2,'뭔지 몰라도 좋아요',1);

--  Favorite 가데이터
INSERT INTO project.favorite (user_id,product_id)
VALUES ('user1',1);
INSERT INTO project.favorite (user_id,product_id)
VALUES ('user2',2);
INSERT INTO project.favorite (user_id,product_id)
VALUES ('user3',3);
INSERT INTO project.favorite (user_id,product_id)
VALUES ('user1',2);


