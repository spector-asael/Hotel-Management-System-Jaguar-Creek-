import { UserClass } from "./usersC";
import { Employee } from "../interface/employeeInterface";
import { Guest } from "../interface/guesInterface";
import { HotelRoom } from "../interface/roomInterface";
import { HotelReservation } from "../interface/reservationInterface";
import { HotelReservationClass } from "../models/reservationC"; // adjust path if needed
import pool from "../db/config";

export class EmployeeClass extends UserClass implements Employee {
  constructor(
    id: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) {
    super(id, username, password, firstName, lastName, phoneNumber);
  }

  displayEmployee(): void {
    console.log(`Employee: ${this.firstName} ${this.lastName}`);
    console.log(`Phone: ${this.phoneNumber}`);
    console.log(`Username: ${this.username}`);
  }

  async bookReservation(
    guest: Guest,
    startDate: string,
    endDate: string,
    room: HotelRoom
  ): Promise<boolean> {
    try {
      const reservationID = Date.now(); // or use SERIAL in DB
      await pool.query(
        `INSERT INTO reservations (id, guest_id, room_id, start_date, end_date, is_paid)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [reservationID, guest.getID(), room.getRoomID(), startDate, endDate, false]
      );
      return true;
    } catch (err) {
      console.error("Error booking reservation:", err);
      return false;
    }
  }

  async cancelReservation(reservationID: number): Promise<boolean> {
    try {
      const res = await pool.query(`DELETE FROM reservations WHERE id = $1`, [reservationID]);
      return typeof res.rowCount === "number" && res.rowCount > 0;
    } catch (err) {
      console.error("Error cancelling reservation:", err);
      return false;
    }
  }

  async searchReservation(name: string, id: number): Promise<HotelReservation | null> {
    try {
      const res = await pool.query(
        `SELECT r.*, g.first_name FROM reservations r
         JOIN guests g ON r.guest_id = g.id
         WHERE r.id = $1 AND g.first_name = $2`,
        [id, name]
      );
      if (res.rows.length > 0) {
        const row = res.rows[0];
        // You can build and return a HotelReservationClass here if needed
        return row as unknown as HotelReservation;
      }
      return null;
    } catch (err) {
      console.error("Error searching reservation:", err);
      return null;
    }
  }

  async processTransaction(reservationID: number, amount: number): Promise<boolean> {
    try {
      const rateRes = await pool.query(
        `SELECT h.price_rate FROM reservations r
         JOIN hotel_rooms h ON r.room_id = h.id
         WHERE r.id = $1`,
        [reservationID]
      );
  
      if (rateRes.rows.length === 0) return false;
  
      const priceRate = rateRes.rows[0].price_rate;
  
      if (amount >= priceRate) {
        const updateRes = await pool.query(
          `UPDATE reservations SET is_paid = true WHERE id = $1`,
          [reservationID]
        );
        return typeof updateRes.rowCount === "number" && updateRes.rowCount > 0;
      }
  
      return false;
    } catch (err) {
      console.error("Error processing transaction:", err);
      return false;
    }
  }
}