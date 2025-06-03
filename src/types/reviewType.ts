import type { User } from "./authType";

export type Review = {
  id: string;
  userId: string;
  carId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: User
};