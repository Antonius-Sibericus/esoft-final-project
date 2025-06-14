import pool from "../database.js"
import UsersModel from "../models/user.model.js"
import bcrypt from "bcrypt"

export default class UsersController {
    static async getAllUsers(req, res) {
        try {
            // const allUsers = await pool.query(
            //     "SELECT * FROM users",
            //     []
            // )

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

        try {
            // const oneUser = await pool.query(
            //     "SELECT * FROM users WHERE user_id = $1",
            //     [userId]
            // )

            const oneUser = await UsersModel.getUserById(userId)

            if (oneUser.rows.length === 0) {
                return res.status(500).json({ error: true, message: "Не удалось найти пользователя" })
            }

            return res.status(200).json({ error: false, userItem: oneUser.rows[0] })
        } catch (err) {
            console.error(err.message)
            return res.status(500).json({ error: true, message: "Ошибка на сервере, get one user" })
        }
    };

    static async updateUser(req, res) {
        const { updSurname, updName, updPaternal, updEmail, updPassword, updRole } = req.body;
        const userId = req.params.id

        try {
            // const updatedUser = await pool.query(
            //     "UPDATE users SET user_surname = $1, user_name = $2, user_paternal = $3, user_email = $4 WHERE user_id = $5 RETURNING *",
            //     [surname, name, paternal, email, req.user.id]
            // )

            const foundUser = await UsersModel.getUserById(userId)

            if (!foundUser) {
                return res.status(500).json({ error: true, message: "Не удалось найти пользователя по ID" })
            }

            if (foundUser.rows[0].user_surname && foundUser.rows[0].user_name && foundUser.rows[0].user_paternal &&
                foundUser.rows[0].user_email && foundUser.rows[0].user_password && foundUser.rows[0].user_role) {
                // const salt = await bcrypt.genSalt(10)
                // console.log(salt)
                // const newHashedPassword = await bcrypt.hash(updPassword, salt)
                // const arePasswordsIdentical = await bcrypt.compare(updPassword, foundUser.rows[0].user_password)


                const updatedValues = {
                    surname: !updSurname ? foundUser.rows[0].user_surname :
                        foundUser.rows[0].user_surname === updSurname ? foundUser.rows[0].user_surname : updSurname,
                    name: !updName ? foundUser.rows[0].user_name :
                        foundUser.rows[0].user_name === updName ? foundUser.rows[0].user_name : updName,
                    paternal: !updPaternal ? foundUser.rows[0].user_paternal :
                        foundUser.rows[0].user_paternal === updPaternal ? foundUser.rows[0].user_paternal : updPaternal,
                    email: !updEmail ? foundUser.rows[0].user_email :
                        foundUser.rows[0].user_email === updEmail ? foundUser.rows[0].user_email : updEmail,
                    password: !updPassword ? foundUser.rows[0].user_password :
                        await bcrypt.compare(updPassword, foundUser.rows[0].user_password) ?
                            foundUser.rows[0].user_password : await bcrypt.hash(updPassword, await bcrypt.genSalt(10)),
                    role: !updRole ? foundUser.rows[0].user_role :
                        foundUser.rows[0].user_role === updRole ? foundUser.rows[0].user_role : updRole,
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
    }

    static async deleteUser(req, res) {
        const userId = req.params.id

        if (userId) {
            try {
                // const deletedUser = await pool.query(
                //     "DELETE FROM users WHERE user_id = $1 RETURNING *",
                //     [req.user.id]
                // );

                const deletedUser = await UsersModel.deleteUser(userId)

                if (deletedUser) {
                    return res.status(200).json({ error: false, message: "Пользователь удалён", deletedUser: deletedUser.rows[0] })
                } else {
                    return res.status(500).json({ error: true, message: "не удалось удалить пользователя" })
                }
    
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, delete user" })
            }
        }
    }
}
