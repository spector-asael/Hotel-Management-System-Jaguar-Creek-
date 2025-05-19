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
exports.UserClass = void 0;
const config_1 = __importDefault(require("../db/config")); // Adjust path to your db connection
class UserClass {
    constructor(id, username, password, firstName, lastName, phoneNumber) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
    authenticate(username, password) {
        if (this.username === username && this.password === password) {
            if (this.username === "admin")
                return 2;
            if (this.username.startsWith("emp"))
                return 1;
            return 0;
        }
        return -1;
    }
    sendMessage(content, senderID, receiverID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Step 1: Find or create a conversation between sender and receiver
                let conversationRes = yield config_1.default.query(`SELECT id FROM conversations 
         WHERE (guest_id = $1 AND employee_id = $2)
            OR (guest_id = $2 AND employee_id = $1) 
         LIMIT 1`, [senderID, receiverID]);
                let conversationID;
                if (conversationRes.rows.length === 0) {
                    const newConv = yield config_1.default.query(`INSERT INTO conversations (guest_id, employee_id) 
           VALUES ($1, $2) RETURNING id`, [senderID, receiverID]);
                    conversationID = newConv.rows[0].id;
                }
                else {
                    conversationID = conversationRes.rows[0].id;
                }
                // Step 2: Insert the message
                yield config_1.default.query(`INSERT INTO messages (conversation_id, author_id, content) 
         VALUES ($1, $2, $3)`, [conversationID, senderID, content]);
            }
            catch (err) {
                console.error("Error sending message:", err);
                throw err;
            }
        });
    }
    deleteMessage(messageID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield config_1.default.query(`DELETE FROM messages WHERE id = $1`, [messageID]);
                return typeof res.rowCount === 'number' && res.rowCount > 0;
            }
            catch (err) {
                console.error("Error deleting message:", err);
                return false;
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
    setLastName(lastName) {
        this.lastName = lastName;
    }
}
exports.UserClass = UserClass;
