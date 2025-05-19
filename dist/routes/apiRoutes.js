"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiController_1 = require("../controller/apiController");
const express_1 = __importDefault(require("express"));
const apiRouter = express_1.default.Router();
apiRouter.post("/guest/signup", apiController_1.signupGuest);
apiRouter.post("/login", apiController_1.loginUser);
exports.default = apiRouter;
