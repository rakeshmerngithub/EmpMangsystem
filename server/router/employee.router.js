import { Router } from "express";

import { 
	AttendanceCheckInController, 
	createEmployeeController, 
	employeeLoginController, 
	sendAllEmployeeDetailes, 
	verifyEmployeeController } from "../controller/employee.controller.js";

import { authorization } from "../controller/authentication.js";

const employeeRouter = Router();

employeeRouter.post('/new-employee',createEmployeeController);
employeeRouter.post('/login',employeeLoginController);
employeeRouter.get('/verify',verifyEmployeeController);
employeeRouter.get("/detailes",authorization, sendAllEmployeeDetailes);
employeeRouter.get('/attendance/checkin',authorization,AttendanceCheckInController);

export default employeeRouter 