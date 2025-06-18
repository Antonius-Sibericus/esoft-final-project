import { createContext, useContext } from "react"

const StyleContext = createContext()

export function useStyleContext() {
    return useContext(StyleContext)
}

export function StyleProvider(props) {
    const { children } = props

    const value = {}

    return (
        <StyleContext.Provider value={value}>
            {children}
        </StyleContext.Provider>
    )
}