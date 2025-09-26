import { Router } from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import { authMiddleware } from "../../interfaces/middlewares/authMiddleware.js";

const router = Router();
router.post("/", createUser);
router.get("/", authMiddleware, getUsers);
router.get("/:id", getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", deleteUser);

export default router