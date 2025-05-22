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
exports.bookHotelExisting = exports.bookHotelNew = void 0;
const guest_1 = __importDefault(require("../models/guest")); // Adjust import path as needed
const reservations_1 = __importDefault(require("../models/reservations")); // Adjust import path as needed
const transactions_1 = require("../models/transactions");
const bookHotelNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { "first-name": firstName, "last-name": lastName, "phone-number": phoneNumber, email, "social-security-id": socialSecurityId, username, password, "check-in": checkIn, "check-out": checkOut, hotel, // room_id
         } = req.body;
        // Validate date input
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
            return res.render('employee/book/success', {
                message: "Invalid check-in/check-out dates."
            });
        }
        // Check if guest already exists
        const existingGuest = yield guest_1.default.findByUsername(username); // You’re implementing this
        if (existingGuest) {
            return res.render('employee/book/success', {
                message: "An account with this username already exists. Please log in instead."
            });
        }
        // Create new guest and reservation
        const guest = new guest_1.default(socialSecurityId, firstName, lastName, phoneNumber, username, password, email);
        yield guest.createGuest();
        const reservation = new reservations_1.default(0, // reservation_id will be auto-generated
        socialSecurityId, hotel, start, end);
        yield reservation.addReservation();
        createTransaction(reservation);
        res.render('employee/book/success', {
            message: "Booking successful"
        });
    }
    catch (err) {
        console.error("Booking error:", err);
        res.render('employee/book/success', {
            message: "Server error while booking"
        });
    }
});
exports.bookHotelNew = bookHotelNew;
const bookHotelExisting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, "user-id": userId, // assumed to be social_security_id
        "check-in": checkIn, "check-out": checkOut, hotel // room_id
         } = req.body;
        // Basic presence validation
        if (!username && !userId) {
            return res.render('employee/book/success', {
                message: "Missing user identifier. Please provide a username or user ID."
            });
        }
        // Validate dates
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
            return res.render('employee/book/success', {
                message: "Invalid check-in/check-out dates."
            });
        }
        // Find the existing guest
        let guest;
        if (username) {
            guest = yield guest_1.default.findByUsername(username);
        }
        else {
            guest = yield guest_1.default.findByID(userId);
        }
        if (!guest) {
            return res.render('employee/book/success', {
                message: "Guest not found. Please ensure you're using the correct username or user ID."
            });
        }
        // Create reservation
        const reservation = new reservations_1.default(0, // reservation_id (auto-generated)
        guest.getUserId(), // assuming this is how it's stored
        hotel, start, end);
        const reservationID = yield reservation.addReservation();
        reservation.setReservationId(reservationID);
        createTransaction(reservation);
        res.render('employee/book/success', {
            message: "Booking successful"
        });
    }
    catch (err) {
        console.error("Booking error (existing user):", err);
        res.render('employee/book/success', {
            message: "Server error while booking"
        });
    }
});
exports.bookHotelExisting = bookHotelExisting;
const createTransaction = (reservation) => __awaiter(void 0, void 0, void 0, function* () {
    const totalPrice = yield reservation.calculateTotalPrice();
    const transaction = new transactions_1.Transactions(0, reservation.getReservationId(), new Date(), totalPrice, 0);
    transaction.addTransactionToDB();
    return;
});
