# Component Platform Architecture Design
## Introduction to Frontend Material System
* Question 1: Why did the frontend material system emerge?
    * Answer: As frontend project scale continues to grow, repetitive or similar code keeps appearing. Therefore, it is necessary to abstract and reuse this code to improve development efficiency. During practice, new material types continue to emerge, and a simple component library is no longer sufficient to meet code reuse needs.
* Question 2: Why understand the concept of frontend materials?
    * Answer: To better think about project reuse problems from the perspective of materials in your work.
* Question 3: What is the relationship between the frontend material system and the component library?
    * Answer: The component library is part of the material system. The material system includes all reusable frontend code.
* Question 4: What does frontend material include?
    * Answer: Components (basic components + business components), blocks, page templates, project templates, JS libraries, CSS libraries, code snippets, and more.


<img src="/images/componentPlatform.png">

## Frontend Component Platform Architecture Design

<img src="/images/componentPlatform2.jpg">

## Component Platform Architecture Design Diagram

<img src="/images/componentPlatform3.png">

component.sql
```sql
/*
 Navicat Premium Data Transfer

 Source Server         : RDS
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : rm-bp188055550b15tn90o.mysql.rds.aliyuncs.com:3306
 Source Schema         : my_cli

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 20/07/2021 23:27:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for component
-- ----------------------------
DROP TABLE IF EXISTS `component`;
CREATE TABLE `component` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `classname` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `npm_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `npm_version` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `git_type` varchar(5) DEFAULT NULL,
  `git_remote` varchar(100) DEFAULT NULL,
  `git_owner` varchar(50) DEFAULT NULL,
  `git_login` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `create_by` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `create_dt` varchar(50) DEFAULT NULL,
  `update_by` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `update_dt` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `classname` (`classname`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
```

version.sql

```sql
/*
 Navicat Premium Data Transfer

 Source Server         : RDS
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : rm-bp188055550b15tn90o.mysql.rds.aliyuncs.com:3306
 Source Schema         : imooc_cli

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 20/07/2021 23:27:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for version
-- ----------------------------
DROP TABLE IF EXISTS `version`;
CREATE TABLE `version` (
  `component_id` int(11) NOT NULL,
  `version` varchar(20) NOT NULL,
  `build_path` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `example_path` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `example_list` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `create_by` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `create_dt` varchar(50) DEFAULT NULL,
  `update_by` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `update_dt` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`component_id`,`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
```