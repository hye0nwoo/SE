-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- 호스트: localhost
-- 처리한 시간: 16-05-23 17:54
-- 서버 버전: 5.5.47-0ubuntu0.14.04.1
-- PHP 버전: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 데이터베이스: `se`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `chatting`
--

CREATE TABLE IF NOT EXISTS `chatting` (
  `seq` int(12) NOT NULL,
  `project_id` int(12) NOT NULL,
  `member_id` varchar(12) NOT NULL,
  `date` datetime NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 테이블 구조 `member_info`
--

CREATE TABLE IF NOT EXISTS `member_info` (
  `seq` int(12) NOT NULL,
  `member_id` varchar(12) NOT NULL,
  `password` varchar(12) NOT NULL,
  `email` varchar(30) NOT NULL,
  `name` varchar(10) NOT NULL,
  `phone` int(11) NOT NULL,
  `register_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 테이블의 덤프 데이터 `member_info`
--

INSERT INTO `member_info` (`seq`, `member_id`, `password`, `email`, `name`, `phone`, `register_date`) VALUES
(1, 'test', '*A4B61573190', 'test@test.com', 'test', 1011112222, '2016-05-20 00:00:00');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 테이블 구조 `project_info`
--

CREATE TABLE IF NOT EXISTS `project_info` (
  `seq` int(12) NOT NULL,
  `project_name` varchar(30) NOT NULL,
  `project_id` int(12) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `project_explain` text NOT NULL,
  `member_number` int(2) NOT NULL,
  `member1_id` varchar(12) NOT NULL,
  `member2_id` varchar(12) DEFAULT NULL,
  `member3_id` varchar(12) DEFAULT NULL,
  `member4_id` varchar(12) DEFAULT NULL,
  `member5_id` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 테이블 구조 `project_log`
--

CREATE TABLE IF NOT EXISTS `project_log` (
  `seq` int(12) NOT NULL,
  `project_id` int(12) NOT NULL,
  `date` datetime NOT NULL,
  `log` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `title` text NOT NULL,
  `content` text NOT NULL,
  `color_background` varchar(6) NOT NULL,
  `color_lang` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
