"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiController_1 = require("../controller/apiController");
const apiBookingController_1 = require("../controller/apiBookingController");
const apiTransactionController_1 = require("../controller/apiTransactionController");
const apiAdminController_1 = require("../controller/apiAdminController");
const upload_1 = __importDefault(require("../middleware/upload"));
const express_1 = __importDefault(require("express"));
const apiRouter = express_1.default.Router();
apiRouter.post("/guest/signup", apiController_1.signupGuest);
apiRouter.post("/login", apiController_1.loginUser);
apiRouter.post("/logout", apiController_1.logout);
apiRouter.post("/employee/book", apiBookingController_1.bookHotelNew);
apiRouter.post("/employee/booking", apiBookingController_1.bookHotelExisting);
apiRouter.post("/transactions/find", apiTransactionController_1.returnTransactionInformation);
apiRouter.post("/transaction/complete", apiTransactionController_1.updateTransactionStatus);
apiRouter.post("/reservations/cancel", apiTransactionController_1.cancelReservation);
apiRouter.post("/addhotel", upload_1.default.single('room_image'), apiAdminController_1.addHotel);
apiRouter.post("/admin/add/user", apiAdminController_1.addUser);
apiRouter.post("/user/delete/:id", apiAdminController_1.deleteUser);
apiRouter.post("/room/delete/:id", apiAdminController_1.deleteRoom);
apiRouter.post('/guest/book/:id', apiBookingController_1.bookHotelGuest);
exports.default = apiRouter;
