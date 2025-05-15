// guestC.ts

import { Guest } from '../interface/guesInterface';
import  pool  from "../db/config";

// PostgreSQL database connection


export class Guests implements Guest {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;

    constructor(
        id: number,
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        phoneNumber: string
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }

    // Display guest details
    displayGuest(): void {
        console.log(`Guest: ${this.firstName} ${this.lastName}`);
        console.log(`Username: ${this.username}`);
        console.log(`Phone: ${this.phoneNumber}`);
    }

    // Book reservation
    async bookReservation(
        startDate: string,
        endDate: string,
        hotelRoom: any,
        reservationDetails: any
    ): Promise<boolean> {
        const client = await pool.connect();
        try {
            await client.query(
                'INSERT INTO reservations (guest_id, room_id, start_date, end_date) VALUES ($1, $2, $3, $4)',
                [this.id, hotelRoom.roomId, startDate, endDate]
            );
            return true;
        } catch (error) {
            console.error('Error booking reservation:', error);
            return false;
        } finally {
            client.release();
        }
    }

    // View reservation
    async viewReservation(reservation: any): Promise<void> {
        const client = await pool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM reservations WHERE reservation_id = $1 AND guest_id = $2',
                [reservation.reservationId, this.id]
            );
            console.log('Reservation:', result.rows[0]);
        } catch (error) {
            console.error('Error viewing reservation:', error);
        } finally {
            client.release();
        }
    }

    // Sign up as a guest
    async signUp(
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        phoneNumber: string
    ): Promise<boolean> {
        const client = await pool.connect();
        try {
            await client.query(
                'INSERT INTO guests (username, password, first_name, last_name, phone_number) VALUES ($1, $2, $3, $4, $5)',
                [username, password, firstName, lastName, phoneNumber]
            );
            return true;
        } catch (error) {
            console.error('Error signing up guest:', error);
            return false;
        } finally {
            client.release();
        }
    }

    // Edit guest info
    async editGuest(
        username: string,
        firstName: string,
        lastName: string,
        password: string,
        phoneNumber: string
    ): Promise<boolean> {
        const client = await pool.connect();
        try {
            await client.query(
                'UPDATE guests SET first_name = $1, last_name = $2, password = $3, phone_number = $4 WHERE username = $5',
                [firstName, lastName, password, phoneNumber, username]
            );
            return true;
        } catch (error) {
            console.error('Error editing guest:', error);
            return false;
        } finally {
            client.release();
        }
    }

    // USER INTERFACE METHODS

    authenticate(username: string, password: string): number {
        return this.username === username && this.password === password ? this.id : -1;
    }

    async sendMessage(content: string, senderID: number, receiverID: number): Promise<void> {
        const client = await pool.connect();
        try {
            await client.query(
                'INSERT INTO messages (content, sender_id, receiver_id) VALUES ($1, $2, $3)',
                [content, senderID, receiverID]
            );
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            client.release();
        }
    }

    async deleteMessage(messageID: number): Promise<boolean> {
        const client = await pool.connect();
        try {
            const result = await client.query(
                'DELETE FROM messages WHERE id = $1 AND sender_id = $2',
                [messageID, this.id]
            );
            return (result.rowCount ?? 0) > 0;
        } catch (error) {
            console.error('Error deleting message:', error);
            return false;
        } finally {
            client.release();
        }
    }

    // Getters & Setters
    getID(): number {
        return this.id;
    }
    setID(id: number): void {
        this.id = id;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }
    setPhoneNumber(phone: string): void {
        this.phoneNumber = phone;
    }

    getUsername(): string {
        return this.username;
    }
    setUsername(username: string): void {
        this.username = username;
    }

    getPassword(): string {
        return this.password;
    }
    setPassword(password: string): void {
        this.password = password;
    }

    getFirstName(): string {
        return this.firstName;
    }
    setFirstName(name: string): void {
        this.firstName = name;
    }

    getLastName(): string {
        return this.lastName;
    }
    setLastName(name: string): void {
        this.lastName = name;
    }
}
