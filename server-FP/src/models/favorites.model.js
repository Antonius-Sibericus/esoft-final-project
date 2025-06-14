import pool from "../database.js"

export default class FavoritesModel {
    static async getFavorites(email) {
        const allFavorites = await pool.query(
            "SELECT * FROM favorites WHERE ub_user_email = $1",
            [email]
        )

        return allFavorites
    }

    static async pushFavorite(favoriteValues) {
        const { email, tag } = favoriteValues
        const pushedFavorite = await pool.query(
            "INSERT INTO favorites (ub_user_email, ub_book_tag) VALUES ($1, $2) RETURNING *",
            [email, tag]
        )

        return pushedFavorite
    }

    static async removeFavorite() {
        const { email, tag } = favoriteValues
        const removedFavorite = await pool.query(
            "DELETE FROM favorites WHERE ub_user_email = $1 AND ub_book_tag = $2",
            [email, tag]
        )

        return removedFavorite
    }
}