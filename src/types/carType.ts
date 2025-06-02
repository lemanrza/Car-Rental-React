import type { User } from "./authType";
import type { Rental } from "./rentalType";
import type { Review } from "./reviewType";

export interface CarType {
    id: string;
    model: string;
    brand: string;
    color: string;
    category: string
    price: number;
    year: number;
    coverImage: string;
    images: string[];
    description: string;
    createdAt: string | Date;
    avgRating: number;
    ownerId: string;
    owner?: User;
    reviews?: Review[];
    rentals?: Rental[];
    wishlistedBy?: User[]
}
