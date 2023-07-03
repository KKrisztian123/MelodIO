-- --------------------------------------------------------
-- Hoszt:                        localhost
-- Szerver verzió:               8.0.33 - MySQL Community Server - GPL
-- Szerver OS:                   Linux
-- HeidiSQL Verzió:              12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Adatbázis struktúra mentése a MelodIO.
CREATE DATABASE IF NOT EXISTS `MelodIO` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `MelodIO`;

-- Struktúra mentése tábla MelodIO. album
CREATE TABLE IF NOT EXISTS `album` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `imageURL` varchar(255) NOT NULL,
  `imageType` varchar(50) NOT NULL,
  `albumType` varchar(50) NOT NULL,
  `releaseDate` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla MelodIO. albumCollaborator
CREATE TABLE IF NOT EXISTS `albumCollaborator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `artistId` int NOT NULL,
  `albumId` int NOT NULL,
  `placement` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_albumIdCollab` (`albumId`),
  KEY `FK_artistIdCollab` (`artistId`),
  CONSTRAINT `FK_albumIdCollab` FOREIGN KEY (`albumId`) REFERENCES `album` (`id`),
  CONSTRAINT `FK_artistIdCollab` FOREIGN KEY (`artistId`) REFERENCES `artist` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla MelodIO. artist
CREATE TABLE IF NOT EXISTS `artist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `imageURL` varchar(255) NOT NULL,
  `imageType` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla MelodIO. likedSong
CREATE TABLE IF NOT EXISTS `likedSong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `songId` int NOT NULL,
  `userId` int NOT NULL,
  `placement` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_songIdLiked` (`songId`),
  KEY `FK_userIdLiked` (`userId`),
  CONSTRAINT `FK_songIdLiked` FOREIGN KEY (`songId`) REFERENCES `song` (`id`),
  CONSTRAINT `FK_userIdLiked` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla MelodIO. playState
CREATE TABLE IF NOT EXISTS `playState` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `songId` int DEFAULT NULL,
  `player` int DEFAULT NULL,
  `isPlaying` tinyint(1) DEFAULT NULL,
  `progress` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`),
  KEY `FK_songIdPlay` (`songId`),
  KEY `FK_userSessionPlay` (`player`),
  CONSTRAINT `FK_songIdPlay` FOREIGN KEY (`songId`) REFERENCES `song` (`id`),
  CONSTRAINT `FK_userIdPlay` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_userSessionPlay` FOREIGN KEY (`player`) REFERENCES `userSession` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla MelodIO. song
CREATE TABLE IF NOT EXISTS `song` (
  `id` int NOT NULL AUTO_INCREMENT,
  `songName` varchar(255) NOT NULL,
  `songURL` varchar(255) NOT NULL,
  `songType` varchar(50) NOT NULL,
  `albumId` int NOT NULL,
  `placement` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_albumId` (`albumId`),
  CONSTRAINT `FK_albumId` FOREIGN KEY (`albumId`) REFERENCES `album` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla MelodIO. songCollaborator
CREATE TABLE IF NOT EXISTS `songCollaborator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `artistId` int NOT NULL,
  `songId` int NOT NULL,
  `placement` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_songId` (`songId`),
  KEY `FK_artistId` (`artistId`),
  CONSTRAINT `FK_artistId` FOREIGN KEY (`artistId`) REFERENCES `artist` (`id`),
  CONSTRAINT `FK_songId` FOREIGN KEY (`songId`) REFERENCES `song` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla MelodIO. user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `imageURL` varchar(255) NOT NULL,
  `imageType` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Az adatok exportálása nem lett kiválasztva.

-- Struktúra mentése tábla MelodIO. userSession
CREATE TABLE IF NOT EXISTS `userSession` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sessionToken` varchar(255) DEFAULT NULL,
  `userId` int NOT NULL,
  `deviceType` varchar(255) DEFAULT NULL,
  `deviceName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userId` (`userId`),
  CONSTRAINT `FK_userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Az adatok exportálása nem lett kiválasztva.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
