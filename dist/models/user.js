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
const userInterface_1 = __importDefault(require("../interfaces/userInterface"));
const config_1 = __importDefault(require("../db/config"));
class User extends userInterface_1.default {
    constructor(user_id, first_name, last_name, phone_number, username, password, email) {
        super(user_id, first_name, last_name, phone_number, username, password, email);
    }
    getUserId() {
        return this.user_id;
    }
    getFirstName() {
        return this.first_name;
    }
    getLastName() {
        return this.last_name;
    }
    getPhoneNumber() {
        return this.phone_number;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getEmail() {
        return this.email;
    }
    setUserId(user_id) {
        this.user_id = user_id;
    }
    setFirstName(first_name) {
        this.first_name = first_name;
    }
    setLastName(last_name) {
        this.last_name = last_name;
    }
    setPhoneNumber(phone_number) {
        this.phone_number = phone_number;
    }
    setUsername(username) {
        this.username = username;
    }
    setPassword(password) {
        this.password = password;
    }
    setEmail(email) {
        this.email = email;
    }
    static findRole(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT user_role_id FROM users WHERE username = $1';
            const values = [username];
            try {
                const result = yield config_1.default.query(query, values);
                if (result.rows.length === 0) {
                    console.warn(`No user found with username: ${username}`);
                    return -1; // Return -1 if user not found
                }
                return result.rows[0].user_role_id; // Return the role ID
            }
            catch (err) {
                console.error('Database error in findRole:', err);
                return -1; // Return -1 if there’s a DB error
            }
        });
    }
}
exports.default = User;
