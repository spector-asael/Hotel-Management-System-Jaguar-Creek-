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
const hotelroom_1 = __importDefault(require("./hotelroom"));
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
            const query = `
            INSERT INTO reservations (
                user_id,
                room_id,
                start_date,
                end_date
            ) VALUES ($1, $2, $3, $4)
             RETURNING reservation_id
        `;
            const values = [this.user_id, this.room_id, this.start_date, this.end_date];
            try {
                const result = yield config_1.default.query(query, values);
                console.log('Reservation added successfully');
                return result.rows[0].reservation_id;
            }
            catch (err) {
                console.error('Error adding reservation:', err);
                throw err;
            }
        });
    }
    /*
    public async getAllReservations(): Promise<ReservationInterface[]> {
        const query = 'SELECT * FROM reservations';

        try {
            const result = await pool.query(query);
            return result.rows.map(row => new Reservation(
                row.reservation_id,
                row.user_id,
                row.room_id,
                new Date(row.start_date),
                new Date(row.end_date)
            ));
        } catch (err) {
            console.error('Error fetching all reservations:', err);
            throw err;
        }
    }

    public async getReservationsByUserId(user_id: number): Promise<ReservationInterface[]> {
        const query = 'SELECT * FROM reservations WHERE user_id = $1';

        try {
            const result = await pool.query(query, [user_id]);
            return result.rows.map(row => new Reservation(
                row.reservation_id,
                row.user_id,
                row.room_id,
                new Date(row.start_date),
                new Date(row.end_date)
            ));
        } catch (err) {
            console.error('Error fetching reservations by user ID:', err);
            throw err;
        }
    }
    */
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
    calculateTotalPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.room_id) {
                throw new Error("Room ID is not set");
            }
            const room = yield hotelroom_1.default.getRoomById(this.room_id);
            if (!room) {
                throw new Error("Room not found");
            }
            const priceRate = room.getRoomPriceRate();
            const start = new Date(this.start_date);
            const end = new Date(this.end_date);
            // Normalize time to midnight for accurate day diff
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            const timeDiff = end.getTime() - start.getTime();
            if (timeDiff < 0) {
                throw new Error("End date cannot be before start date");
            }
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include same-day stays
            return days * priceRate;
        });
    }
}
exports.default = Reservation;
