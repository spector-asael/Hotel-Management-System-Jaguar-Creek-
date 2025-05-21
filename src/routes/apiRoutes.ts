import { signupGuest, loginUser, logout} from "../controller/apiController";
import { bookHotelExisting, bookHotelNew } from "../controller/apiBookingController";

import express from "express";


const apiRouter = express.Router();

apiRouter.post("/guest/signup", signupGuest);
apiRouter.post("/login", loginUser);
apiRouter.post("/logout", logout);
apiRouter.post("/employee/book", bookHotelNew);
apiRouter.post("/employee/booking", bookHotelExisting);

export default apiRouter;