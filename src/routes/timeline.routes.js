import { Router } from "express";
import { loadPost } from "../controllers/timeline.controllers.js";
import { deletePost } from "../controllers/timeline.controllers.js";
import validateSession from "../middleware/sessionValidate.js";

const router = Router();

router.get('/timeline', loadPost);



export default router;
