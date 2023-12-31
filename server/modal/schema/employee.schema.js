import { Schema, model } from "mongoose";
import { compare, hash } from "bcrypt";
import moment from "moment";

const employeeSchema = new Schema({
  id: { type: Number, required: true },
  companyId: { type: Number },
  name: { type: String, default: "" },
  role: { type: String, required: true },
  position: { type: String, required: true },
  password: { type: String, required: true },
  accessPolicy: { type: String, default: "" },
  leavePolicy: { type: String, default: "" },
  attendance: { type: Array, default: [] },
  attendancePolicy: { type: String, default: "" },
  hireDate: { type: Date, default: "" },
  project: { type: Array, default: [] },
  reportingManager: { type: Object, default: {} },
  isPermanent: { type: Boolean, default: true },
  lastModified: { type: Date, default: new Date() },
  request: { type: Array, default: [] },
  gender: { type: String, default: "" },
  isActive: { type: Boolean, default: false },
  notification: {
    type: [
      {
        date: { type: Date },
        message: { type: String },
        path: { type: String },
      },
    ],
    default: [],
  },
  qualification: { type: Object, default: {} },
  avatar: { type: String, default: "" },
  phone: { type: Number, required: true },
  email: { type: String, required: true, alias: "username" },
  address: {
    zipcode: { type: Number },
    city: { type: String },
    street: { type: String },
    state: { type: String },
    country: { type: String },
  },
  activity: {
    checkedIn: { type: Boolean, default: false },
    activeMinutes: {
      type: Number,
      default: 0,
    },
    chekedInTime: {
      type: String,
      default: "",
    },
  },
  otp: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
});

employeeSchema.methods.setPassword = async function (plainPassword) {
  const saltRounds = 10;
  this.password = await hash(plainPassword, saltRounds);
};
employeeSchema.methods.comparePassword = async function (plainPassword) {
  return await compare(plainPassword, this.password);
};
employeeSchema.methods.setOtp = async function (plainOtp) {
  const saltRounds = 10;
  this.otp = await hash(plainOtp, saltRounds);
  console.log(this.otp);
  await this.save();
};
employeeSchema.methods.verifyOtp = async function (plainOtp) {
  return await compare(plainOtp, this.otp);
};
employeeSchema.methods.setActive = async function (status) {
  this.isActive = status;
  await this.save();
};
employeeSchema.methods.setCheckIn = async function () {
  const activity = await this.activity;
  const currentTime = moment().format("HH:mm:ss");
  if (activity.checkedIn) {
    const min = activity?.activeMinutes || 0;
    this.activity = {
      checkedIn: false,
      activeMinutes:
        min +
        moment(currentTime, "HH:mm:ss").diff(
          moment(currentTime, "HH:mm:ss"),
          "m"
        ),
      chekedInTime: "",
    };
  } else {
    this.activity = {
      activeMinutes: activity?.activeMinutes || 0,
      checkedIn: true,
      chekedInTime: currentTime,
    };
  }
  await this.save();
};
const Employee = model("Employee", employeeSchema);

export default Employee;
