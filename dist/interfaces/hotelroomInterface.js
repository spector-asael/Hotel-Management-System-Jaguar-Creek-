"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRoomInterface = void 0;
class HotelRoomInterface {
    constructor(room_id, room_name, room_image_path, room_description, room_price_rate, room_capacity) {
        this.room_id = room_id;
        this.room_name = room_name;
        this.room_image_path = room_image_path;
        this.room_description = room_description;
        this.room_price_rate = room_price_rate;
        this.room_capacity = room_capacity;
    }
}
exports.HotelRoomInterface = HotelRoomInterface;
/*
CREATE TABLE hotel_rooms (
    room_id SERIAL PRIMARY KEY,
    room_name VARCHAR(50) NOT NULL,
    room_image_path VARCHAR(1024) NOT NULL,
    room_description TEXT,
    room_price_rate DECIMAL(10, 2) NOT NULL,
    room_capacity INT NOT NULL
);
*/ 
