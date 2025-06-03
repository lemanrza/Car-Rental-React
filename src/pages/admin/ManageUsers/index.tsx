import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BadgeMinus, BadgeCheck, UserPlus } from "lucide-react"
import type { User } from "@/types/authType"
import UserService from "@/services/requests/UserService"
import { toast } from "sonner"

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserService.getAll();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const banUser = async (userId: string) => {
    try {
      const updatedUser = await UserService.partialUpdate(userId, { isBanned: true });
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.error("Failed to ban user:", error);
    }
  };

  const unbanUser = async (userId: string) => {
    try {
      const updatedUser = await UserService.partialUpdate(userId, { isBanned: false });
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.error("Failed to unban user:", error);
    }
  };
  const makeAdminToggle = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const adminCount = users.filter(u => u.role === "ADMIN").length;

      if (user.role === "ADMIN" && adminCount <= 1) {
      toast("At least one admin must remain. Role change is not allowed.");
        return;
      }

      const newRole = user.role === "ADMIN" ? "CLIENT" : "ADMIN";

      const updatedUser = await UserService.partialUpdate(userId, { role: newRole });

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === userId ? updatedUser : u))
      );
    } catch (error) {
      console.error("Failed to toggle user role:", error);
    }
  };


  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
        <Input
          className="max-w-xs"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
        <Table className="min-w-[900px] md:min-w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead className="whitespace-nowrap px-3 py-2 text-center text-xs md:text-sm">Profile</TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2 text-sm">Username</TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2 text-sm">Email</TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2 text-sm text-center hidden md:table-cell">Balance</TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2 text-sm hidden sm:table-cell">Created At</TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2 text-sm hidden sm:table-cell">Role</TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2 text-sm text-center hidden md:table-cell">Cars</TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2 text-sm text-center hidden md:table-cell">Rentals</TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2 text-sm text-center hidden md:table-cell">Reviews</TableHead>
              <TableHead>Ban value</TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2 text-center text-sm">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                return (
                  <TableRow
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-150"
                  >
                    <TableCell className="px-3 py-2 text-center">
                      <img
                        src={user.profileImage}
                        alt={`${user.username} profile`}
                        className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600 mx-auto"
                      />
                    </TableCell>
                    <TableCell className="font-medium px-3 py-2">{user.username}</TableCell>
                    <TableCell className="px-3 py-2 break-words line-clamp-1 max-w-[150px]">{user.email}</TableCell>
                    <TableCell className="px-3 py-2 text-center hidden md:table-cell">{user.balance.toFixed(2)}</TableCell>
                    <TableCell className="px-3 py-2 hidden sm:table-cell">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="px-3 py-2 hidden sm:table-cell">{user.role}</TableCell>
                    <TableCell className="px-3 text-center py-2 hidden sm:table-cell">{user.role === "OWNER" ? user.cars?.length : "This user isn't owner"}</TableCell>
                    <TableCell className="px-3 py-2 hidden sm:table-cell text-center">{user.rentals?.length}</TableCell>
                    <TableCell className="text-center px-3 py-2 hidden md:table-cell">{user.reviews?.length ?? 0}</TableCell>
                    <TableCell className="text-center px-3 py-2 hidden md:table-cell">{user.isBanned ? "Banned" : "Not Banned"}</TableCell>
                    <TableCell className="text-center py-2 flex justify-center flex-wrap md:flex-nowrap">
                      <Button
                        variant="ghost"
                        title={user.isBanned ? "User is banned" : "Ban user"}
                        size="icon"
                        onClick={() => banUser(user.id)}
                        disabled={user.isBanned}
                      >
                        <BadgeMinus className={`h-5 w-5 ${user.isBanned ? "text-red-600" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        title={!user.isBanned ? "User isn't banned" : "Unban user"}
                        size="icon"
                        disabled={!user.isBanned}
                        onClick={() => unbanUser(user.id)}
                      >
                        <BadgeCheck className={`h-5 w-5 `} />
                      </Button>
                      <Button
                        variant="ghost"
                        title={user.role === "CLIENT" ? "Make Admin" : ""}
                        size="icon"
                        className={user.role === "ADMIN" ? "text-green-400 hover:text-green-500" : ""}
                        onClick={() => makeAdminToggle(user.id)}
                      >
                        <UserPlus className="h-5 w-5" />
                      </Button>

                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}

export default ManageUsers;
