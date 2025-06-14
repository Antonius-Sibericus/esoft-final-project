import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import ThemesController from "../controllers/themes.controller.js"

const router = express.Router()

router.get("/", authMiddleware, ThemesController.getAllThemes)
router.get("/:id", authMiddleware, ThemesController.getTheme)
router.post("/", authMiddleware, ThemesController.createTheme)
router.put("/:id", authMiddleware, ThemesController.updateTheme)
router.delete("/:id", authMiddleware, ThemesController.deleteTheme)

export default router