import { Router } from "express";
import dataReturn from "../middlewares/user";

const router = Router();

router.post("/register",dataReturn);

router.post("/login");

export default Router;
