"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadGuestRooms = void 0;
const hotelroom_1 = __importDefault(require("../models/hotelroom"));
const loadGuestRooms = (req, res) => {
    const hotels = hotelroom_1.default.getAllRooms();
    res.render("guest/rooms/rooms", { hotels });
};
exports.loadGuestRooms = loadGuestRooms;
