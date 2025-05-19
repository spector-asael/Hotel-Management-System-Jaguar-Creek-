-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL
);

-- HOTEL ROOMS
CREATE TABLE hotel_rooms (
    id SERIAL PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL UNIQUE,
    room_name VARCHAR(50) NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    price_rate DECIMAL(10, 2) NOT NULL,
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE
);

-- GUEST PROFILES
CREATE TABLE guest_profiles (
    user_id INT PRIMARY KEY REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EMPLOYEE PROFILES
CREATE TABLE employee_profiles (
    user_id INT PRIMARY KEY REFERENCES users(id),
    hire_date DATE NOT NULL
);

-- ADMIN PROFILES
CREATE TABLE admin_profiles (
    user_id INT PRIMARY KEY REFERENCES users(id),
    admin_level INT NOT NULL
);

-- RESERVATIONS
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    guest_id INT REFERENCES users(id),
    room_id INT REFERENCES hotel_rooms(id),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TRANSACTIONS
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    reservation_id INT REFERENCES reservations(id),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(100) NOT NULL,
    status VARCHAR(50),
    processed_by INT REFERENCES users(id)
);

-- CONVERSATIONS
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    guest_id INT REFERENCES users(id),
    employee_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MESSAGES
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT REFERENCES conversations(id),
    author_id INT REFERENCES users(id),
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);
