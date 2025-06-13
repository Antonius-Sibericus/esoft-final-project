import express from "express"
import cors from "cors"
import "dotenv/config"
// import routes

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

// routes

app.listen(PORT, () => console.log(`Server works on port ${PORT}`))