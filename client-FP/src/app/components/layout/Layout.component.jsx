import Header from "./header/Header.component"
import Footer from "./footer/Footer.component"

export default function Layout(props) {
    const { children } = props

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}