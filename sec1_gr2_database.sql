-- schema.sql (Creat Database)
DROP DATABASE IF EXISTS ITDS242_BookShop;
CREATE DATABASE ITDS242_BookShop;
USE ITDS242_BookShop;

CREATE TABLE `ADMIN` (
  `AdminID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) NOT NULL UNIQUE,
  `Password` varchar(255) NOT NULL,
  `Status` varchar(20) NOT NULL COMMENT 'ACTIVE or SUSPENDED',
  CONSTRAINT chk_admin_status CHECK (Status = 'ACTIVE' OR Status = 'SUSPENDED')
);

CREATE TABLE `LOGINLOG` (
  `LoginLogID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Timestamp` datetime NOT NULL,
  `Status` varchar(20) NOT NULL COMMENT 'SUCCESS or FAILED',
  `AdminID` int NOT NULL,
  CONSTRAINT chk_loginlog_status CHECK (Status = 'SUCCESS' OR Status = 'FAILED')
);

CREATE TABLE `USERTRANSACTION` (
  `UserTransactionID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Timestamp` datetime NOT NULL,
  `TargetField` varchar(100) NOT NULL,
  `Operation` varchar(20) NOT NULL COMMENT 'INSERT, UPDATE, or DELETE',
  `OldValue` text,
  `NewValue` text,
  `MakeAdminID` int NULL,
  `AffectAdminID` int NULL,
  CONSTRAINT chk_usertransaction_operation CHECK (Operation = 'INSERT' or Operation = 'UPDATE' or Operation = 'DELETE')
);

CREATE TABLE `BOOK` (
  `BookID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `BookName` varchar(255) NOT NULL,
  `QuantityInStock` int NOT NULL COMMENT '0 or greater',
  `ISBNCode` char(17) UNIQUE,
  `Price` decimal(10,2) NOT NULL COMMENT '0 or greater',
  `Description` text,
  `PublishDate` date,
  `Size` varchar(15) NOT NULL,
  `PublisherID` int NOT NULL,
  CONSTRAINT chk_book_quanity_in_stock CHECK (QuantityInStock >= 0),
  CONSTRAINT chk_book_price CHECK (Price >= 0)
);

CREATE TABLE `PUBLISHER` (
  `PublisherID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `PublisherName` varchar(150) UNIQUE NOT NULL
);

CREATE TABLE `CATEGORY` (
  `CategoryID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(100) UNIQUE NOT NULL
);

CREATE TABLE `AUTHOR` (
  `AuthorID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `AuthorName` varchar(150) UNIQUE NOT NULL
);

CREATE TABLE `PICTURE` (
  `PicID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `URL` varchar(500) NOT NULL,
  `BookID` int NOT NULL
);

CREATE TABLE `BOOKTRANSACTION` (
  `BookTransactionID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Timestamp` datetime NOT NULL,
  `TargetField` varchar(100) NOT NULL,
  `Operation` varchar(20) NOT NULL COMMENT 'INSERT, UPDATE, or DELETE',
  `OldValue` text,
  `NewValue` text,
  `AdminID` int NULL,
  `BookID` int NOT NULL,
  CONSTRAINT chk_booktransaction_operation CHECK (Operation = 'INSERT' or Operation = 'UPDATE' or Operation = 'DELETE')
);

CREATE TABLE `IN` (
  `BookID` int NOT NULL ,
  `CategoryID` int NOT NULL,
  PRIMARY KEY (`BookID`, `CategoryID`)
);

CREATE TABLE `WRITE` (
  `BookID` int NOT NULL,
  `AuthorID` int NOT NULL,
  PRIMARY KEY (`BookID`, `AuthorID`)
);

ALTER TABLE `LOGINLOG` ADD FOREIGN KEY (`AdminID`) REFERENCES `ADMIN` (`AdminID`) ON DELETE CASCADE;

ALTER TABLE `USERTRANSACTION` ADD FOREIGN KEY (`MakeAdminID`) REFERENCES `ADMIN` (`AdminID`) ON DELETE SET NULL;

ALTER TABLE `USERTRANSACTION` ADD FOREIGN KEY (`AffectAdminID`) REFERENCES `ADMIN` (`AdminID`) ON DELETE SET NULL;

ALTER TABLE `BOOK` ADD FOREIGN KEY (`PublisherID`) REFERENCES `PUBLISHER` (`PublisherID`);

ALTER TABLE `PICTURE` ADD FOREIGN KEY (`BookID`) REFERENCES `BOOK` (`BookID`) ON DELETE CASCADE;

ALTER TABLE `BOOKTRANSACTION` ADD FOREIGN KEY (`AdminID`) REFERENCES `ADMIN` (`AdminID`) ON DELETE SET NULL;

ALTER TABLE `BOOKTRANSACTION` ADD FOREIGN KEY (`BookID`) REFERENCES `BOOK` (`BookID`) ON DELETE CASCADE;

ALTER TABLE `IN` ADD FOREIGN KEY (`BookID`) REFERENCES `BOOK` (`BookID`) ON DELETE CASCADE;

ALTER TABLE `IN` ADD FOREIGN KEY (`CategoryID`) REFERENCES `CATEGORY` (`CategoryID`) ON DELETE CASCADE;

ALTER TABLE `WRITE` ADD FOREIGN KEY (`BookID`) REFERENCES `BOOK` (`BookID`) ON DELETE CASCADE;

ALTER TABLE `WRITE` ADD FOREIGN KEY (`AuthorID`) REFERENCES `AUTHOR` (`AuthorID`) ON DELETE CASCADE;

-- seed.sql (Sample Data)
INSERT INTO `ADMIN` (`Username`, `Password`, `Status`) VALUES
("Kason_w", "$2b$12$lP1gnCHmCdHxl6rm/ZvD/.t8OMQeM7CdY68abWMiC1K4uCIi1Tzqa", "ACTIVE"),
("Yoimiya", "$2b$12$f6jwDo9wxL9mt7yAbCFtE.v8xNMxaE3IzOhZbStf/0xMQ9358W6K.", "ACTIVE"),
("Ben Tennyson", "$2b$12$roho1xHLiCyqUoUW3ejXuuDBo8.RXKqJ7/QsrVWce2chRQVi0fdLi", "SUSPENDED");

INSERT INTO `LOGINLOG` (`Timestamp`, `Status`, `AdminID`) VALUES
('2026-09-30 15:42:21', "SUCCESS", 1),
('2026-09-30 15:46:26', "SUCCESS", 2),
('2026-09-30 15:54:02', "FAILED", 1),
('2026-09-30 16:02:11', "FAILED", 2);

INSERT INTO `USERTRANSACTION` (`Timestamp`, `TargetField`, `Operation`, `OldValue`, `NewValue`, `MakeAdminID`, `AffectAdminID`) VALUES
('2026-09-30 15:59:21', "Username", "UPDATE", "Yoimiya", "YoiYoi", 1, 2);

INSERT INTO `PUBLISHER` (`PublisherName`) VALUES
("HappyPrinter"),
('SE-ED'),
('Nanmeebooks');

INSERT INTO `CATEGORY` (`CategoryName`) VALUES
("General"),
("Novel"),
("Comic&Manga"),
("Study"),
("Magazine");

INSERT INTO `AUTHOR` (`AuthorName`) VALUES
("SuperCool PenName"),
('J.K. Rowling'),
('George Orwell');

INSERT INTO `BOOK` (`BookName`, `QuantityInStock`, `Price`, `Size`, `PublisherID`) VALUES 
("The Stranger", 10, 30.99, "15x20 cm", 1),
("Dream of Stars", 8, 320.00, "14x20 cm", 2),
("Little Princess", 0, 180.00, "12x18 cm", 3),
("Computer Basics", 15, 450.00, "18x25 cm", 1),
("Magic World", 20, 390.00, "14x21 cm", 2),
("Funny Animals", 12, 150.00, "11x17 cm", 3),
("English Learning", 9, 220.00, "18x25 cm", 1),
("Mystery House", 6, 280.00, "13x19 cm", 2),
("Travel Magazine", 5, 160.00, "21x28 cm", 3);

INSERT INTO `PICTURE` (`Name`, `URL`, `BookID`) VALUES
("cover.png", "https://res.cloudinary.com/itds242-bookshop/image/upload/v1794099239/cover_svy5yg.png", 1),
("blue_ocean_cover.png", "https://res.cloudinary.com/itds242-bookshop/image/upload/v1794099239/blue_ocean_cover_jbxukj.png", 1),
("blue_ocean_back.png", "https://res.cloudinary.com/itds242-bookshop/image/upload/v1794099239/blue_ocean_back_uedgns.png", 1),
("dream_stars_cover.png", "https://res.cloudinary.com/itds242-bookshop/image/upload/v1794099240/dream_star_cover_zldigc.png", 2),
("princess_cover.png", "https://res.cloudinary.com/itds242-bookshop/image/upload/v1794099242/princess_cover_eo2xrl.png", 3),
("computer_cover.png", "https://res.cloudinary.com/itds242-bookshop/image/upload/v1794099240/computer_cover_ppspkg.png", 4),
("magic_world_cover.png", "https://res.cloudinary.com/itds242-bookshop/image/upload/v1794099241/magic_world_cover_bvpz1m.png", 5),
("animals_cover.png", "https://res.cloudinary.com/itds242-bookshop/image/upload/v1794099238/animals_cover_ybfumx.png", 6),
("english_cover.png", "https://res.cloudinary.com/itds242-bookshop/image/upload/v1794099240/english_cover_wed6t8.png", 7),
("mystery_cover.png", "https://res.cloudinary.com/itds242-bookshop/image/upload/v1794099242/mystery_cover_zhaejn.png", 8),
("travel_cover.png", "https://res.cloudinary.com/itds242-bookshop/image/upload/v1794099243/travel_cover_ce6od3.png", 9);

INSERT INTO `BOOKTRANSACTION` (`Timestamp`, `TargetField`, `Operation`, `OldValue`, `NewValue`, `AdminID`, `BookID`) VALUES
('2026-09-30 15:42:21', "BookName", "UPDATE", "The strang", "The Stranger", 2, 1),
('2026-09-30 16:10:15', 'BookName', 'INSERT', NULL, 'Harry Potter', 1, 2),
('2026-09-30 17:25:30', 'BookName', 'DELETE', 'The Great Gatsby', NULL, 2, 3);

INSERT INTO `IN` (`BookID`, `CategoryID`) VALUES
(1, 2),
(2, 2),
(2, 4),
(3, 1),
(4, 4),
(5, 2),
(6, 3),
(7, 4),
(8, 2),
(9, 5);

INSERT INTO `WRITE` (`BookID`, `AuthorID`) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3),
(4, 1),
(5, 3),
(6, 2),
(7, 1),
(8, 3),
(9, 2);