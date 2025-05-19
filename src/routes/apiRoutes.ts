import { signupGuest, loginUser } from "../controller/apiController";

import express from "express";


const apiRouter = express.Router();

apiRouter.post("/guest/signup", signupGuest);
apiRouter.post("/login", loginUser);

export default apiRouter;