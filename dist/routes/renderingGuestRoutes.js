"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const guestRoutesController_1 = require("../controller/guestRoutesController");
const renderingGuestFilesRouter = express_1.default.Router();
renderingGuestFilesRouter.get('/', (req, res) => {
    res.redirect('/guest/rooms/1');
});
renderingGuestFilesRouter.get('/rooms/:id', guestRoutesController_1.loadGuestRooms);
renderingGuestFilesRouter.get('/reservations', guestRoutesController_1.loadAllReservations);
exports.default = renderingGuestFilesRouter;
