import type { CarType } from "./carType";
import type { Rental } from "./rentalType";


export interface User {
    id: string;
    username: string;
    email: string;
    password: string
    role: 'ADMIN' | 'CLIENT' | 'OWNER';
    profileImage: string;
    balance: number;
    hostRequest: boolean;
    isBanned: boolean;
    banDate?: Date | string;
    createdAt: Date | string;
    cars?: CarType[];
    wishlist?: CarType[];
    rentals?: Rental[];
    reviews: string[];
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}