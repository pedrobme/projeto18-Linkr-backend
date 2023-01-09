import { Router } from "express";

import { loadPost,searchUsers, goToClickUser } from "../controllers/timeline.controllers.js";
import {
  deletePost,
  editPost,
  loadPost,
} from "../controllers/timeline.controllers.js";

const router = Router();

router.get("/timeline", loadPost);

router.delete("/timeline/:postId", deletePost);

router.patch("/timeline/:postId", editPost);

router.get('/user/:id', goToClickUser);

router.post('/search', searchUsers);

export default router;
