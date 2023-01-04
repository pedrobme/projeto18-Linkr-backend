import { Router } from "express";
import { trendingHashtags } from "../controllers/hashtags.controllers.js";

const hashtagRoute = Router()

hashtagRoute.get('/trending', trendingHashtags)
hashtagRoute.get('/hashtag/:hashtag')

export default hashtagRoute

