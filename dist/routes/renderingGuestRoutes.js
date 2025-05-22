"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const guestRoutes_1 = require("../controller/guestRoutes");
const renderingGuestFilesRouter = express_1.default.Router();
renderingGuestFilesRouter.get('/', (req, res) => {
    res.redirect('/guest/rooms');
});
renderingGuestFilesRouter.get('/rooms', guestRoutes_1.loadGuestRooms);
exports.default = renderingGuestFilesRouter;
