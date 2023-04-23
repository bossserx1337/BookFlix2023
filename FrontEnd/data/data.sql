CREATE DATABASE  IF NOT EXISTS `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `project`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.25-MariaDB

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_username` varchar(255) NOT NULL,
  `admin_password` varchar(255) DEFAULT NULL,
  `admin_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_username`),
  KEY `NN` (`admin_password`,`admin_email`),
  KEY `UQ` (`admin_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admind','admisadak','asdasd');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `author_id` int(10) NOT NULL,
  `author_fn` varchar(255) DEFAULT NULL,
  `author_ln` varchar(255) DEFAULT NULL,
  `author_alias` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`author_id`),
  KEY `NN` (`author_fn`,`author_ln`,`author_alias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int(10) NOT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_desc` varchar(255) DEFAULT NULL,
  `book_img` varchar(255) DEFAULT NULL,
  `author_id` int(10) DEFAULT NULL,
  `pub_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  KEY `pub_id` (`pub_id`),
  KEY `author_id` (`author_id`),
  KEY `NN` (`book_name`,`book_desc`,`book_img`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`pub_id`) REFERENCES `publisher` (`pub_id`),
  CONSTRAINT `book_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book type`
--

DROP TABLE IF EXISTS `book type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book type` (
  `book_type_id` int(10) NOT NULL,
  `book_type_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`book_type_id`),
  KEY `NN` (`book_type_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book type`
--

LOCK TABLES `book type` WRITE;
/*!40000 ALTER TABLE `book type` DISABLE KEYS */;
/*!40000 ALTER TABLE `book type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book with type`
--

DROP TABLE IF EXISTS `book with type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book with type` (
  `book_id` int(10) DEFAULT NULL,
  `book_type_id` int(10) DEFAULT NULL,
  KEY `book_type_id` (`book_type_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `book with type_ibfk_1` FOREIGN KEY (`book_type_id`) REFERENCES `book type` (`book_type_id`),
  CONSTRAINT `book with type_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book with type`
--

LOCK TABLES `book with type` WRITE;
/*!40000 ALTER TABLE `book with type` DISABLE KEYS */;
/*!40000 ALTER TABLE `book with type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buy_history`
--

DROP TABLE IF EXISTS `buy_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buy_history` (
  `history_id` int(10) NOT NULL,
  `user_id` int(10) DEFAULT NULL,
  `book_id` int(10) DEFAULT NULL,
  `his_page` int(10) DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `buy_history_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buy_history`
--

LOCK TABLES `buy_history` WRITE;
/*!40000 ALTER TABLE `buy_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `buy_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buy_package`
--

DROP TABLE IF EXISTS `buy_package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buy_package` (
  `pay_id` int(10) NOT NULL,
  `pack_id` int(10) DEFAULT NULL,
  `pack_start` date DEFAULT NULL,
  `pack_end` date DEFAULT NULL,
  `customer_id` int(10) DEFAULT NULL,
  `pay_cardname` varchar(255) DEFAULT NULL,
  `pay_expiry` date DEFAULT NULL,
  `pay_secretcode` int(6) DEFAULT NULL,
  PRIMARY KEY (`pay_id`),
  KEY `customer_id` (`customer_id`),
  KEY `pack_id` (`pack_id`),
  KEY `NN` (`pack_start`,`pack_end`,`pay_cardname`,`pay_expiry`,`pay_secretcode`),
  CONSTRAINT `buy_package_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `buy_package_ibfk_2` FOREIGN KEY (`pack_id`) REFERENCES `package` (`pack_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buy_package`
--

LOCK TABLES `buy_package` WRITE;
/*!40000 ALTER TABLE `buy_package` DISABLE KEYS */;
/*!40000 ALTER TABLE `buy_package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int(10) NOT NULL,
  `customer_username` varchar(15) DEFAULT NULL,
  `customer_password` varchar(10) DEFAULT NULL,
  `customer_firstN` varchar(10) DEFAULT NULL,
  `customer_lastN` varchar(10) DEFAULT NULL,
  `customer_email` varchar(30) DEFAULT NULL,
  `customer_phone` varchar(10) DEFAULT NULL,
  `customer_pic` varchar(255) DEFAULT NULL,
  `customer_displayname` varchar(20) DEFAULT NULL,
  `package_id` int(10) DEFAULT NULL,
  `payment_id` int(10) DEFAULT NULL,
  `history_id` int(10) DEFAULT NULL,
  `fav_id` int(10) DEFAULT NULL,
  `status` enum('R','NR') DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `fav_id` (`fav_id`),
  KEY `history_id` (`history_id`),
  KEY `NN` (`customer_username`,`customer_password`,`customer_firstN`,`customer_lastN`,`customer_email`,`customer_phone`,`customer_displayname`,`status`),
  KEY `UQ` (`customer_username`,`customer_email`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`fav_id`) REFERENCES `favorite` (`fav_id`),
  CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`history_id`) REFERENCES `buy_history` (`history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `fav_id` int(10) NOT NULL,
  `user_id` int(10) DEFAULT NULL,
  `book_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`fav_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package` (
  `pack_id` int(10) NOT NULL,
  `price` int(10) DEFAULT NULL,
  `pack_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pack_id`),
  KEY `NN` (`price`,`pack_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `pub_id` int(10) NOT NULL,
  `pub_name` varchar(255) DEFAULT NULL,
  `pub_phone` varchar(255) DEFAULT NULL,
  `pub_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pub_id`),
  KEY `NN` (`pub_name`,`pub_phone`,`pub_url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-29 23:01:03
