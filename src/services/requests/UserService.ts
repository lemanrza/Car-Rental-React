import type { User } from "@/types/authType";
import instance from "../axios-instance";
import { endpoints } from "../constants";

const UserService = {
    // GET all users
    getAll: async (): Promise<User[]> => {
        const response = await instance.get<User[]>(endpoints.users);
        return response.data;
    },

    // GET user by ID
    getById: async (id: string): Promise<User> => {
        const response = await instance.get<User>(`${endpoints.users}/${id}`);
        return response.data;
    },

    // POST create new user (admin or registration)
    create: async (
        userData: Omit<User, "id" | "createdAt" | "cars" | "wishlist" | "rentals" | "reviews">
    ): Promise<User> => {
        const newUser: Partial<User> = {
            ...userData,
            createdAt: new Date().toISOString(),
            balance: 0,
            isBanned: false,
            reviews: [],
        };

        const response = await instance.post<User>(endpoints.users, newUser);
        return response.data;
    },

    // PUT full user update (only use if updating the full object)
    update: async (id: string, updatedUser: User): Promise<User> => {
        const response = await instance.put<User>(`${endpoints.users}/${id}`, updatedUser);
        return response.data;
    },

    // PATCH partial update (use this for most updates)
    partialUpdate: async (id: string, updatedFields: Partial<User>): Promise<User> => {
        const response = await instance.patch<User>(`${endpoints.users}/${id}`, updatedFields);
        return response.data;
    },

    // DELETE user
    delete: async (id: string): Promise<void> => {
        await instance.delete(`${endpoints.users}/${id}`);
    },

    // update user password
    // update user password
    updateUserPassword: async ({
        currentPassword,
        newPassword,
    }: {
        currentPassword: string;
        newPassword: string;
    }): Promise<void> => {
        const userData = localStorage.getItem("user");
        if (!userData) throw new Error("User not authenticated");

        const user = JSON.parse(userData);
        const userId = user.id;

        await instance.put(`${endpoints.users}/${userId}/password`, {
            currentPassword,
            newPassword,
        });
    }

};


export default UserService;
