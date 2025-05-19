"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionClass = void 0;
class TransactionClass {
    constructor(transactionID, reservation, transactionDate) {
        this.transactionID = transactionID;
        this.reservation = reservation;
        this.transactionDate = transactionDate;
        this.billAmount = this.calculateBill(); // Initialize with calculated bill
    }
    getTransactionID() {
        return this.transactionID;
    }
    setTransactionID(id) {
        this.transactionID = id;
    }
    getReservation() {
        return this.reservation;
    }
    setReservation(reservation) {
        this.reservation = reservation;
        this.billAmount = this.calculateBill(); // Recalculate bill on update
    }
    getTransactionDate() {
        return this.transactionDate;
    }
    setTransactionDate(date) {
        this.transactionDate = date;
    }
    getBillAmount() {
        return this.billAmount;
    }
    setBillAmount(amount) {
        this.billAmount = amount;
    }
    calculateBill() {
        const start = this.reservation.getStartDate();
        const end = this.reservation.getEndDate();
        const pricePerDay = this.reservation.getHotel().getPriceRate();
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return days * pricePerDay;
    }
    displayTransaction() {
        console.log("Transaction Details:");
        console.log(`Transaction ID: ${this.transactionID}`);
        console.log(`Transaction Date: ${this.transactionDate}`);
        console.log(`Guest: ${this.reservation.getGuest().getFirstName()} ${this.reservation.getGuest().getLastName()}`);
        console.log(`Room: ${this.reservation.getHotel().getRoomName()}`);
        console.log(`Bill Amount: $${this.billAmount.toFixed(2)}`);
    }
}
exports.TransactionClass = TransactionClass;
