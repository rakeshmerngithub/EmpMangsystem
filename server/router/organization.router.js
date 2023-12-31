import { Router } from "express";
import { registerOrganizationController } from "../controller/organization.controller.js";

const organizationRouter = Router();

organizationRouter.post('/register',registerOrganizationController);


export default organizationRouter;