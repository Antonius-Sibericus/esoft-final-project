import  bcrypt from "bcrypt"
import pool from "../database.js"
import jwtGenerator from "../utils/jwtGenerator.js"
import UsersModel from "../models/user.model.js"

class AuthController {
    static async signup(req, res) {
        const { surname, name, paternal, email, password, role } = req.body

        if (surname, name, paternal, email, password, role) {
            try {
                const user = await UsersModel.getUserByEmail(email)
    
                if (user.rows.length > 0) {
                    return res.status(401).json({ error: true, message: "Такой пользователь уже существует" })
                }
    
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                const newUser = await UsersModel.addUser(surname, name, paternal, email, hashedPassword, role)
    
                if (!newUser || newUser.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось зарегистрировать пользователя" })
                }

                const jwtToken = jwtGenerator(newUser.rows[0].user_id)
                const userId = newUser.rows[0].user_id
                
                return res.status(201).json({ error: false, message: "Пользователь успешно создан", jwtToken, userId })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, signup" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Введены не все данные" })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        if (email && password) {
            try {
                const foundUser = await UsersModel.getUserByEmail(email)
    
                if (!foundUser || foundUser.rows.length === 0) {
                    return res.status(401).json({ error: true, message: "Введите почту и пароль корректно" })
                }
    
                const isValid = await bcrypt.compare(
                    password,
                    foundUser.rows[0].user_password
                )
    
                if (!isValid) {
                    return res.status(401).json({ error: true, message: "Неправильный пароль" })
                }
    
                const jwtToken = jwtGenerator(foundUser.rows[0].user_id)
                const userId = foundUser.rows[0].user_id
    
                return res.status(201).json({ error: false, message: "Вход выполнен успешно", jwtToken, userId })
            } catch (err) {
                console.error(err.message);
                return res.status(500).json({ error: true, message: "Ошибка на сервере, login" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Введены не все данные" })
        }
    }

    static async verify(req, res) {
        try {
            res.json({ error: false, message: "Валидационный токен действителен", verified: true, user: req.user })
        } catch(err) {
            console.error(err.message)
            return res.status(500).json({ error: true, message: "Ошибка на сервере, verify" })
        }
    }
}

export default AuthController