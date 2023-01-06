import { Router } from "express";
import { deleteLike, likePost } from "../controllers/like.controllers.js";
import { validateSchema } from "../middleware/schemaValidate.js";
import validateSession from "../middleware/sessionValidate.js";
import likeSchema from "../models/likeSchema.js";


const likeRoute = Router()

likeRoute.post('/liked', validateSession, validateSchema(likeSchema), likePost)
likeRoute.delete('/desliked', validateSession, validateSchema(likeSchema), deleteLike)

export default likeRoute