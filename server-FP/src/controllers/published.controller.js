import BooksModel from "../models/books.model.js"
import PublishedModel from "../models/publiched.model.js"
import UsersModel from "../models/user.model.js"

export default class PublishedController {
    static async getPublished(req, res) {
        const userId = req.user.id

        if (userId) {
            try {
                const user = await UsersModel.getUserById(userId)

                if (!user || user.rows.length === 0 || !user.rows[0].user_email) {
                    return res.status(500).json({ error: true, message: "Пользователь не найден" })
                }

                const allPublished = await PublishedModel.getPublished(user.rows[0].user_email)

                if (!allPublished || allPublished.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось получить опубликованные книги" })
                }

                return res.status(200).json({ error: false, message: "Опубликованные книги успешно получены", published: allPublished.rows })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, get published" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найден ID пользователя" })
        }
    }

    static async addPublished(req, res) {
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

                const publishedValues = {
                    email: user.rows[0].user_email,
                    tag: bookTag
                }

                const addedPublished = await PublishedModel.pushPublished(publishedValues)

                if (!addedPublished || addedPublished.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось добавить в опубликованное" })
                }

                return res.status(200).json({ error: false, message: "Книга успешно добавлена в опубликованные", addedPublished: addedPublished.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, add published" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найдены тэг книги или ID пользователя" })
        }
    }

    static async removePublished(req, res) {
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

                const publishedValues = {
                    email: user.rows[0].user_email,
                    tag: someBook.rows[0].book_tag
                }

                const removePublished = await PublishedModel.removePublished(publishedValues)

                if (!removePublished || removePublished.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось убрать из опубликованного" })
                }

                return res.status(200).json({ error: false, message: "Книга успешно убрана из опубликованное", removePublished: removePublished.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, remove published" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найдены тэг книги или ID пользователя" })
        }
    }
}