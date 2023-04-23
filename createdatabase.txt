/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;



DROP TABLE IF EXISTS `Publisher`;
CREATE TABLE `Publisher` (
  `pub_id` INT(10),
  `pub_name` VARCHAR(255),
  `pub_phone` VARCHAR(255),
  `pub_url` VARCHAR(255),
  PRIMARY KEY (`pub_id`),
  KEY `NN` (`pub_name`, `pub_phone`, `pub_url`)
);

DROP TABLE IF EXISTS `Author`;
CREATE TABLE `Author` (
  `author_id` INT(10),
  `author_fn` VARCHAR(255),
  `author_ln` VARCHAR(255),
  `author_alias` VARCHAR(255),
  PRIMARY KEY (`author_id`),
  KEY `NN` (`author_fn`, `author_ln`, `author_alias`)
);

DROP TABLE IF EXISTS `Book`;
CREATE TABLE `Book` (
  `book_id` VARCHAR(255),
  `book_name` VARCHAR(255),
  `book_desc` VARCHAR(255),
  `book_img` VARCHAR(255),
  `author_id` INT(10),
  `pub_id` INT(10),

  PRIMARY KEY (`book_id`),
  FOREIGN KEY (`pub_id`) REFERENCES `Publisher`(`pub_id`),
  FOREIGN KEY (`author_id`) REFERENCES `Author`(`author_id`),
  KEY `NN` (`book_name`, `book_desc`, `book_img`)
);

DROP TABLE IF EXISTS `favorite`;
CREATE TABLE `favorite` (
  `fav_id` INT(10) AUTO_INCREMENT,
  `customer_id` INT(10),
  `book_id` VARCHAR(255),
  PRIMARY KEY (`fav_id`),
  FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`)
);

DROP TABLE IF EXISTS `Chapter`;
CREATE TABLE `Chapter` (
  `chapter_id` INT(10) auto_increment,
  `book_id` VARCHAR(255),
  `chapter_content` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chapter_id`),
  FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`),
  KEY `NN` (`chapter_content`)
);
DROP TABLE IF EXISTS `Chapter_Image`;
CREATE TABLE `Chapter_Image` (
  `image_id` INT(10) AUTO_INCREMENT,
  `chapter_id` INT(10),
  `image_url` VARCHAR(255),
  PRIMARY KEY (`image_id`),
  FOREIGN KEY (`chapter_id`) REFERENCES `Chapter`(`chapter_id`)
);

DROP TABLE IF EXISTS `Book_Type`;
CREATE TABLE `Book_Type` (
  `book_type_id` INT(10),
  `book_type_name` VARCHAR(255),
  PRIMARY KEY (`book_type_id`),
  KEY `NN` (`book_type_name`)
);

DROP TABLE IF EXISTS `Book_with_Type`;
CREATE TABLE `Book_with_Type` (
  `book_id` VARCHAR(255),
  `book_type_id` INT(10),
  FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`),
  FOREIGN KEY (`book_type_id`) REFERENCES `Book_Type`(`book_type_id`)
);

DROP TABLE IF EXISTS `buy_history`;
CREATE TABLE `buy_history` (
  `history_id` INT(10) auto_increment,
  `customer_id` INT(10),
  `book_id` VARCHAR(255),
  `his_page` INT(10),
  PRIMARY KEY (`history_id`),
  FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`)
);

DROP TABLE IF EXISTS `Customer`;

CREATE TABLE `Customer` (
  `customer_id` INT(10) AUTO_INCREMENT,
  `customer_password` VARCHAR(10),
  `customer_firstN` VARCHAR(10),
  `customer_lastN` VARCHAR(10),
  `customer_email` VARCHAR(30),
  `customer_phone` VARCHAR(10),
  `customer_pic` VARCHAR(255),
  `customer_displayname` VARCHAR(20),
  `status` ENUM('R', 'NR'),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`),
  KEY `AUTO_INCREMENT` (`customer_id`),
  KEY `NN` (`customer_password`, `customer_firstN`, `customer_lastN`, `customer_email`, `customer_phone`, `customer_displayname`, `status`),
  KEY `UQ` (`customer_email`)
);

DROP TABLE IF EXISTS `package`;

CREATE TABLE `package` (
  `pack_id` INT(10),
  `price` INT(10),
  `pack_name` VARCHAR(255),
  PRIMARY KEY (`pack_id`),
  KEY `NN` (`price`, `pack_name`)
);

DROP TABLE IF EXISTS `buy_package`;

CREATE TABLE `buy_package` (
  `pay_id` INT(10),
  `pack_id` INT(10),
  `pack_start` Date,
  `pack_end` Date,
  `customer_id` INT(10),
  `pay_bill` VARCHAR(255),
  PRIMARY KEY (`pay_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`customer_id`),
  FOREIGN KEY (`pack_id`) REFERENCES `package`(`pack_id`),
  KEY `NN` (`pack_start`, `pack_end`, `pay_bill`)
);

DROP TABLE IF EXISTS `Admin`;

CREATE TABLE `Admin` (
  `admin_username` VARCHAR(255),
  `admin_password` VARCHAR(255),
  `admin_email` VARCHAR(255),
  PRIMARY KEY (`admin_username`),
  KEY `NN` (`admin_password`, `admin_email`),
  KEY `UQ` (`admin_email`)
);

DROP TABLE IF EXISTS `buy_package_log`;
CREATE TABLE `buy_package_log` (
  `log_id` INT(10) NOT NULL AUTO_INCREMENT,
  `pay_id` INT(10) NOT NULL,
  `pack_id` INT(10) NOT NULL,
  `pack_start` DATE NOT NULL,
  `pack_end` DATE NOT NULL,
  `customer_id` INT(10) NOT NULL,
  `pay_bill` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`customer_id`),
  FOREIGN KEY (`pack_id`) REFERENCES `package`(`pack_id`),
  FOREIGN KEY (`pay_id`) REFERENCES `payment`(`pay_id`)
);

ALTER TABLE book ADD book_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE author ADD author_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE publisher ADD publisher_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE chapter_image ADD chapter_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO `Publisher` (`pub_id`, `pub_name`, `pub_phone`, `pub_url`) VALUES
(1, 'Webtoon', '123456789', 'https://www.webtoons.com/'),
(2, 'Kakao Page Corp.', '987654321', 'https://page.kakao.com/'),
(3, 'Lezhin Comics', '456789123', 'https://www.lezhin.com/en/'),
(4, 'Naver Webtoon', '444-444-4444', 'https://www.webtoons.com/'),
(5, 'Toomics', '777-777-7777', 'https://www.toomics.com/'),
(6, 'Shueisha', '03-3230-5500', 'https://www.shueisha.co.jp/'),
(7, 'Kodansha', '03-3445-8010', 'https://www.kodansha.co.jp/'),
(8, 'Shogakukan', '03-3230-6500', 'https://www.shogakukan.co.jp/'),
(9, 'Square Enix', '03-6376-9444', 'https://www.jp.square-enix.com/'),
(10, 'Hakusensha', '03-3797-7622', 'https://www.hakusensha.co.jp/');

INSERT INTO `Author` (`author_id`, `author_fn`, `author_ln`, `author_alias`) VALUES
(1, 'Hyung', 'Min-Woo', NULL),
(2, 'Kim', 'Yong-hwan', 'YongYea'),
(3, 'Park', 'Jin-Hwan', NULL),
(4, 'Yongje', 'Park', 'Yongje Park'),
(5, 'Bum-Gu', 'Kim', 'Bum-Gu Kim'),
(6, 'Hun', 'Song', 'Hun Song'),
(7, 'Ggamang', 'Jang', 'Ggamang Jang'),
(8, 'Jeongseo', 'Park', 'Jeongseo Park'),
(9, 'Koogi', NULL, 'Koogi'),
(10, 'Yoon', 'Tae-ho', 'Yoon Tae-ho');

INSERT INTO Book (book_id, book_name, book_desc, book_img, author_id, pub_id) VALUES
('9788953934700', 'The God of High School', 'A high school martial arts tournament with a supernatural twist', 'https://m.media-amazon.com/images/M/MV5BYjljYmYzNjMtZWY5YS00OGZjLTk4MTYtNDZmYzkxYjgyMDMzXkEyXkFqcGdeQXVyODM2NjQzOTA@._V1_.jpg', 1, 1),
('9788953934465', 'Tower of God', 'A young boy attempts to climb a massive tower to find his lost love', 'https://f.ptcdn.info/795/068/000/q85vai5ajqemU3yLMaG-o.png', 1, 1),
('9788953935202', 'Noblesse', 'A powerful vampire awakens after 820 years of slumber', 'https://m.media-amazon.com/images/M/MV5BNDZlNjJmYjEtZmI2Yy00MDY4LWFjNmItMDcxNmE3MGJlZTJiXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_FMjpg_UX1000_.jpg', 1, 1),
('9788953935646', 'Sweet Home', 'A group of survivors must fight for their lives against monstrous creatures in a world where humans are turning into monsters', 'https://sweethomemanga.com/wp-content/uploads/2022/03/Sweet-Home-Volume-1.webp', 1, 1),
('9788953938289', 'Save Me', 'A prequel to the popular Korean boy band BTS''s "The Most Beautiful Moment in Life" music video trilogy', 'https://cdn.myanimelist.net/images/manga/2/259420.jpg', 1, 1),
('9788998279684', 'Killing Stalking', 'A psychological thriller about a stalker and his victim who develop a twisted relationship', 'https://m.media-amazon.com/images/I/71GOjN7YY4L._AC_UF1000,1000_QL80_.jpg', 2, 2),
('9788998279875', 'Painter of the Night', 'A historical drama about a painter who falls in love with a nobleman', 'https://i.ebayimg.com/images/g/GeAAAOSwSFph~-wO/s-l1600.jpg', 2, 2),
('9788998279905', 'Blood Bank', 'A vampire and a human become unlikely allies in a world where vampires must drink human blood to survive', 'https://ccdn.lezhin.com/v2/comics/6059074143125504/images/tall.jpg?updated=1611130137519&width=840', 2, 2),
('9788998281656', 'The Lady and Her Butler', 'A romantic comedy about a woman who hires a butler to help her recover from a painful breakup', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1617185858i/57587847.jpg', 2, 2),
('9788998274801', 'Gatabutata', 'A comedy about two friends and their wacky adventures', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1623397488l/58313049.jpg', 1, 1),
('9791190995292', 'Solo Leveling', 'After a portal to a parallel world opens, hunters begin to awaken in humans, giving them supernatural powers. Jinwoo Sung is one such hunter, but he is known as the "weakest" because he is constantly struggling to make ends meet. One day, a mission goes wrong and Jinwoo finds himself trapped in a double dungeon, where he discovers his true potential and begins his journey to become the world''s strongest hunter.', 'https://upload.wikimedia.org/wikipedia/en/9/99/Solo_Leveling_Webtoon.png', 3, 3);

INSERT INTO `favorite` (`customer_id`, `book_id`) VALUES
(1, '9788953934465'),
(2, '9788953934465'),
(2, '9788953934700'),
(4, '9788953934700'),
(5, '9788953934700'),
(6, '9788953934700'),
(7, '9788953934700'),
(8, '9788953934700'),
(9, '9788953934700'),
(10, '9788953934700');



INSERT INTO `Chapter` (`book_id`, `chapter_content`) VALUES
( '9791190995292', 'Chapter 1: It\'s Solo'),
( '9791190995292', 'Chapter 2: Strongest'),
( '9788953934700', 'Chapter 1: The God of High School'),
( '9788953934700', 'Chapter 2: Renewal/Soul'),
( '9788953934465', 'Chapter 1: Headon''s Floor'),
( '9788953934465', 'Chapter 2: Three Four-Hundredths'),
( '9788953935202', 'Chapter 1: Prologue'),
( '9788953935202', 'Chapter 2: The Noblesse'),
( '9788953935646', 'Chapter 1: Episode 0'),
( '9788953935646', 'Chapter 2: Episode 1'),
( '9791190995292', 'Chapter 3:');

INSERT INTO book_type (book_type_id, book_type_name) VALUES
(1, 'Fiction'),
(2, 'Non-Fiction'),
(3, 'Biography'),
(4, 'Memoir'),
(5, 'Mystery'),
(6, 'Romance'),
(7, 'Horror'),
(8, 'Thriller'),
(9, 'Science Fiction'),
(10, 'Fantasy');


INSERT INTO Book_with_Type (book_id, book_type_id) VALUES
('1', 1 ),
('1', 3 ),
('1', 6 ),
('2', 1 ),
('2', 2 ),
('3', 3 ),
('4', 4 ),
('5', 3),
('5', 5),
('5', 10);


INSERT INTO buy_history (customer_id, book_id, his_page) VALUES
( 1, '1', 2),
( 2, '1', 1),
( 3, '1', 2),
( 4, '1', 1),
( 5, '1', 2),
( 6, '1', 2),
( 7, '1', 2),
( 8, '1', 2),
( 9, '1', 2),
( 10, '2', 2);

INSERT INTO Customer (customer_password, customer_firstN, customer_lastN, customer_email, customer_phone, customer_pic, customer_displayname,  status) VALUES
('123', 'Kamapanat', 'Konklong', 'kakakasmile@outlook.com', '1234567890', NULL, 'JohnS', 'NR'),
('password2', 'Jane', 'Doe', 'jane@example.com', '0987654321', NULL, 'JaneD',  'NR'),
('password3', 'Bob', 'Johnson', 'bob@example.com', '5551234567', NULL, 'BobJ', 'R'),
('password4', 'Alice', 'Jones', 'alice@example.com', '5555555555', NULL, 'AliceJ', 'R'),
('password5', 'Tom', 'Smith', 'tom@example.com', '1112223333', NULL, 'TomS', 'NR'),
('password6', 'Sarah', 'Lee', 'sarah@example.com', '4443332222', NULL, 'SarahL', 'NR'),
('password7', 'James', 'Brown', 'james@example.com', '7778889999', NULL, 'JamesB', 'R'),
('password8', 'Emily', 'Taylor', 'emily@example.com', '2221114444', NULL, 'EmilyT', 'NR'),
('password9', 'David', 'Martin', 'david@example.com', '6667778888', NULL, 'DavidM', 'R'),
('password10', 'Olivia', 'Wilson', 'olivia@example.com', '3334445555', NULL, 'OliviaW', 'NR');

INSERT INTO package (pack_id, price, pack_name) VALUES
(1, 25, 'Basic'),
(2, 40, 'Premium'),
(3, 75, 'Ultimate');

INSERT INTO buy_package (pay_id, pack_id, pack_start, pack_end, customer_id, pay_bill) VALUES
(1, 2, '2023-04-01', '2023-09-28', 1, NULL),
(2, 1, '2023-04-15', '2023-10-12', 2, NULL),
(3, 3, '2023-04-01', '2024-04-01', 3, NULL),
(4, 1, '2023-03-01', '2023-03-31', 4, NULL),
(5, 2, '2023-03-15', '2023-09-30', 5, NULL),
(6, 3, '2023-03-01', '2024-02-29', 6, NULL),
(7, 1, '2023-03-20', '2023-04-19', 7, NULL),
(8, 2, '2023-02-15', '2023-08-14', 8, NULL),
(9, 3, '2023-02-01', '2024-02-01', 9, NULL),
(10, 1, '2023-04-01', '2023-05-01', 10, NULL);

INSERT INTO Admin (admin_username, admin_password, admin_email)
VALUES
('admin', 'adminpassword', 'admin@example.com'),
('superadmin', 'superadminpassword', 'superadmin@example.com'),
('johndoe', 'johndoepassword', 'johndoe@example.com'),
('janedoe', 'janedoepassword', 'janedoe@example.com'),
('bobsmith', 'bobsmithpassword', 'bobsmith@example.com'),
('sarahlee', 'sarahleepassword', 'sarahlee@example.com'),
('michaelbrown', 'michaelbrownpassword', 'michaelbrown@example.com'),
('jenniferwang', 'jenniferwangpassword', 'jenniferwang@example.com'),
('davidchen', 'davidchenpassword', 'davidchen@example.com'),
('oliviali', 'olivialipassword', 'oliviali@example.com');

INSERT INTO buy_package_log (pay_id, pack_id, pack_start, pack_end, customer_id, pay_bill)
VALUES
(1, 2, '2022-04-01', '2022-09-30', 1, NULL),
(2, 1, '2022-04-15', '2022-07-14', 2, NULL),
(3, 3, '2022-05-01', '2022-06-30', 3, NULL),
(4, 1, '2022-06-01', '2022-08-31', 4, NULL),
(5, 2, '2022-06-15', '2022-11-14', 5, NULL),
(6, 3, '2022-07-01', '2022-12-31', 6, NULL),
(7, 1, '2022-08-01', '2022-10-31', 7, NULL),
(8, 2, '2022-08-15', '2023-01-14', 8, NULL),
(9, 3, '2022-09-01', '2023-02-28', 9, NULL),
(10, 1, '2022-10-01', '2023-03-31', 10, NULL),
(11, 2, '2022-11-01', '2023-04-30', 1, NULL),
(12, 1, '2022-12-01', '2023-05-31', 2, NULL),
(13, 3, '2023-01-01', '2023-06-30', 3, NULL),
(14, 1, '2023-02-01', '2023-07-31', 4, NULL),
(15, 2, '2023-03-01', '2023-08-31', 5, NULL),
(16, 3, '2023-04-01', '2023-09-30', 6, NULL),
(17, 1, '2023-05-01', '2023-10-31', 7, NULL),
(18, 2, '2023-06-01', '2023-11-30', 8, NULL),
(19, 3, '2023-07-01', '2023-12-31', 9, NULL),
(20, 1, '2023-08-01', '2024-01-31', 10, NULL);

INSERT INTO chapter_image (image_id, chapter_id, image_url)
VALUES
(1, 1, 'https://cdn.discordapp.com/attachments/920661114935726130/1099605091272630312/solo-leveling-1-1-202300011.png'),
(2, 1, 'https://cdn.discordapp.com/attachments/920661114935726130/1099605271317319721/solo-leveling-1-1-202300012.png'),
(3, 1, 'https://cdn.discordapp.com/attachments/920661114935726130/1099605452934893568/solo-leveling-1-1-202300013.png'),
(4, 2, 'https://cdn.discordapp.com/attachments/920661114935726130/1099605091272630312/solo-leveling-1-1-202300011.png'),
(5, 2, 'https://cdn.discordapp.com/attachments/920661114935726130/1099624303537958943/solo-leveling-1-1-202300027.png'),
(6, 2, 'https://cdn.discordapp.com/attachments/920661114935726130/1099624427051814972/solo-leveling-1-1-202300028.png'),
(7, 11, 'https://cdn.discordapp.com/attachments/920661114935726130/1099605091272630312/solo-leveling-1-1-202300011.png'),
(8, 11, 'https://cdn.discordapp.com/attachments/920661114935726130/1099624791096434708/solo-leveling-1-1-202300040.png'),
(9, 11, 'https://cdn.discordapp.com/attachments/920661114935726130/1099624848818454528/solo-leveling-1-1-202300041.png'),
(10, 3, 'https://cdn.discordapp.com/attachments/920661114935726130/1099634618552033330/aHR0cHM6Ly93d3cubWFuZ2FyZWFkLm9yZy9tYW5nYS90aGUtZ29kLW9mLWhpZ2gtc2Nob29sLW1hbmdhLw3D3D.png'),
(11, 3, 'https://cdn.discordapp.com/attachments/920661114935726130/1099634760864759848/aHR0cHM6Ly93d3cubWFuZ2FyZWFkLm9yZy9tYW5nYS90aGUtZ29kLW9mLWhpZ2gtc2Nob29sLW1hbmdhLw3D3D.png'),
(12, 3, 'https://cdn.discordapp.com/attachments/920661114935726130/1099634829101895780/aHR0cHM6Ly93d3cubWFuZ2FyZWFkLm9yZy9tYW5nYS90aGUtZ29kLW9mLWhpZ2gtc2Nob29sLW1hbmdhLw3D3D.png');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
