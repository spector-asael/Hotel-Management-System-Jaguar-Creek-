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

