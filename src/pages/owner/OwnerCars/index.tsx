import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import type { CarType } from "@/types/carType";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import AddCarForm from "@/components/owner/AddCarForm";
import EditCarForm from "@/components/owner/EditCarForm";
import CarService from "@/services/requests/CarService";

const HostApartments = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  console.log(user?.cars)
  const [cars, setCars] = useState<CarType[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editCar, setEditCar] = useState<CarType | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(cars)

  useEffect(() => {
    const fetchCars = async () => {
      const data = await CarService.getAll()
      setCars(data)
    }
    fetchCars()
  })
  const ownerCars = cars.filter((car) => car.ownerId && car.ownerId === user?.id)

  const filteredCars =
    ownerCars.filter((car) =>
      (car.model?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (car.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    );


  // console.log(filteredCars)
  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleFormCancel = () => {
    setShowAddForm(false);
  };

  const handleFormSuccess = () => {
    setShowAddForm(false);
  };

  const handleDelete = async (carId: string) => {
    try {
      await CarService.delete(carId);
      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };


  const handleEditClick = (car: CarType) => {
    setEditCar(car);
    setShowEditForm(true);
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
    setEditCar(null);
  };
  const handleEditSuccess = (updatedCar: CarType) => {
    if (!user) return;

    setCars((prevCars) =>
      prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
    );

    setShowEditForm(false);
    setEditCar(null);
  };


  return (
    <div className="flex-1 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Manage Cars
        </h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <Input
            className="w-full sm:w-64 text-black dark:text-black"
            placeholder="Search Apartment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {!showAddForm && (
            <Button className="whitespace-nowrap" onClick={handleAddClick}>
              + Add Car
            </Button>
          )}
        </div>
      </div>

      {showAddForm && (
        <AddCarForm onCancel={handleFormCancel} onSuccess={handleFormSuccess} />
      )}

      {showEditForm && editCar && (
        <EditCarForm
          car={editCar}
          onCancel={handleEditCancel}
          onSuccess={handleEditSuccess}
        />
      )}

      {!showAddForm && !showEditForm && (
        <div className="rounded-lg border shadow-sm overflow-x-auto">
          <Table className="min-w-[800px] sm:min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden lg:table-cell">Created At</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center hidden sm:table-cell">Rating</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCars.length && filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell className="font-medium whitespace-normal break-words">
                      {car.brand}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {car.model}
                    </TableCell>
                    <TableCell>${car.price}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(car.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="line-clamp-6 max-w-[200px] whitespace-normal break-words">
                      {car.description}
                    </TableCell>
                    <TableCell className="text-center hidden sm:table-cell">
                      {car.avgRating}
                    </TableCell>
                    <TableCell className="text-center">{car.category}</TableCell>

                    <TableCell className="text-right space-x-1">
                      <Link to={`/cars/${car.id}`} target="_blank">
                        <Button variant="ghost" size="icon" aria-label="View Apartment">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete Apartment"
                        onClick={() => handleDelete(car.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit Apartment"
                        onClick={() => handleEditClick(car)}
                      >
                        <SquarePen className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                    No Cars Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default HostApartments;
