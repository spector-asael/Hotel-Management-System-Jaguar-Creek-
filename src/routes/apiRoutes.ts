import { signupGuest, loginUser, logout} from "../controller/apiController";
import { bookHotelNew } from "../controller/apiBookingController";

import express from "express";


const apiRouter = express.Router();

apiRouter.post("/guest/signup", signupGuest);
apiRouter.post("/login", loginUser);
apiRouter.post("/logout", logout);
apiRouter.post("/employee/book", bookHotelNew);

export default apiRouter;