import pool from '../db/config'; // Update with your actual db path
import { QueryResult } from 'pg';
import { TransactionInterface } from '../interfaces/transactionInterface'; // Adjust import path if needed

export class Transactions extends TransactionInterface {

  constructor(
    transaction_id: number,
    reservation_id: number,
    transaction_date: Date,
    transaction_amount: number,
    transaction_status: number
  ) {
    super(transaction_id, reservation_id, transaction_date, transaction_amount, transaction_status);
  }

  public getTransactionId(): number {
    return this.transaction_id;
  }

  public getReservationId(): number {
    return this.reservation_id;
  }

  public getTransactionDate(): Date {
    return this.transaction_date;
  }

  public getTransactionAmount(): number {
    return this.transaction_amount;
  }

  public getTransactionStatus(): number {
    return this.transaction_status;
  }

  public setTransactionId(transaction_id: number): void {
    this.transaction_id = transaction_id;
  }

  public setReservationId(reservation_id: number): void {
    this.reservation_id = reservation_id;
  }

  public setTransactionDate(transaction_date: Date): void {
    this.transaction_date = transaction_date;
  }

  public setTransactionAmount(transaction_amount: number): void {
    this.transaction_amount = transaction_amount;
  }

  public setTransactionStatus(transaction_status: number): void {
    this.transaction_status = transaction_status;
  }

  public async addTransactionToDB(): Promise<void> {
    const query = `
      INSERT INTO transactions (reservation_id, transaction_date, transaction_amount, transaction_status)
      VALUES ($1, $2, $3, $4)
      RETURNING transaction_id
    `;

    const values = [
      this.reservation_id,
      this.transaction_date,
      this.transaction_amount,
      this.transaction_status
    ];

    try {
      const result: QueryResult = await pool.query(query, values);
      this.transaction_id = result.rows[0].transaction_id;
    } catch (error) {
      console.error('Error inserting transaction into DB:', error);
      throw error;
    }
  }

  public static async findTransactionByReservationID(reservation_id: number): Promise<Transactions | null> {
    const query = 'SELECT * FROM transactions WHERE reservation_id = $1';
    const values = [reservation_id];

    try {
      const result: QueryResult = await pool.query(query, values);
      if (result.rows.length === 0) return null;

      const row = result.rows[0];
      return new Transactions(
        row.transaction_id,
        row.reservation_id,
        row.transaction_date,
        row.transaction_amount,
        row.transaction_status
      );
    } catch (error) {
      console.error('Error finding transaction by reservation ID:', error);
      throw error;
    }
  }

  public async updateTransactionStatus(reservation_id: number, transaction_status: number): Promise<void> {
    const query = `
      UPDATE transactions 
      SET transaction_status = $1
      WHERE reservation_id = $2
    `;

    try {
      await pool.query(query, [transaction_status, reservation_id]);
      this.transaction_status = transaction_status; // optional: keep class state in sync
    } catch (error) {
      console.error("Failed to update transaction status:", error);
      throw new Error("Could not update transaction status");
    }
  }
}
