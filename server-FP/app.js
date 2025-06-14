import express from "express"
import cors from "cors"
import "dotenv/config"
import authRouter from "./src/routers/auth.router.js"
import usersRouter from "./src/routers/users.router.js"

// import routes

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

// routes

app.use("/auth", authRouter)
app.use("/users", usersRouter)
// app.use("/books", booksRouter)

app.listen(PORT, () => console.log(`Server works on port ${PORT}`))