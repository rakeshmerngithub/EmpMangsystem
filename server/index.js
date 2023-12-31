import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

import connectWithDb from "./modal/db.js";

const PORT = process.env.PORT || 4500;

const hostName = "127.0.0.8";

const server = createServer(app);

async function startServer() {
  await connectWithDb();
  server.listen(PORT, hostName, () => {
    console.log(`server started with http://${hostName}:${PORT}`);
  });
}
startServer();
