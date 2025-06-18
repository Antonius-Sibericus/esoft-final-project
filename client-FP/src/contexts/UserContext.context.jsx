import { createContext, useContext } from "react"

const UserContext = createContext()

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider(props) {
    const { children } = props

    const value = {}

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}