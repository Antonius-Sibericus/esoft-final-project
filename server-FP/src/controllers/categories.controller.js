import CategoriesModel from "../models/categories.model.js";

export default class CategoriesController {
    static async getAllCategories(req, res) {
        try {
            const allCategories = await CategoriesModel.getAllCategories()

            if (!allCategories || allCategories.rows.length === 0) {
                return res.status(500).json({ error: true, message: "Категории не найдены" })
            }

            return res.status(200).json({ error: false, message: "Категории найдены успешно", categories: allCategories.rows })
        } catch (err) {
            console.error(err.message)
            return res.status(500).json({ error: true, message: "Ошибка на сервере, get all categories" })
        }
    }

    static async getCategory(req, res) {
        const categoryId = req.params.id

        if (categoryId) {
            try {
                const oneCategory = await CategoriesModel.getCategoryById(categoryId)

                if (!oneCategory || oneCategory.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Категория не найдена" })
                }

                return res.status(200).json({ error: false, message: "Категория найдена успешно", category: oneCategory.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, get category" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найден тэг категории" })
        }
    }

    static async createCategory(req, res) {
        const { categoryTitle, categoryTag } = req.body
        
        if (categoryTitle && categoryTag) {
            try {
                const categoryValues = { categoryTitle, categoryTag }
                const createdCategory = await CategoriesModel.createCategory(categoryValues)

                if (!createdCategory || createdCategory.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось создать категорию" })
                }

                return res.status(200).json({ error: false, message: "Категория создана успешно", category: createdCategory.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, create category" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найдены название и/или тэг категории" })
        }
    }

    static async updateCategory(req, res) {
        const { categoryTitle, categoryTag } = req.body
        const catId = req.params.id

        if (categoryTitle, categoryTag, catId) {
            try {
                const prevCategory = await CategoriesModel.getCategoryById(catId)

                if (!prevCategory || prevCategory.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось найти категорию" })
                }

                if (prevCategory.rows[0].cat_title && prevCategory.rows[0].cat_tag) {
                    const updatedValues = {
                        title: !categoryTitle ? prevCategory.rows[0].cat_title : 
                            prevCategory.rows[0].cat_title === categoryTitle ? prevCategory.rows[0].cat_title : categoryTitle,
                        tag: !categoryTag ? prevCategory.rows[0].cat_tag : 
                            prevCategory.rows[0].cat_tag === categoryTag ? prevCategory.rows[0].cat_tag : categoryTag,
                        catId: catId
                    }
                    
                    const updatedCategory = await CategoriesModel.updateCategory(updatedValues)

                    if (!updatedCategory || updatedCategory.rows.length === 0) {
                        return res.status(500).json({ error: true, message: "Не удалось обновить категорию" })
                    }

                    return res.status(200).json({ error: false, message: "Категория успешно обновлена", category: updatedCategory.rows[0] })
                }
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, update category" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найдены название, тэг или ID категории" })
        }
    }

    static async deleteCategory(req, res) {
        const catId = req.params.id

        if (catId) {
            try {
                const deletedCategory = await CategoriesModel.deleteCategory(catId)

                if (!deletedCategory || deletedCategory.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось удалить категорию" })
                }

                return res.status(200).json({ error: false, message: "Категория удалена успешно", deletedCategory: deletedCategory.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, delete category" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не обнаружен ID категории" })
        }
    }
}