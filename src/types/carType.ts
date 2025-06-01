export interface Car {
    id: string;
    model: string;
    color: string;
    brand: string;
    coverImage: string;
    images: string[];
    year: number;
    avgRating: number
    price: boolean;
    category: string;
    createdAt: Date | string;
    description: string;
}
