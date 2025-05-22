import { signupGuest, loginUser, logout} from "../controller/apiController";
import { bookHotelExisting, bookHotelNew } from "../controller/apiBookingController";
import { returnTransactionInformation, updateTransactionStatus } from "../controller/apiTransactionController";
import { addHotel, addUser, deleteRoom, deleteUser } from "../controller/apiAdminController";
import upload from "../middleware/upload";

import express from "express";


const apiRouter = express.Router();

apiRouter.post("/guest/signup", signupGuest);
apiRouter.post("/login", loginUser);
apiRouter.post("/logout", logout);
apiRouter.post("/employee/book", bookHotelNew);
apiRouter.post("/employee/booking", bookHotelExisting);
apiRouter.post("/transactions/find", returnTransactionInformation);
apiRouter.post("/transaction/complete", updateTransactionStatus);
apiRouter.post("/addhotel", upload.single('room_image'), addHotel);
apiRouter.post("/admin/add/user", addUser);
apiRouter.post("/user/delete/:id", deleteUser);
apiRouter.post("/room/delete/:id", deleteRoom);

export default apiRouter;