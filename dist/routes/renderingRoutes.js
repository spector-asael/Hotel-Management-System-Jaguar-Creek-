"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// File: src/routes/renderingRoutes
const renderingVisitorFiles_js_1 = require("../controller/renderingVisitorFiles.js");
const express_1 = __importDefault(require("express"));
const renderingVisitorFilesRouter = express_1.default.Router();
renderingVisitorFilesRouter.get('/', (req, res) => {
    res.redirect('/visitor/homepage');
});
renderingVisitorFilesRouter.get('/login', renderingVisitorFiles_js_1.loadLoginForm);
renderingVisitorFilesRouter.get('/homepage', renderingVisitorFiles_js_1.loadHomePage);
renderingVisitorFilesRouter.get('/signup', renderingVisitorFiles_js_1.loadSignupForm);
renderingVisitorFilesRouter.get('/signup-success', renderingVisitorFiles_js_1.loadSignupSuccess);
exports.default = renderingVisitorFilesRouter;
