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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionStatus = exports.returnTransactionInformation = void 0;
const transactions_1 = require("../models/transactions");
const returnTransactionInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservationID = req.body.reservation_id;
    const transaction = yield transactions_1.Transactions.findTransactionByReservationID(reservationID);
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
});
exports.returnTransactionInformation = returnTransactionInformation;
const updateTransactionStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { reservation_id } = req.body;
    try {
        // Validate inputs
        if (typeof reservation_id !== "number") {
            res.status(400).json({ error: "Invalid reservation_id" });
            return;
        }
        const transaction = yield transactions_1.Transactions.findTransactionByReservationID(reservation_id);
        if (!transaction) {
            res.status(404).json({ error: "Transaction not found" });
            return;
        }
        yield transaction.updateTransactionStatus(reservation_id, 1);
        res.status(200).json({ message: "Transaction status updated successfully" });
        return;
    }
    catch (error) {
        console.error("Error updating transaction status:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});
exports.updateTransactionStatus = updateTransactionStatus;
