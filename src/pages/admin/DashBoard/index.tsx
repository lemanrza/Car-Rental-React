import CarCategoryChart from "@/components/admin/CarCategoryChart";
import RentalsChart from "@/components/admin/RentalsChart";
import RevenueChart from "@/components/admin/RevenueChart";
import StatsCard from "@/components/admin/StatsCard";
import { Button } from "@/components/ui/button";
import CarService from "@/services/requests/CarService";
import RentalService from "@/services/requests/RentalService";
import UserService from "@/services/requests/UserService";
import type { User } from "@/types/authType";
import type { CarType } from "@/types/carType";
import type { Rental } from "@/types/rentalType";

import {  Calendar, Car, CircleDollarSign, Users } from "lucide-react";
import { useEffect, useState } from "react";

const AdminDashBoard = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [cars, setCars] = useState<CarType[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const getRentalsCountPerMonth = () => {
    const now = new Date();
    const monthsLabels = [];
    const rentalsCount = [];

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthsLabels.push(d.toLocaleString("default", { month: "short" }));

      const count = rentals.filter((b) => {
        const rentalDate = new Date(b.startDate);
        return (
          rentalDate.getMonth() === d.getMonth() &&
          rentalDate.getFullYear() === d.getFullYear()
        );
      }).length;

      rentalsCount.push(count);
    }

    return { monthsLabels, rentalsCount };
  };

  const { monthsLabels, rentalsCount } = getRentalsCountPerMonth();

  const statsData = [
    {
      icon: <Users />,
      title: "Total Users",
      value: users.length,
    },
    {
      icon: <Car />,
      title: "Total Cars",
      value: cars.length,
    },
    {
      icon: <Calendar />,
      title: "Active Rentals",
      value: rentals.length,
    },
    {
      icon: <CircleDollarSign />,
      title: "Monthly Revenue",
      value: rentals.reduce((sum, rental) => sum + rental.totalPrice, 0),
    },
  ];

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await RentalService.getAll ();
        setRentals(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    const fetchCars = async () => {
      try {
        const data = await CarService.getAll();
        setCars(data);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    };
    const fetchUsers = async () => {
      try {
        const data = await UserService.getAll ();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchRentals();
    fetchCars();
    fetchUsers();
  }, []);

  const handleOwnerRequest = async (userId: string, approve: boolean) => {
    try {
      setLoadingIds((prev) => [...prev, userId]);

      const updateData = approve
        ? { role: "OWNER" as const, hostRequest: false }
        : { hostRequest: false };

      await UserService.update(userId, updateData);


      const updatedUsers = await UserService.getAll();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to update host request:", error);
      alert("Action failed, try again");
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  const userWantsToBeOwner = users.filter((user) => user.hostRequest === true)
  return (
    <>
      <div className="flex gap-4 mb-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-4">
          <RevenueChart labels={monthsLabels} rentals={rentals} />
          <RentalsChart labels={monthsLabels} data={rentalsCount} />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <CarCategoryChart />
          <div className="bg-white p-4 rounded-lg shadow w-full md:w-1/2">
            <h2 className="text-lg font-semibold">Host Requests</h2>
            <p className="text-sm text-gray-500 mb-4">Users requesting to become hosts</p>
            <ul>
              {userWantsToBeOwner.slice(0, 3).map((req, index) => {
                const isLoading = loadingIds.includes(req.id);
                return (<li key={index} className="flex items-center justify-between border-b py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full">
                      <img src={req.profileImage} alt={req.username} className="overflow-hidden rounded-full " />
                    </div>
                    <div>
                      <p className="font-medium">{req.username}</p>
                      <p className="text-sm text-gray-500">{req.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="border" disabled={isLoading}
                      onClick={() => handleOwnerRequest(req.id, false)}>Decline</Button>
                    <Button disabled={isLoading} onClick={() => handleOwnerRequest(req.id, true)}>Approve</Button>
                  </div>
                </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
