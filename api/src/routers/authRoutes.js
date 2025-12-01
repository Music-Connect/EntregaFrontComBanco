import { Router } from "express";

import dataReturnCon from "../handlers/userHandler.js";
import { dataReturnArt } from "../handlers/userHandler.js";

import { userLogin } from "../handlers/userHandler.js";

import { validateRegister } from "../middlewares/user.js";
const router = Router();

router.post("/registerCon", validateRegister, dataReturnCon);
router.post("/registerArt", validateRegister, dataReturnArt);

router.post("/login", userLogin);

export default router;
