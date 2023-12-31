import { otpGenerator } from "../helper/otpGenerator.js";
import Employee from "../modal/schema/employee.schema.js";
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const sendOtp = async (email,otp) => {
	
	const mailgun = new Mailgun(formData);
	const mg = mailgun.client({
		username: 'api',
		key: 'f72e87d02c4075981a63b986065342c9-07ec2ba2-d26740d4',
	});
	return await mg.messages.create('sandbox2c083443555a4985a5bc8bdaa543e39d.mailgun.org', {
		from: "Mailgun Sandbox <postmaster@sandbox2c083443555a4985a5bc8bdaa543e39d.mailgun.org>",
		to: ["tejasengi01@gmail.com"],
		subject: "Empower Login OTP",
		text: `your otp is ${otp} don't share with other's`,
	})
}

export const requestOtpController = async (request,response) => {
	const { email } = request.query;
	const otp = otpGenerator(4);
	const employee = await Employee.findOne({ email : email });
	try {
		await sendOtp(email,otp);
		// console.log(result);
		await employee.setOtp(otp);
		response.status(200).json({ message : "successfully sent OTP" })
	} catch (error) {
		console.log(error)
		response.status(500).json({ message : "something went wrong,Plase try again later"})
	}

}
export const verifyOtpController = async (request,response) => {
	const { email , otp } = request.body;
	const employee = await Employee.findOne({ email : email });
	if(await employee.verifyOtp(otp)) {
		// await employee.setActive(true);
		response.status(200).json({ isLoggedInSuccess : true, data : await Employee.findOne({email},{ password : 0, _id : 0, __v : 0})})
	} else {
		response.status(400).json({ isLoggedInSuccess : false, message : "invalid OTP" })
	}
}
