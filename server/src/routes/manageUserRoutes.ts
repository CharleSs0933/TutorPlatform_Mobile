import { Router } from "express";
import {
  addMoneyToWallet,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/manageUserController";
import multer from "multer";
import tutorAuth from "../middleware/tutorAuth";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", tutorAuth, getAllUsers);
router.get("/:id", tutorAuth, getUserById);
router.put("/:id", tutorAuth, upload.single("image"), updateUser);

router.post("/add-money", tutorAuth, addMoneyToWallet);

export default router;
