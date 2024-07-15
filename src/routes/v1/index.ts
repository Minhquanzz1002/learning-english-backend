import express from "express";
import authRouter from "./auth.router";
import topicRouter from './topic.router';

const router = express.Router();

router.use("/auth", authRouter);
router.use("/topics", topicRouter);


export default router;