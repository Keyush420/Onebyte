-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2024 at 01:34 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finaldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminuser`
--

CREATE TABLE `adminuser` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adminuser`
--

INSERT INTO `adminuser` (`id`, `email`, `username`, `password`) VALUES
(1, 'admin@gmail.com', 'Admin', 'Password@123');

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `encodedImageUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`id`, `name`, `price`, `imageUrl`, `encodedImageUrl`) VALUES
(1, 'Burger', '160.00', 'https://www.freepik.com/free-psd/hamburger-isolated-transparent-background_136168256.htm#query=burger&position=0&from_view=keyword&track=sph&uuid=383d3cbc-1819-4463-8196-59bc57d35bce', '');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `reservation_id` int(11) DEFAULT NULL,
  `reservationName` varchar(100) NOT NULL,
  `tableNumber` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `reservation_id`, `reservationName`, `tableNumber`, `created_at`) VALUES
(1, 1, '', 0, '2024-05-17 17:23:34'),
(2, 1, '', 0, '2024-05-17 17:23:46'),
(3, 2, '', 0, '2024-05-19 23:19:26');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `username`, `password`) VALUES
(1, 'zsherchan030@gmail.com', 'Link', 'Password'),
(2, 'zek@gmail.com', 'Zek', 'Adadada');

-- --------------------------------------------------------

--
-- Table structure for table `userreservations`
--

CREATE TABLE `userreservations` (
  `id` int(11) NOT NULL,
  `numberOfPeople` int(11) NOT NULL,
  `reservationDate` date NOT NULL,
  `reservationTime` time NOT NULL,
  `description` text NOT NULL,
  `tableNumber` int(11) NOT NULL,
  `reservationName` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userreservations`
--

INSERT INTO `userreservations` (`id`, `numberOfPeople`, `reservationDate`, `reservationTime`, `description`, `tableNumber`, `reservationName`, `username`, `status`) VALUES
(1, 4, '2024-05-17', '13:10:00', 'Alot of snacks and drinks please', 7, 'Barry Chopsticks', 'Link', 'accepted'),
(2, 1, '2024-05-22', '07:30:00', 'Hmm', 1, 'Barry Chopsticks', 'Link', 'pending'),
(3, 1, '2024-05-21', '06:30:00', 'qweqw', 1, 'Woh', 'Zek', 'pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservation_id` (`reservation_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userreservations`
--
ALTER TABLE `userreservations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminuser`
--
ALTER TABLE `adminuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userreservations`
--
ALTER TABLE `userreservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `userreservations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
