INSERT INTO admin (Username, Password, Status) VALUE
("Kason_w", "11111111", "ACTIVE"),
("Yoimiya", "Firework123", "ACTIVE"),
("Ben Tennyson", "YOLO", "SUSPENDED");

INSERT INTO loginlog (Timestamp, Status, AdminID) VALUE
('2026-09-30 15:42:21', "SUCCESS", 1),
('2026-09-30 15:46:26', "SUCCESS", 2),
('2026-09-30 15:54:02', "FAILED", 1),
('2026-09-30 16:02:11', "FAILED", 2);

INSERT INTO usertransaction (Timestamp, TargetField, Operation, OldValue, NewValue, MakeAdminID, AffectAdminID) VALUE
('2026-09-30 15:59:21', "Username", "UPDATE", "Yoimiya", "YoiYoi", 1, 2);

INSERT INTO publisher (PublisherName) VALUE
("HappyPrinter"),
('SE-ED'),
('Nanmeebooks');


INSERT INTO category (CategoryName) VALUE
("General"),
("Novel"),
("Comic&Manga"),
("Study"),
("Magazine");

INSERT INTO author (AuthorName) VALUE
("SuperCool PenName"),
('J.K. Rowling'),
('George Orwell');

INSERT INTO book (BookName, QuantityInStock, Price, Size, PublisherID) VALUES 
("The Stranger", 10, 30.99 , 999, 1),
("Dream of Stars", 8, 320.00, "14x20 cm", 2),
("Little Princess", 0, 180.00, "12x18 cm", 3),
("Computer Basics", 15, 450.00, "18x25 cm", 1),
("Magic World", 20, 390.00, "14x21 cm", 2),
("Funny Animals", 12, 150.00, "11x17 cm", 3),
("English Learning", 9, 220.00, "18x25 cm", 1),
("Mystery House", 6, 280.00, "13x19 cm", 2),
("Travel Magazine", 5, 160.00, "21x28 cm", 3);

INSERT INTO picture (`Name`, `URL`, BookID) VALUE
("cover.png", "https://www.xxx", 1),
("blue_ocean_cover.png", "https://example.com/blue_ocean_cover.png", 1),
("blue_ocean_back.png", "https://example.com/blue_ocean_back.png", 1),
("dream_stars_cover.png", "https://example.com/dream_stars_cover.png", 2),
("princess_cover.png", "https://example.com/princess_cover.png", 3),
("computer_cover.png", "https://example.com/computer_cover.png", 4),
("magic_world_cover.png", "https://example.com/magic_world_cover.png", 5),
("animals_cover.png", "https://example.com/animals_cover.png", 6),
("english_cover.png", "https://example.com/english_cover.png", 7),
("mystery_cover.png", "https://example.com/mystery_cover.png", 8),
("travel_cover.png", "https://example.com/travel_cover.png", 9);


INSERT INTO booktransaction (Timestamp, TargetField, Operation, OldValue, NewValue, AdminID, BookID) VALUE
('2026-09-30 15:42:21', "BookName", "UPDATE", "The strang", "The Stranger", 2, 1),
('2026-09-30 16:10:15', 'BookName', 'INSERT', NULL, 'Harry Potter', 1, 2),
('2026-09-30 17:25:30', 'BookName', 'DELETE', 'The Great Gatsby', NULL, 2, 3);

INSERT INTO booktransaction (Timestamp, TargetField, Operation, OldValue, NewValue, AdminID, BookID) VALUE
('2026-09-30 15:42:21', "BookName", "UPDATE", "The strang", "The Stranger", 2, 1),
('2026-09-30 16:10:15', 'BookName', 'INSERT', NULL, 'Harry Potter', 1, 2),
('2026-09-30 17:25:30', 'BookName', 'DELETE', 'The Great Gatsby', NULL, 2, 3);

INSERT INTO `in` (BookID, CategoryID) VALUE
(1, 2),
(2, 2),
(3, 1),
(4, 4),
(5, 2),
(6, 3),
(7, 4),
(8, 2),
(9, 5);


INSERT INTO `write` (BookID, AuthorID) VALUE
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
