"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEmployeeTransaction = exports.loadEmployeeRoom = exports.loadEmployeeHotel = exports.loadEmployeeGuest = exports.loadEmployeeBook = void 0;
const loadEmployeeBook = (req, res) => {
    res.render('employee/book/BookHotel');
};
exports.loadEmployeeBook = loadEmployeeBook;
const loadEmployeeGuest = (req, res) => {
    res.render('employee/guest/guest');
};
exports.loadEmployeeGuest = loadEmployeeGuest;
const loadEmployeeHotel = (req, res) => {
    res.render('employee/hotel/hotel');
};
exports.loadEmployeeHotel = loadEmployeeHotel;
const loadEmployeeRoom = (req, res) => {
    res.render('employee/room/room');
};
exports.loadEmployeeRoom = loadEmployeeRoom;
const loadEmployeeTransaction = (req, res) => {
    res.render('employee/transaction/transaction');
};
exports.loadEmployeeTransaction = loadEmployeeTransaction;
