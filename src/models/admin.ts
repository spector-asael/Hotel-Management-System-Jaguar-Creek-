// models/Guest.ts
import AdminInterface from '../interfaces/admininterface';
import pool from '../db/config';

export class Admin extends AdminInterface {
    constructor(
        user_id: number,
        first_name: string,
        last_name: string,
        phone_number: string,
        username: string,
        password: string,
        email: string
    ) {
        super(user_id, first_name, last_name, phone_number, username, password, email);
    }

    async createAdmin(): Promise<void> {
        const query = 'INSERT INTO users (user_id, user_first_name, user_last_name, user_phone_number, username, user_password, user_email, user_role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [this.getUserId(), this.getFirstName(), this.getLastName(), this.getPhoneNumber(), this.getUsername(), this.getPassword(), this.getEmail(), 2];

        try {
            await pool.query(query, values);
        } catch (error) {
            console.error('Error creating guest:', error);
            throw error;
        }
    }

    validatePassword(username: string, password: string): number {
        if(password === this.getPassword()){
            return 2;
        } else {
            return -1;
        }
    }

    static async findByUsername(username: string): Promise<Admin | null> {
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [username];

        try {
            const result = await pool.query(query, values);
            if (result.rows.length === 0) return null;

            const row = result.rows[0];
            return new Admin(
                row.user_id,
                row.user_first_name,
                row.user_last_name,
                row.user_phone_number,
                row.username,
                row.user_password,
                row.user_email
            );

        } catch (err) {
            console.error('Error finding guest:', err);
            throw err;
        }
    }

    public static async getAllUsers(): Promise<Admin[]> {
        const query = 'SELECT * FROM users where user_role_id != 2';
        try {
            const result = await pool.query(query);
            return result.rows.map((row: any) => new Admin(
                row.user_id,
                row.user_first_name,
                row.user_last_name,
                row.user_phone_number,
                row.username,
                row.user_password,
                row.user_email
            ));
        } catch (err) {
            console.error('Error fetching all users:', err);
            throw err;
        }
    }

    static async deleteUserByID(user_id: string | number): Promise<void> {
        try {
            const query = `DELETE FROM users WHERE user_id = $1`;
            const result = await pool.query(query, [user_id]);

        } catch (error) {
            console.error("Error deleting user by ID:", error);
            
        }
    }

    static async deleteRoomByID(room_id: string | number): Promise<void> {
        try {
            const query = `DELETE FROM hotel_rooms WHERE room_id = $1`;
            const result = await pool.query(query, [room_id]);

        } catch (error) {
            console.error("Error deleting hotel room:", error);
            return;
        }
    }
}

