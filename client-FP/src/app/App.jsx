import Layout from "./components/layout/Layout.component"
import Main from "./pages/main/Main.component"
import "./styles.scss"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    { path: "/", element: <Main /> }
])

export default function App() {
    return (
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    )
}