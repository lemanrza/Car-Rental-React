import type { RouteObject } from "react-router-dom";

// client pages
import ClientLayout from "@/layout/ClientLayout";
import CarDetail from "@/pages/client/CarDetail";
import Cars from "@/pages/client/Cars";
import Home from "@/pages/client/Home";
import UserProfile from "@/pages/client/User";
import About from "@/pages/client/About";
import Contact from "@/pages/client/Contact";
import Register from "@/pages/client/Register";

// admin pages
import AdminLayout from "@/layout/AdminLayout";
import AdminDashboard from "@/pages/admin/DashBoard";
import ManageCars from "@/pages/admin/ManageCars";
import ManageRentals from "@/pages/admin/ManageRentals";
import ManageUsers from "@/pages/admin/ManageUsers";
import ManageContacts from "@/pages/admin/ManageContacts";

// common pages
import NotFound from "@/pages/common/NotFound";
import Unauthorized from "@/pages/common/Unauthorized";
import Login from "@/pages/common/Login";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import OwnerLayout from "@/layout/OwnerLayout";
import OwnerDashBoard from "@/pages/owner/Dashboard";
import OwnerCars from "@/pages/owner/OwnerCars";
import OwnerRentals from "@/pages/owner/OwnerRentals";

const ROUTES: RouteObject[] = [
    // client routes
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "cars", element: <Cars /> },
            { path: "cars/:id", element: <CarDetail /> },
            {
                path: "user", element: (
                    <ProtectedRoute allowedRoles={["ADMIN", "OWNER", "CLIENT"]}>
                        <UserProfile />
                    // </ProtectedRoute>
                )
            },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "*", element: <NotFound /> },
        ],
    },

    // admin routes (protected)
    {
        path: "/admin",
        element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminLayout />
            // </ProtectedRoute>
        ),
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "cars", element: <ManageCars /> },
            { path: "rentals", element: <ManageRentals /> },
            { path: "contacts", element: <ManageContacts /> },
            { path: "users", element: <ManageUsers /> },
            { path: "*", element: <NotFound /> },
        ],
    },

    // owner routes (protected)
    {
        path: "/owner",
        element: (
            <ProtectedRoute allowedRoles={["OWNER"]}>
                <OwnerLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <OwnerDashBoard /> },
            { path: "cars", element: <OwnerCars /> },
            { path: "rentals", element: <OwnerRentals /> },
            { path: "*", element: <NotFound /> },
        ],
    },
    // Unauthorized page
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },

    // Catch-all 404
    {
        path: "*",
        element: <NotFound />,
    },
];

export default ROUTES