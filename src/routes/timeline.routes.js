import { Router } from "express";
import { loadPost, otherUserPosts } from "../controllers/timeline.controllers.js";

const router = Router();

router.get('/timeline', loadPost);
router.get('/user/:id', otherUserPosts);


export default router;
