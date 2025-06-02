import type { Rental } from "@/types/rentalType";
import instance from "../axios-instance";
import { endpoints } from "../constants";

const RentalService = {
  // GET all rentals
  getAll: async (): Promise<Rental[]> => {
    const response = await instance.get<Rental[]>(endpoints.rentals);
    return response.data;
  },

  // GET rental by ID
  getById: async (id: string): Promise<Rental> => {
    const response = await instance.get<Rental>(`${endpoints.rentals}/${id}`);
    return response.data;
  },

  // POST create new rental
  create: async (rentalData: Omit<Rental, "id" | "user" | "car">): Promise<Rental> => {
    const response = await instance.post<Rental>(endpoints.rentals, rentalData);
    return response.data;
  },

  // PUT full update
  update: async (id: string, updatedRental: Rental): Promise<Rental> => {
    const response = await instance.put<Rental>(`${endpoints.rentals}/${id}`, updatedRental);
    return response.data;
  },

  // PATCH partial update (e.g., status update)
  partialUpdate: async (id: string, updatedFields: Partial<Rental>): Promise<Rental> => {
    const response = await instance.patch<Rental>(`${endpoints.rentals}/${id}`, updatedFields);
    return response.data;
  },

  // DELETE rental
  delete: async (id: string): Promise<void> => {
    await instance.delete(`${endpoints.rentals}/${id}`);
  },
};

export default RentalService;
