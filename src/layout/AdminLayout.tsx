import AdminHeader from '@/components/admin/AdminHeader'
import { AppSidebar } from '@/components/admin/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'

const AdminLayout = () => {
    return (
        <SidebarProvider>
            <div className="flex w-full h-screen">
                <AppSidebar />
                <div className="flex-1 w-full flex flex-col bg-gray-100">
                    <AdminHeader />
                    <main className="flex-1 p-6 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default AdminLayout
