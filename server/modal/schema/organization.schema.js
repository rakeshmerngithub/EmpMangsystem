import { Schema, model } from "mongoose";


const organizationSchema = new Schema({
	id : {
		type : Number,
		require : true
	},
	organizationName : {
		type : String,
		required : true
	},
	organizationField : {
		type : String,
		required : true
	},
	size : {
		type : Number,
		required : true,
		min : 25,
	},
	startedYear : {
		type : Number,
		require : true
	},
	domainName : {
		required : true,
		type : String
	},
	admins : [
		{
			email : {
				type : String,
				required : true,
				alias : "username",
			},
			phone : {
				type : Number,
				required : true,
			}
		}
	]
})

const Organization = new model('organizations',organizationSchema);

export default Organization;