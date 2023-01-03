import { Router } from "express";
import { trendingHashtags } from "../controllers/hashtags.controllers.js";

const hashtagRoute = Router()

hashtagRoute.get('/trending', trendingHashtags)

export default hashtagRoute

