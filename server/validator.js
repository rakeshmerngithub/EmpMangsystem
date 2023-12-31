import yup from 'yup';

const message = {
	required : "Field required",
	string : "Field must be string type",
	number : "Field must be number type"
}

const organizationValidationSchema = yup.object({
	organizationName : yup.string().required(message.required).min(3),
	organizationField : yup.string().required(message.required),
	size : yup.number().positive().integer().required(message.required),
	startYear : yup.number().max(new Date().getFullYear(),`Year should less then ${new Date().getFullYear()}`),
	domainName : yup.string().matches(/[(.com)$]/,"Invalid Input"),
	admins : yup.array().of(yup.object().shape({
		email : yup.string().matches(/[a-zA-Z0-9]@[a-zA-Z]+(.com)$/,"Invalid Input"),
		phone : yup.string().required(message.required).matches(/[6-9][0-9]{9}$/,"Input phone number")
	})).min(1)
})


export const organizationValidator = async (value) => {
	return [await organizationValidationSchema.isValid(value),await organizationValidationSchema.validate(value)];
}