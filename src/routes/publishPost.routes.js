import { Router } from "express";
import publishPost from "../controllers/publishPost.controllers.js";
import { validateSchema } from "../middleware/schemaValidate.js";
import validateSession from "../middleware/sessionValidate.js";
import publishSchema from "../models/publishPostSchema.js";

const router = Router();

router.post(
  "/publish",
  validateSchema(publishSchema),
  validateSession,
  publishPost
);

export default router;
