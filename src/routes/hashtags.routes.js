import { Router } from "express";
import { specificHashtag, trendingHashtags } from "../controllers/hashtags.controllers.js";

const hashtagRoute = Router()

hashtagRoute.get('/trending', trendingHashtags)
hashtagRoute.get('/hashtag/:hashtag', specificHashtag)

export default hashtagRoute

