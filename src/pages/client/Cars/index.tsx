import React, { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import { Range } from "react-range";
import type { CarType } from "@/types/carType";
import CarService from "@/services/requests/CarService";
import CarCard from "@/components/client/CarCard";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";

const STEP = 30;
const MIN = 0;
const MAX = 500;

const CarsSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cars, setCars] = useState<CarType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([MIN, MAX]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await CarService.getAll();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);
console.log(cars)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");
    setSelectedCategory(categoryFromUrl);
  }, [location.search]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);

    const params = new URLSearchParams(location.search);
    if (category) {
      params.set("category", category.toLowerCase());
    } else {
      params.delete("category");
    }
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  };

  const categories = Array.from(new Set(cars.map((car) => car.category)));

  const filteredCars = cars.filter((car) => {
    const matchesCategory = selectedCategory
      ? car.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const matchesSearch = car.model.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
      car.brand.toLocaleLowerCase().trim().includes(searchTerm.toLowerCase().trim());

    const matchesPrice =
      typeof car.price === "number"
        ? car.price >= priceRange[0] && car.price <= priceRange[1]
        : true;

    return matchesCategory && matchesSearch && matchesPrice;
  });
  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mt-15 mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Cars</h2>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-grow min-w-[250px] max-w-md">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by model..."
              className="max-w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap mr-15 items-center gap-2 min-w-[250px]">
            <Filter className="w-4 h-4 text-gray-700 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 mr-2 whitespace-nowrap">
              Category:
            </span>

            <button
              className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              onClick={() => handleCategoryChange(null)}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${selectedCategory?.toLowerCase() === category.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>


          <div className="min-w-[150px] max-w-[200px] w-full">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <Range
              step={STEP}
              min={MIN}
              max={MAX}
              values={priceRange}
              onChange={(values) => setPriceRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-2 bg-gray-300 rounded"
                  style={{ ...props.style }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-5 w-5 rounded-full bg-blue-600 border border-white shadow"
                />
              )}
            />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No cars found.</p>
        </div>
      )}
    </div>
  );
};

export default CarsSection;

