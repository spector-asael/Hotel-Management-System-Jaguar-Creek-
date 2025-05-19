import { HotelReservation } from "./reservationInterface";

export interface Transaction {
  getTransactionID(): number;
  setTransactionID(id: number): void;

  getReservation(): HotelReservation;
  setReservation(reservation: HotelReservation): void;

  getTransactionDate(): string;
  setTransactionDate(date: string): void;

  getBillAmount(): number;
  setBillAmount(amount: number): void;

  calculateBill(): number;
  displayTransaction(): void;
}
