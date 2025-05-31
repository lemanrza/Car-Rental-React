import Footer from "@/components/client/Footer"
import Header from "@/components/client/Header"
import { Outlet } from "react-router"

const ClientLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default ClientLayout