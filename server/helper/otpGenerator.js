import { randomBytes } from 'crypto';

export const otpGenerator = (digit) => {
	return randomBytes(digit / 2).toString('hex')
}