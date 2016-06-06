-- phpMyAdmin SQL Dump
-- version 3.2.3
-- http://www.phpmyadmin.net
--
-- 호스트: localhost
-- 처리한 시간: 16-06-07 02:17 
-- 서버 버전: 5.1.41
-- PHP 버전: 5.2.12

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- 데이터베이스: `sw`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `chatting`
--

CREATE TABLE IF NOT EXISTS `chatting` (
  `seq` int(12) NOT NULL,
  `project_id` varchar(35) NOT NULL,
  `member_id` varchar(12) NOT NULL,
  `date` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 테이블 구조 `member_info`
--

CREATE TABLE IF NOT EXISTS `member_info` (
  `seq` int(12) NOT NULL,
  `member_id` varchar(12) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(41) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(11) NOT NULL,
  `register_date` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 테이블 구조 `project_content`
--

CREATE TABLE IF NOT EXISTS `project_content` (
  `seq` int(12) NOT NULL,
  `project_id` int(11) NOT NULL,
  `column` int(2) NOT NULL,
  `row` int(2) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 테이블 구조 `project_info`
--

CREATE TABLE IF NOT EXISTS `project_info` (
  `seq` int(12) NOT NULL,
  `project_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `project_id` varchar(30) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `project_explain` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `member_number` int(2) NOT NULL,
  `member1_id` varchar(12) NOT NULL,
  `member2_id` varchar(12) DEFAULT NULL,
  `member3_id` varchar(12) DEFAULT NULL,
  `member4_id` varchar(12) DEFAULT NULL,
  `member5_id` varchar(12) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 테이블 구조 `project_log`
--

CREATE TABLE IF NOT EXISTS `project_log` (
  `seq` int(12) NOT NULL,
  `project_id` int(12) NOT NULL,
  `date` datetime NOT NULL,
  `log` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 테이블 구조 `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `seq` int(12) NOT NULL,
  `member_id` varchar(12) NOT NULL,
  `flag` int(1) NOT NULL COMMENT '0:개인, 1: 공식',
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `project_id` int(12) NOT NULL,
  `title` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `color_background` varchar(7) NOT NULL,
  `color_lang` varchar(7) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
