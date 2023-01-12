import { Router } from "express";
import { follow, getFollows, unfollow } from "../controllers/followers.controllers.js";
import validateSession from "../middleware/sessionValidate.js";


const followersRoute = Router()

followersRoute.post('/followers/:followed', validateSession, follow)
followersRoute.delete('/unfollow/:followed', validateSession, unfollow)
followersRoute.get('/followers/:followed', validateSession, getFollows)

export default followersRoute
