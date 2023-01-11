import { Router } from "express";
import { follow } from "../controllers/followers.controllers.js";
import validateSession from "../middleware/sessionValidate.js";


const followersRoute = Router()

followersRoute.post('/followers/:followed', validateSession, follow)

export default followersRoute
