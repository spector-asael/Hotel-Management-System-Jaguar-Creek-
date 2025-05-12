import { Transaction } from "../interface/transactionInterface";
import { HotelReservation } from "../interface/reservationInterface";

export class TransactionClass implements Transaction {
  private transactionID: number;
  private reservation: HotelReservation;
  private transactionDate: string;
  private billAmount: number;

  constructor(
    transactionID: number,
    reservation: HotelReservation,
    transactionDate: string
  ) {
    this.transactionID = transactionID;
    this.reservation = reservation;
    this.transactionDate = transactionDate;
    this.billAmount = this.calculateBill(); // Initialize with calculated bill
  }

  getTransactionID(): number {
    return this.transactionID;
  }

  setTransactionID(id: number): void {
    this.transactionID = id;
  }

  getReservation(): HotelReservation {
    return this.reservation;
  }

  setReservation(reservation: HotelReservation): void {
    this.reservation = reservation;
    this.billAmount = this.calculateBill(); // Recalculate bill on update
  }

  getTransactionDate(): string {
    return this.transactionDate;
  }

  setTransactionDate(date: string): void {
    this.transactionDate = date;
  }

  getBillAmount(): number {
    return this.billAmount;
  }

  setBillAmount(amount: number): void {
    this.billAmount = amount;
  }

  calculateBill(): number {
    const start = this.reservation.getStartDate();
    const end = this.reservation.getEndDate();
    const pricePerDay = this.reservation.getHotel().getPriceRate();

    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days * pricePerDay;
  }

  displayTransaction(): void {
    console.log("Transaction Details:");
    console.log(`Transaction ID: ${this.transactionID}`);
    console.log(`Transaction Date: ${this.transactionDate}`);
    console.log(`Guest: ${this.reservation.getGuest().getFirstName()} ${this.reservation.getGuest().getLastName()}`);
    console.log(`Room: ${this.reservation.getHotel().getRoomName()}`);
    console.log(`Bill Amount: $${this.billAmount.toFixed(2)}`);
  }
}
