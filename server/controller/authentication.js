import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Employee from '../modal/schema/employee.schema.js';
dotenv.config();

const header = {
	algorithm : "HS256"
}
const privateKey = process.env.ACCESS_TOKEN;

export const createAccessToken = (payload) => {
	return jwt.sign(payload,privateKey,header);
}

export const authorization = async (request,response,next) => {
	const accessToken = request?.headers['authorization']?.split(" ")[1];
	try {
		const payload = jwt.verify(accessToken,privateKey);
		const employee = await Employee.findOne({ email : payload.email });
		const isMatching = employee ? await employee.comparePassword(payload.password) : false;
		if(isMatching) {
			next();
		} else {
			throw new Error({ message : "credentials not matching"})
		}
	} catch (error) {
		response.status(401).json({ message : "unauthorization request"})
	}
}