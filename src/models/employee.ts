// models/Guest.ts
import EmployeeInterface from '../interfaces/employeeinterface';
import pool from '../db/config';

export class Employee extends EmployeeInterface {
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

    async createEmployee(): Promise<void> {
        const query = 'INSERT INTO users (user_id, user_first_name, user_last_name, user_phone_number, username, user_password, user_email, user_role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [this.getUserId(), this.getFirstName(), this.getLastName(), this.getPhoneNumber(), this.getUsername(), this.getPassword(), this.getEmail(), 1];

        try {
            await pool.query(query, values);
        } catch (error) {
            console.error('Error creating guest:', error);
            throw error;
        }
    }

    validatePassword(username: string, password: string): number {
        return password === this.getPassword() ? 1 : -1;
    }

    static async findByUsername(username: string): Promise<Employee | null> {
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [username];

        try {
            const result = await pool.query(query, values);
            if (result.rows.length === 0) return null;

            const row = result.rows[0];
            return new Employee(
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
}

export default Employee;
