/*
Navicat MySQL Data Transfer

Source Server         : local-sql
Source Server Version : 50515
Source Host           : localhost:3306
Source Database       : labmag

Target Server Type    : MYSQL
Target Server Version : 50515
File Encoding         : 65001

Date: 2016-04-22 19:44:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `account_id` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `user_name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `serial_number` tinyint(1) DEFAULT NULL,
  `organization` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `class_name` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cellphone` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` tinyint(1) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  KEY `class` (`class_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of account
-- ----------------------------

-- ----------------------------
-- Table structure for chapter
-- ----------------------------
DROP TABLE IF EXISTS `chapter`;
CREATE TABLE `chapter` (
  `chapter_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `chapter_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `score` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`chapter_id`),
  KEY `chapter-course` (`course_id`),
  CONSTRAINT `chapter-course` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=200000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of chapter
-- ----------------------------

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `course_desc` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of course
-- ----------------------------

-- ----------------------------
-- Table structure for papers
-- ----------------------------
DROP TABLE IF EXISTS `papers`;
CREATE TABLE `papers` (
  `chapter_id` int(11) NOT NULL,
  `account_id` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `question_list` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `grade` float(11,0) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `flag` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`chapter_id`,`account_id`),
  KEY `papers-account` (`account_id`),
  CONSTRAINT `papers-account` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `papers-chapter` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`chapter_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of papers
-- ----------------------------

-- ----------------------------
-- Table structure for question_bank
-- ----------------------------
DROP TABLE IF EXISTS `question_bank`;
CREATE TABLE `question_bank` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `chapter_id` int(11) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `subject` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `options` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `answer` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `question-chapter` (`chapter_id`),
  CONSTRAINT `question-chapter` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`chapter_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=300000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of question_bank
-- ----------------------------

-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `chapter_id` int(11) NOT NULL,
  `account_id` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `study` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `advice` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chart` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `flag` tinyint(1) DEFAULT '1',
  `grade` float(11,0) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`chapter_id`,`account_id`),
  KEY `report-account` (`account_id`),
  CONSTRAINT `report-account` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `report-chapter` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`chapter_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of report
-- ----------------------------

-- ----------------------------
-- Table structure for student_relation
-- ----------------------------
DROP TABLE IF EXISTS `student_relation`;
CREATE TABLE `student_relation` (
  `course_id` int(11) NOT NULL,
  `account_id` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `hour` tinyint(1) NOT NULL,
  `chapter_id` int(11) DEFAULT NULL,
  `grade` float(11,0) DEFAULT NULL,
  `flag` tinyint(1) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`course_id`,`account_id`),
  KEY `student-account` (`account_id`),
  KEY `student-chapter` (`chapter_id`),
  CONSTRAINT `student-account` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student-chapter` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`chapter_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student-course` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of student_relation
-- ----------------------------

-- ----------------------------
-- Table structure for teacher_relation
-- ----------------------------
DROP TABLE IF EXISTS `teacher_relation`;
CREATE TABLE `teacher_relation` (
  `account_id` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `course_id` int(11) NOT NULL,
  `class_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `accident` varchar(500) COLLATE utf8_unicode_ci DEFAULT '0',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`account_id`,`course_id`,`class_name`),
  KEY `teacher-course` (`course_id`),
  KEY `teacher-account-class` (`class_name`),
  CONSTRAINT `teacher-account-class` FOREIGN KEY (`class_name`) REFERENCES `account` (`class_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacher-account` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacher-course` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of teacher_relation
-- ----------------------------
