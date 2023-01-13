import { Router } from "express";

import {
  deletePost,
  editPost,
  loadPost,
  goToClickUser,
  searchUsers,
} from "../controllers/timeline.controllers.js";
import validateSession from "../middleware/sessionValidate.js";

const router = Router();

router.get("/timeline", validateSession, loadPost);

router.delete("/timeline/:postId", deletePost);

router.patch("/timeline/:postId", editPost);

router.get("/user/:id", goToClickUser);

router.post("/search", searchUsers);

export default router;
