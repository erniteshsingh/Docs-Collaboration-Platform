import express from "express";
import cors from "cors";

// import authRoutes from "./routes/auth.routes.js";



const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRoutes);


import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users",userRoutes)



export default app;
