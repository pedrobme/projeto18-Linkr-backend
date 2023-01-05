import { Router } from "express";
import { likePost } from "../controllers/like.controllers.js";
import { validateSchema } from "../middleware/schemaValidate.js";
import validateSession from "../middleware/sessionValidate.js";
import likeSchema from "../models/likeSchema.js";


const likeRoute = Router()

likeRoute.post('/liked', validateSession, validateSchema(likeSchema), likePost)


export default likeRoute