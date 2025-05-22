"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const renderingEmployeeFiles_1 = require("../controller/renderingEmployeeFiles");
const renderingEmployeeFilesRouter = express_1.default.Router();
renderingEmployeeFilesRouter.get('/', (req, res) => {
    res.redirect('/employee/dashboard/book');
});
renderingEmployeeFilesRouter.get('/dashboard/book', renderingEmployeeFiles_1.loadEmployeeBook);
renderingEmployeeFilesRouter.get('/dashboard/booking', renderingEmployeeFiles_1.loadEmployeeBooking);
renderingEmployeeFilesRouter.get('/dashboard/guest', renderingEmployeeFiles_1.loadEmployeeGuest);
renderingEmployeeFilesRouter.get('/dashboard/hotel', renderingEmployeeFiles_1.loadEmployeeHotel);
renderingEmployeeFilesRouter.get('/dashboard/room', renderingEmployeeFiles_1.loadEmployeeRoom);
renderingEmployeeFilesRouter.get('/dashboard/transaction', renderingEmployeeFiles_1.loadEmployeeTransaction);
renderingEmployeeFilesRouter.post('/guest/id', renderingEmployeeFiles_1.searchGuestById);
renderingEmployeeFilesRouter.post('/guest/username', renderingEmployeeFiles_1.searchGuestByUsername);
renderingEmployeeFilesRouter.post('/guest/reservations/:id', renderingEmployeeFiles_1.loadUserReservation);
exports.default = renderingEmployeeFilesRouter;
