import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from './routes/auth.routes.js'

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRoutes);
// Routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server running at port ${PORT}`));
