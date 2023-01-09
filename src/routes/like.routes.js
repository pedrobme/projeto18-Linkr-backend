import { Router } from "express";
import { deleteLike, getLikes, likePost } from "../controllers/like.controllers.js";
import { validateSchema } from "../middleware/schemaValidate.js";
import validateSession from "../middleware/sessionValidate.js";
import likeSchema from "../models/likeSchema.js";


const likeRoute = Router()

likeRoute.post('/liked', validateSession, validateSchema(likeSchema), likePost)
likeRoute.post('/desliked', validateSession, validateSchema(likeSchema), deleteLike)
likeRoute.get('/postlikes/:postid', validateSession, getLikes)

export default likeRoute