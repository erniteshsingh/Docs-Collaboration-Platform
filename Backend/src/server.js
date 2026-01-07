import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";

import connectDB from "./config/db.js";
import { initSocket } from "./socket/socket.js";

const server = http.createServer(app);

connectDB();
initSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
