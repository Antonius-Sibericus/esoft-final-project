import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import BooksController from "../controllers/books.controller.js"

const router = express.Router()

router.get("/", authMiddleware, BooksController.getAllBooks)
router.get("/:id", authMiddleware, BooksController.getBook)
router.post("/", authMiddleware, BooksController.createBook)
router.put("/:id", authMiddleware, BooksController.updateBook)
router.delete("/:id", authMiddleware, BooksController.deleteBook)

export default router