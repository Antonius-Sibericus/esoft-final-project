import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import UsersController from "../controllers/users.controller.js"

const router = express.Router();

router.get("/", authMiddleware, UsersController.getAllUsers);
router.get("/:id", authMiddleware, UsersController.getOneUser);
router.put("/:id", authMiddleware, UsersController.updateUser);
router.delete("/:id", authMiddleware, UsersController.deleteUser);

export default router;