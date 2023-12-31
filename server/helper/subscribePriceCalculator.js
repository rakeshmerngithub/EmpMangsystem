import dotenv from 'dotenv';
dotenv.config();

const CHARGE_PER_HEAD = process.env.CHARGE_PER_HEAD;
const DISCOUNT_PER_MONTH = process.env.DISCOUNT_PER_MONTH;
const DISCOUNT_PER_SIXMONTH = process.env.DISCOUNT_PER_SIXMONTH;
const DISCOUNT_PER_YEAR = process.env.DISCOUNT_PER_YEAR;

export const subscribePriceCalculator = (size) => {
	return [{
		period : "30 days",
		price : 299,
		label : "299 Rs",
		discount : "20%"
	},{
		period : "6 months",
		price : 999,
		label : "999 Rs",
		discount : "40%"
	},
	{
		period : "Year",
		price : 1499,
		label : "1499 Rs",
		discount : "60%"
	}
	]
} 