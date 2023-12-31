import { Router} from 'express';
import { requestOtpController, verifyOtpController } from '../controller/helper.controller.js';

export const helperRouter = Router();

helperRouter.get('/request/otp',requestOtpController);
helperRouter.post('/verify/otp',verifyOtpController);

