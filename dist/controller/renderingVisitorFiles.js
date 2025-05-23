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
exports.loadVisitorRooms = exports.loadAboutPage = exports.loadContactPage = exports.loadTeamPage = exports.loadGuestHomepage = exports.loadSignupSuccess = exports.loadSignupForm = exports.loadHomePage = exports.loadLoginForm = void 0;
const reservations_1 = __importDefault(require("../models/reservations"));
const hotelroom_1 = __importDefault(require("../models/hotelroom"));
const loadLoginForm = (req, res) => {
    res.render('visitor/login/login', { logged: !!req.session.user });
};
exports.loadLoginForm = loadLoginForm;
const loadHomePage = (req, res) => {
    res.render('visitor/homepage/homepage', { logged: !!req.session.user });
};
exports.loadHomePage = loadHomePage;
const loadSignupForm = (req, res) => {
    res.render('visitor/signup/signup', { logged: !!req.session.user });
};
exports.loadSignupForm = loadSignupForm;
const loadSignupSuccess = (req, res) => {
    res.render('visitor/success/signup-success', { logged: !!req.session.user });
};
exports.loadSignupSuccess = loadSignupSuccess;
const loadGuestHomepage = (req, res) => {
    res.render('guest/homepage/homepage', { logged: !!req.session.user });
};
exports.loadGuestHomepage = loadGuestHomepage;
const loadTeamPage = (req, res) => {
    res.render('visitor/team/team', { logged: !!req.session.user });
};
exports.loadTeamPage = loadTeamPage;
const loadContactPage = (req, res) => {
    res.render('visitor/contact/contact', { logged: !!req.session.user });
};
exports.loadContactPage = loadContactPage;
const loadAboutPage = (req, res) => {
    res.render('visitor/about/about', { logged: !!req.session.user });
};
exports.loadAboutPage = loadAboutPage;
const loadVisitorRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    if (!user) {
        const id = req.params.id;
        const room = yield hotelroom_1.default.getRoomById(Number(id));
        const hotels = yield hotelroom_1.default.getAllRooms();
        if (!hotels) {
            res.send("Hotels could not be loaded");
            return;
        }
        if (room == null) {
            res.send("Room not found");
            return;
        }
        const takenDays = yield getAllReservedDays(room);
        if (!takenDays) {
            res.send("An error occurred");
            return;
        }
        res.render("guest/rooms/room-visitor", {
            hotels,
            room,
            takenDays,
            logged: false
        });
    }
    else if (user.role == 0) {
        res.redirect("/guest/rooms/1");
    }
});
exports.loadVisitorRooms = loadVisitorRooms;
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
