import { Router } from "express";
import publishPost from "../controllers/publishPost.controllers.js";
import { validateSchema } from "../middleware/schemaValidate.js";
import validateSession from "../middleware/sessionValidate.js";
import getHashtags from "../middleware/getHashtags.middleware.js";
import publishSchema from "../models/publishPostSchema.js";

const router = Router();

router.post(
  "/publish",
  validateSchema(publishSchema),
  validateSession,
  getHashtags,
  publishPost
);

export default router;
