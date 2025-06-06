import type { CarType, CreateCarDTO } from "@/types/carType";
import instance from "../axios-instance";
import { endpoints } from "../constants";

const CarService = {
  // GET all cars
  getAll: async (): Promise<CarType[]> => {
    const response = await instance.get<CarType[]>(endpoints.cars);
    return response.data;
  },

  // GET car by ID
  getById: async (id: string): Promise<CarType> => {
    const response = await instance.get<CarType>(`${endpoints.cars}/${id}`);
    return response.data;
  },

  // POST 
  create: async (carData: CreateCarDTO): Promise<CarType> => {
    const response = await instance.post<CarType>(endpoints.cars, carData);
    return response.data;
  },

  // PUT 
  update: async (id: string, updatedCar: CarType): Promise<CarType> => {
    const response = await instance.put<CarType>(
      `${endpoints.cars}/${id}`,
      updatedCar
    );
    return response.data;
  },

  // PATCH 
  partialUpdate: async (
    id: string,
    updatedFields: Partial<CarType>
  ): Promise<CarType> => {
    const response = await instance.patch<CarType>(
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

// get wishlisted
export async function toggleWishlist(
  carId: string,
  userId: string
): Promise<{ message: string; wishlistedBy: { id: string }[] }> {
  const response = await instance.patch(`${endpoints.cars}/${carId}`, {
    toggleWishlist: true,
    userId,
  });
  return response.data;
}


export default CarService;
