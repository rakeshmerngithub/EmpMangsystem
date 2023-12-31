import express from "express";
import cors from "cors";
import employeeRouter from "./router/employee.router.js";
import { helperRouter } from "./router/helper.router.js";
import organizationRouter from "./router/organization.router.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
  })
);
app.use("/login", helperRouter);
app.use("/organization", organizationRouter);
app.use("/employee", employeeRouter);

export default app;
