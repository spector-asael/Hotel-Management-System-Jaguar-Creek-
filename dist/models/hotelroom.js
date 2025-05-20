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
const hotelroomInterface_1 = require("../interfaces/hotelroomInterface");
const config_1 = __importDefault(require("../db/config"));
class HotelRoom extends hotelroomInterface_1.HotelRoomInterface {
    constructor(room_id, room_name, room_image_path, room_description, room_price_rate, room_capacity) {
        super(room_id, room_name, room_image_path, room_description, room_price_rate, room_capacity);
    }
    getRoomId() {
        return this.room_id;
    }
    getRoomName() {
        return this.room_name;
    }
    getRoomImagePath() {
        return this.room_image_path;
    }
    getRoomDescription() {
        return this.room_description;
    }
    getRoomPriceRate() {
        return this.room_price_rate;
    }
    getRoomCapacity() {
        return this.room_capacity;
    }
    setRoomId(room_id) {
        this.room_id = room_id;
    }
    setRoomName(room_name) {
        this.room_name = room_name;
    }
    setRoomImagePath(room_image_path) {
        this.room_image_path = room_image_path;
    }
    setRoomDescription(room_description) {
        this.room_description = room_description;
    }
    setRoomPriceRate(room_price_rate) {
        this.room_price_rate = room_price_rate;
    }
    setRoomCapacity(room_capacity) {
        this.room_capacity = room_capacity;
    }
    addRoom() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO hotel_rooms (
                room_name,
                room_image_path,
                room_description,
                room_price_rate,
                room_capacity
            ) VALUES ($1, $2, $3, $4, $5)
        `;
            const values = [
                this.room_name,
                this.room_image_path,
                this.room_description,
                this.room_price_rate,
                this.room_capacity
            ];
            try {
                yield config_1.default.query(query, values);
                console.log('Room added successfully');
            }
            catch (err) {
                console.error('Error adding room:', err);
                throw err;
            }
        });
    }
    static getAllRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM hotel_rooms';
            try {
                const result = yield config_1.default.query(query);
                return result.rows.map((row) => new HotelRoom(row.room_id, row.room_name, row.room_image_path, row.room_description, row.room_price_rate, row.room_capacity));
            }
            catch (err) {
                console.error('Error fetching all rooms:', err);
                throw err;
            }
        });
    }
    static getRoomById(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM hotel_rooms WHERE room_id = $1';
            try {
                const result = yield config_1.default.query(query, [room_id]);
                if (result.rows.length > 0) {
                    const row = result.rows[0];
                    return new HotelRoom(row.room_id, row.room_name, row.room_image_path, row.room_description, row.room_price_rate, row.room_capacity);
                }
                return null;
            }
            catch (err) {
                console.error('Error fetching room by ID:', err);
                throw err;
            }
        });
    }
}
exports.default = HotelRoom;
