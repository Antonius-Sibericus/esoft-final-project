import jwt from "jsonwebtoken"
import "dotenv/config"

export default function jwtGenerator(userId) {
    const payload = {
        user: {
            id: userId
        }
    }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 24 * 60 * 60 })
}