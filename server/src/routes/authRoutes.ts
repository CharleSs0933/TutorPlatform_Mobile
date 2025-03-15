import { Router } from "express";

import { getUserData, login, register } from "../controllers/authController";
import tutorAuth from "../middleware/tutorAuth";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", tutorAuth, getUserData);

export default router;
