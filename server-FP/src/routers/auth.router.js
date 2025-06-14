import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import AuthController from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signup", AuthController.signup)
router.post("/login", AuthController.login)
router.post("/verify", authMiddleware, AuthController.verify)

export default router