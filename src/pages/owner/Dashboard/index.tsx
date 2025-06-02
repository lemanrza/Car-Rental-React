import RentalsChart from "@/components/admin/RentalsChart";
import RevenueChart from "@/components/admin/RevenueChart";
import StatsCard from "@/components/admin/StatsCard";
import { Card, CardContent } from "@/components/ui/card";
import type { RootState } from "@/redux/store";
import CarService from "@/services/requests/CarService";
import RentalService from "@/services/requests/RentalService";
import type { CarType } from "@/types/carType";
import type { Rental } from "@/types/rentalType";
import { Calendar, Car, CircleDollarSign, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const monthsLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const OwnerDashboard = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [cars, setCars] = useState<CarType[]>([]);
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    const fetchRentals = async () => {
      if (!user?.id) return;
      try {
        const data = await RentalService.getAll();
        setRentals(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    const fetchCars = async () => {
      if (!user?.id) return;
      try {
        const data = await CarService.getAll();
        setCars(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchRentals();
    fetchCars();
  }, [user?.id]);
  const ownerCars = cars.filter((car) => car.ownerId && car.ownerId === user?.id)
  const ownerRentals = rentals.filter((rental) => rental.userId && rental.userId === user?.id)
  console.log(cars)
  console.log(ownerRentals)
  const getRentalsCountPerMonth = () => {
    const now = new Date();
    const counts: number[] = [];
    for (let i = 0; i < 12; i++) {
      const month = i;
      const year = now.getFullYear();
      const count = ownerRentals.filter((rental) => {
        const startDate = new Date(rental.startDate);
        return startDate.getMonth() === month && startDate.getFullYear() === year;
      }).length;
      counts.push(count);
    }
    return counts;
  };

  const rentalsCount = getRentalsCountPerMonth();

  const statsData = [
    {
      icon: <Car />,
      title: "Total Cars",
      value: ownerCars?.length ?? 0,
    },
    {
      icon: <Calendar />,
      title: "Active Rentals",
      value: user?.rentals?.length,
    },
    {
      icon: <CircleDollarSign />,
      title: "Monthly Revenue",
      value: user?.rentals?.filter((rental) => rental.status === "CONFIRMED").reduce((sum, b) => sum + (b.totalPrice ?? 0), 0),
    },
  ];
  return (
    <>
      <div className="flex gap-4 mb-6">
        {statsData.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-4">
          <RevenueChart labels={monthsLabels} rentals={ownerRentals} />
          <RentalsChart labels={monthsLabels} data={rentalsCount} />
        </div>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold">Car Performance</h2>
          <p className="text-sm text-gray-500 mt-1">Performance metrics for your cars</p>

          <div className="mt-6">
            <div className="grid grid-cols-4 sm:grid-cols-5 font-medium text-gray-500 px-2 mb-2">
              <div className="col-span-2">Car</div>
              <div>Rentals</div>
              <div>Revenue</div>
              <div className="hidden sm:block">Rating</div>
            </div>

            {ownerCars.map((car, idx) => {
              const carsRentals = rentals.filter(b => b.carId === car.id);
              const confirmedRentals = carsRentals.filter(b => b.status === "CONFIRMED");
              const totalRevenue = confirmedRentals.reduce((sum, b) => sum + (b.totalPrice ?? 0), 0);

              return (
                <CardContent
                  key={idx}
                  className="grid grid-cols-4 sm:grid-cols-5 items-center py-3 border-t last:border-b px-2"
                >
                  <div className="col-span-2 text-sm font-medium">{car.model}</div>
                  <div className="text-sm">{carsRentals.length}</div>
                  <div className="text-sm">${totalRevenue.toFixed(2)}</div>
                  <div className="hidden sm:flex items-center gap-1 text-sm text-gray-700">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {car.avgRating ?? "-"}
                  </div>
                </CardContent>
              );
            })}
          </div>
        </Card>
      </div>
    </>
  );
};

export default OwnerDashboard;
