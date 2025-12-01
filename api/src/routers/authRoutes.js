import { Router } from "express";
import dataReturnCon from "../handlers/userHandler";
import dataReturnArt from "../handlers/userHandler";

const router = Router();

router.post("/registerCon",dataReturnCon);

router.post("/registerArt",dataReturnArt);

router.post("/login");

export default Router;
