import pool from "../database.js"
import UsersModel from "../models/user.model.js"
import bcrypt from "bcrypt"

export default class UsersController {
    static async getAllUsers(req, res) {
        try {
            const allUsers = await UsersModel.getAllUsers()

            if (!allUsers) {
                return res.status(500).json({ error: true, message: "Невозможно получить пользователей" })
            }

            return res.status(200).json({ error: false, message: "Список пользователей найден", usersArray: allUsers.rows })
        } catch (err) {
            console.error(err.message)
            return res.status(500).json({ error: true, message: "Ошибка на сервере, get all users" })
        }
    }

    static async getOneUser(req, res) {
        const userId = req.params.id;

        if (userId) {
            try {
                const oneUser = await UsersModel.getUserById(userId)

                if (oneUser.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось найти пользователя" })
                }

                return res.status(200).json({ error: false, userItem: oneUser.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, get one user" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найден ID пользователя" })
        }
    }

    static async updateUser(req, res) {
        const { updSurname, updName, updPaternal, updEmail, updPassword, updRole } = req.body;
        const userId = req.params.id

        if (updSurname && updName && updPaternal && updEmail && updPassword && updRole && userId) {
            try {
                const prevUser = await UsersModel.getUserById(userId)

                if (!prevUser) {
                    return res.status(500).json({ error: true, message: "Не удалось найти пользователя по ID" })
                }

                if (prevUser.rows[0].user_surname && prevUser.rows[0].user_name && prevUser.rows[0].user_paternal &&
                    prevUser.rows[0].user_email && prevUser.rows[0].user_password && prevUser.rows[0].user_role) {

                    const updatedValues = {
                        surname: !updSurname ? prevUser.rows[0].user_surname :
                            prevUser.rows[0].user_surname === updSurname ? prevUser.rows[0].user_surname : updSurname,
                        name: !updName ? prevUser.rows[0].user_name :
                            prevUser.rows[0].user_name === updName ? prevUser.rows[0].user_name : updName,
                        paternal: !updPaternal ? prevUser.rows[0].user_paternal :
                            prevUser.rows[0].user_paternal === updPaternal ? prevUser.rows[0].user_paternal : updPaternal,
                        email: !updEmail ? prevUser.rows[0].user_email :
                            prevUser.rows[0].user_email === updEmail ? prevUser.rows[0].user_email : updEmail,
                        password: !updPassword ? prevUser.rows[0].user_password :
                            await bcrypt.compare(updPassword, prevUser.rows[0].user_password) ?
                                prevUser.rows[0].user_password : await bcrypt.hash(updPassword, await bcrypt.genSalt(10)),
                        role: !updRole ? prevUser.rows[0].user_role :
                            prevUser.rows[0].user_role === updRole ? prevUser.rows[0].user_role : updRole,
                        userId: userId
                    }

                    const updatedUser = await UsersModel.updateUser(updatedValues)

                    if (!updatedUser || updatedUser.rows.length === 0) {
                        return res.status(500).json({ error: true, message: "Невозможно обновить пользователя" })
                    }

                    return res.status(200).json({ error: false, message: `Пользователь обновлён`, updatedUser: updatedUser.rows[0] })
                }
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, update user" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не обнаружены необходимые параметры" })
        }
    }

    static async deleteUser(req, res) {
        const userId = req.params.id

        if (userId) {
            try {
                const deletedUser = await UsersModel.deleteUser(userId)

                if (!deletedUser || deletedUser.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "не удалось удалить пользователя" })
                }

                return res.status(200).json({ error: false, message: "Пользователь удалён", deletedUser: deletedUser.rows[0] })

            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, delete user" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найден ID пользователя" })
        }
    }
}
