"use strict";
// guestC.ts
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
exports.Guests = void 0;
const config_1 = __importDefault(require("../db/config"));
// PostgreSQL database connection
class Guests {
    constructor(id, username, password, firstName, lastName, phoneNumber) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
    // Display guest details
    displayGuest() {
        console.log(`Guest: ${this.firstName} ${this.lastName}`);
        console.log(`Username: ${this.username}`);
        console.log(`Phone: ${this.phoneNumber}`);
    }
    // Book reservation
    bookReservation(startDate, endDate, hotelRoom, reservationDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield config_1.default.connect();
            try {
                yield client.query('INSERT INTO reservations (guest_id, room_id, start_date, end_date) VALUES ($1, $2, $3, $4)', [this.id, hotelRoom.roomId, startDate, endDate]);
                return true;
            }
            catch (error) {
                console.error('Error booking reservation:', error);
                return false;
            }
            finally {
                client.release();
            }
        });
    }
    // View reservation
    viewReservation(reservation) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield config_1.default.connect();
            try {
                const result = yield client.query('SELECT * FROM reservations WHERE reservation_id = $1 AND guest_id = $2', [reservation.reservationId, this.id]);
                console.log('Reservation:', result.rows[0]);
            }
            catch (error) {
                console.error('Error viewing reservation:', error);
            }
            finally {
                client.release();
            }
        });
    }
    // Sign up as a guest
    signUp(username, password, firstName, lastName, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield config_1.default.connect();
            try {
                yield client.query('INSERT INTO guests (username, password, first_name, last_name, phone_number) VALUES ($1, $2, $3, $4, $5)', [username, password, firstName, lastName, phoneNumber]);
                return true;
            }
            catch (error) {
                console.error('Error signing up guest:', error);
                return false;
            }
            finally {
                client.release();
            }
        });
    }
    // Edit guest info
    editGuest(username, firstName, lastName, password, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield config_1.default.connect();
            try {
                yield client.query('UPDATE guests SET first_name = $1, last_name = $2, password = $3, phone_number = $4 WHERE username = $5', [firstName, lastName, password, phoneNumber, username]);
                return true;
            }
            catch (error) {
                console.error('Error editing guest:', error);
                return false;
            }
            finally {
                client.release();
            }
        });
    }
    // USER INTERFACE METHODS
    authenticate(username, password) {
        return this.username === username && this.password === password ? this.id : -1;
    }
    sendMessage(content, senderID, receiverID) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield config_1.default.connect();
            try {
                yield client.query('INSERT INTO messages (content, sender_id, receiver_id) VALUES ($1, $2, $3)', [content, senderID, receiverID]);
            }
            catch (error) {
                console.error('Error sending message:', error);
            }
            finally {
                client.release();
            }
        });
    }
    deleteMessage(messageID) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const client = yield config_1.default.connect();
            try {
                const result = yield client.query('DELETE FROM messages WHERE id = $1 AND sender_id = $2', [messageID, this.id]);
                return ((_a = result.rowCount) !== null && _a !== void 0 ? _a : 0) > 0;
            }
            catch (error) {
                console.error('Error deleting message:', error);
                return false;
            }
            finally {
                client.release();
            }
        });
    }
    // Getters & Setters
    getID() {
        return this.id;
    }
    setID(id) {
        this.id = id;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    setPhoneNumber(phone) {
        this.phoneNumber = phone;
    }
    getUsername() {
        return this.username;
    }
    setUsername(username) {
        this.username = username;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    getFirstName() {
        return this.firstName;
    }
    setFirstName(name) {
        this.firstName = name;
    }
    getLastName() {
        return this.lastName;
    }
    setLastName(name) {
        this.lastName = name;
    }
}
exports.Guests = Guests;
