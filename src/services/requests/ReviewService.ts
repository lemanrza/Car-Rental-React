import type { Review } from "@/types/reviewType";
import instance from "../axios-instance";
import { endpoints } from "../constants";

const ReviewService = {
    // GET all reviews
    getAll: async (filter?: { userId?: string; carId?: string; rating?: number }): Promise<Review[]> => {
        let url = endpoints.reviews;

        if (filter) {
            const params = new URLSearchParams();
            if (filter.userId) params.append("userId", filter.userId);
            if (filter.carId) params.append("carId", filter.carId);  // Changed to `carId` to match your model
            if (typeof filter.rating === "number") params.append("rating", String(filter.rating));

            url += `?${params.toString()}`;
        }

        const response = await instance.get<Review[]>(url);
        return response.data;
    },


    // GET a single review by ID
    getById: async (id: string): Promise<Review> => {
        const response = await instance.get<Review>(`${endpoints.reviews}/${id}`);
        return response.data;
    },

    // POST new review
    create: async (reviewData: Omit<Review, "id" | "createdAt">): Promise<Review> => {
        const newReview: Partial<Review> = {
            ...reviewData,
            createdAt: new Date().toISOString(),
        };
        const response = await instance.post<Review>(endpoints.reviews, newReview);
        return response.data;
    },

    // PUT full update
    update: async (id: string, updatedReview: Review): Promise<Review> => {
        const response = await instance.put<Review>(`${endpoints.reviews}/${id}`, updatedReview);
        return response.data;
    },

    // PATCH partial update
    partialUpdate: async (id: string, updatedFields: Partial<Review>): Promise<Review> => {
        const response = await instance.patch<Review>(`${endpoints.reviews}/${id}`, updatedFields);
        return response.data;
    },

    // DELETE review
    delete: async (id: string): Promise<void> => {
        await instance.delete(`${endpoints.reviews}/${id}`);
    },
};

export default ReviewService;
