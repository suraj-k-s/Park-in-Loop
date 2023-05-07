-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 29, 2023 at 05:18 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_parkinloop`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

DROP TABLE IF EXISTS `tbl_admin`;
CREATE TABLE IF NOT EXISTS `tbl_admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(100) NOT NULL,
  `admin_email` varchar(100) NOT NULL,
  `admin_password` varchar(100) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`admin_id`, `admin_name`, `admin_email`, `admin_password`) VALUES
(1, 'Admin', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_booking`
--

DROP TABLE IF EXISTS `tbl_booking`;
CREATE TABLE IF NOT EXISTS `tbl_booking` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `pfacility_id` int(11) NOT NULL,
  `booking_vehicleno` varchar(10) NOT NULL,
  `entry_time` varchar(50) NOT NULL,
  `advance_amount` varchar(100) NOT NULL,
  `slot_id` varchar(50) NOT NULL,
  `exit_time` varchar(50) NOT NULL,
  `total_time` varchar(50) NOT NULL,
  `parking_amount` varchar(50) NOT NULL,
  `service_amount` varchar(50) NOT NULL,
  `booking_status` int(11) NOT NULL DEFAULT 0,
  `payment_status` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`booking_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_booking`
--

INSERT INTO `tbl_booking` (`booking_id`, `user_id`, `pfacility_id`, `booking_vehicleno`, `entry_time`, `advance_amount`, `slot_id`, `exit_time`, `total_time`, `parking_amount`, `service_amount`, `booking_status`, `payment_status`) VALUES
(1, NULL, 1, 'KL38H7845', '2022-05-17 20:30:09', '0', '1', '2022-05-17 20:42:04', '00:11:55.000000', '40', '0', 2, 0),
(2, 1, 1, 'KL38K1625', '2022-05-17T20:30', '40', '2', '2022-05-18 09:52:32', '13:22:32.000000', '560', '300', 2, 1),
(3, 1, 2, 'KL18I0971', '2022-05-17T20:40', '30', '21', '', '', '', '0', 1, 1),
(4, NULL, 1, 'KL07U8926', '2022-05-17 20:42:37', '0', '1', '', '', '', '0', 1, 0),
(5, 1, 1, 'dddd', '2022-05-18T10:30', '40', '2', '', '', '', '0', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_complaint`
--

DROP TABLE IF EXISTS `tbl_complaint`;
CREATE TABLE IF NOT EXISTS `tbl_complaint` (
  `complaint_id` int(11) NOT NULL AUTO_INCREMENT,
  `pfacility_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `complaint_date` varchar(20) NOT NULL,
  `complaint_content` varchar(500) NOT NULL,
  `complaint_reply` varchar(500) NOT NULL,
  `complaint_replydate` varchar(20) NOT NULL,
  `complaint_status` varchar(20) NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`complaint_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_district`
--

DROP TABLE IF EXISTS `tbl_district`;
CREATE TABLE IF NOT EXISTS `tbl_district` (
  `district_id` int(11) NOT NULL AUTO_INCREMENT,
  `district_name` varchar(100) NOT NULL,
  PRIMARY KEY (`district_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_district`
--

INSERT INTO `tbl_district` (`district_id`, `district_name`) VALUES
(1, 'Thiruvananthapuram'),
(2, 'Kollam'),
(3, 'Pathanamthitta'),
(4, 'Alappuzha'),
(5, 'Kottayam'),
(6, 'Idukki'),
(7, 'Ernakulam'),
(8, 'Thrissur'),
(9, 'Palakkad'),
(10, 'Malappuram'),
(11, 'Kozhikode'),
(12, 'Wayanad'),
(13, 'Kannur'),
(14, 'Kasargode');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedback`
--

DROP TABLE IF EXISTS `tbl_feedback`;
CREATE TABLE IF NOT EXISTS `tbl_feedback` (
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT,
  `pfacility_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `feedback_date` varchar(50) NOT NULL,
  `feedback_content` varchar(500) NOT NULL,
  PRIMARY KEY (`feedback_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_location`
--

DROP TABLE IF EXISTS `tbl_location`;
CREATE TABLE IF NOT EXISTS `tbl_location` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(100) NOT NULL,
  `location_pincode` varchar(6) NOT NULL,
  `district_id` int(11) NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_location`
--

INSERT INTO `tbl_location` (`location_id`, `location_name`, `location_pincode`, `district_id`) VALUES
(1, 'Thodupuzha', '685584', 6),
(2, 'Muvattupuzha', '686661', 7),
(3, 'Muttom', '685587', 6),
(4, 'Vazhithala', '685583', 6),
(5, 'Kaloor', '682017', 7),
(6, 'Pala', '686573', 5),
(7, 'Edapally', '682021', 7),
(9, 'Kudayathoor', '685590', 6);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_parkingfacility`
--

DROP TABLE IF EXISTS `tbl_parkingfacility`;
CREATE TABLE IF NOT EXISTS `tbl_parkingfacility` (
  `pfacility_id` int(11) NOT NULL AUTO_INCREMENT,
  `powner_id` int(11) NOT NULL,
  `pfacility_name` varchar(100) NOT NULL,
  `location_id` int(11) NOT NULL,
  `pfacility_slots` int(50) NOT NULL,
  `pfacility_rate` varchar(50) NOT NULL,
  `pfacility_landmark` varchar(50) NOT NULL,
  PRIMARY KEY (`pfacility_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_parkingfacility`
--

INSERT INTO `tbl_parkingfacility` (`pfacility_id`, `powner_id`, `pfacility_name`, `location_id`, `pfacility_slots`, `pfacility_rate`, `pfacility_landmark`) VALUES
(1, 1, 'Central Praking', 1, 20, '40', 'Town'),
(2, 2, 'Best Garage', 4, 10, '30', 'Central Jn.'),
(3, 3, 'Town Parking', 1, 20, '40', 'Near Pvt Bus Stand');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_parkingowner`
--

DROP TABLE IF EXISTS `tbl_parkingowner`;
CREATE TABLE IF NOT EXISTS `tbl_parkingowner` (
  `powner_id` int(11) NOT NULL AUTO_INCREMENT,
  `powner_name` varchar(100) NOT NULL,
  `powner_email` varchar(100) NOT NULL,
  `powner_aadhaar` varchar(12) NOT NULL,
  `powner_location` varchar(50) NOT NULL,
  `powner_password` varchar(100) NOT NULL,
  `powner_contact` varchar(10) NOT NULL,
  `powner_doj` varchar(50) NOT NULL,
  `powner_status` varchar(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`powner_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_parkingowner`
--

INSERT INTO `tbl_parkingowner` (`powner_id`, `powner_name`, `powner_email`, `powner_aadhaar`, `powner_location`, `powner_password`, `powner_contact`, `powner_doj`, `powner_status`) VALUES
(1, 'Naveen Krishna B', 'naveenkb@gmail.com', '123412341234', 'Kolapra', 'naveen', '8137955259', '2022-05-17', '1'),
(2, 'Mikhael Jose', 'mikhaelpark@gmail.com', '555555555555', 'Kalayanthani', 'mikhael', '8162739081', '2022-05-17', '1'),
(3, 'Nandhu Krishna B', 'nandhupark@gmail.com', '666677772222', 'Kudayathoor', 'nandhu', '9446456806', '2022-05-17', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_parkingservice`
--

DROP TABLE IF EXISTS `tbl_parkingservice`;
CREATE TABLE IF NOT EXISTS `tbl_parkingservice` (
  `pservice_id` int(11) NOT NULL AUTO_INCREMENT,
  `servicetype_id` int(11) NOT NULL,
  `pfacility_id` int(11) NOT NULL,
  `pservice_rate` varchar(50) NOT NULL,
  `pservice_description` varchar(500) NOT NULL,
  PRIMARY KEY (`pservice_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_parkingservice`
--

INSERT INTO `tbl_parkingservice` (`pservice_id`, `servicetype_id`, `pfacility_id`, `pservice_rate`, `pservice_description`) VALUES
(1, 1, 1, '500', 'Make Exterior Bright'),
(2, 3, 1, '300', 'Make Interior Dust Free'),
(3, 4, 1, '1000', 'Applying Coating on Exterior'),
(4, 1, 2, '400', 'Good Wash'),
(5, 4, 3, '800', 'Exterior Polish to look Bright\n');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment`
--

DROP TABLE IF EXISTS `tbl_payment`;
CREATE TABLE IF NOT EXISTS `tbl_payment` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `total_amount` varchar(50) NOT NULL,
  `payment_date` date NOT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_payment`
--

INSERT INTO `tbl_payment` (`payment_id`, `booking_id`, `total_amount`, `payment_date`) VALUES
(1, 1, '40', '2022-05-17'),
(2, 2, '860', '2022-05-18');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_servicebooking`
--

DROP TABLE IF EXISTS `tbl_servicebooking`;
CREATE TABLE IF NOT EXISTS `tbl_servicebooking` (
  `servicebooking_id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `pservice_id` int(11) NOT NULL,
  `pfacility_id` int(11) NOT NULL,
  PRIMARY KEY (`servicebooking_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_servicebooking`
--

INSERT INTO `tbl_servicebooking` (`servicebooking_id`, `booking_id`, `pservice_id`, `pfacility_id`) VALUES
(1, 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_servicetype`
--

DROP TABLE IF EXISTS `tbl_servicetype`;
CREATE TABLE IF NOT EXISTS `tbl_servicetype` (
  `servicetype_id` int(11) NOT NULL AUTO_INCREMENT,
  `servicetype_name` varchar(100) NOT NULL,
  PRIMARY KEY (`servicetype_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_servicetype`
--

INSERT INTO `tbl_servicetype` (`servicetype_id`, `servicetype_name`) VALUES
(1, 'Pressure Wash'),
(2, 'Interior Cleaning'),
(3, 'Vacuum Cleaning'),
(4, 'Exterior Polishing'),
(5, 'Interior Polishing');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_slots`
--

DROP TABLE IF EXISTS `tbl_slots`;
CREATE TABLE IF NOT EXISTS `tbl_slots` (
  `slot_id` int(11) NOT NULL AUTO_INCREMENT,
  `pfacility_id` int(11) NOT NULL,
  `slot_number` varchar(100) NOT NULL,
  `slot_status` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`slot_id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_slots`
--

INSERT INTO `tbl_slots` (`slot_id`, `pfacility_id`, `slot_number`, `slot_status`) VALUES
(1, 1, 'A1', 2),
(2, 1, 'A2', 1),
(3, 1, 'A3', 0),
(4, 1, 'A4', 0),
(5, 1, 'A5', 0),
(6, 1, 'A6', 0),
(7, 1, 'A7', 0),
(8, 1, 'A8', 0),
(9, 1, 'A9', 0),
(10, 1, 'A10', 0),
(11, 1, 'A11', 0),
(12, 1, 'A12', 0),
(13, 1, 'A13', 0),
(14, 1, 'A14', 0),
(15, 1, 'A15', 0),
(16, 1, 'A16', 0),
(17, 1, 'A17', 0),
(18, 1, 'A18', 0),
(19, 1, 'A19', 0),
(20, 1, 'A20', 0),
(21, 2, 'A1', 2),
(22, 2, 'A2', 0),
(23, 2, 'A3', 0),
(24, 2, 'A4', 0),
(25, 2, 'A5', 0),
(26, 2, 'A6', 0),
(27, 2, 'A7', 0),
(28, 2, 'A8', 0),
(29, 2, 'A9', 0),
(30, 2, 'A10', 0),
(31, 3, 'A1', 0),
(32, 3, 'A2', 0),
(33, 3, 'A3', 0),
(34, 3, 'A4', 0),
(35, 3, 'A5', 0),
(36, 3, 'A6', 0),
(37, 3, 'A7', 0),
(38, 3, 'A8', 0),
(39, 3, 'A9', 0),
(40, 3, 'A10', 0),
(41, 3, 'A11', 0),
(42, 3, 'A12', 0),
(43, 3, 'A13', 0),
(44, 3, 'A14', 0),
(45, 3, 'A15', 0),
(46, 3, 'A16', 0),
(47, 3, 'A17', 0),
(48, 3, 'A18', 0),
(49, 3, 'A19', 0),
(50, 3, 'A20', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_contact` varchar(10) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_doj` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `user_name`, `user_email`, `user_contact`, `user_password`, `user_doj`) VALUES
(1, 'Naveen Krishna', 'naveen@gmail.com', '8137955259', 'naveen', '2022-05-07'),
(2, 'Nandhu', 'nandhu123@gmail.com', '9446456806', 'nandhu', '2022-05-07'),
(3, 'Mikhael', 'mikhael@gmail.com', '9872315674', 'mikhael', '2022-05-08'),
(4, 'Rahul', 'rahul1@gmail.com', '785622381', 'rahul', '2022-05-08'),
(5, 'Nabeel Latheef', 'nabeel@gmail.com', '8752417856', 'nabeel', '2022-05-14'),
(6, 'Manju John', 'manju@gmail.com', '8936527816', 'manju', '2022-05-16'),
(12, 'Abin Binoy', 'abin@gmail.com', '7306520298', 'abin', '2022-05-16');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
