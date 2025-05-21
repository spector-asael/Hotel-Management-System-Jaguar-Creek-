"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiController_1 = require("../controller/apiController");
const apiBookingController_1 = require("../controller/apiBookingController");
const express_1 = __importDefault(require("express"));
const apiRouter = express_1.default.Router();
apiRouter.post("/guest/signup", apiController_1.signupGuest);
apiRouter.post("/login", apiController_1.loginUser);
apiRouter.post("/logout", apiController_1.logout);
apiRouter.post("/employee/book", apiBookingController_1.bookHotelNew);
apiRouter.post("/employee/booking", apiBookingController_1.bookHotelExisting);
exports.default = apiRouter;
