import Sidebar from "@/components/admin/Sidebar"
import { Outlet } from "react-router"

const AdminLayout = () => {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default AdminLayout