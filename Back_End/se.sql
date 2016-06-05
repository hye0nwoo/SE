-- phpMyAdmin SQL Dump
-- version 3.2.3
-- http://www.phpmyadmin.net
--
-- 호스트: localhost
-- 처리한 시간: 16-06-05 17:25 
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

--
-- 테이블의 덤프 데이터 `chatting`
--

INSERT INTO `chatting` (`seq`, `project_id`, `member_id`, `date`, `content`) VALUES
(1, 'kimhys31', 'kimhys2', '6월 5일 14시 53분', 0xe38587e384b4e38587),
(2, 'kimhys31', 'kimhys2', '6월 5일 14시 53분', 0xeb9098eb8a94eab1b4eab080),
(3, 'kimhys31', 'kimhys2', '6월 5일 14시 53분', 0xeb939ceb9494ec96b4),
(4, 'kimhys31', 'kimhys2', '6월 5일 14시 53분', 0xe384b4e38587eb9face385a3e3858fe384b4e38587eb9fac),
(5, 'kimhys31', 'kimhys2', '6월 5일 14시 53분', 0xec9584ec9584ec9584ec9584ec9584),
(6, 'kimhys31', 'kimhys2', '6월 5일 14시 53분', 0xec82b4eba0a4eca3bcec84b8ec9a94),
(7, 'kimhys31', 'kimhys2', '6월 5일 14시 53분', 0xed97a4ed97a4ed97a4ed97a4ed97a4),
(8, 'kimhys31', 'kimhys2', '6월 5일 14시 53분', 0xec9cbced97a4ed97a4ed97a4e38594),
(9, 'kimhys31', 'kimhys2', '6월 5일 14시 53분', 0xec96b4ec96b4ec96b4ec96b4ec96b4),
(10, 'kimhys31', 'kimhys2', '6월 5일 14시 53분', 0xed9788ed9788ed9788ed9788ed9788),
(11, 'kimhys31', 'kimhys2', '6월 5일 14시 53분', 0xed9598ed9598ed9598ed9598ed9598),
(12, 'kimhys31', 'kimhys3', '6월 5일 14시 56분', 0xec9588eb8595ed9598ec84b8ec9a94),
(13, 'kimhys31', 'kimhys2', '6월 5일 14시 56분', 0xec98a420ec98a4ec85a8eb84a4ec9a94),
(14, 'kimhys31', 'kimhys2', '6월 5일 14시 56분', 0xe3858ee38587e3858ee38587),
(15, 'kimhys31', 'kimhys3', '6월 5일 14시 56분', 0xeb939ceb9494ec96b4),
(16, 'test121', 'test12', '6월 5일 15시 17분', 0xeab084eb8298ec8d8ceb81bceb93a4),
(17, 'test121', 'test12', '6월 5일 15시 17분', 0xec9ab0ec98a4ec98a4ec98a4),
(18, 'test121', 'test12', '6월 5일 15시 17분', 0xed9598ed9598),
(19, 'test121', 'test12', '6월 5일 15시 17분', 0xec9e9820eab5aced9884eb9098ec96b420ec9e88eab5aceba78c),
(20, 'test121', 'test12', '6월 5일 15시 17분', 0xeab093ed9aa8ec8381);

-- --------------------------------------------------------

--
-- 테이블 구조 `member_info`
--

CREATE TABLE IF NOT EXISTS `member_info` (
  `seq` int(12) NOT NULL,
  `member_id` varchar(12) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(12) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` int(11) NOT NULL,
  `register_date` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 테이블의 덤프 데이터 `member_info`
--

INSERT INTO `member_info` (`seq`, `member_id`, `password`, `email`, `name`, `phone`, `register_date`) VALUES
(1, 'kimhys2', 'Kim920625!', 'kimhys2@naver.com', '김효상', 1046428158, '2016-05-28 00:56:38'),
(2, 'kimhys3', 'Kim920625!', 'kimhys2@naver.com', '박현우', 1046428158, '2016-06-03 17:48:36'),
(1, 'test', '*A4B61573190', 'test@test.com', 'test', 1011112222, '2016-05-20 00:00:00'),
(4, 'test123', 'test!@#123', 'asdf@asdf.com', 'asdf', 2147483647, '2016-06-04 23:48:31'),
(5, 'test1234', 'test1234!', 'tse@sadfg.com', 'testtest', 2147483647, '2016-06-04 23:54:03'),
(6, 'sdf7575', 'sdf7575!', 'sdf7575@naver.com', '박태록', 1025505388, '2016-06-05 01:46:37'),
(7, 'test12', 'test123!', 'sdafgasdfg@asdf.com', 'wet', 2147483647, '2016-06-05 15:13:30'),
(8, 'jiyoni1225', 'lbg0379!', 'jiyoni1225@gmail.com ', '이지연', 1085592654, '2016-06-05 16:22:21'),
(9, 'asdf1234', 'asdf1234!', 'ckskim8624@gmail.com', '김영찬', 1012341234, '2016-06-05 16:31:25');

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

--
-- 테이블의 덤프 데이터 `project_content`
--


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

--
-- 테이블의 덤프 데이터 `project_info`
--

INSERT INTO `project_info` (`seq`, `project_name`, `project_id`, `start_date`, `end_date`, `project_explain`, `member_number`, `member1_id`, `member2_id`, `member3_id`, `member4_id`, `member5_id`) VALUES
(4, 'sample', 'sdf75751', '2016-06-05 00:00:00', '2016-06-06 00:00:00', 0x73616d706c65, 1, 'sdf7575', '', '', '', ''),
(3, '테스트세번째', 'kimhys23', '2016-06-01 00:00:00', '2016-06-24 00:00:00', 0xe38587e38587, 1, 'kimhys2', '', '', '', ''),
(2, '두번째 테스트', 'kimhys21', '2016-06-03 00:00:00', '2016-06-18 00:00:00', 0xed858cec8aa4ed8ab8ec9e85eb8b88eb8ba4, 1, 'kimhys2', '', '', '', ''),
(1, '테스트테스트', 'kimhys21', '2016-06-01 00:00:00', '2016-06-17 00:00:00', 0xed858cec8aa4ed8ab8ec9e85eb8b88eb8ba420ec9db4eab1b4, 1, 'kimhys2', '', '', '', ''),
(5, '테스트용', 'kimhys31', '2016-06-04 00:00:00', '2016-06-25 00:00:00', 0xeb82b4ec9aa9, 2, 'kimhys3', 'kimhys2', '', '', ''),
(6, 'test', 'test121', '2016-06-01 00:00:00', '2016-06-09 00:00:00', 0x73616574, 2, 'test12', 'aste', '', '', ''),
(7, 'asdfasdf', 'asdf12341', '2016-06-15 00:00:00', '2016-06-30 00:00:00', 0x617364666173646661736466, 2, 'asdf1234', '1234wer', '', '', ''),
(8, '우와~', 'jiyoni12251', '2016-06-10 00:00:00', '2016-06-22 00:00:00', 0xec8ba0eab8b0ed95b47e, 2, 'jiyoni1225', 'kimhys2', '', '', ''),
(9, '소공테스트', 'kimhys26', '2016-06-01 00:00:00', '2016-06-18 00:00:00', 0xe38587e38587, 5, 'kimhys2', 'test12', 'jiyoni1225', 'asdf1234', 'sdf7575');

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

--
-- 테이블의 덤프 데이터 `project_log`
--


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

--
-- 테이블의 덤프 데이터 `schedule`
--

INSERT INTO `schedule` (`seq`, `member_id`, `flag`, `start_date`, `end_date`, `project_id`, `title`, `content`, `color_background`, `color_lang`) VALUES
(3, 'kimhys2', 1, '2016-06-01 00:00:00', '2016-06-07 00:00:00', 0, 0x617364617364, 0xe384b9e384b9e384b9, '#ed5850', '#92d04f'),
(3, 'test1234', 1, '2016-05-31 00:00:00', '2016-05-31 00:00:00', 0, 0x61736466, '', '#92d04f', '#f5f5f5'),
(3, 'kimhys2', 1, '2016-06-14 00:00:00', '2016-06-14 00:00:00', 0, 0xe38581e384b4e38587e384bbe384b4e38587, '', '#7aaf42', '#ed5850'),
(4, 'kimhys2', 1, '2016-06-01 00:00:00', '2016-06-01 00:00:00', 0, 0x6173646661736466, 0x7364666161736664, '#7aaf42', '#00bfff'),
(5, 'jiyoni1225', 1, '2016-05-30 00:00:00', '2016-05-30 00:00:00', 0, 0x636363, 0x63636363, '#caaf40', '#f1d04d');