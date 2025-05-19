import UserInterface from '../interfaces/userInterface';
import pool from '../db/config';
abstract class User extends UserInterface {
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

    getUserId(): number {
        return this.user_id;
    }

    getFirstName(): string {
        return this.first_name;
    }

    getLastName(): string {
        return this.last_name;
    }

    getPhoneNumber(): string {
        return this.phone_number;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getEmail(): string {
        return this.email;
    }

    setUserId(user_id: number): void {
        this.user_id = user_id;
    }

    setFirstName(first_name: string): void {
        this.first_name = first_name;
    }

    setLastName(last_name: string): void {
        this.last_name = last_name;
    }

    setPhoneNumber(phone_number: string): void {
        this.phone_number = phone_number;
    }

    setUsername(username: string): void {
        this.username = username;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    abstract validatePassword(username: string, password: string): number;
    static async findRole(username: string): Promise<number> {
        const query = 'SELECT user_role_id FROM users WHERE username = $1';
        const values = [username];
    
        try {
            const result = await pool.query(query, values);
    
            if (result.rows.length === 0) {
                console.warn(`No user found with username: ${username}`);
                return -1; // Return -1 if user not found
            }
    
            return result.rows[0].user_role_id; // Return the role ID
        } catch (err) {
            console.error('Database error in findRole:', err);
            return -1; // Return -1 if there’s a DB error
        }
    }
}


export default User;
