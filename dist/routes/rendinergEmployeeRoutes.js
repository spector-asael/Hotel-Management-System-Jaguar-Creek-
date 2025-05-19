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
renderingEmployeeFilesRouter.get('/dashboard/guest', renderingEmployeeFiles_1.loadEmployeeGuest);
renderingEmployeeFilesRouter.get('/dashboard/hotel', renderingEmployeeFiles_1.loadEmployeeHotel);
renderingEmployeeFilesRouter.get('/dashboard/room', renderingEmployeeFiles_1.loadEmployeeRoom);
renderingEmployeeFilesRouter.get('/dashboard/transaction', renderingEmployeeFiles_1.loadEmployeeTransaction);
exports.default = renderingEmployeeFilesRouter;
