import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Car } from '@/types/carType';
import CategoryBadge from './CategoryBadge';
import StarRating from './StarRating';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={car.coverImage}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <CategoryBadge category={car.category} />
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2 flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-800">{car.brand} {car.model}</h3>
          <p className="text-sm text-gray-500">{car.year}</p>
        </div>

        <div className="mb-3">
          <StarRating rating={car.avgRating} />
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {car.description.substring(0, 100)}...
        </p>

        <div className="mt-auto flex justify-between items-center">
          <p className="font-bold text-lg text-gray-900">
            ${car.price}<span className="text-sm font-normal text-gray-600">/day</span>
          </p>
          {/* <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-1 transition-colors duration-300"
            onClick={() => console.log(`Navigate to details for car ${car.id}`)}
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </button> */}
          <Button onClick={() => navigate(`/cars/${car.id}`)}>
            <ArrowRight className="w-4 h-4" />  View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;