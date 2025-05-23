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
exports.loadGuestRooms = exports.loadAllReservations = void 0;
const hotelroom_1 = __importDefault(require("../models/hotelroom"));
const reservations_1 = __importDefault(require("../models/reservations"));
const guest_1 = __importDefault(require("../models/guest"));
const loadAllReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_session = req.session.user;
    const guest_id = user_session.id;
    const hotels = yield hotelroom_1.default.getAllRooms();
    if (!hotels) {
        res.send("Hotels could not be loaded");
        return;
    }
    const guest = yield guest_1.default.findByID(guest_id);
    const reservations = yield reservations_1.default.findReservationByUserId(guest_id);
    const guest_username = guest === null || guest === void 0 ? void 0 : guest.getUsername();
    res.render("guest/reservations/reservations", { guest_username, reservations, hotels, logged: true });
});
exports.loadAllReservations = loadAllReservations;
const loadGuestRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const room = yield hotelroom_1.default.getRoomById(Number(id));
    const hotels = yield hotelroom_1.default.getAllRooms();
    if (!hotels) {
        res.send("Hotels could not be loaded");
        return;
    }
    if (!room) {
        res.send("Room not found");
        return;
    }
    const takenDays = yield getAllReservedDays(room);
    if (!takenDays) {
        res.send("An error occured");
        return;
    }
    res.render("guest/rooms/rooms", { hotels, room, takenDays, logged: true });
});
exports.loadGuestRooms = loadGuestRooms;
const getAllReservedDays = (hotel) => __awaiter(void 0, void 0, void 0, function* () {
    const reservations = yield reservations_1.default.getAllReservationsForRoom(hotel.getRoomId());
    const reservedDays = [];
    for (const res of reservations) {
        const checkIn = normalizeDate(new Date(res.getStartDate()));
        const checkOut = normalizeDate(new Date(res.getEndDate()));
        let current = new Date(checkIn);
        while (current <= checkOut) {
            reservedDays.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
    }
    return reservedDays;
});
const normalizeDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
