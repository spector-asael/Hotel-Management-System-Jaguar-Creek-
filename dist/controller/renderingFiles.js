"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLoginForm = void 0;
const path_1 = __importDefault(require("path"));
const loadLoginForm = (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/login/login.html'));
};
exports.loadLoginForm = loadLoginForm;
