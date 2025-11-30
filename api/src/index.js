import express from "express";
import config from "./config/config";
import authRoute from "./routers/authRoutes"

const app = express();
app.use(express.json());

app.use("/auth",authRoute);

app.listen(config.server.port,()=>{
    console.log(`Server running in port ${config.server.port}`)
})