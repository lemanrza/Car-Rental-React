import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import type { CarType } from '@/types/carType';
import CategoryBadge from './CategoryBadge';
import StarRating from './StarRating';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';
import { useWishlist } from '@/hooks/useWishlist';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

interface CarCardProps {
  car: CarType;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate()
  const userId = useSelector((state: RootState) => state.auth.user?.id)
  const { toggleApartment, isInWishlist, loading } = useWishlist(userId);
  const isFavorited = isInWishlist(car.id);

  return (
    // <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col">
    //   <div className="relative h-48 w-full overflow-hidden">
    //     <img
    //       src={car.coverImage}
    //       alt={`${car.brand} ${car.model}`}
    //       className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
    //     />
    //     <div className="absolute top-2 right-2">
    //       <CategoryBadge category={car.category} />
    //     </div>
    //   </div>

    //   <div className="p-4 flex-grow flex flex-col">
    //     <div className="mb-2 flex justify-between items-start">
    //       <h3 className="text-lg font-bold text-gray-800">{car.brand} {car.model}</h3>
    //       <p className="text-sm text-gray-500">{car.year}</p>
    //     </div>

    //     <div className="mb-3">
    //       <StarRating rating={car.avgRating} />
    //     </div>

    //     <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
    //       {car.description.substring(0, 100)}...
    //     </p>

    //     <div className="mt-auto flex justify-between items-center">
    //       <p className="font-bold text-lg text-gray-900">
    //         ${car.price}<span className="text-sm font-normal text-gray-600">/day</span>
    //       </p>
    //       <Button onClick={() => navigate(`/cars/${car.id}`)}>
    //         <ArrowRight className="w-4 h-4" />  View Details
    //       </Button>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={car.coverImage}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* Favorite Button (Heart Icon) */}
        <button
          type="button"
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-2 right-2 rounded-full p-2 shadow hover:bg-gray-100 dark:hover:bg-zinc-700 ${isFavorited ? "bg-red-500 text-white" : "bg-white dark:bg-zinc-800 dark:text-white"
            }`}
          onClick={() => toggleApartment(car.id)}
          disabled={loading}
        >
          <Heart
            className="w-4 h-4"
            fill={isFavorited ? "currentColor" : "none"}
            stroke={isFavorited ? "none" : "currentColor"}
          />
        </button>

        <div className="absolute top-2 left-2">
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
          <Button onClick={() => navigate(`/cars/${car.id}`)}>
            <ArrowRight className="w-4 h-4" />  View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;