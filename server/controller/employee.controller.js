import Employee from "../modal/schema/employee.schema.js";
import { createAccessToken } from "./authentication.js";
import moment from "moment";

export const createEmployee = async (employee) => {
  const id = (await Employee.findOne({}).sort({ id: -1 }).id) || 100;
  const emp = await Employee({ ...employee, id: id + 1 });
  await emp.setPassword(emp.password);
  await emp.save();
};

export const createEmployeeController = async (request, response) => {
  const employee = request.body;
  try {
    await createEmployee(employee);
    response.status(201).json({ message: "successfylly created data in db" });
  } catch (error) {
    console.log(error);
    response
      .status(400)
      .json({ message: "not able to create employee", error });
  }
};

export const verifyEmployeeController = async (request, response) => {
  const email = request.query.email;
  console.log(email);
  const emp = await Employee.findOne({ email: email });
  setTimeout(() => {
    if (emp) {
      return response
        .status(200)
        .json({ isVerified: true, message: "Email is valid" });
    } else {
      return response
        .status(400)
        .json({ isVerified: false, message: "Invalid Email" });
    }
  }, 2000);
};

export const employeeLoginController = async (request, response) => {
  const employeeCredentials = request.body;
  console.log(employeeCredentials);
  const employee = await Employee.findOne(
    { email: employeeCredentials.email },
    { password: 1 }
  );
  const isMatching =
    employee && (await employee.comparePassword(employeeCredentials.password));
  if (isMatching) {
    const employee = await Employee.findOne(
      { email: employeeCredentials.email },
      { password: 0, _id: 0, __v: 0 }
    );
    employee.setActive(true);
    response.status(200).json({
      isLoggedInSuccess: true,
      message: "login success",
      access_token: createAccessToken(employeeCredentials),
      data: employee,
    });
  } else {
    response.status(400).json({
      isLoggedInSuccess: false,
      message: "user credentials is miss matching",
    });
  }
};

export const sendAllEmployeeDetailes = async (request, response) => {
  const employees = await Employee.find({}, { password: 0, _id: 0, __v: 0 });
  response.status(200).json(employees);
};

export const AttendanceCheckInController = async (request, response) => {
  try {
    const email = request.query.email;
    const employee = await Employee.findOne({ email: email });
    console.log(employee.activity.checkedIn);
    if (employee) {
      await employee.setCheckIn();
      response.status(200).json({
        message: employee.activity.checkedIn
          ? "your in online"
          : "your in offline",
      });
    } else {
      response.status(400).json({ message: "invalid username" });
    }
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "something went wrong , please try again later " });
  }
};
