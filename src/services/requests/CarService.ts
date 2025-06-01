import type { Car } from "@/types/carType";
import instance from "../axios-instance";
import { endpoints } from "../constants";

const CarService = {
  // GET all cars
  getAll: async (): Promise<Car[]> => {
    const response = await instance.get<Car[]>(endpoints.cars);
    return response.data;
  },

  // GET car by ID
  getById: async (id: string): Promise<Car> => {
    const response = await instance.get<Car>(`${endpoints.cars}/${id}`);
    return response.data;
  },

  // POST 
  create: async (carData: Omit<Car, "id" | "createdAt">): Promise<Car> => {
    const newCar: Partial<Car> = {
      ...carData,
      createdAt: new Date().toISOString(),
    };
    const response = await instance.post<Car>(endpoints.cars, newCar);
    return response.data;
  },

  // PUT 
  update: async (id: string, updatedCar: Car): Promise<Car> => {
    const response = await instance.put<Car>(
      `${endpoints.cars}/${id}`,
      updatedCar
    );
    return response.data;
  },

  // PATCH 
  partialUpdate: async (
    id: string,
    updatedFields: Partial<Car>
  ): Promise<Car> => {
    const response = await instance.patch<Car>(
      `${endpoints.cars}/${id}`,
      updatedFields
    );
    return response.data;
  },

  // DELETE car
  delete: async (id: string): Promise<void> => {
    await instance.delete(`${endpoints.cars}/${id}`);
  },
};

export default CarService;
