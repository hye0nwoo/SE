-- phpMyAdmin SQL Dump
-- version 3.2.3
-- http://www.phpmyadmin.net
--
-- 호스트: localhost
-- 처리한 시간: 16-06-10 12:19 
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
(5, 'kimhys22', 'kimhys2', '6월 9일 13시 37분', 0x6464),
(4, 'kimhys22', 'sdf7575', '6월 9일 13시 25분', 0xec9588eb8595),
(3, 'kimhys22', 'jiyoni', '6월 8일 16시 30분', 0xec9588eb85957e),
(2, 'sdf75751', 'sdf7575', '6월 8일 12시 40분', 0x73646667),
(1, 'sdf75751', 'sdf7575', '6월 8일 12시 39분', 0x74657374);

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

--
-- 테이블의 덤프 데이터 `member_info`
--

INSERT INTO `member_info` (`seq`, `member_id`, `password`, `email`, `name`, `phone`, `register_date`) VALUES
(1, 'kimhys2', '804a63a06d3c9939a5d945d7dc412cb86fd189ff', 'kimhys2@naver.com', '김효상', '01046428158', '2016-06-07 02:12:27'),
(2, 'dkdlel', '35fd0c31f2978859ff10dae29bb00438cd0d4cfb', 'test@test.com', 'test', '11111111111', '2016-06-07 19:55:49'),
(3, 'jiyoni', 'de329bcc2a1809f627b455c4a5a6d11cd52a9801', 'jiyoni1225@gmail.com', '이지연', '01085592654', '2016-06-07 21:23:48'),
(4, 'sdf7575', 'ed4ef77e80d71601fc0a6fa3a3af0dce5f854e58', 'sdf7575@naver.com', '박태록', '01025505388', '2016-06-07 23:39:03');

-- --------------------------------------------------------

--
-- 테이블 구조 `project_content`
--

CREATE TABLE IF NOT EXISTS `project_content` (
  `seq` int(12) NOT NULL,
  `project_id` varchar(30) NOT NULL,
  `col` int(2) NOT NULL,
  `row` int(2) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `title` text NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `flag` int(11) NOT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 테이블의 덤프 데이터 `project_content`
--

INSERT INTO `project_content` (`seq`, `project_id`, `col`, `row`, `start_date`, `end_date`, `title`, `content`, `flag`) VALUES
(0, 'kimhys22', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', 0x30, 1),
(1, 'kimhys22', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', 0x617364, 1),
(2, 'kimhys22', 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', 0x666666, 1),
(3, 'kimhys22', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', 0x3c64697620636c6173733d226269675f636f6e7461696e6572222069643d22636172643322207374796c653d22646973706c61793a20626c6f636b3b223e2009090920203c6469762069643d22626f785f69746d312220636c6173733d22626f785f69746d20726f756e646564223e2009090920200920203c6469762069643d226e616d65312220636c6173733d226e616d65223e3c64697620636c6173733d226865616465725f6e616d6520636c69636b223e3c7370616e3e4974656d20313c2f7370616e3e3c2f6469763e3c2f6469763e09090920200920203c64697620636c6173733d22636c656172223e3c2f6469763e2009090920200920203c6469762069643d2272657370312220636c6173733d226e616d65223e3c64697620636c6173733d226865616465725f6e616d6520636c69636b223e3c7370616e3e7265737020313c2f7370616e3e3c2f6469763e3c2f6469763e09090920200920203c64697620636c6173733d22636c656172223e3c2f6469763e200909090920203c646976206e3d2230222069643d22636865636b626f7831223e3c2f6469763e200909090920203c64697620636c6173733d22736d616c6c223e20090909090920203c646976206e3d22312220636c6173733d2269746d5f626f785f6f7074696f6e22207374796c653d22646973706c61793a206e6f6e653b223e3c696e707574206e3d22312220636c6173733d22636f6c6f7220636f6c6f72657465206d436f6c6f725069636b65722220747970653d2268696464656e2220646174612d746578743d2268696464656e2220646174612d636f6c6f726c696e6b3d22626f785f69746d31222076616c75653d2272676228302c20302c203029222069643d22636f6c6f725f3022207374796c653d22636f6c6f723a20726762283235352c203235352c20323535293b206261636b67726f756e642d636f6c6f723a2072676228302c20302c2030293b223e3c7370616e2069643d226d63705f636f6c6f725f302220636c6173733d226d436f6c6f725069636b65725472696767657220636f6c6f7220636f6c6f72657465206d436f6c6f725069636b657222207374796c653d22646973706c61793a20696e6c696e652d626c6f636b3b20637572736f723a20706f696e7465723b20626f726465723a2031707820736f6c696420626c61636b3b20666c6f61743a206c6566743b2077696474683a20313870783b206865696768743a20323070783b20636f6c6f723a20726762283235352c203235352c20323535293b206261636b67726f756e642d636f6c6f723a2072676228302c20302c2030293b223e266e6273703b3c2f7370616e3e3c2f6469763e20090909090920203c646976206e3d22312220636c6173733d226f7074696f6e20636c6f73655f72656d6f76652069746d5f626f785f6f7074696f6e22207374796c653d22646973706c61793a206e6f6e653b223e3c627574746f6e20636c6173733d2262746e2062746e2d64616e6765722062746e2d7873223e3c6920636c6173733d22676c79706869636f6e20676c79706869636f6e2d72656d6f7665223e3c2f693e3c2f627574746f6e3e3c2f6469763e20090909090920203c646976206e3d22312220636c6173733d226f7074696f6e20616464636865636b2069746d5f626f785f6f7074696f6e22207374796c653d22646973706c61793a206e6f6e653b223e3c627574746f6e20636c6173733d2262746e2062746e2d696e666f2062746e2d7873223e3c6920636c6173733d22676c79706869636f6e20676c79706869636f6e2d636865636b223e3c2f693e3c2f627574746f6e3e3c2f6469763e0909090920203c2f6469763e200909090920203c64697620636c6173733d22636c656172223e3c2f6469763e2009090920203c2f6469763e2009090920203c6469762069643d22626f785f69746d315f736861646f772220636c6173733d22736861646f77223e3c2f6469763e200909093c2f6469763e, 0);

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
(4, 'aaaa', 'kimhys22', '2016-06-05 00:00:00', '2016-06-10 00:00:00', 0x61647366, 3, 'kimhys2', 'jiyoni', 'sdf7575', '', ''),
(2, 'wadsdsad', 'kimhys21', '2016-06-08 00:00:00', '2016-06-17 00:00:00', 0x736164617364, 1, 'kimhys2', '', '', '', '');

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
(5, 'dkdlel', 1, '2016-06-09 00:00:00', '2016-06-23 00:00:00', 0, 0x676a686b676a686b, 0x6b676a68676a686b, '#ed5850', '#f5f5f5'),
(4, 'dkdlel', 1, '2016-06-09 00:00:00', '2016-06-23 00:00:00', 0, 0x676a686b676a686b, 0x6b676a68676a686b, '#ed5850', '#f5f5f5'),
(3, 'dkdlel', 1, '2016-06-09 00:00:00', '2016-06-23 00:00:00', 0, 0x676a686b676a686b, 0x6b676a68676a686b, '#ed5850', '#f5f5f5'),
(7, 'sdf7575', 1, '2016-06-10 00:00:00', '2016-06-10 00:00:00', 0, 0x736461667364666173646661736466, 0x6173646661736466736466, '#000000', '#f5f5f5'),
(2, 'jiyoni', 1, '2016-06-14 00:00:00', '2016-06-18 00:00:00', 0, 0xe3858ae3858ae3858a, 0xe384b9e384b9, '#000000', '#f5f5f5'),
(6, 'kimhys2', 1, '2016-06-06 00:00:00', '2016-06-15 00:00:00', 0, 0xe38587e38587e38587, '', '#000000', '#f5f5f5');
