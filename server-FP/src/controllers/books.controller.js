import BooksModel from "../models/books.model.js"
import CategoriesModel from "../models/categories.model.js"
import ThemesModel from "../models/themes.model.js"
import UsersModel from "../models/user.model.js"

export default class BooksController {
    static async getAllBooks(req, res) {
        try {
            const allBooks = await BooksModel.getAllBooks()

            if (!allBooks || allBooks.rows.length === 0) {
                return res.status(500).json({ error: true, message: "Не удалось получить книги" })
            }

            return res.status(200).json({ error: false, message: "Книги получены успешно", books: allBooks.rows })
        } catch (err) {
            console.error(err.message)
            return res.status(500).json({ error: true, message: "Ошибка на сервере, get all books" })
        }
    }

    static async getBook(req, res) {
        const bookId = req.params.id

        if (bookId) {
            try {
                const oneBook = await BooksModel.getBookById(bookId)

                if (!oneBook || oneBook.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Книга не найдена" })
                }

                return res.status(200).json({ error: false, message: "Книга найдена успешно", book: oneBook.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, get book" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найден ID темы" })
        }
    }

    static async createBook(req, res) {
        const {
            bookHeading,
            bookTag,
            bookAuthor,
            bookPublisher,
            bookCategory,
            bookTheme,
            bookDescription,
            bookPages,
            bookRating,
            bookIsInStock,
            bookYear,
            bookISBN,
            bookType
        } = req.body

        if (bookHeading && bookTag && bookAuthor && bookPublisher && bookCategory && bookTheme && bookDescription &&
            bookPages && bookRating && bookIsInStock !== undefined && bookYear && bookISBN && bookType !== undefined) {
            try {
                const someUser = await UsersModel.getUserById(bookPublisher)
                const someCategory = await CategoriesModel.getCategoryByTag(bookCategory)
                const someTheme = await ThemesModel.getThemeByTag(bookTheme)

                if (!someUser || someUser.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Издатель не зарегистрирован в системе" })
                }

                if (!someCategory || someCategory.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Категория книг не зарегистрирована в системе, сначала создайте категорию" })
                }

                if (!someTheme || someTheme.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Тема книги не зарегистрирована в системе, сначала зарегистрируйте тему" })
                }

                const bookValues = {
                    heading: bookHeading,
                    tag: bookTag,
                    author: bookAuthor,
                    publisher: bookPublisher,
                    category: bookCategory,
                    theme: bookTheme,
                    description: bookDescription,
                    pages: bookPages,
                    rating: bookRating,
                    isInStock: bookIsInStock,
                    year: bookYear,
                    isbn: bookISBN,
                    type: bookType
                }
                const createdBook = await BooksModel.createBook(bookValues)

                if (!createdBook || createdBook.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось добавить книгу" })
                }

                return res.status(200).json({ error: false, message: "Книга добавлена успешно", book: createdBook.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, create book" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найдены данные для книги" })
        }
    }

    static async updateBook(req, res) {
        const {
            bookHeading,
            bookTag,
            bookAuthor,
            bookPublisher,
            bookCategory,
            bookTheme,
            bookDescription,
            bookPages,
            bookRating,
            bookIsInStock,
            bookYear,
            bookISBN,
            bookType
        } = req.body
        const bookId = req.params.id

        if (bookHeading && bookTag && bookAuthor && bookPublisher && bookCategory && bookTheme && bookDescription &&
            bookPages && bookRating && bookIsInStock !== undefined && bookYear && bookISBN && bookType !== undefined && bookId) {
            try {
                const someUser = await UsersModel.getUserById(bookPublisher)
                const someCategory = await CategoriesModel.getCategoryByTag(bookCategory)
                const someTheme = await ThemesModel.getThemeByTag(bookTheme)

                if (!someUser || someUser.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Издатель не зарегистрирован в системе" })
                }

                if (!someCategory || someCategory.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Категория книг не зарегистрирована в системе, сначала создайте категорию" })
                }

                if (!someTheme || someTheme.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Тема книги не зарегистрирована в системе, сначала зарегистрируйте тему" })
                }

                const prevBook = await BooksModel.getBookById(bookId)

                if (!prevBook || prevBook.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось найти книгу" })
                }

                const updatedValues = {
                    heading: !bookHeading ? prevBook.rows[0].book_heading :
                        prevBook.rows[0].book_heading === bookHeading ? prevBook.rows[0].book_heading : bookHeading,
                    tag: !bookTag ? prevBook.rows[0].book_tag :
                        prevBook.rows[0].book_tag === bookTag ? prevBook.rows[0].book_tag : bookTag,
                    author: !bookAuthor ? prevBook.rows[0].book_author :
                        prevBook.rows[0].book_author === bookAuthor ? prevBook.rows[0].book_author : bookAuthor,
                    publisher: !bookPublisher ? prevBook.rows[0].book_publisher :
                        prevBook.rows[0].book_publisher === bookPublisher ? prevBook.rows[0].book_publisher : bookPublisher,
                    category: !bookCategory ? prevBook.rows[0].book_category :
                        prevBook.rows[0].book_category === bookCategory ? prevBook.rows[0].book_category : bookCategory,
                    theme: !bookTheme ? prevBook.rows[0].book_theme :
                        prevBook.rows[0].book_theme === bookTheme ? prevBook.rows[0].book_theme : bookTheme,
                    description: !bookDescription ? prevBook.rows[0].book_description :
                        prevBook.rows[0].book_description === bookDescription ? prevBook.rows[0].book_description : bookDescription,
                    pages: !bookPages ? prevBook.rows[0].book_pages :
                        prevBook.rows[0].book_pages === bookPages ? prevBook.rows[0].book_pages : bookPages,
                    rating: !bookRating ? prevBook.rows[0].book_rating :
                        prevBook.rows[0].book_rating === bookRating ? prevBook.rows[0].book_rating : bookRating,
                    isInStock: bookIsInStock === undefined ? prevBook.rows[0].book_isinstock :
                        prevBook.rows[0].book_isinstock === bookIsInStock ? prevBook.rows[0].book_isinstock : bookIsInStock,
                    year: !bookYear ? prevBook.rows[0].book_year :
                        prevBook.rows[0].book_year === bookYear ? prevBook.rows[0].book_year : bookYear,
                    isbn: !bookISBN ? prevBook.rows[0].book_isbn :
                        prevBook.rows[0].book_isbn === bookISBN ? prevBook.rows[0].book_isbn : bookISBN,
                    type: bookType === undefined ? prevBook.rows[0].book_type :
                        prevBook.rows[0].book_type === bookType ? prevBook.rows[0].book_type : bookType,
                    bookId: bookId
                }
                const updatedBook = await BooksModel.updateBook(updatedValues)

                if (!updatedBook || updatedBook.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось обновить книгу" })
                }

                return res.status(200).json({ error: false, message: "Книга обновлена успешно", book: updatedBook.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, update book" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найдены данные книги" })
        }
    }

    static async deleteBook(req, res) {
        const bookId = req.params.id

        if (bookId) {
            try {
                const deletedBook = await BooksModel.deleteBook(bookId)

                if (!deletedBook || deletedBook.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось удалить книгу" })
                }

                return res.status(200).json({ error: false, message: "Книга удалена успешно", deletedBook: deletedBook.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, delete book" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не обнаружен ID книги" })
        }
    }
}