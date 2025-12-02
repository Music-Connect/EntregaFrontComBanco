import { Router } from "express";

import dataReturnCon from "../handlers/userHandler.js";
import { dataReturnArt } from "../handlers/userHandler.js";

import { userLogin } from "../handlers/userHandler.js";

import { validateRegister } from "../middlewares/user.js";

import { updateUser } from "../handlers/userHandler.js";

import { getUsers } from "../handlers/userHandler.js";

import { deleteUser } from "../handlers/userHandler.js";
const router = Router();

router.post("/registerCon", validateRegister, dataReturnCon);
router.post("/registerArt", validateRegister, dataReturnArt);
router.post("/login", userLogin);

router.put("/users/:id", updateUser);

router.get("/users", getUsers);

router.delete("/users/:id", deleteUser);
export default router;
