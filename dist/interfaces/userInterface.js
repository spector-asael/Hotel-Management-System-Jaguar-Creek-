"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserInterface {
    constructor(user_id, first_name, last_name, phone_number, username, password, email) {
        this.user_id = 0;
        this.first_name = '';
        this.last_name = '';
        this.phone_number = '';
        this.username = '';
        this.password = '';
        this.email = '';
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
exports.default = UserInterface;
