import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import FavoritesController from "../controllers/favorites.controller.js"

const router = express.Router()

router.get("/", authMiddleware, FavoritesController.getFavorites)
router.post("/", authMiddleware, FavoritesController.addFavorite)
router.delete("/:id", authMiddleware, FavoritesController.removerFavorite)

export default router