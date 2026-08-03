import express from "express";
const router = express.Router()
import { logoutUser } from "../controllers/user-controller.js";
import { registerUser } from "../controllers/user-controller.js";
import { loginUser } from "../controllers/user-controller.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;