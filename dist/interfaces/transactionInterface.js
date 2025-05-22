"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionInterface = void 0;
class TransactionInterface {
    constructor(transaction_id, reservation_id, transaction_date, transaction_amount, transaction_status) {
        this.transaction_id = 0;
        this.reservation_id = 0;
        this.transaction_date = new Date();
        this.transaction_amount = 0;
        this.transaction_status = 0;
        this.transaction_id = transaction_id;
        this.reservation_id = reservation_id;
        this.transaction_date = transaction_date;
        this.transaction_amount = transaction_amount;
        this.transaction_status = transaction_status;
    }
}
exports.TransactionInterface = TransactionInterface;
