// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

// interface Props {
//     allowedRoles: string[];
//     children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<Props> = ({ allowedRoles, children }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [users, setUsers] = useState<User[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         try {
//             const userStr = localStorage.getItem("user");
//             const parsedUser = userStr ? JSON.parse(userStr) : null;
//             setUser(parsedUser);
//         } catch {
//             setUser(null);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const data = await getUsers();
//                 setUsers(data);
//             } catch (error) {
//                 console.error("Error fetching users", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUsers();
//     }, []);

//     if (loading) {
//         return null;
//     }

//     if (!user) {
//         return <Navigate to="/login" replace />;
//     }

//     const sameUser = users.find((u) => u.id === user.id);

//     if (!sameUser) {
//         return <Navigate to="/login" replace />;
//     }

//     if (!allowedRoles.includes(sameUser.role)) {
//         return <Navigate to="/unauthorized" replace />;
//     }

//     return <>{children}</>;
// };

// export default ProtectedRoute;
