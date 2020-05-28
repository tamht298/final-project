-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: online_exam
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `answer_sheet`
--

DROP TABLE IF EXISTS `answer_sheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer_sheet` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `selected_answer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer_sheet`
--

LOCK TABLES `answer_sheet` WRITE;
/*!40000 ALTER TABLE `answer_sheet` DISABLE KEYS */;
/*!40000 ALTER TABLE `answer_sheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `choice`
--

DROP TABLE IF EXISTS `choice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `choice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `choice_text` varchar(255) DEFAULT NULL,
  `corrected` bit(1) DEFAULT NULL,
  `question_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcaq6r76cswke5b9fk6fyx3y5w` (`question_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choice`
--

LOCK TABLES `choice` WRITE;
/*!40000 ALTER TABLE `choice` DISABLE KEYS */;
/*!40000 ALTER TABLE `choice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `course_code` varchar(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_code_UNIQUE` (`course_code`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (5,'G03','Professional Speaking'),(4,'G02','Critical Thinking'),(3,'G01','Working Process'),(6,'G04','Professional Wrting'),(7,'G05','Software Testing Process'),(8,'G06','Database Management Systems'),(9,'G07','Front-End (Bootstrap + Angular.js +jQuery)'),(10,'N01','.NET Back-End'),(11,'OJ1','On the Job Training'),(12,'J01','Java Back-End'),(13,'S01','Node.js'),(14,'P01','PHP Back-End'),(15,'R01','Ruby on Rails Back-End'),(16,'A01','Basic Android Programming'),(17,'A02','Advanced Android Programming'),(18,'I01','Swift Fundamental'),(19,'I02','Developing iOS Application with Swift'),(20,'T01','Security in Information Systems'),(21,'T02','Selenium');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam` (
  `id` bigint NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `begin_exam` datetime DEFAULT NULL,
  `duration_exam` int DEFAULT NULL,
  `finish_exam` datetime DEFAULT NULL,
  `shuffle` bit(1) DEFAULT NULL,
  `locked` bit(1) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_by_id` bigint DEFAULT NULL,
  `last_modified_by_id` bigint DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn302ndih58mqpqyo9hcwaek2v` (`created_by_id`),
  KEY `FKfquo2liktm7jdxpq0s2vqlq7c` (`last_modified_by_id`),
  KEY `FKiub3ue9cklcyyra24v9ns656n` (`course_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_question`
--

DROP TABLE IF EXISTS `exam_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_question` (
  `test_id` bigint NOT NULL,
  `question_id` bigint NOT NULL,
  KEY `FKhence37m8dce4mwluboy8vabx` (`question_id`),
  KEY `FK3sksy5f2ur6ev4kejng76qa2l` (`test_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_question`
--

LOCK TABLES `exam_question` WRITE;
/*!40000 ALTER TABLE `exam_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `exam_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_user`
--

DROP TABLE IF EXISTS `exam_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_user` (
  `exam_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `id` bigint NOT NULL,
  PRIMARY KEY (`exam_id`,`user_id`),
  KEY `FKjod0xt6ip59g0fw3pir8linne` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_user`
--

LOCK TABLES `exam_user` WRITE;
/*!40000 ALTER TABLE `exam_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `exam_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_info`
--

DROP TABLE IF EXISTS `file_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_info`
--

LOCK TABLES `file_info` WRITE;
/*!40000 ALTER TABLE `file_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (1),(1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `part`
--

DROP TABLE IF EXISTS `part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `part` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtnwvrwb4t7082shtwnu2llxb8` (`course_id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part`
--

LOCK TABLES `part` WRITE;
/*!40000 ALTER TABLE `part` DISABLE KEYS */;
INSERT INTO `part` VALUES (1,'Application Basics',16),(8,'Application Design Essentials',16),(9,'Application Development Essentials',16),(10,'Threading and Asynchronous Processing',17),(11,'Android Services',17),(12,'Android Content Providers',17),(13,'Broadcasting and Receiving Intents',17),(14,'Notifications',17),(15,'Advanced Android User Interface Design',17),(16,'Web Services, Location & Google Map',17),(17,'Common Android APIs',17),(18,'SCRUM process',3),(19,'Work Breakdown Structure & Estimation & Priority setting',3),(20,'GIT process',3),(21,'Meeting report (Daily SCRUM meeting, Sprint meeting)',3),(22,'Tools: Assembla, BitBucket, Redmine',3),(23,'Identify characteristics of employees who are qualified for employment, promotion, and retention in the workforce',4),(24,'Explain critical thinking strategies within the context of leadership',4),(25,'Apply business communication skills',4),(26,'Utilize data and information to make decisions',4),(27,'Identify roles and strategies used in group processes and team building',4),(28,'Have a positive attitude',4),(29,'Evaluate your understanding on a product',4),(30,'Listen and maintain communication',4),(31,'Pronunciation',5),(32,'Presentation',5);
/*!40000 ALTER TABLE `part` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=229 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'Tâm','Huỳnh Thanh',NULL),(8,'Bảo','Võ Quốc',NULL),(228,'Lợi','Nguyễn Tấn',NULL),(66,'Quỳnh','Lê Thị Như',NULL),(65,'Quý','Nguyễn Ngọc',NULL),(64,'Phương','Nguyễn Hoài',NULL),(63,'Phúc','Hoàng',NULL),(62,'Nhựt','Nguyễn Minh',NULL),(61,'Nhựt','Hồ Minh',NULL),(60,'Ngọc','Trần Thị Bích',NULL),(59,'Nga','Trịnh Thị Thúy',NULL),(58,'Nam','Lê Văn',NULL),(57,'My','Nguyễn Thị Trà',NULL),(56,'Lộc','Triệu Phước',NULL),(55,'Khanh','Huynh Duy',NULL),(54,'Hiếu','Phạm Trung',NULL),(53,'Hiệp','Nguyễn Văn',NULL),(52,'Hậu','Trần Công',NULL),(51,'Giàu','Trần Văn',NULL),(50,'Dương','Châu Đại',NULL),(49,'Dung','Nguyễn Thị Thùy',NULL),(48,'Đức','Trần Phước',NULL),(47,'Đạt','Nguyễn Bá',NULL),(46,'Cường','Ngô Bá',NULL),(45,'Hiếu','Lại Văn',NULL),(201,'Tâm','Huỳnh Than',NULL),(43,'Minh','Nguyễn Ngọc',NULL),(67,'Sang','Lê Minh',NULL),(68,'Sang','Nguyễn Châu',NULL),(69,'Tài','Nguyễn Hữu',NULL),(70,'Tân','Trần Văn',NULL),(71,'Thành','Đoàn Trung',NULL),(72,'Thành','Nguyễn Tấn',NULL),(73,'Thành','Trịnh Trọng',NULL),(74,'Trung','Nguyễn Quốc',NULL),(75,'Tuấn','Lê Anh',NULL),(76,'Vinh','Hồ Nguyễn Quốc',NULL),(77,'Duy','Nguyễn',NULL),(78,'Huy','Ngô Gia',NULL),(79,'Nam','Hoàng Duy',NULL),(80,'Thuận','Huỳnh Văn',NULL),(81,'Tuyên','Ngô Hà',NULL),(82,'Hồng','Phạm Văn',NULL),(83,'Hào','Nguyễn Phong',NULL),(84,'Trực','Phạm Đình Chánh',NULL),(85,'Hưng','Hồ Quang',NULL),(86,'Thành','Huỳnh Phú',NULL),(87,'Sự','Nguyễn Văn',NULL),(88,'Khang','Lê Tiến',NULL),(89,'Sang','Phạm Anh',NULL),(90,'Hoàng','Châu Thanh',NULL),(91,'Thái','Lê Nam Hoàng',NULL),(92,'Quý','Nguyễn Phú',NULL),(93,'Minh','Phạm Hoàng',NULL),(94,'Trường','Phạm Văn',NULL),(95,'Hà','Trần Thị Thu',NULL),(96,'Linh','Tống Duy',NULL),(97,'Huy','Lâm Quang',NULL),(98,'Nguyên','Phạm Tấn',NULL),(99,'Huy','Nguyễn Hùng',NULL),(100,'Duy','Phan Ngọc',NULL),(101,'Quyền','Lâm Châu',NULL),(102,'Huy','Nguyễn Huỳnh Quốc',NULL),(103,'An','Lê Văn',NULL),(104,'Sang','Trần Hoàng',NULL),(105,'Huy','Trần Hoàn',NULL),(106,'Tâm','Nguyễn Minh',NULL),(107,'Minh','Nguyễn Quang',NULL),(108,'Tiến','Lâm Nhật',NULL),(109,'Thùy','Phạm Thị Phương',NULL),(110,'Thịnh','Lê Hoàng',NULL),(111,'Nam','Nguyễn Văn',NULL),(112,'Long','Nguyễn Hoàng',NULL),(113,'Sơn','Nguyễn Vũ Hoàng',NULL),(114,'Đạt','Lê Lưu Quốc',NULL),(115,'Dũng','Phùng Quốc',NULL),(116,'Thi','Nguyễn Văn',NULL),(117,'Khôi','Huỳnh Anh',NULL),(118,'Đức','Võ Minh',NULL),(119,'Hậu','Nguyễn Phước',NULL),(120,'Hiếu','Nguyễn Đức',NULL),(121,'Khanh','Dương Vũ',NULL),(122,'Lan','Trần Thị Mỹ',NULL),(123,'Nam','Nguyễn Hoàng',NULL),(124,'Như','Trần Khánh',NULL),(125,'Quang','Trần',NULL),(126,'Trân','Phạm Thị Bảo',NULL),(127,'Ban','Triệu Văn',NULL),(128,'Thanh','Nguyễn Thái',NULL),(129,'Phúc','Đinh Xuân',NULL),(130,'Linh','Tất Bội Cẩm',NULL),(131,'Phúc','Nguyễn Hữu',NULL),(132,'Keoudone','Phimphasing',NULL),(133,'Bounpaseut','Boutsaodone',NULL),(134,'Pupay','Inthisane',NULL),(135,'Duy','Nguyễn',NULL),(136,'Huy','Ngô Gia',NULL),(137,'Nam','Hoàng Duy',NULL),(138,'Thuận','Huỳnh Văn',NULL),(139,'Tuyên','Ngô Hà',NULL),(140,'Hồng','Phạm Văn',NULL),(141,'Hào','Nguyễn Phong',NULL),(142,'Trực','Phạm Đình Chánh',NULL),(143,'Hưng','Hồ Quang',NULL),(144,'Thành','Huỳnh Phú',NULL),(145,'Sự','Nguyễn Văn',NULL),(146,'Khang','Lê Tiến',NULL),(147,'Sang','Phạm Anh',NULL),(148,'Hoàng','Châu Thanh',NULL),(149,'Thái','Lê Nam Hoàng',NULL),(150,'Quý','Nguyễn Phú',NULL),(151,'Minh','Phạm Hoàng',NULL),(152,'Trường','Phạm Văn',NULL),(153,'Hà','Trần Thị Thu',NULL),(154,'Linh','Tống Duy',NULL),(155,'Huy','Lâm Quang',NULL),(156,'Nguyên','Phạm Tấn',NULL),(157,'Huy','Nguyễn Hùng',NULL),(158,'Duy','Phan Ngọc',NULL),(159,'Quyền','Lâm Châu',NULL),(160,'Huy','Nguyễn Huỳnh Quốc',NULL),(161,'An','Lê Văn',NULL),(162,'Sang','Trần Hoàng',NULL),(163,'Huy','Trần Hoàn',NULL),(164,'Tâm','Nguyễn Minh',NULL),(165,'Minh','Nguyễn Quang',NULL),(166,'Tiến','Lâm Nhật',NULL),(167,'Thùy','Phạm Thị Phương',NULL),(168,'Thịnh','Lê Hoàng',NULL),(169,'Nam','Nguyễn Văn',NULL),(170,'Long','Nguyễn Hoàng',NULL),(171,'Sơn','Nguyễn Vũ Hoàng',NULL),(172,'Đạt','Lê Lưu Quốc',NULL),(173,'Dũng','Phùng Quốc',NULL),(174,'Thi','Nguyễn Văn',NULL),(175,'Khôi','Huỳnh Anh',NULL),(176,'Đức','Võ Minh',NULL),(177,'Hậu','Nguyễn Phước',NULL),(178,'Hiếu','Nguyễn Đức',NULL),(179,'Khanh','Dương Vũ',NULL),(180,'Lan','Trần Thị Mỹ',NULL),(181,'Nam','Nguyễn Hoàng',NULL),(182,'Như','Trần Khánh',NULL),(183,'Quang','Trần',NULL),(184,'Trân','Phạm Thị Bảo',NULL),(185,'Ban','Triệu Văn',NULL),(186,'Thanh','Nguyễn Thái',NULL),(187,'Phúc','Đinh Xuân',NULL),(188,'Linh','Tất Bội Cẩm',NULL),(189,'Phúc','Nguyễn Hữu',NULL),(190,'Keoudone','Phimphasing',NULL),(191,'Bounpaseut','Boutsaodone',NULL),(192,'Pupay','Inthisane',NULL),(193,'Duy','Nguyễn',NULL),(194,'User1','Temp',NULL),(195,'User2','Temp',NULL),(196,'User3','Temp',NULL),(197,'User4','Temp',NULL),(200,'Tâm','Huỳnh Thanh',NULL),(202,'Tâm','Huỳnh Thanh',NULL),(203,'Tâm','Huỳnh Thanh',NULL),(204,'Tâm','Huỳnh Thanh',NULL),(205,'Tâm','Huỳnh Than',NULL),(206,'Tâm','Huỳnh Thanh',NULL),(207,'Tâm','Huỳnh Thanh',NULL),(208,'User1','Temp1',NULL),(209,'Tâm','Huỳnh Than',NULL),(210,'Tâm','Huỳnh Thanh',NULL),(211,'Tâm','Huỳnh Thanh',NULL),(212,'Tâm','Huỳnh Thanh',NULL),(213,'Khanh','Huynh Duy',NULL),(214,'Hưng','Phạm Hoài',NULL),(215,'Tâm','Huỳnh Thanh',NULL),(216,'Đạt','Nguyễn Bá',NULL),(217,'Thuận','Huỳnh Văn',NULL),(224,'Tâm','Huỳnh Thanh',NULL),(223,'Hưng','Phạm Hoài',NULL),(222,'Tâm','Huỳnh Thanh',NULL),(221,'Minh','Nguyễn Ngọc',NULL),(227,'Tâm','Huỳnh Thanh',NULL);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` bigint NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `shuffle` bit(1) DEFAULT NULL,
  `point` double DEFAULT NULL,
  `question_text` text,
  `created_by_id` bigint DEFAULT NULL,
  `last_modified_by_id` bigint DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `question_type_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKehgqq6539br96ih88in0y2two` (`created_by_id`),
  KEY `FK2lg4o3vff5f3s5fsibw9ei82v` (`last_modified_by_id`),
  KEY `FKnbqlwvoi94mkynn6c3r5h8dlg` (`course_id`),
  KEY `FK7svspov4rexjawqdvi2jni81u` (`question_type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_type`
--

DROP TABLE IF EXISTS `question_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `type_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_type`
--

LOCK TABLES `question_type` WRITE;
/*!40000 ALTER TABLE `question_type` DISABLE KEYS */;
INSERT INTO `question_type` VALUES (1,'True/False','TF'),(2,'Multiple Choice Question','MCQ'),(3,'Multiple Select Question','MSQ');
/*!40000 ALTER TABLE `question_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_MANAGER'),(3,'ROLE_LECTURE'),(4,'ROLE_STUDENT');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_user` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FKiqpmjd2qb4rdkej916ymonic6` (`role_id`),
  KEY `FK4320p8bgvumlxjkohtbj214qi` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (3,3,5),(4,4,6),(3,2,7),(11,4,11),(12,4,12),(47,4,13),(48,4,14),(49,4,15),(50,4,16),(51,4,17),(52,4,18),(53,4,19),(54,4,20),(55,4,21),(56,4,22),(57,4,23),(58,4,24),(59,4,25),(60,4,26),(61,4,27),(62,4,28),(63,4,29),(64,4,30),(65,4,31),(66,4,32),(67,4,33),(68,4,34),(69,4,35),(70,4,36),(71,4,37),(72,4,38),(73,4,39),(74,4,40),(75,4,41),(76,4,42),(77,4,43),(78,4,44),(79,4,45),(80,4,46),(81,4,47),(82,4,48),(83,4,49),(84,4,50),(85,4,51),(86,4,52),(87,4,53),(88,4,54),(89,4,55),(90,4,56),(91,4,57),(92,4,58),(93,4,59),(94,4,60),(95,4,61),(96,4,62),(97,4,63),(98,4,64),(99,4,65),(100,4,66),(101,4,67),(102,4,68),(103,4,69),(104,4,70),(105,4,71),(106,4,72),(107,4,73),(108,4,74),(109,4,75),(110,4,76),(111,4,77),(112,4,78),(113,4,79),(114,4,80),(115,4,81),(116,4,82),(117,4,83),(118,4,84),(119,4,85),(120,4,86),(121,4,87),(122,4,88),(123,4,89),(124,4,90),(125,4,91),(126,4,92),(127,4,93),(128,4,94),(129,4,95),(130,4,96),(131,4,97),(132,4,98),(133,4,99),(134,4,100),(135,4,101),(136,4,102),(137,4,103),(138,4,104),(197,4,163),(198,4,164),(199,4,165),(200,4,166),(201,4,167),(1,1,169),(204,4,170);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `profile_id` bigint DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `lastest_login_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `FKof44u64o1d7scaukghm9veo23` (`profile_id`)
) ENGINE=MyISAM AUTO_INCREMENT=205 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'thanhtam28ss@gmail.com',_binary '','$2a$10$3uoc7ak7mdukZO/emOKop.n3258i8g1PeIlEcl0mfiKibcP2nLriK','thanhtam28ss',222,'2020-04-16 16:36:54',_binary '\0','2020-05-13 10:43:34'),(3,'tamht298@gmail.com',_binary '','$2a$10$3uoc7ak7mdukZO/emOKop.n3258i8g1PeIlEcl0mfiKibcP2nLriK','tamht298',224,NULL,_binary '\0','2020-05-07 08:14:05'),(4,'httam@student.tdmu.edu.vn',_binary '','$2a$10$ZlOWtJAyPM3593vYQgk4E.ANIOisLFqbthXJ0gF.XaaONOMFimpkG','1624801040051',227,NULL,_binary '\0','2020-05-07 08:53:10'),(11,'tanloi.bdp@gmail.com',_binary '','$2a$10$oCQp9pSWg7Qxl1boJx7StOm2nRRXBS2yqlXKoNDVkKW0r/E3KAyGm','1524801040079',228,NULL,_binary '\0','2020-05-07 09:38:20'),(12,'quocbao3398@gmail.com',_binary '','$2a$10$Y3axGDOm.SlN2ARWaD9x6eBU8Yl9AL5dkb6GuEXSzh5YOsgTV1Czy','1624801040003',8,NULL,_binary '\0','2020-04-16 16:36:53'),(47,'minhlove1208@gmail.com',_binary '','$2a$10$s3oXVpKbfKV1oOfXNtOJ6uEsq8F.TPHyQh9XanzQUGJ0D8MNPxGi2','1524801040049',221,'2020-04-16 16:36:53',_binary '\0','2020-05-06 23:11:56'),(49,'laivanhieu610@gmail.com',_binary '','$2a$10$oUDEgDo.jaJDcJoIQx79OuLalvDYTub2tiu.keC3whoqSLjKx8sdW','1524801030009',45,'2020-04-16 16:36:53',_binary '\0','2020-04-16 16:36:53'),(50,'ngobacuong2016@gmail.com',_binary '','$2a$10$Q40B/Ush2jrRzUs99WMMROT.3cjwHmUVHE.t1XNOvRXtM/eFafHJi','1624801040004',46,'2020-04-16 16:36:53',_binary '\0','2020-04-16 16:36:53'),(51,'badatdp69@gmail.com',_binary '','$2a$10$Rrk2J3B.FqP3hsbYds/KL.F2UUkZNVFN3l4VX24e8ibf/yzGosNGW','1624801040010',216,'2020-04-16 16:36:53',_binary '','2020-05-06 20:39:16'),(52,'tranphuocduc1998@gmail.com',_binary '','$2a$10$sd3gDGhiW8DOKjX8gTlRdOTplA30zxRe.VrdyVMo5D2lAv6pnBsba','1624801040012',48,'2020-04-16 16:36:53',_binary '\0','2020-04-16 16:36:53'),(53,'thuydungtk98@gmail.com',_binary '','$2a$10$s/MecuW/9SBcvxG7oOqtY.kvZwNpa3wnBdLjFQ5Eck9fwfao01xtO','1624801040005',49,'2020-04-16 16:36:53',_binary '\0','2020-04-16 16:36:53'),(54,'chaudaiduong98@gmail.com',_binary '','$2a$10$JN0HJaGc9mCZZRcsup9RS.KxqD.FkSNn9cEVYnEVEPEKprFj9cqp6','1624801040077',50,'2020-04-16 16:36:53',_binary '\0','2020-04-16 16:36:53'),(55,'tranvangiaud16ht01@gmail.com',_binary '','$2a$10$8MI8.AT5uJCpx4WAu4kgJeVutYv5izAyU1/G2b7JHqEHqgqwxdWey','1624801040014',51,'2020-04-16 16:36:53',_binary '\0','2020-04-16 16:36:53'),(56,'conghau3003@gmail.com',_binary '','$2a$10$jgBXufx9DSrZkvaXdV9Pg.2R3MN8ccAzW0l4vseZOUafbE3DYtf7C','1424801040093',52,'2020-04-16 16:36:53',_binary '\0','2020-04-16 16:36:53'),(57,'vanhiep1998@gmail.com',_binary '','$2a$10$ziJwGTBwfybzg3qLvm/R6O5uyp6ZdbPZJJLw8huwwUzHyo1Jxdwbq','1624801040019',53,'2020-04-16 16:36:53',_binary '\0','2020-04-16 16:36:53'),(58,'phamhieu5969@gmail.com',_binary '','$2a$10$BVf4bOSsEhNOkpypUqJ62u8PxYEPLvRbqoNnYekFa2DaM40uDJ8UO','1624801040020',54,'2020-04-16 16:36:53',_binary '\0','2020-04-16 16:36:53'),(59,'duykhanh220998@gmail.com',_binary '','$2a$10$6VABMaFL13KSpHckHFsEWO54Zfla5F1melN.jcTaze8VOk.91khw6','1624801040027',213,'2020-04-16 16:36:53',_binary '\0','2020-05-06 10:20:14'),(60,'cheuhyakuroku@gmail.com',_binary '','$2a$10$P5vV9.POHrEM.gI9oL6/fusE83fioZNZDgn3yXGgdjfNnE37o7gBq','1624801040030',56,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(61,'ngthitramy92@gmail.com',_binary '','$2a$10$H4Fl8ZtHYcU8WwyLRr29oe/Ngk3BnzTyGoU3WcPIX3GOaMABOoUm.','1624801040076',57,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(62,'crazycowboy10041997@gmail.com',_binary '','$2a$10$.H4mUh38p8L0BSRt/LKcaOmrC7PobKty6wJCYG2rSDkhu7KOCN.L6','1624801040032',58,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(63,'thuynga30898@gmail.com',_binary '','$2a$10$tYxs.qZDRA0hYn03tmlUOOymx3ynCycEGNqlpK/n5JQWtsZQUDxz2','1624801040033',59,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(64,'bichngocd16ht01@gmail.com',_binary '','$2a$10$/B5/jf84IH5FpYF6EE0Xx.Hs9Ff1jpZdAU2wcSpnpws8PoAKqqoHi','1624801040036',60,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(65,'hominhnhuthttt@gmail.com',_binary '','$2a$10$WStxrA8B1rmQ5BRhOcQb..YnDbCVX.LbDMasMhQzflge.PYKDBD0W','1624801040040',61,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(66,'nhut30011998@gmail.com',_binary '','$2a$10$xGBhNrOl/RMNao6viKLmTO.yUqtd8efiCUZEvoWOdAD8UbQJG1tjC','1624801040041',62,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(67,'269phuchoang@gmail.com',_binary '','$2a$10$WcWEUHz0OKq4DJP1pUCf4OylS3CtESu43bzQvNrOVEdgyPOzrzZP.','1624801040074',63,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(68,'hoaiphuong26071998@gmail.com',_binary '','$2a$10$2j5uZ94son2X/wCZ38owves5hMRZBVc2npLsonGmpqB1dapVfM7La','1624801040044',64,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(69,'quynguyen97cntt@gmail.com',_binary '','$2a$10$cyqdcBcXbdt8S3RGWKZ2k.6ZRQLfQvmdUmc0X7ZaUCB5t7C.fgw2W','1624801040046',65,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(70,'lethinhuquynh365@gmail.com',_binary '','$2a$10$mp.v9IEzr3mVprO0OSga/.SZzxrKPlCRtMSVirnp5iyBPbcv8BasS','1624801040047',66,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(71,'lesang0169@gmail.com',_binary '','$2a$10$PyAEpr8wZi.X.udxNzxrpObYc7IBZX004jKbqG6M5XQXd3zsBkKa2','1624801040048',67,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(72,'ncsang98@gmail.com',_binary '','$2a$10$e1AztwgeOuhiFMvNRmlb8evaK2Y1H0J/h0sRijFhoh/WdUl9Ruh.q','1624801040049',68,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(73,'taiht2531998@gmail.com',_binary '','$2a$10$YleBKE7ZAp6N3Hr9ya9Q7e2Wm8SJCSW1qb6MIiem1h9/2stoukIHe','1624801040050',69,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(74,'trantan598497@gmail.com',_binary '','$2a$10$KAwiWpZV4UhwoE3.mpqxJeKLWVRMqA51tpFsDb6Pa/EPvEXC1IWRG','1624801040052',70,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(75,'thanhmoc115@gmail.com',_binary '','$2a$10$Hd7O985GSz1UgpSGp5d46uJVmsbJcqOhXv5Ylf3zwp2zsHQJAynUS','1624801040059',71,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(76,'tanthanhphuochoa@gmail.com',_binary '','$2a$10$UQtHVpXChQjy8WsyO9n2iuFlqCQLwLV3t91z1TrPtTnLSLN2rQnDK','1624801040060',72,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(77,'trongthanh20161998@gmail.com',_binary '','$2a$10$WB5FPHmMf93206T4/0P4d.dX2znXnD0gpTNKwO.eqUzdrDABSAlGS','1624801040061',73,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(78,'t0912938394@gmail.com',_binary '','$2a$10$fWur68.g8nNd98R/vwwytOa4Eq0xs4hdbSH.UBBaUOxX6BpAwpIpq','1624801040068',74,'2020-04-16 16:36:54',_binary '\0','2020-04-16 16:36:53'),(79,'leanhtuan19597@gmail.com',_binary '','$2a$10$xXsOEXMFCuGSdwh0iIY3N.MFagQ6UCS3HylDHJ1QcypnJV7AZzukm','1624801040087',75,'2020-04-16 16:36:55',_binary '\0','2020-04-16 16:36:53'),(80,'hnqv1998bd@gmail.com',_binary '','$2a$10$N8VJQbGC.6LrK3lsrqMKQ.qfNwevSBgTNt6/jO4q5zQ0NnKC1xQcO','1624801040070',76,'2020-04-16 16:36:55',_binary '\0','2020-04-16 16:36:53'),(81,'nguyenduy27997@gmail.com',_binary '','$2a$10$jf08HkTOd/avL9BKobXbJ.m2tKTb.8OfhMLdh7Mw5YGV6ouoTPkxK','1524801040022',77,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(82,'hdgiahuy1@gmail.com',_binary '','$2a$10$CAIPQ2Fmcl4XVFn9OXioGe6ncv8Vd7jBq1FyVcDyJQAE0ak9peTXK','1524801040038',78,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(83,'hoangduynam20996@gmail.com',_binary '','$2a$10$o/TILnTPglrfIdTDJ7LHZ.YLZQ.VPhmqHdBC0HOyU69S/UyHdIS7a','1524801040026',79,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(84,'nhoxluxubu126@gmail.com',_binary '','$2a$10$rqGWL14D55MzNX8Lcdn.a.y4eY8ATpqQINmN92UtRZWDkbK2c1asO','1524801040010',217,'2020-04-16 17:02:12',_binary '\0','2020-05-06 21:49:28'),(85,'masterapple102@gmail.com',_binary '','$2a$10$2vDiQVOlqKLJ03EvDaeu7OcJD8KO0srFFIwsm9d3MQugNQA9JJ9AG','1524801040006',81,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(86,'vphung01@gmail.com',_binary '','$2a$10$nOiEBI49UVnqEXgq0xnEFu/xUEhM9MmW9Tx04ekNZDx5e3mXw/ZRy','1524801030078',82,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(87,'nofhhhh142@gmail.com',_binary '','$2a$10$XPCXZahygXnd/Idh2jLxeOQRXuk8r3/RM9/IBWU2zOzshEFFxPBai','1824801030128',83,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(88,'phamdinhchanhtruc2305@gmail.com',_binary '','$2a$10$1NCW43g3s0wFHMQIapsPgeUmY47hAy6e9JfsxJYv4Fjt5CDvuVdRK','1824801030137',84,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(89,'thobigboss@gmail.com',_binary '','$2a$10$TPAI2.OqNdZnLS2ULV7Z0.nDOTfvWA1eO9b1NXv2TYz/TUYsMNlPO','1924801040041',85,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(90,'thanh.hp2907@gmail.com',_binary '','$2a$10$eq/aPak9Qiu5AtkYfNYsRuFPlq1PrZdbHsLwXa9O96gm5KAG7xGoO','1924801040007',86,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(91,'vansu22052001@gmail.com',_binary '','$2a$10$Qt8c9PAkYTRqon8WyeMJX.yVfuVNOQnHJ1m4OZDoZtN/L2PY4p8ey','1924801040009',87,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(92,'letienkhang0812@gmail.com',_binary '','$2a$10$kL1BXkE1SCCMgJXj/B7QQemR.fMvXGGSBM9jVv3oMhgLNzKamSu4q','1924801040012',88,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(93,'phamanhsang20@gmail.com',_binary '','$2a$10$H3/DM2vHyiluAsSs/h/AG.eCK0e8EfOuc78dVjt5c52vw3T1Ibw3y','1924801040014',89,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(94,'thanhhoangchau12345@gmail.com',_binary '','$2a$10$43oiRYBUrRjGG2qOzujNBOwlxh3BSMIwUSLXmgpOVaNAmPRru8CF.','1924801040016',90,'2020-04-16 17:02:12',_binary '\0','2020-04-16 16:36:53'),(95,'thailehoang0409@gmail.com',_binary '','$2a$10$9i.aWejvwxwNjrIO6DkISu37ghjnUsw.cf644clB9pUoRz21QKVRe','1924801040023',91,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(96,'phuquyvn99@gmail.com',_binary '','$2a$10$5rfHCiH6hb93Y.6.VkK2xukQITn56vEb3bmQOhTPytNLNRUL3LWb6','1924801040032',92,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(97,'hoangminh001112@gmail.com',_binary '','$2a$10$fF8Ink.1HpP57q6JP8KSZOa1zkpNhTqjHVuaCQN/fq7FWJcfi/6Va','1924801040034',93,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(98,'voivang034@gmail.com',_binary '','$2a$10$/cD6ka9WpdQN1jWwgkxNw.n9Sskju6gWhVrYtR1qWP.0i3OaYkMYi','1924801040035',94,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(99,'thuha170801@gmail.com',_binary '','$2a$10$3IaE6cucfcwMOeGc9qNB/egsYKi0S2.oQtOVbxlcUSENXFahAoBLi','1924801040042',95,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(100,'duylinhb04@gmail.com',_binary '','$2a$10$9XLHXqzLERu5x29xfCnRseBr2JsR96ERXCeRxe0OM5aE2AQAf8vSW','1924801040048',96,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(101,'huylambibi0042@gmail.com',_binary '','$2a$10$wZb5q.bo0QaRRUzfQxNtguJCAukL.U.7oN8pe.96VxuT.F1MA2YTK','1924801040051',97,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(102,'nguyenphamtan113@gmail.com',_binary '','$2a$10$2dFqMI9xasXVzZNPHL/jyecLLk.AWEgWOIRDb0Ykof6L4MJEzENGu','1924801040052',98,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(103,'nguyenhunghuy27112000@gmail.com',_binary '','$2a$10$iNhGMd8WHI92/CLp1PpDB.tAxn.aym5GQbZMc.WUEQ9v/ItHuCm2C','1924801040055',99,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(104,NULL,_binary '','$2a$10$Ra4Wm3NHwYvO72at1LgdaOblSFgg3ykP/DUfUCP937Y0sQQ0RNjka','1924801040058',100,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(105,NULL,_binary '','$2a$10$podTumG/4Kj5kWocVMZJDepoL9L9WxwxKkudiD3voBsyVa73atlRi','1924801040060',101,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(106,NULL,_binary '','$2a$10$5yYtxjEQxgOXvA6er2lt2Om7VP1bg5vWO7NGGWAdZEV29ENQrzyvK','1924801040066',102,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(107,NULL,_binary '','$2a$10$VeZlJSIznV72gVGIwMLz7uLTuv8pEFzglMK.H/jOExxpRLM4R.8oC','1924801040069',103,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(108,NULL,_binary '','$2a$10$B9jo5984hp5.l28MBY5sIe72Lc/7i2bcgP5.Or7m6otuu1vEvOWvS','1924801040070',104,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(109,NULL,_binary '','$2a$10$znONDB2O8j3g3lyDjCe7H.pEv2fzoC/pyQCko4Nomb3JzbYNUyZTS','1924801040071',105,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(110,NULL,_binary '','$2a$10$IynplRF5gSCv.R.banvonO6APEhDpgqsVcbVjEpTLmrz/qppp7NQW','1924801040075',106,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(111,NULL,_binary '','$2a$10$QjPvlbgQOKktXoao29g4b.FlzvvM.Yw62toyXUQKXNA.vJpuFE1I.','1924801040077',107,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(112,NULL,_binary '','$2a$10$7ZYPpWDD6ibLbhTkj25sLucEV.ZjFVahqGPldu6Q1ykyXFSuw47UK','1924801040078',108,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(113,NULL,_binary '','$2a$10$ZjvtSK1FIeGLHS.000TUku9ut6EfdjxgPrdWgIS3xxM13B3UsqvCS','1924801040079',109,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(114,NULL,_binary '','$2a$10$8LhszpMmEsoUrhU0AVFjW.lqm/Ad55XZxcyNG6BR/rHqie2aWqT7m','1924801040080',110,'2020-04-16 17:02:13',_binary '\0','2020-04-16 16:36:53'),(115,NULL,_binary '','$2a$10$ACKv7KP6qZwk9Qfx/ZANEu3BD0cOwbxXq3Sy2CyGQ/2zxkY0s1NyC','1924801040082',111,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(116,NULL,_binary '','$2a$10$dQ/zn.xvsDYNlWA6OuAeN.G4dywEBcSiCcFUB1zzNUnQo/R6jrEyW','1924801040085',112,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(117,NULL,_binary '','$2a$10$3zbv6oqF3H0jMbt/nFgr/OHf1PNx/KKlVK5/CsEkb4bng9gn7yz2W','1924801040086',113,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(118,NULL,_binary '','$2a$10$XRo6fZBG0M/yJLjVC54e.e6D561YJ1jl7tWZyvuIwJKzdp9K1udwq','1924801040087',114,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(119,NULL,_binary '','$2a$10$hcS4tFAKwmOmOl3RUKEoruy7mhgmsDBEru1gxi.AxyjeVcB8OkwjG','1924801040093',115,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(120,NULL,_binary '','$2a$10$VI6r.BBXPt0u79W5f0wwU.9KSru20fpCnRHhVte/GCscwgfJWKlLi','1924801040094',116,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(121,NULL,_binary '','$2a$10$h4L8g1oPC/VuwKdi8j5mkOFQKOSr.Lf65vGGiYIpzIs.AZvvfHWjm','1924801040095',117,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(122,NULL,_binary '','$2a$10$2Q00SOo.7WPdnRGRFEOK5ewEYEXyVk98CjE3THe6TdcfkquiqR1lG','1924801040108',118,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(123,NULL,_binary '','$2a$10$x6/ZSHqskNa5qOzJdQ2YMuw97wUSj4mDAs5URHAB1dJhpiOyDnrrW','1924801040111',119,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(124,NULL,_binary '','$2a$10$oYJrs/y2yuhFFgmluTM2g.D4niG6bQe9zLZOYFsOrbeDiLRTJ5p1W','1924801040115',120,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(125,NULL,_binary '','$2a$10$eDOZTI/igvMvu.S1yB3cOeDbta.GRsr0xTTvDMBsY.CcXTErqdr4u','1924801040120',121,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(126,NULL,_binary '','$2a$10$fKo9AhBbSXBVXx7luYWV3uoXzLQadABlOAjvTboVD5iihTyj9Z4EC','1924801040122',122,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(127,NULL,_binary '','$2a$10$pEauyytY2/SuJUHy8TQZ6ebgQDHbjwiSYmvzqLTEGQWigXcuaotWK','1924801040126',123,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(128,NULL,_binary '','$2a$10$1SnJYVJur9FWVm38GGX1B./WSd3HKLjUDOdVuYv95dUO/TAw2RAtW','1924801040130',124,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(129,NULL,_binary '','$2a$10$wmmcX51kUnVm50CVvME9kuDQKYJiVC2cb0pKRUUJhl.YXSl71z/tS','1924801040135',125,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(130,NULL,_binary '','$2a$10$id5QBeIPcgQ83SZSNQwRJe4kquBSKJy/AoxugBDZsIjDh1uZ9zp5y','1924801040144',126,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(131,NULL,_binary '','$2a$10$WBhWc2oYMcXlubfxPxhCquZGoibr0Xdzn08eDoDvBLtnPym7qfarq','1924801040152',127,'2020-04-16 17:02:14',_binary '','2020-04-16 16:36:53'),(132,NULL,_binary '','$2a$10$T0hhyyQDvhzsWlPIuvwzj.p0X9DxXaXZ5OdHP3Q27xPvqhTJqlhTG','1924801040154',128,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(133,NULL,_binary '','$2a$10$RLHXVRmUWj2GMJNsgsVweuUdOGiGA8hCxTNZJrNaPeJU5Wc2jIaO6','1924801040156',129,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(134,NULL,_binary '','$2a$10$ziAv2O567ALe9vjs5GLOSuMOXULqbfkekxPmQ1l7uX9P2QDjIQKVy','1924801040158',130,'2020-04-16 17:02:14',_binary '\0','2020-04-16 16:36:53'),(135,NULL,_binary '','$2a$10$dOAX5HOI9dSoNveNsn/vrexZ1D/Df/7kDGadd6u8CNwNgtv6WLMZ.','1924801040159',131,'2020-04-16 17:02:14',_binary '','2020-04-16 16:36:53'),(136,NULL,_binary '','$2a$10$SmY9g7Df3.clFKshXbWxIOLtoNqvOxXq8KoNvmk.soTBY2FVVrKv6','19l24801040161',132,'2020-04-16 17:02:15',_binary '','2020-04-16 16:36:53'),(137,NULL,_binary '','$2a$10$3YZick0wkejs4X3RwHvOx.vLSkZRugxy9JfZCbAZzKv/FXJzTRp9.','19l24801040162',133,'2020-04-16 17:02:15',_binary '','2020-04-16 16:36:53'),(138,NULL,_binary '','$2a$10$13wYSoq6eS6c4B/WAi7Yq.u2FuLE5seyNULhOgkUbS6IJhTclwMsy','19l24801040163',134,'2020-04-16 17:02:15',_binary '','2020-04-16 16:36:53'),(197,'nguyenduy7997@gmail.com',_binary '','$2a$10$BjWEfkfJDGXFjfNMQftDnuI1KJl30rWMGdQP7PwEoFqwzsHhnkFjS','1524861040022',193,'2020-04-16 20:47:29',_binary '','2020-05-03 09:48:00'),(198,'tempuser1@gmail.com',_binary '','$2a$10$oBZMiIH47L2j.xijJs8Z1.bZBb1Rr42mNBTMnKSWQQioZJARTp9CK','tempuser1',208,'2020-05-03 22:49:45',_binary '','2020-05-05 10:37:21'),(199,'tempuser2@gmail.com',_binary '','$2a$10$L7nRty8vdWqUHAD3Dhu8Ued1d8WJbbkI5/RyQb4t67vxqI9Dwj4nG','tempuser2',195,'2020-05-04 12:15:39',_binary '','2020-05-05 10:37:04'),(200,'tempuser3@gmail.com',_binary '','$2a$10$3/FcbgsGv3V1evRWC2VRQuFPf2OU3FrUMgyl/PdUbIfEypkM/auqS','tempuser3',196,'2020-05-04 12:17:00',_binary '','2020-05-04 12:43:06'),(201,'tempuser4@gmail.com',_binary '','$2a$10$TAp.ED1/KHSmvn7hNjYHjO35T88/U2ktBj3PhcfOkmv/cfKpnjoUq','tempuser4',197,'2020-05-04 12:22:36',_binary '','2020-05-04 12:39:55'),(204,'phamhoaihung2408@gmail.com',_binary '','$2a$10$O8iOZGvfCQPiBdYzlS3S4uC4ZBmNWlP0jma15uaPAT.TZ66M9mp9m','1724801030059',223,'2020-05-06 11:01:00',_binary '\0','2020-05-06 23:15:40');
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

-- Dump completed on 2020-05-28 23:46:52
