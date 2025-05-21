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
const config_1 = __importDefault(require("../db/config"));
const reservationInterface_1 = __importDefault(require("../interfaces/reservationInterface"));
class Reservation extends reservationInterface_1.default {
    constructor(reservation_id, user_id, room_id, start_date, end_date) {
        super(reservation_id, user_id, room_id, start_date, end_date);
    }
    getReservationId() {
        return this.reservation_id;
    }
    getUserId() {
        return this.user_id;
    }
    getRoomId() {
        return this.room_id;
    }
    getStartDate() {
        return this.start_date;
    }
    getEndDate() {
        return this.end_date;
    }
    setReservationId(reservation_id) {
        this.reservation_id = reservation_id;
    }
    setUserId(user_id) {
        this.user_id = user_id;
    }
    setRoomId(room_id) {
        this.room_id = room_id;
    }
    setStartDate(start_date) {
        this.start_date = start_date;
    }
    setEndDate(end_date) {
        this.end_date = end_date;
    }
    addReservation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hi");
            const query = `
            INSERT INTO reservations (
                user_id,
                room_id,
                start_date,
                end_date
            ) VALUES ($1, $2, $3, $4)
        `;
            const values = [this.user_id, this.room_id, this.start_date, this.end_date];
            try {
                yield config_1.default.query(query, values);
                console.log('Reservation added successfully');
            }
            catch (err) {
                console.error('Error adding reservation:', err);
                throw err;
            }
        });
    }
    getAllReservations() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM reservations';
            try {
                const result = yield config_1.default.query(query);
                return result.rows.map(row => new Reservation(row.reservation_id, row.user_id, row.room_id, new Date(row.start_date), new Date(row.end_date)));
            }
            catch (err) {
                console.error('Error fetching all reservations:', err);
                throw err;
            }
        });
    }
    getReservationsByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM reservations WHERE user_id = $1';
            try {
                const result = yield config_1.default.query(query, [user_id]);
                return result.rows.map(row => new Reservation(row.reservation_id, row.user_id, row.room_id, new Date(row.start_date), new Date(row.end_date)));
            }
            catch (err) {
                console.error('Error fetching reservations by user ID:', err);
                throw err;
            }
        });
    }
    static findReservationByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM RESERVATIONS WHERE user_id = $1';
            const values = [user_id];
            try {
                const result = yield config_1.default.query(query, values); // assuming this.db is your database instance
                return result.rows;
            }
            catch (error) {
                console.error('Error fetching reservation by user ID:', error);
                throw error;
            }
        });
    }
}
exports.default = Reservation;
