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

export const cancelReservation = async (req: Request, res: Response) => {
  const { reservation_id } = req.params;

  if (!reservation_id) {
    return res.status(400).json({ message: 'Reservation ID is required.' });
  }

  try {
    // Check if reservation exists
    const check = await pool.query(
      'SELECT * FROM reservations WHERE reservation_id = $1',
      [reservation_id]
    );

    if (check.rows.length === 0) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    // Delete reservation — this will cascade delete the transaction
    await pool.query(
      'DELETE FROM reservations WHERE reservation_id = $1',
      [reservation_id]
    );

    return res.status(200).json({ message: 'Reservation and associated transaction cancelled successfully.' });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};