CREATE DATABASE  IF NOT EXISTS `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `author_id` int NOT NULL,
  `author_fn` varchar(255) DEFAULT NULL,
  `author_ln` varchar(255) DEFAULT NULL,
  `author_alias` varchar(255) DEFAULT NULL,
  `author_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`author_id`),
  KEY `NN` (`author_fn`,`author_ln`,`author_alias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'Hyung','Min-Woo',NULL,'2023-04-30 08:01:48'),(2,'Kim','Yong-hwan','YongYea','2023-04-30 08:01:48'),(3,'Park','Jin-Hwan',NULL,'2023-04-30 08:01:48'),(4,'Yongje','Park','Yongje Park','2023-04-30 08:01:48'),(5,'Bum-Gu','Kim','Bum-Gu Kim','2023-04-30 08:01:48'),(6,'Hun','Song','Hun Song','2023-04-30 08:01:48'),(7,'Ggamang','Jang','Ggamang Jang','2023-04-30 08:01:48'),(8,'Jeongseo','Park','Jeongseo Park','2023-04-30 08:01:48'),(9,'Koogi',NULL,'Koogi','2023-04-30 08:01:48'),(10,'Yoon','Tae-ho','Yoon Tae-ho','2023-04-30 08:01:48');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` varchar(255) NOT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_desc` varchar(255) DEFAULT NULL,
  `book_img` varchar(255) DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `pub_id` int DEFAULT NULL,
  `book_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_id`),
  KEY `pub_id` (`pub_id`),
  KEY `author_id` (`author_id`),
  KEY `NN` (`book_name`,`book_desc`,`book_img`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`pub_id`) REFERENCES `publisher` (`pub_id`),
  CONSTRAINT `book_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES ('9788953934465','Tower of God','A young boy attempts to climb a massive tower to find his lost love','https://f.ptcdn.info/795/068/000/q85vai5ajqemU3yLMaG-o.png',1,1,'2023-04-30 08:01:48'),('9788953934700','The God of High School','A high school martial arts tournament with a supernatural twist','https://m.media-amazon.com/images/M/MV5BYjljYmYzNjMtZWY5YS00OGZjLTk4MTYtNDZmYzkxYjgyMDMzXkEyXkFqcGdeQXVyODM2NjQzOTA@._V1_.jpg',1,1,'2023-04-30 08:01:48'),('9788953935202','Noblesse','A powerful vampire awakens after 820 years of slumber','https://m.media-amazon.com/images/M/MV5BNDZlNjJmYjEtZmI2Yy00MDY4LWFjNmItMDcxNmE3MGJlZTJiXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_FMjpg_UX1000_.jpg',1,1,'2023-04-30 08:01:48'),('9788953935646','Sweet Home','A group of survivors must fight for their lives against monstrous creatures in a world where humans are turning into monsters','https://sweethomemanga.com/wp-content/uploads/2022/03/Sweet-Home-Volume-1.webp',1,1,'2023-04-30 08:01:48'),('9788953938289','Save Me','A prequel to the popular Korean boy band BTS\'s \"The Most Beautiful Moment in Life\" music video trilogy','https://cdn.myanimelist.net/images/manga/2/259420.jpg',1,1,'2023-04-30 08:01:48'),('9788998274801','Gatabutata','A comedy about two friends and their wacky adventures','https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1623397488l/58313049.jpg',1,1,'2023-04-30 08:01:48'),('9788998279684','Killing Stalking','A psychological thriller about a stalker and his victim who develop a twisted relationship','https://m.media-amazon.com/images/I/71GOjN7YY4L._AC_UF1000,1000_QL80_.jpg',2,2,'2023-04-30 08:01:48'),('9788998279875','Painter of the Night','A historical drama about a painter who falls in love with a nobleman','https://i.ebayimg.com/images/g/GeAAAOSwSFph~-wO/s-l1600.jpg',2,2,'2023-04-30 08:01:48'),('9788998279905','Blood Bank','A vampire and a human become unlikely allies in a world where vampires must drink human blood to survive','https://ccdn.lezhin.com/v2/comics/6059074143125504/images/tall.jpg?updated=1611130137519&width=840',2,2,'2023-04-30 08:01:48'),('9788998281656','The Lady and Her Butler','A romantic comedy about a woman who hires a butler to help her recover from a painful breakup','https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1617185858i/57587847.jpg',2,2,'2023-04-30 08:01:48'),('9791190995292','Solo Leveling','After a portal to a parallel world opens, hunters begin to awaken in humans, giving them supernatural powers. Jinwoo Sung is one such hunter, but he is known as the \"weakest\" because he is constantly struggling to make ends meet. One day, a mission goes w','https://upload.wikimedia.org/wikipedia/en/9/99/Solo_Leveling_Webtoon.png',3,3,'2023-04-30 08:01:48');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_type`
--

DROP TABLE IF EXISTS `book_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_type` (
  `book_type_id` int NOT NULL,
  `book_type_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`book_type_id`),
  KEY `NN` (`book_type_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_type`
--

LOCK TABLES `book_type` WRITE;
/*!40000 ALTER TABLE `book_type` DISABLE KEYS */;
INSERT INTO `book_type` VALUES (3,'Biography'),(10,'Fantasy'),(1,'Fiction'),(7,'Horror'),(4,'Memoir'),(5,'Mystery'),(2,'Non-Fiction'),(6,'Romance'),(9,'Science Fiction'),(8,'Thriller');
/*!40000 ALTER TABLE `book_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_with_type`
--

DROP TABLE IF EXISTS `book_with_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_with_type` (
  `book_id` varchar(255) DEFAULT NULL,
  `book_type_id` int DEFAULT NULL,
  KEY `book_id` (`book_id`),
  KEY `book_type_id` (`book_type_id`),
  CONSTRAINT `book_with_type_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `book_with_type_ibfk_2` FOREIGN KEY (`book_type_id`) REFERENCES `book_type` (`book_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_with_type`
--

LOCK TABLES `book_with_type` WRITE;
/*!40000 ALTER TABLE `book_with_type` DISABLE KEYS */;
INSERT INTO `book_with_type` VALUES ('1',1),('1',3),('1',6),('2',1),('2',2),('3',3),('4',4),('5',3),('5',5),('5',10);
/*!40000 ALTER TABLE `book_with_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buy_history`
--

DROP TABLE IF EXISTS `buy_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buy_history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `book_id` varchar(255) DEFAULT NULL,
  `his_page` int DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `buy_history_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buy_history`
--

LOCK TABLES `buy_history` WRITE;
/*!40000 ALTER TABLE `buy_history` DISABLE KEYS */;
INSERT INTO `buy_history` VALUES (1,1,'1',2),(2,2,'1',1),(3,3,'1',2),(4,4,'1',1),(5,5,'1',2),(6,6,'1',2),(7,7,'1',2),(8,8,'1',2),(9,9,'1',2),(10,10,'2',2);
/*!40000 ALTER TABLE `buy_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buy_package`
--

DROP TABLE IF EXISTS `buy_package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buy_package` (
  `pay_id` int NOT NULL auto_increment,
  `pack_id` int DEFAULT NULL,
  `pack_start` date DEFAULT NULL,
  `pack_end` date DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `pay_bill` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pay_id`),
  KEY `user_id` (`user_id`),
  KEY `pack_id` (`pack_id`),
  KEY `NN` (`pack_start`,`pack_end`,`pay_bill`),
  CONSTRAINT `buy_package_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `buy_package_ibfk_2` FOREIGN KEY (`pack_id`) REFERENCES `package` (`pack_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buy_package`
--

LOCK TABLES `buy_package` WRITE;
/*!40000 ALTER TABLE `buy_package` DISABLE KEYS */;
INSERT INTO `buy_package` VALUES (1,2,'2023-04-01','2023-09-28',1,NULL),(2,1,'2023-04-15','2023-10-12',2,NULL),(3,3,'2023-04-01','2024-04-01',3,NULL),(4,1,'2023-03-01','2023-03-31',4,NULL),(5,2,'2023-03-15','2023-09-30',5,NULL),(6,3,'2023-03-01','2024-02-29',6,NULL),(7,1,'2023-03-20','2023-04-19',7,NULL),(8,2,'2023-02-15','2023-08-14',8,NULL),(9,3,'2023-02-01','2024-02-01',9,NULL),(10,1,'2023-04-01','2023-05-01',10,NULL);
/*!40000 ALTER TABLE `buy_package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buy_package_log`
--

DROP TABLE IF EXISTS `buy_package_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buy_package_log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `pay_id` int NOT NULL,
  `pack_id` int NOT NULL,
  `pack_start` date NOT NULL,
  `pack_end` date NOT NULL,
  `user_id` int NOT NULL,
  `pay_bill` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`),
  KEY `pack_id` (`pack_id`),
  KEY `pay_id` (`pay_id`),
  CONSTRAINT `buy_package_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `buy_package_log_ibfk_2` FOREIGN KEY (`pack_id`) REFERENCES `package` (`pack_id`),
  CONSTRAINT `buy_package_log_ibfk_3` FOREIGN KEY (`pay_id`) REFERENCES `payment` (`pay_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buy_package_log`
--

LOCK TABLES `buy_package_log` WRITE;
/*!40000 ALTER TABLE `buy_package_log` DISABLE KEYS */;
INSERT INTO `buy_package_log` VALUES (1,1,2,'2022-04-01','2022-09-30',1,'','2023-04-30 08:01:48'),(2,2,1,'2022-04-15','2022-07-14',2,'','2023-04-30 08:01:48'),(3,3,3,'2022-05-01','2022-06-30',3,'','2023-04-30 08:01:48'),(4,4,1,'2022-06-01','2022-08-31',4,'','2023-04-30 08:01:48'),(5,5,2,'2022-06-15','2022-11-14',5,'','2023-04-30 08:01:48'),(6,6,3,'2022-07-01','2022-12-31',6,'','2023-04-30 08:01:48'),(7,7,1,'2022-08-01','2022-10-31',7,'','2023-04-30 08:01:48'),(8,8,2,'2022-08-15','2023-01-14',8,'','2023-04-30 08:01:48'),(9,9,3,'2022-09-01','2023-02-28',9,'','2023-04-30 08:01:48'),(10,10,1,'2022-10-01','2023-03-31',10,'','2023-04-30 08:01:48'),(11,11,2,'2022-11-01','2023-04-30',1,'','2023-04-30 08:01:48'),(12,12,1,'2022-12-01','2023-05-31',2,'','2023-04-30 08:01:48'),(13,13,3,'2023-01-01','2023-06-30',3,'','2023-04-30 08:01:48'),(14,14,1,'2023-02-01','2023-07-31',4,'','2023-04-30 08:01:48'),(15,15,2,'2023-03-01','2023-08-31',5,'','2023-04-30 08:01:48'),(16,16,3,'2023-04-01','2023-09-30',6,'','2023-04-30 08:01:48'),(17,17,1,'2023-05-01','2023-10-31',7,'','2023-04-30 08:01:48'),(18,18,2,'2023-06-01','2023-11-30',8,'','2023-04-30 08:01:48'),(19,19,3,'2023-07-01','2023-12-31',9,'','2023-04-30 08:01:48'),(20,20,1,'2023-08-01','2024-01-31',10,'','2023-04-30 08:01:48');
/*!40000 ALTER TABLE `buy_package_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter` (
  `chapter_id` int NOT NULL AUTO_INCREMENT,
  `book_id` varchar(255) DEFAULT NULL,
  `chapter_content` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chapter_id`),
  KEY `book_id` (`book_id`),
  KEY `NN` (`chapter_content`),
  CONSTRAINT `chapter_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
INSERT INTO `chapter` VALUES (1,'9791190995292','Chapter 1: It\'s Solo','2023-04-30 08:01:48'),(2,'9791190995292','Chapter 2: Strongest','2023-04-30 08:01:48'),(3,'9788953934700','Chapter 1: The God of High School','2023-04-30 08:01:48'),(4,'9788953934700','Chapter 2: Renewal/Soul','2023-04-30 08:01:48'),(5,'9788953934465','Chapter 1: Headon\'s Floor','2023-04-30 08:01:48'),(6,'9788953934465','Chapter 2: Three Four-Hundredths','2023-04-30 08:01:48'),(7,'9788953935202','Chapter 1: Prologue','2023-04-30 08:01:48'),(8,'9788953935202','Chapter 2: The Noblesse','2023-04-30 08:01:48'),(9,'9788953935646','Chapter 1: Episode 0','2023-04-30 08:01:48'),(10,'9788953935646','Chapter 2: Episode 1','2023-04-30 08:01:48'),(11,'9791190995292','Chapter 3:','2023-04-30 08:01:48');
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter_image`
--

DROP TABLE IF EXISTS `chapter_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter_image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `chapter_id` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `chapter_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `chapter_id` (`chapter_id`),
  CONSTRAINT `chapter_image_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`chapter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter_image`
--

LOCK TABLES `chapter_image` WRITE;
/*!40000 ALTER TABLE `chapter_image` DISABLE KEYS */;
INSERT INTO `chapter_image` VALUES (1,1,'https://cdn.discordapp.com/attachments/920661114935726130/1099605091272630312/solo-leveling-1-1-202300011.png','2023-04-30 08:01:48'),(2,1,'https://cdn.discordapp.com/attachments/920661114935726130/1099605271317319721/solo-leveling-1-1-202300012.png','2023-04-30 08:01:48'),(3,1,'https://cdn.discordapp.com/attachments/920661114935726130/1099605452934893568/solo-leveling-1-1-202300013.png','2023-04-30 08:01:48'),(4,2,'https://cdn.discordapp.com/attachments/920661114935726130/1099605091272630312/solo-leveling-1-1-202300011.png','2023-04-30 08:01:48'),(5,2,'https://cdn.discordapp.com/attachments/920661114935726130/1099624303537958943/solo-leveling-1-1-202300027.png','2023-04-30 08:01:48'),(6,2,'https://cdn.discordapp.com/attachments/920661114935726130/1099624427051814972/solo-leveling-1-1-202300028.png','2023-04-30 08:01:48'),(7,11,'https://cdn.discordapp.com/attachments/920661114935726130/1099605091272630312/solo-leveling-1-1-202300011.png','2023-04-30 08:01:48'),(8,11,'https://cdn.discordapp.com/attachments/920661114935726130/1099624791096434708/solo-leveling-1-1-202300040.png','2023-04-30 08:01:48'),(9,11,'https://cdn.discordapp.com/attachments/920661114935726130/1099624848818454528/solo-leveling-1-1-202300041.png','2023-04-30 08:01:48'),(10,3,'https://cdn.discordapp.com/attachments/920661114935726130/1099634618552033330/aHR0cHM6Ly93d3cubWFuZ2FyZWFkLm9yZy9tYW5nYS90aGUtZ29kLW9mLWhpZ2gtc2Nob29sLW1hbmdhLw3D3D.png','2023-04-30 08:01:48'),(11,3,'https://cdn.discordapp.com/attachments/920661114935726130/1099634760864759848/aHR0cHM6Ly93d3cubWFuZ2FyZWFkLm9yZy9tYW5nYS90aGUtZ29kLW9mLWhpZ2gtc2Nob29sLW1hbmdhLw3D3D.png','2023-04-30 08:01:48'),(12,3,'https://cdn.discordapp.com/attachments/920661114935726130/1099634829101895780/aHR0cHM6Ly93d3cubWFuZ2FyZWFkLm9yZy9tYW5nYS90aGUtZ29kLW9mLWhpZ2gtc2Nob29sLW1hbmdhLw3D3D.png','2023-04-30 08:01:48');
/*!40000 ALTER TABLE `chapter_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `fav_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `book_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fav_id`),
  KEY `book_id` (`book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (1,1,'9788953934465'),(2,2,'9788953934465'),(3,2,'9788953934700'),(4,4,'9788953934700'),(5,5,'9788953934700'),(6,6,'9788953934700'),(7,7,'9788953934700'),(8,8,'9788953934700'),(9,9,'9788953934700'),(10,10,'9788953934700');
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package` (
  `pack_id` int NOT NULL,
  `price` int DEFAULT NULL,
  `pack_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pack_id`),
  KEY `NN` (`price`,`pack_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (1,25,'Basic'),(2,40,'Premium'),(3,75,'Ultimate');
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `pub_id` int NOT NULL,
  `pub_name` varchar(255) DEFAULT NULL,
  `pub_phone` varchar(255) DEFAULT NULL,
  `pub_url` varchar(255) DEFAULT NULL,
  `publisher_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pub_id`),
  KEY `NN` (`pub_name`,`pub_phone`,`pub_url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (1,'Webtoon','123456789','https://www.webtoons.com/','2023-04-30 08:01:48'),(2,'Kakao Page Corp.','987654321','https://page.kakao.com/','2023-04-30 08:01:48'),(3,'Lezhin Comics','456789123','https://www.lezhin.com/en/','2023-04-30 08:01:48'),(4,'Naver Webtoon','444-444-4444','https://www.webtoons.com/','2023-04-30 08:01:48'),(5,'Toomics','777-777-7777','https://www.toomics.com/','2023-04-30 08:01:48'),(6,'Shueisha','03-3230-5500','https://www.shueisha.co.jp/','2023-04-30 08:01:48'),(7,'Kodansha','03-3445-8010','https://www.kodansha.co.jp/','2023-04-30 08:01:48'),(8,'Shogakukan','03-3230-6500','https://www.shogakukan.co.jp/','2023-04-30 08:01:48'),(9,'Square Enix','03-6376-9444','https://www.jp.square-enix.com/','2023-04-30 08:01:48'),(10,'Hakusensha','03-3797-7622','https://www.hakusensha.co.jp/','2023-04-30 08:01:48');
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `token` VARCHAR(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`token`),
  KEY `user_id` (`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_password` varchar(255) DEFAULT NULL,
  `user_first_name` varchar(20) DEFAULT NULL,
  `user_last_name` varchar(20) DEFAULT NULL,
  `user_email` varchar(30) DEFAULT NULL,
  `user_phone` varchar(10) DEFAULT NULL,
  `user_pic` varchar(255) DEFAULT NULL,
  `user_display_name` varchar(20) DEFAULT NULL,
  `user_role` enum('admin','customer') DEFAULT NULL,
  `user_status` enum('R','NR','WT') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  KEY `AUTO_INCREMENT` (`user_id`),
  KEY `NN` (`user_password`,`user_first_name`,`user_last_name`,`user_email`,`user_phone`,`user_role`,`user_status`),
  KEY `UQ` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'password1','John','Doe','johndoe@example.com','1234567890',NULL,'johndoe','customer','R','2023-04-30 08:01:48'),(2,'password2','Jane','Doe','janedoe@example.com','0987654321',NULL,'janedoe','customer','R','2023-04-30 08:01:48'),(3,'password3','Admin','Doe','admindoe@example.com','5555555555',NULL,'admindoe','admin','R','2023-04-30 08:01:48');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-30 18:01:48
