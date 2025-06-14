import pool from "../database.js"

export default class ThemesModel {
    static async getAllThemes() {
        const allThemes = await pool.query(
            "SELECT * FROM themes",
            []
        )

        return allThemes
    }

    static async getThemeById(themeId) {
        const theme = await pool.query(
            "SELECT * FROM themes WHERE theme_id = $1",
            [themeId]
        )

        return theme
    }

    static async getThemeByTag(themeTag) {
        const theme = await pool.query(
            "SELECT * FROM themes WHERE theme_tag = $1",
            [themeTag]
        )

        return theme
    }
    
    static async createTheme(themeValues) {
        const { themeTitle, themeTag, themeCategory } = themeValues
        const newTheme = await pool.query(
            "INSERT INTO themes (theme_title, theme_tag, theme_cat) VALUES ($1, $2, $3) RETURNING *",
            [themeTitle, themeTag, themeCategory]
        )

        return newTheme
    }
    
    static async updateTheme(themeValues) {
        const { title, tag, cat, themeId } = themeValues
        const updatedTheme = await pool.query(
            "UPDATE themes SET theme_title = $1, theme_tag = $2, theme_cat = $3 WHERE theme_id = $4 RETURNING *",
            [title, tag, cat, themeId]
        )

        return updatedTheme
    }
    
    static async deleteTheme(themeId) {
        const deletedTheme = await pool.query(
            "DELETE FROM themes WHERE theme_id = $1 RETURNING *",
            [themeId]
        )

        return deletedTheme
    }
}