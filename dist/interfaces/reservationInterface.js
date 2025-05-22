"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReservationInterface {
    constructor(reservation_id, user_id, room_id, start_date, end_date) {
        this.reservation_id = 0;
        this.user_id = 0;
        this.room_id = 0;
        this.start_date = new Date();
        this.end_date = new Date();
        this.reservation_id = reservation_id;
        this.user_id = user_id;
        this.room_id = room_id;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}
exports.default = ReservationInterface;
