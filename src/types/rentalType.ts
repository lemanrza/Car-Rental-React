import type { User } from "./authType";
import type { CarType } from "./carType";
export type RentalStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Rental {
  id: string;
  userId: string;        
  carId: string;         
  startDate: Date | string;
  endDate: Date | string;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  user?: User;            
  car?: CarType;             
}
