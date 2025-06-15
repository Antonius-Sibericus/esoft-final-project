import pool from "../database.js"

export default class PublishedModel {
    static async getPublished(email) {
        const allPublished = await pool.query(
            "SELECT * FROM published WHERE ab_user_email = $1",
            [email]
        )

        return allPublished
    }

    static async pushPublished(publishedValues) {
        const { email, tag } = publishedValues
        const pushedPublished = await pool.query(
            "INSERT INTO published (ab_user_email, ab_book_tag) VALUES ($1, $2) RETURNING *",
            [email, tag]
        )

        return pushedPublished
    }

    static async removePublished(publishedValues) {
        const { email, tag } = publishedValues
        const removedPublished = await pool.query(
            "DELETE FROM published WHERE ab_user_email = $1 AND ab_book_tag = $2 RETURNING *",
            [email, tag]
        )

        return removedPublished
    }
}