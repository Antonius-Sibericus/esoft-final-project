import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import CategoriesController from "../controllers/categories.controller.js"

const router = express.Router()

router.get("/", authMiddleware, CategoriesController.getAllCategories)
router.get("/:id", authMiddleware, CategoriesController.getCategory)
router.post("/", authMiddleware, CategoriesController.createCategory)
router.put("/:id", authMiddleware, CategoriesController.updateCategory)
router.delete("/:id", authMiddleware, CategoriesController.deleteCategory)

export default router