import pool from "../database.js"

export default class CategoriesModel {
    static async getAllCategories() {
        const allCategories = await pool.query(
            "SELECT * FROM categories",
            []
        )

        return allCategories
    }

    static async getCategoryById(catId) {
        const category = await pool.query(
            "SELECT * FROM categories WHERE cat_id = $1",
            [catId]
        )

        return category
    }

    static async getCategoryByTag(catTag) {
        const category = await pool.query(
            "SELECT * FROM categories WHERE cat_tag = $1",
            [catTag]
        )

        return category
    }

    static async createCategory(categoryValues) {
        const { categoryTitle, categoryTag } = categoryValues
        const newCategory = await pool.query(
            "INSERT INTO categories (cat_title, cat_tag) VALUES ($1, $2) RETURNING *",
            [categoryTitle, categoryTag]
        )

        return newCategory
    }

    static async updateCategory(categoryValues) {
        const { title, tag, catId } = categoryValues
        const updatedCategory = await pool.query(
            "UPDATE categories SET cat_title = $1, cat_tag = $2 WHERE cat_id = $3 RETURNING *",
            [title, tag, catId]
        )

        return updatedCategory
    }

    static async deleteCategory(catId) {
        const deletedCategory = await pool.query(
            "DELETE FROM categories WHERE cat_id = $1 RETURNING *",
            [catId]
        )

        return deletedCategory
    }
}