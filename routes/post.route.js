import express from "express";
import { createPost, getPosts } from "../controller/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/create", verifyToken, createPost);
router.put("/:id", (req, res) => {
  res.send({ message: "It works" });
});
router.delete("/:id", (req, res) => {
  res.send({ message: "It works" });
});

export default router;
