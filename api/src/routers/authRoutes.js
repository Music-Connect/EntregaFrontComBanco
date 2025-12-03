import { Router } from "express";

import dataReturnCon from "../handlers/userHandler.js";
import { dataReturnArt } from "../handlers/userHandler.js";

import { userLogin } from "../handlers/userHandler.js";

import { validateRegister } from "../middlewares/user.js";

import { updateUser } from "../handlers/userHandler.js";

import { getUsers } from "../handlers/userHandler.js";

import { deleteUser } from "../handlers/userHandler.js";
import { getUserById } from "../handlers/userHandler.js";

import { createContract } from "../handlers/userHandler.js";
import { getContracts } from "../handlers/userHandler.js";
import { updateContractStatus } from "../handlers/userHandler.js";
import { getUserAgenda } from "../handlers/userHandler.js";

const router = Router();

router.post("/registerCon", validateRegister, dataReturnCon);
router.post("/registerArt", validateRegister, dataReturnArt);
router.post("/login", userLogin);

router.put("/users/:id", updateUser);

router.get("/users", getUsers);

router.delete("/users/:id", deleteUser);
router.get("/users/:id", getUserById);
router.post("/contracts", createContract);
router.get("/contracts", getContracts);
router.put("/contracts/:id", updateContractStatus);
router.get("/users/:id/agenda", getUserAgenda);
export default router;
