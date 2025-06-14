import pool from "../database.js"

class UsersModel {
    static async getAllUsers() {
        const allUsers = await pool.query(
            "SELECT * FROM users",
            []
        )

        return allUsers
    }

    static async getUserByEmail(email) {
        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email]
        )

        return user
    }

    static async getUserById(userId) {
        const user = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",
            [userId]
        )

        return user
    }

    static async addUser(surname, name, paternal, email, hashedPassword, role) {
        const newUser = await pool.query(
            "INSERT INTO users (user_surname, user_name, user_paternal, user_email, user_password, user_role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [surname, name, paternal, email, hashedPassword, role]
        )

        return newUser
    }

    static async updateUser(updatedValues) {
        const { surname, name, paternal, email, password, role, userId } = updatedValues
        const updatedUser = await pool.query(
            "UPDATE users SET user_surname = $1, user_name = $2, user_paternal = $3, user_email = $4, user_password = $5, user_role = $6 WHERE user_id = $7 RETURNING *",
            [surname, name, paternal, email, password, role, userId]
        )

        return updatedUser
    }

    static async deleteUser(userId) {
        const deletedUser = await pool.query(
            "DELETE FROM users WHERE user_id = $1 RETURNING *",
            [userId]
        )

        return deletedUser
    }
}

export default UsersModel