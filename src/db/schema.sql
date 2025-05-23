DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS hotel_rooms;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS role;

CREATE TABLE role (
    role_id INT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO role (role_id, role_name) VALUES
(0, 'guest'),
(1, 'employee'),
(2, 'admin'),

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

CREATE TABLE hotel_rooms (
    room_id SERIAL PRIMARY KEY,
    room_name VARCHAR(50) NOT NULL,
    room_image_path VARCHAR(1024) NOT NULL,
    room_description TEXT,
    room_price_rate DECIMAL(10, 2) NOT NULL,
    room_capacity INT NOT NULL
);

CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    room_id INT REFERENCES hotel_rooms(room_id) ON DELETE CASCADE,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL
);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    reservation_id INT REFERENCES reservations(reservation_id) ON DELETE CASCADE,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_amount DECIMAL(10, 2) NOT NULL,
    transaction_status INT NOT NULL -- 0: pending, 1: completed
);

