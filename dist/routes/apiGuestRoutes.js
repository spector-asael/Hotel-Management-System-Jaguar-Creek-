"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiGuestController_1 = require("../controller/apiGuestController");
const express_1 = __importDefault(require("express"));
const apiGuestRouter = express_1.default.Router();
apiGuestRouter.post("/signup", apiGuestController_1.signupGuest);
apiGuestRouter.post("/login", apiGuestController_1.loginGuest);
exports.default = apiGuestRouter;
