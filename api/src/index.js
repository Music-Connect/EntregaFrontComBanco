import express from "express";
import cors from "cors";
import config from "./config/config.js";
import authRoute from "./routers/authRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);

app.listen(config.server.port, () => {
  console.log(`Server running in port ${config.server.port}`);
});
