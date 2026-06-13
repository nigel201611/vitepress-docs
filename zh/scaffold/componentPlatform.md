# 组件平台架构设计
## 前端物料体系介绍
* 问题1：为什么会形成前端物料体系？
    * 回答：由于前端项目规模不断增大，代码中不断出现重复或类似代码，因此需要将这些代码抽象和复用，以提高开发效率。在实践过程中不断出现新的物料类型，单纯组件库已经无法满足代码复用的需求
* 问题2：为什么要了解前端物料的概念？
    * 问答：在工作中能够更好地以物料的维度去思考项目的复用问题
* 问题3：前端物料体系和组件库的关系是什么？
    * 问答：组件库是物料体系的一部分，物料体系包括所有可复用的前端代码
* 问题4：前端物料包括哪些？
    * 问答：组件（基础组件+业务组件）、区块、页面模板、工程模板、JS库、CSS库、代码片段等等……


<img src="/images/componentPlatform.png">

## 前端组件平台架构设计

<img src="/images/componentPlatform2.jpg">

## 组件平台架构设计图

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