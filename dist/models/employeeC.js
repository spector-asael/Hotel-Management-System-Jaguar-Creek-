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
exports.EmployeeClass = void 0;
const usersC_1 = require("./usersC");
const config_1 = __importDefault(require("../db/config"));
class EmployeeClass extends usersC_1.UserClass {
    constructor(id, username, password, firstName, lastName, phoneNumber) {
        super(id, username, password, firstName, lastName, phoneNumber);
    }
    displayEmployee() {
        console.log(`Employee: ${this.firstName} ${this.lastName}`);
        console.log(`Phone: ${this.phoneNumber}`);
        console.log(`Username: ${this.username}`);
    }
    bookReservation(guest, startDate, endDate, room) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservationID = Date.now(); // or use SERIAL in DB
                yield config_1.default.query(`INSERT INTO reservations (id, guest_id, room_id, start_date, end_date, is_paid)
         VALUES ($1, $2, $3, $4, $5, $6)`, [reservationID, guest.getID(), room.getRoomID(), startDate, endDate, false]);
                return true;
            }
            catch (err) {
                console.error("Error booking reservation:", err);
                return false;
            }
        });
    }
    cancelReservation(reservationID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield config_1.default.query(`DELETE FROM reservations WHERE id = $1`, [reservationID]);
                return typeof res.rowCount === "number" && res.rowCount > 0;
            }
            catch (err) {
                console.error("Error cancelling reservation:", err);
                return false;
            }
        });
    }
    searchReservation(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield config_1.default.query(`SELECT r.*, g.first_name FROM reservations r
         JOIN guests g ON r.guest_id = g.id
         WHERE r.id = $1 AND g.first_name = $2`, [id, name]);
                if (res.rows.length > 0) {
                    const row = res.rows[0];
                    // You can build and return a HotelReservationClass here if needed
                    return row;
                }
                return null;
            }
            catch (err) {
                console.error("Error searching reservation:", err);
                return null;
            }
        });
    }
    processTransaction(reservationID, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rateRes = yield config_1.default.query(`SELECT h.price_rate FROM reservations r
         JOIN hotel_rooms h ON r.room_id = h.id
         WHERE r.id = $1`, [reservationID]);
                if (rateRes.rows.length === 0)
                    return false;
                const priceRate = rateRes.rows[0].price_rate;
                if (amount >= priceRate) {
                    const updateRes = yield config_1.default.query(`UPDATE reservations SET is_paid = true WHERE id = $1`, [reservationID]);
                    return typeof updateRes.rowCount === "number" && updateRes.rowCount > 0;
                }
                return false;
            }
            catch (err) {
                console.error("Error processing transaction:", err);
                return false;
            }
        });
    }
}
exports.EmployeeClass = EmployeeClass;
