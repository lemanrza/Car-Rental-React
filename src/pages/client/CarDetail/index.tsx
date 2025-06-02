import CarSlider from "@/components/client/CarSlider";
import type { RootState } from "@/redux/store";
import CarService from "@/services/requests/CarService";
import type { Car } from "@/types/carType";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cars, setCars] = useState<Car[]>([])
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    const fetchCars = async () => {
      const data = await CarService.getAll()
      setCars(data)
    }
    fetchCars()
  }, [])
  const car = cars.find((c) => c.id == id)
  if (!car || !car.images || car.images.length === 0) {
    return <div className="p-4 text-gray-600">Loading car details...</div>;
  }
  return (
    <div className="max-w-7xl mx-auto p-4">
      <CarSlider images={car?.images} />

      <div className="mt-6">
        <h1 className="text-3xl font-bold">{car?.brand} {car?.model}</h1>
        <p className="text-gray-600 mt-2">{car?.description}</p>
        <p className="text-lg mt-4 font-medium">Year: {car?.year}</p>
        <p className="text-lg font-bold mt-1">${car?.price}/day</p>
      </div>
    </div>
  )
}

export default CarDetail