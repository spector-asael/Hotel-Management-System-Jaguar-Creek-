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
exports.loadEmployeeTransaction = exports.loadEmployeeRoom = exports.loadEmployeeHotel = exports.loadEmployeeGuest = exports.loadEmployeeBook = void 0;
const hotelroom_1 = __importDefault(require("../models/hotelroom"));
const loadEmployeeBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hotelRooms = yield hotelroom_1.default.getAllRooms();
    res.render('employee/book/BookHotel', { hotelRooms });
});
exports.loadEmployeeBook = loadEmployeeBook;
const loadEmployeeGuest = (req, res) => {
    let hotelRooms = hotelroom_1.default.getAllRooms();
    res.render('employee/guest/guest', { hotelRooms });
};
exports.loadEmployeeGuest = loadEmployeeGuest;
const loadEmployeeHotel = (req, res) => {
    let hotelRooms = hotelroom_1.default.getAllRooms();
    res.render('employee/hotel/hotel', { hotelRooms });
};
exports.loadEmployeeHotel = loadEmployeeHotel;
const loadEmployeeRoom = (req, res) => {
    let hotelRooms = hotelroom_1.default.getAllRooms();
    res.render('employee/room/room', { hotelRooms });
};
exports.loadEmployeeRoom = loadEmployeeRoom;
const loadEmployeeTransaction = (req, res) => {
    let hotelRooms = hotelroom_1.default.getAllRooms();
    res.render('employee/transaction/transaction', { hotelRooms });
};
exports.loadEmployeeTransaction = loadEmployeeTransaction;
