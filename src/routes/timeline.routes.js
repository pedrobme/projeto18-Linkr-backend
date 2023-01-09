import { Router } from "express";
import {
  deletePost,
  editPost,
  loadPost,
} from "../controllers/timeline.controllers.js";

const router = Router();

router.get("/timeline", loadPost);

router.delete("/timeline/:postId", deletePost);

router.patch("/timeline/:postId", editPost);

export default router;
