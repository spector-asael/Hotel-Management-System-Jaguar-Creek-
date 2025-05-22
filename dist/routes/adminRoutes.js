"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminController_1 = require("../controller/adminController");
const express_1 = __importDefault(require("express"));
const adminFilesRouter = express_1.default.Router();
adminFilesRouter.get('/', (req, res) => {
    res.redirect('/admin/dashboard/employees');
});
adminFilesRouter.get('/dashboard/employees', adminController_1.loadAdminUsers);
adminFilesRouter.get('/dashboard/hotels', adminController_1.loadHotels);
adminFilesRouter.get('/dashboard/add-employees', adminController_1.loadAdminEmployeeForm);
adminFilesRouter.get('/dashboard/add-hotels', adminController_1.loadAdminHotelForm);
exports.default = adminFilesRouter;
