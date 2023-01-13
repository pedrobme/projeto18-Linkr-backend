import { Router } from "express";
import { create, findAllComments } from "../controllers/comment.controllers.js";
import { validCommentSchema } from "../middleware/commment.middleware.js";
import validateSession from "../middleware/sessionValidate.js";

const router = Router();

router.post("/comment", validCommentSchema, create);
router.get("/comment/:postId", findAllComments);


export default router;