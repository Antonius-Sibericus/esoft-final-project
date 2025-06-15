import express from "express"
import cors from "cors"
import "dotenv/config"
import authRouter from "./src/routers/auth.router.js"
import usersRouter from "./src/routers/users.router.js"
import categoriesRouter from "./src/routers/categories.router.js"
import themesRouter from "./src/routers/themes.router.js"
import booksRouter from "./src/routers/books.router.js"
import favoritesRouter from "./src/routers/favorites.router.js"
import publishedRouter from "./src/routers/published.router.js"

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use("/categories", categoriesRouter)
app.use("/themes", themesRouter)
app.use("/books", booksRouter)
app.use("/favorites", favoritesRouter)
app.use("/published", publishedRouter)

app.listen(PORT, () => console.log(`Server works on port ${PORT}`))