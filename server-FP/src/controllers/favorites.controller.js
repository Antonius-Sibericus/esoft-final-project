import BooksModel from "../models/books.model.js"
import FavoritesModel from "../models/favorites.model.js"
import UsersModel from "../models/user.model.js"

export default class FavoritesController {
    static async getFavorites(req, res) {
        const userId = req.user.id

        if (userId) {
            try {
                const user = await UsersModel.getUserById(userId)

                if (!user || user.rows.length === 0 || !user.rows[0].user_email) {
                    return res.status(500).json({ error: true, message: "Пользователь не найден" })
                }

                const allFavorites = await FavoritesModel.getFavorites(user.rows[0].user_email)

                if (!allFavorites || allFavorites.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось получить избранное" })
                }

                return res.status(200).json({ error: false, message: "Избранное успешно получено", favorites: allFavorites.rows })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, get favorites" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найден ID пользователя" })
        }
    }

    static async addFavorite(req, res) {
        const { bookTag } = req.body
        const userId = req.user.id

        if (bookTag && userId) {
            try {
                const someBook = await BooksModel.getBookByTag(bookTag)
                const user = await UsersModel.getUserById(userId)

                if (!someBook || someBook.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Книга по тэгу не найдена" })
                }

                if (!user || user.rows.length === 0 || !user.rows[0].user_email) {
                    return res.status(500).json({ error: true, message: "Пользователь не найден" })
                }

                const favoriteValues = {
                    email: user.rows[0].user_email,
                    tag: bookTag
                }

                const addedFavorite = await FavoritesModel.pushFavorite(favoriteValues)

                if (!addedFavorite || addedFavorite.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось добавить в избранное" })
                }

                return res.status(200).json({ error: false, message: "Книга успешно добавлена в избранное", addedFavorite: addedFavorite.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, add favorite" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найдены тэг книги или ID пользователя" })
        }
    }

    static async removerFavorite(req, res) {
        const userId = req.user.id
        const bookId = req.params.id

        if (bookId && userId) {
            try {
                const someBook = await BooksModel.getBookById(bookId)
                const user = await UsersModel.getUserById(userId)

                if (!someBook || someBook.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Книга по тэгу не найдена" })
                }

                if (!user || user.rows.length === 0 || !user.rows[0].user_email) {
                    return res.status(500).json({ error: true, message: "Пользователь не найден" })
                }

                const favoriteValues = {
                    email: user.rows[0].user_email,
                    tag: someBook.rows[0].book_tag
                }
                
                const removedFavorite = await FavoritesModel.removeFavorite(favoriteValues)

                if (!removedFavorite || removedFavorite.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось убрать из избранное" })
                }

                return res.status(200).json({ error: false, message: "Книга успешно убрана из избранное", removedFavorite: removedFavorite.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, remove favorite" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найдены тэг книги или ID пользователя" })
        }
    }
}