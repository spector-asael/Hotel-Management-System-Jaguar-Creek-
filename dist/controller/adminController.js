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
exports.loadAdminHotelForm = exports.loadAdminEmployeeForm = exports.loadHotels = exports.loadAdminUsers = void 0;
const hotelroom_1 = __importDefault(require("../models/hotelroom"));
const admin_1 = require("../models/admin");
const loadAdminUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield admin_1.Admin.getAllUsers();
    res.render('admin/admin-page/employee', { users });
});
exports.loadAdminUsers = loadAdminUsers;
const loadHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hotels = yield hotelroom_1.default.getAllRooms();
    res.render('admin/admin-page/admin-hotel', { hotels });
});
exports.loadHotels = loadHotels;
const loadAdminEmployeeForm = (req, res) => {
    res.render('admin/admin-page/add-employee');
};
exports.loadAdminEmployeeForm = loadAdminEmployeeForm;
const loadAdminHotelForm = (req, res) => {
    res.render('admin/admin-page/add-hotel');
};
exports.loadAdminHotelForm = loadAdminHotelForm;
