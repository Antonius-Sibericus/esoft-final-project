import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.jsx'
import { UserProvider } from './contexts/UserContext.context.jsx'
import { BooksProvider } from './contexts/BooksContext.context.jsx'
import { StyleProvider } from './contexts/StyleContext.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BooksProvider>
        <StyleProvider>
          <App />
        </StyleProvider>
      </BooksProvider>
    </UserProvider>
  </StrictMode>,
)

// StyleContext - информация о стилях, светлая или тёмная тема, размер шрифта в n-rem
// UserContext - информация об авторизации, избранном и опубликованных книгах
// BooksContext - информация о книгах