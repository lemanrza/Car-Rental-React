import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import type { CarType } from "@/types/carType";
import CarService from "@/services/requests/CarService";

const ManageCars = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await CarService.getAll();
        setCars(data);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const term = searchTerm.toLowerCase();
    return (
      car.model.toLowerCase().includes(term) ||
      car.brand.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Cars</h1>
        <Input
          className="w-xs dark:text-black"
          placeholder="Search Apartment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-lg border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="text-center">Host Name</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell className="font-medium">{car.model}</TableCell>
                  <TableCell>{car.price}</TableCell>
                  <TableCell>
                    {new Date(car.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="line-clamp-1 max-w-[200px]">
                    {car.description}
                  </TableCell>
                  <TableCell className="text-center">{car.avgRating}</TableCell>
                  <TableCell className="text-center">
                    {car.owner?.username}
                  </TableCell>
                  <TableCell className="text-center">{car.category}</TableCell>

                  <TableCell className="text-right space-x-1">
                    <Link to={`/cars/${car.id}`} target="_blank">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                  No apartments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageCars;
