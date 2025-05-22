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
exports.deleteRoom = exports.deleteUser = exports.addUser = exports.addHotel = void 0;
const hotelroom_1 = __importDefault(require("../models/hotelroom"));
const admin_1 = require("../models/admin");
const employee_1 = __importDefault(require("../models/employee"));
const guest_1 = __importDefault(require("../models/guest"));
const addHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body);
    const { room_name, room_capacity, price_per_night, room_description } = req.body;
    const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (!imagePath) {
        res.status(400).json({ error: 'Image upload failed' });
        return;
    }
    const hotelRoom = new hotelroom_1.default(0, room_name, imagePath, room_description, price_per_night, room_capacity);
    yield hotelRoom.addRoom();
    res.render("admin/success", { message: "Success! Hotel Added!" });
});
exports.addHotel = addHotel;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, phone_number, email, social_security_id, username, password, role } = req.body;
        if (!first_name || !last_name || !phone_number || !email || !social_security_id || !username || !password || role === undefined) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const numericRole = Number(role);
        if (isNaN(numericRole)) {
            res.status(400).json({ error: 'Invalid role' });
            return;
        }
        if (numericRole === 0) {
            const guest = new guest_1.default(social_security_id, first_name, last_name, phone_number, username, password, email);
            yield guest.createGuest();
        }
        else if (numericRole === 1) {
            const employee = new employee_1.default(social_security_id, first_name, last_name, phone_number, username, password, email);
            yield employee.createEmployee();
        }
        else if (numericRole === 2) {
            const admin = new admin_1.Admin(social_security_id, first_name, last_name, phone_number, username, password, email);
            yield admin.createAdmin();
        }
        else {
            res.status(400).json({ error: 'Unknown role type' });
            return;
        }
        res.render('admin/success', { message: 'User added successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.addUser = addUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        yield admin_1.Admin.deleteUserByID(id);
        res.render("admin/success", { message: "Successfully deleted user." });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.render("admin/success", { message: "Successfully deleted user." });
    }
});
exports.deleteUser = deleteUser;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Hotel ID is required" });
            return;
        }
        yield admin_1.Admin.deleteRoomByID(id);
        res.render("admin/success", { message: "Successfully deleted user." });
    }
    catch (error) {
        console.error("Error deleting hotel:", error);
        res.render("admin/success", { message: "Error." });
    }
});
exports.deleteRoom = deleteRoom;
