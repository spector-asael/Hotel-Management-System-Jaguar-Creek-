import { Request, Response } from "express";
import { Transactions} from "../models/transactions";
import pool from "../db/config";

export const returnTransactionInformation = async (req: Request, res: Response) => {
    const reservationID = req.body.reservation_id;

    const transaction = await Transactions.findTransactionByReservationID(reservationID);

    if (!transaction) {
        res.json({ error: "Transaction not found" });
        return;
    }

    res.json({
        transaction_id: transaction.getTransactionId(),
        reservation_id: transaction.getReservationId(),
        transaction_date: transaction.getTransactionDate(),
        transaction_amount: transaction.getTransactionAmount(),
        transaction_status: transaction.getTransactionStatus(),
    });
 
}   

export const updateTransactionStatus = async (req: Request, res: Response) => {
    console.log(req.body);
    const { reservation_id } = req.body;
  
    try {
      // Validate inputs
      if (typeof reservation_id !== "number") {
        res.status(400).json({ error: "Invalid reservation_id" });
        return;
    }
  
      const transaction = await Transactions.findTransactionByReservationID(reservation_id);
  
      if (!transaction) {
        res.status(404).json({ error: "Transaction not found" });
        return;
      }
  
      await transaction.updateTransactionStatus(reservation_id, 1);
  
      res.status(200).json({ message: "Transaction status updated successfully" });
      return;
    } catch (error) {
      console.error("Error updating transaction status:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  };

  export const cancelReservation = async (req: Request, res: Response) => {
    const { reservation_id } = req.body;
  
    if (!reservation_id) {
      res.status(400).json({ message: 'Reservation ID is required.' });
      return 
    }
  
    try {
      // Check if reservation exists
      const check = await pool.query(
        'SELECT * FROM reservations WHERE reservation_id = $1',
        [reservation_id]
      );
  
      if (check.rows.length === 0) {
        res.status(404).json({ message: 'Reservation not found.' });
        return 
      }
  
      // Delete reservation — this will cascade delete the transaction
      await pool.query(
        'DELETE FROM reservations WHERE reservation_id = $1',
        [reservation_id]
      );
  
      res.status(200).json({ message: 'Reservation and associated transaction cancelled successfully.' });
      return 
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      res.status(500).json({ message: 'Internal server error.' });
      return 
    }
  };