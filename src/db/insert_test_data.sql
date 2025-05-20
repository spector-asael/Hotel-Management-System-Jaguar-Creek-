/* 
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL,
    user_first_name VARCHAR(100) NOT NULL,
    user_last_name VARCHAR(100) NOT NULL,
    user_phone_number VARCHAR(20) NOT NULL,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    user_role_id INT REFERENCES role(role_id)
);
*/

INSERT INTO users( user_id, username, user_password, user_first_name, user_last_name, user_phone_number, user_email, user_role_id) VALUES
(0, 'employee', '123', 'Employee', 'Tun', '1234567890', 'employee@gmail.com', 1);

INSERT INTO users( user_id, username, user_password, user_first_name, user_last_name, user_phone_number, user_email, user_role_id) VALUES
(10, 'admin', '123', 'Admin', 'Teck', '1234567890', 'admin@gmail.com', 2);

INSERT INTO hotel_rooms (room_name, room_image_path, room_description, room_price_rate, room_capacity) VALUES
('Deluxe Cabana', '/uploads/room_images/cabana_deluxecabana.webp', 'A luxurious cabana with modern amenities and a private deck.', 180.00, 6),
('Jungle Cabana', '/uploads/room_images/cabanas_junglecabana.webp', 'Immersed in nature, this cabana offers a serene jungle escape.', 150.00, 2),
('Tropical Breeze Cabana', '/uploads/room_images/cabanas_tropicalbreeze1-1.webp', 'Enjoy the tropical breeze in this cozy beachfront cabana.', 170.00, 3);



