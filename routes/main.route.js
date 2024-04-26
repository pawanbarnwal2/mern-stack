import express from "express";
import userRoute from "./user.route.js";
import postRoute from "./post.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/post", postRoute);

export default router;
