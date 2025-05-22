"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const config_1 = __importDefault(require("../db/config")); // Update with your actual db path
const transactionInterface_1 = require("../interfaces/transactionInterface"); // Adjust import path if needed
class Transactions extends transactionInterface_1.TransactionInterface {
    constructor(transaction_id, reservation_id, transaction_date, transaction_amount, transaction_status) {
        super(transaction_id, reservation_id, transaction_date, transaction_amount, transaction_status);
    }
    getTransactionId() {
        return this.transaction_id;
    }
    getReservationId() {
        return this.reservation_id;
    }
    getTransactionDate() {
        return this.transaction_date;
    }
    getTransactionAmount() {
        return this.transaction_amount;
    }
    getTransactionStatus() {
        return this.transaction_status;
    }
    setTransactionId(transaction_id) {
        this.transaction_id = transaction_id;
    }
    setReservationId(reservation_id) {
        this.reservation_id = reservation_id;
    }
    setTransactionDate(transaction_date) {
        this.transaction_date = transaction_date;
    }
    setTransactionAmount(transaction_amount) {
        this.transaction_amount = transaction_amount;
    }
    setTransactionStatus(transaction_status) {
        this.transaction_status = transaction_status;
    }
    addTransactionToDB() {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield config_1.default.query(query, values);
                this.transaction_id = result.rows[0].transaction_id;
            }
            catch (error) {
                console.error('Error inserting transaction into DB:', error);
                throw error;
            }
        });
    }
    static findTransactionByReservationID(reservation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM transactions WHERE reservation_id = $1';
            const values = [reservation_id];
            try {
                const result = yield config_1.default.query(query, values);
                if (result.rows.length === 0)
                    return null;
                const row = result.rows[0];
                return new Transactions(row.transaction_id, row.reservation_id, row.transaction_date, row.transaction_amount, row.transaction_status);
            }
            catch (error) {
                console.error('Error finding transaction by reservation ID:', error);
                throw error;
            }
        });
    }
    updateTransactionStatus(reservation_id, transaction_status) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      UPDATE transactions 
      SET transaction_status = $1
      WHERE reservation_id = $2
    `;
            try {
                yield config_1.default.query(query, [transaction_status, reservation_id]);
                this.transaction_status = transaction_status; // optional: keep class state in sync
            }
            catch (error) {
                console.error("Failed to update transaction status:", error);
                throw new Error("Could not update transaction status");
            }
        });
    }
}
exports.Transactions = Transactions;
