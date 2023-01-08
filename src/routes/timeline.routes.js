import { Router } from "express";
import { loadPost } from "../controllers/timeline.controllers.js";

const router = Router();

router.get('/timeline', loadPost);


export default router;
