import { Router } from "express";
import {
  getUserInfo,
  signin,
  signOut,
} from "../controllers/auth.controllers.js";
import { createUser } from "../controllers/users.controllers.js";
import { validateSchema } from "../middleware/schemaValidate.js";
import validateSession from "../middleware/sessionValidate.js";
import loginSchema from "../models/loginSchema.js";
import userSchema from "../models/userSchema.js";

const router = Router();

router.post("/signup", validateSchema(userSchema), createUser);
router.post("/signin", validateSchema(loginSchema), signin);
router.get("/timeline/me", validateSession, getUserInfo);
router.delete("/signout", signOut);

export default router;
