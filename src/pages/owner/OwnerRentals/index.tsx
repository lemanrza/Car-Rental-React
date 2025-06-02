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
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { Rental, RentalStatus } from "@/types/rentalType";
import RentalService from "@/services/requests/RentalService";

const statusOptions: RentalStatus[] = ["PENDING", "CONFIRMED", "CANCELLED"];
const statusColors: Record<RentalStatus, string> = {
  PENDING: "bg-yellow-300 text-yellow-900",
  CONFIRMED: "bg-green-300 text-green-900",
  CANCELLED: "bg-red-300 text-red-900",
};
const HostBookings = () => {
  const userID = useSelector((state: RootState) => state.auth.user?.id);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [rentals, setRentals] = useState<Rental[]>([])

  useEffect(() => {
    const fetchRentals = async () => {
      if (!userID) return;
      setLoading(true);

      try {
        const data = await RentalService.getAll();
        setRentals(data);

      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    };
    fetchRentals()
  }, []);
  const ownerRentals = rentals.filter((rental) => rental.userId && rental.userId === userID)


  const handleStatusChange = async (id: string, newStatus: RentalStatus) => {
    try {
      await RentalService.partialUpdate(id, { status: newStatus });

      setRentals((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredrentals = ownerRentals?.filter(
    (b) =>
      b.car?.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.car?.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manage Rentals
        </h1>
        <Input
          type="search"
          placeholder="Search by apartment or user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car Brand</TableHead>
              <TableHead>Car Model</TableHead>
              <TableHead>User</TableHead>
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
            ) : filteredrentals?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              filteredrentals?.map((rental) => (
                <TableRow
                  key={rental.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <TableCell className="font-medium">{rental.car?.brand}</TableCell>
                  <TableCell className="font-medium">{rental.car?.model}</TableCell>
                  <TableCell>{rental.user?.username}</TableCell>
                  <TableCell>{new Date(rental.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(rental.endDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-2">
                      {statusOptions.map((status) => {
                        const isActive = rental.status === status;
                        return (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(rental.id, status)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer ${statusColors[status]} ${isActive ? "ring-2 ring-offset-1" : "opacity-60 hover:opacity-90"}`}
                            title={status}>
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    ${rental.totalPrice?.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button variant="ghost" size="icon" title="View Details">
                      <Eye />
                    </Button>
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

export default HostBookings;
