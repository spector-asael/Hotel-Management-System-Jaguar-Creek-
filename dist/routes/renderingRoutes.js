"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const renderingFiles_js_1 = require("../controller/renderingFiles.js");
const express_1 = __importDefault(require("express"));
const renderingFilesRouter = (0, express_1.default)();
renderingFilesRouter.get('/login', renderingFiles_js_1.loadLoginForm);
exports.default = renderingFilesRouter;
