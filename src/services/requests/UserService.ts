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

    // POST create new user (admin functionality)
    create: async (userData: Omit<User, "id" | "createdAt" | "cars" | "wishlist" | "rentals" | "reviews">): Promise<User> => {
        const newUser: Partial<User> = {
            ...userData,
            createdAt: new Date().toISOString(),
            balance: 0,
            isBanned: false,
            reviews: []
        };
        const response = await instance.post<User>(endpoints.users, newUser);
        return response.data;
    },

    // PUT full update
    update: async (id: string, updatedUser: User): Promise<User> => {
        const response = await instance.put<User>(`${endpoints.users}/${id}`, updatedUser);
        return response.data;
    },

    // PATCH partial update (e.g., update profileImage or ban status)
    partialUpdate: async (id: string, updatedFields: Partial<User>): Promise<User> => {
        const response = await instance.patch<User>(`${endpoints.users}/${id}`, updatedFields);
        return response.data;
    },

    // DELETE user (admin functionality)
    delete: async (id: string): Promise<void> => {
        await instance.delete(`${endpoints.users}/${id}`);
    },
};

export default UserService;
