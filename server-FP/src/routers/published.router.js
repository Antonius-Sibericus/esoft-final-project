import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import PublishedController from "../controllers/published.controller.js"

const router = express.Router()

router.get("/", authMiddleware, PublishedController.getPublished)
router.post("/", authMiddleware, PublishedController.addPublished)
router.delete("/:id", authMiddleware, PublishedController.removePublished)

export default router