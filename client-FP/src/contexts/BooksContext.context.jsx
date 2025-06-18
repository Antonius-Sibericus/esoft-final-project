import { createContext, useContext } from "react"

const BooksContext = createContext()

export function useBooksContext() {
    return useContext(BooksContext)
}

export function BooksProvider(props) {
    const { children } = props

    const value = {}

    return (
        <BooksContext.Provider value={value}>
            {children}
        </BooksContext.Provider>
    )
}