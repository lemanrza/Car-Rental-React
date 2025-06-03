import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Rental } from "@/types/rentalType";
import RentalService from "@/services/requests/RentalService";


const ManageRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals= async () => {
      setLoading(true);
      try {
        const data = await RentalService.getAll();
        setRentals(data);
        console.log("rentals", data)
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
      setLoading(false);
    };
    fetchRentals();
  }, []);

  return (
    <div className="flex-1 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manage Rentals
        </h1>
        
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">CarId</TableHead>
              <TableHead>UserId</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Total Price</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  Loading bookings...
                </TableCell>
              </TableRow>
            ) : rentals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No rentals found
                </TableCell>
              </TableRow>
            ) : (
              rentals.map((rental) => (
                <TableRow
                  key={rental.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <TableCell className="font-medium lin-clamp-1 max-w-[150px]  text-center">{rental.carId}</TableCell>
                  <TableCell>{rental.userId}</TableCell>
                  <TableCell>{new Date(rental.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(rental.endDate).toLocaleDateString()}</TableCell>
                  <TableCell className="rounded px-2 py-1 dark:bg-gray-800 dark:text-white" >
                    {rental.status}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    ${rental.totalPrice?.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <Link to={`/cars/${rental.carId}`}>
                      <Button variant="ghost" size="icon" title="View Details">
                        <Eye />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageRentals;
