"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
class EmployeeInterface extends user_1.default {
    constructor(user_id, first_name, last_name, phone_number, username, password, email) {
        super(user_id, first_name, last_name, phone_number, username, password, email);
    }
}
exports.default = EmployeeInterface;
