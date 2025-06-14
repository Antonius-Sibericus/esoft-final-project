import pool from "../database.js"

export default class BooksModel {
    static async getAllBooks() {
        const allBooks = await pool.query(
            "SELECT * FROM books",
            []
        )

        return allBooks
    }

    static async getBookById(bookId) {
        const book = await pool.query(
            "SELECT * FROM books WHERE book_id = $1",
            [bookId]
        )

        return book
    }

    static async getBookByTag(bookTag) {
        const book = await pool.query(
            "SELECT * FROM books WHERE book_tag = $1",
            [bookTag]
        )

        return book
    }

    static async createBook(bookValues) {
        const {
            heading,
            tag,
            author,
            publisher,
            category,
            theme,
            description,
            pages,
            rating,
            isInStock,
            year,
            isbn,
            type
        } = bookValues
        const newBook = await pool.query(
            "INSERT INTO books (book_heading, book_tag, book_author, book_publisher, book_category, book_theme, book_description, book_pages, book_rating, book_isinstock, book_year, book_isbn, book_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
            [
                heading,
                tag,
                author,
                publisher,
                category,
                theme,
                description,
                pages,
                rating,
                isInStock,
                year,
                isbn,
                type
            ]
        )

        return newBook
    }

    static async updateBook(bookValues) {
        const {
            heading,
            tag,
            author,
            publisher,
            category,
            theme,
            description,
            pages,
            rating,
            isInStock,
            year,
            isbn,
            type,
            bookId
        } = bookValues
        const updatedBook = await pool.query(
            "UPDATE books SET book_heading = $1, book_tag = $2, book_author = $3, book_publisher = $4, book_category = $5, book_theme = $6, book_description = $7, book_pages = $8, book_rating = $9, book_isinstock = $10, book_year = $11, book_isbn = $12, book_type = $13 WHERE book_id = $14 RETURNING *",
            [
                heading,
                tag,
                author,
                publisher,
                category,
                theme,
                description,
                pages,
                rating,
                isInStock,
                year,
                isbn,
                type,
                bookId
            ]
        )

        return updatedBook
    }
    
    static async deleteBook(bookId) {
        const deletedBook = await pool.query(
            "DELETE FROM books WHERE book_id = $1 RETURNING *",
            [bookId]
        )

        return deletedBook
    }
}