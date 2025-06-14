import  bcrypt from "bcrypt"
import pool from "../database.js"
import jwtGenerator from "../utils/jwtGenerator.js"
import UsersModel from "../models/user.model.js"

class AuthController {
    static async signup(req, res) {
        const { surname, name, paternal, email, password, role } = req.body

        try {
            // const user = await pool.query(
            //     "SELECT * FROM users WHERE user_email = $1",
            //     [email]
            // )

            const user = await UsersModel.getUserByEmail(email)

            if (user.rows.length > 0) {
                return res.status(401).json({ error: true, message: "Такой пользователь уже существует" })
            }

            if (!surname || !name || !paternal || !email || !password || !role) {
                return res.status(501).json({ error: true, message: "Введены не все данные" })
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            
            // const newUser = await pool.query(
            //     "INSERT INTO users (user_surnauser_surname, user_name, user_paternal, user_email, user_password, user_role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            //     [surname, name, paternal, email, hashedPassword, role]
            // )

            const newUser = await UsersModel.addUser(surname, name, paternal, email, hashedPassword, role)

            const jwtToken = jwtGenerator(newUser.rows[0].user_id)
            const userId = newUser.rows[0].user_id
            
            return res.status(201).json({ error: false, message: "Пользователь успешно создан", jwtToken, userId })
        } catch (err) {
            console.error(err.message)
            return res.status(500).json({ error: true, message: "Ошибка на сервере, signup" })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            // const user = await pool.query(
            //     "SELECT * FROM users WHERE user_email = $1",
            //     [email]
            // )

            const user = await UsersModel.getUserByEmail(email)

            if (user.rows.length === 0) {
                return res.status(401).json({ error: true, message: "Введите почту и пароль корректно" })
            }

            const isValid = await bcrypt.compare(
                password,
                user.rows[0].user_password
            )

            if (!isValid) {
                return res.status(401).json({ error: true, message: "Неправильный пароль" })
            }

            const jwtToken = jwtGenerator(user.rows[0].user_id)
            const userId = user.rows[0].user_id

            return res.status(201).json({ error: false, message: "Вход выполнен успешно", jwtToken, userId })
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере, login" })
        }
    }

    static async verify(req, res) {
        try {
            // AuthMiddleware checks the jwt_token

            res.json({ error: false, message: "Валидационный токен действителен", verified: true })
        } catch(err) {
            console.error(err.message)
            return res.status(500).json({ error: true, message: "Ошибка на сервере, verify" })
        }
    }
}

export default AuthController