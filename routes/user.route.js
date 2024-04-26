import express from "express";
import {
  deleteProfile,
  getAllUser,
  loginUser,
  signupUser,
  updateProfile,
  getUser,
} from "../controller/register.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
// import { getUser, signupUser } from "../controller/user.controller.js/index.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/", verifyToken, getAllUser);
router.get("/:id", verifyToken, getUser);
router.put("/profile/:id", verifyToken, updateProfile);
router.delete("/profile/:id", verifyToken, deleteProfile);

export default router;
