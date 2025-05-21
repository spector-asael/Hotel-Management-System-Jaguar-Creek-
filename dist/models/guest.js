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
// models/Guest.ts
const guestInterface_1 = __importDefault(require("../interfaces/guestInterface"));
const config_1 = __importDefault(require("../db/config"));
class Guest extends guestInterface_1.default {
    constructor(user_id, first_name, last_name, phone_number, username, password, email) {
        super(user_id, first_name, last_name, phone_number, username, password, email);
    }
    createGuest() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("creating guest...");
            const query = 'INSERT INTO users (user_id, user_first_name, user_last_name, user_phone_number, username, user_password, user_email, user_role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
            const values = [this.getUserId(), this.getFirstName(), this.getLastName(), this.getPhoneNumber(), this.getUsername(), this.getPassword(), this.getEmail(), 0];
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
        return password === this.getPassword() ? 0 : -1;
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
                return new Guest(row.user_id, row.user_first_name, row.user_last_name, row.user_phone_number, row.username, row.user_password, row.user_email);
            }
            catch (err) {
                console.error('Error finding guest:', err);
                throw err;
            }
        });
    }
    static findByID(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users WHERE user_id = $1';
            const values = [user_id];
            try {
                const result = yield config_1.default.query(query, values);
                if (result.rows.length === 0)
                    return null;
                const row = result.rows[0];
                return new Guest(row.user_id, row.user_first_name, row.user_last_name, row.user_phone_number, row.username, row.user_password, row.user_email);
            }
            catch (err) {
                console.error('Error finding guest:', err);
                throw err;
            }
        });
    }
}
exports.default = Guest;
