import { subscribePriceCalculator } from "../helper/subscribePriceCalculator.js";
import Organization from "../modal/schema/organization.schema.js";
import { organizationValidator } from "../validator.js";
import { createEmployee } from "./employee.controller.js";

export const registerOrganizationController = async (request,response) => {

	const organization = request.body;
	try {
		const [isValid,validateStatus] = await organizationValidator(organization);
		if(isValid) {
			const id = await Organization.findOne({}).sort({id : -1}).id || 100;
			const admins = organization.admins.map((admin) => {
				return {...admin,role : "admin",position : 'admin', companyId : id + 1 }
			});
			organization.admins = admins.map((admin) => ({ email : admin.email , phone : admin.phone }));
			const organizationObject = await Organization({...organization, id : id + 1});
			await organizationObject.save();
			admins.forEach(async (admin) => {
				await createEmployee(admin);
			})
			response.status(200).json({ message : "congratulations", pricing : subscribePriceCalculator });
		} else {
			response.status(400).json(validateStatus);
		}
	} catch (error) {
		response.status(400).json(error);
	}
	
}