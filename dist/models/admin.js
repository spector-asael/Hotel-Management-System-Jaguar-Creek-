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
exports.Admin = void 0;
// models/Guest.ts
const admininterface_1 = __importDefault(require("../interfaces/admininterface"));
const config_1 = __importDefault(require("../db/config"));
class Admin extends admininterface_1.default {
    constructor(user_id, first_name, last_name, phone_number, username, password, email) {
        super(user_id, first_name, last_name, phone_number, username, password, email);
    }
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO users (user_id, user_first_name, user_last_name, user_phone_number, username, user_password, user_email, user_role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
            const values = [this.getUserId(), this.getFirstName(), this.getLastName(), this.getPhoneNumber(), this.getUsername(), this.getPassword(), this.getEmail(), 2];
            try {
                yield config_1.default.query(query, values);
            }
            catch (error) {
                console.error('Error creating guest:', error);
                throw error;
            }
        });
    }
    validatePassword(username, password) {
        if (password === this.getPassword()) {
            return 2;
        }
        else {
            return -1;
        }
    }
    static findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users WHERE username = $1';
            const values = [username];
            try {
                const result = yield config_1.default.query(query, values);
                if (result.rows.length === 0)
                    return null;
                const row = result.rows[0];
                return new Admin(row.user_id, row.user_first_name, row.user_last_name, row.user_phone_number, row.username, row.user_password, row.user_email);
            }
            catch (err) {
                console.error('Error finding guest:', err);
                throw err;
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users where user_role_id != 2';
            try {
                const result = yield config_1.default.query(query);
                return result.rows.map((row) => new Admin(row.user_id, row.user_first_name, row.user_last_name, row.user_phone_number, row.username, row.user_password, row.user_email));
            }
            catch (err) {
                console.error('Error fetching all users:', err);
                throw err;
            }
        });
    }
    static deleteUserByID(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `DELETE FROM users WHERE user_id = $1`;
                const result = yield config_1.default.query(query, [user_id]);
            }
            catch (error) {
                console.error("Error deleting user by ID:", error);
            }
        });
    }
    static deleteRoomByID(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `DELETE FROM hotel_rooms WHERE room_id = $1`;
                const result = yield config_1.default.query(query, [room_id]);
            }
            catch (error) {
                console.error("Error deleting hotel room:", error);
                return;
            }
        });
    }
}
exports.Admin = Admin;
