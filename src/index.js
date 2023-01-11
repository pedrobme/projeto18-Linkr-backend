import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import hashtagRoute from "./routes/hashtags.routes.js";
import timelineRoute from "./routes/timeline.routes.js";
import publishPostRoute from "./routes/publishPost.routes.js";
import likeRoute from "./routes/like.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use(authRoutes);
app.use(hashtagRoute);
app.use(timelineRoute);
app.use(publishPostRoute);
app.use(likeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running at port ${PORT}`));
