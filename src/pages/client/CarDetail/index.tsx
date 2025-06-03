// import { useEffect, useState } from "react";
// import { Star } from "lucide-react";
// import { useNavigate, useParams } from "react-router";
// import CarSlider from "@/components/client/CarSlider";
// import ReviewDialog from "@/components/client/Review";
// import CarService from "@/services/requests/CarService";
// import ReviewService from "@/services/requests/ReviewService";
// import type { CarType } from "@/types/carType";
// import type { Review } from "@/types/reviewType";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "@/redux/store";
// import { Button } from "@/components/ui/button";
// import RentalService from "@/services/requests/RentalService";

// const TABS = ["Details", "Reviews"];

// const CarDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [activeTab, setActiveTab] = useState<string>("Details");
//   const user = useSelector((state: RootState) => state.auth.user);
//   const [currentCar, setCurrentCar] = useState<CarType | null>(null);


//   useEffect(() => {
//     const fetchCars = async () => {
//       const data = await CarService.getAll();
//       const foundCar = data.find((car) => car.id === id);
//       setCurrentCar(foundCar || null);
//     };

//     const fetchReviews = async () => {
//       const data = await ReviewService.getAll();
//       setReviews(data);
//     };

//     fetchCars();
//     fetchReviews();
//   }, [id]);

//   const currentreviews = reviews.filter((review) => review.carId === currentCar?.id);

//   const calculateAverageRating = (reviews: Review[]): number => {
//     if (reviews.length === 0) return 0;
//     const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//     return totalRating / reviews.length;
//   };

//   const handleReviewSubmit = async (data: { rating: number; comment: string }) => {
//     if (!user || !currentCar) {
//       alert("User or car information is missing.");
//       return;
//     }
//     try {
//       await ReviewService.create({
//         user: user,
//         userId: user.id,
//         carId: currentCar.id,
//         rating: data.rating,
//         comment: data.comment,
//       });
//       const updatedReviews = await ReviewService.getAll();
//       setReviews(updatedReviews);
//     } catch (error) {
//       console.error("Failed to submit review", error);
//     }
//   };


//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "Details":
//         return (
//           <div>
//             <h3 className="font-semibold text-xl mb-2 dark:text-white">Description</h3>
//             <p className="text-gray-600 dark:text-gray-300">
//               {currentCar?.description || "No description provided."}
//             </p>

//             <h3 className="font-semibold text-xl mt-6 mb-2 dark:text-white">Host</h3>
//             <div className="flex items-center gap-3">
//               <img
//                 src={"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
//                 alt={currentCar?.owner?.username || "Host"}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div className="flex flex-col">
//                 <span className="dark:text-gray-300 text-md font-semibold">{currentCar?.owner?.username || "Unknown Host"}</span>
//                 <span>Host since January 2020</span>
//                 <span>98% response rate • Responds within an hour</span>
//               </div>
//             </div>
//           </div>
//         );

//       case "Reviews":
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center gap-2 text-lg font-medium dark:text-white">
//               <Star className="text-yellow-500 fill-yellow-500 w-6 h-6" />
//               <span className="text-2xl font-semibold">{calculateAverageRating(currentreviews).toFixed(1)}</span>
//               <span>|</span>
//               <span className="text-gray-700 text-sm dark:text-gray-400">{currentreviews.length} reviews</span>
//             </div>

//             {currentreviews.length ? (currentreviews.map((review, idx) => (
//               <div key={idx} className="border-t pt-4 border-gray-300 dark:border-gray-700">
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-full">
//                     <img src={review.user.profileImage} alt={review.user?.username} className="rounded-full" />
//                   </div>
//                   <div>
//                     <p className="font-semibold dark:text-white">{review.user?.username}</p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center mt-2">
//                   {[...Array(review.rating)].map((_, i) => (
//                     <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                   ))}
//                 </div>

//                 <p className="text-gray-700 mt-2 dark:text-gray-300">{review.comment}</p>
//               </div>))) : (
//               <p className="dark:text-gray-300">No reviews yet.</p>
//             )
//             }
//             <ReviewDialog onSubmit={handleReviewSubmit} user={user ?? undefined} />
//           </div>
//         );

//       default:
//         return null;
//     }
//   };
//   const handleBooking = async () => {
//     if (!user) {
//       navigate('/login'); // Redirect to login if the user is not logged in
//       return;
//     }

//     if (numberOfDays <= 0) {
//       alert('Number of days must be greater than 0.');
//       return;
//     }

//     if (!currentCar) {
//       alert('Car data is missing.');
//       return;
//     }

//     const totalPrice = currentCar.price * numberOfDays;

//     // Check if the user has sufficient balance
//     if (!user.balance || user.balance < totalPrice) {
//       alert("Insufficient balance to complete booking.");
//       return;
//     }

//     // Create the rental data
//     const startDate = new Date();
//     const endDate = new Date(startDate);
//     endDate.setDate(startDate.getDate() + numberOfDays);

//     const rentalData = {
//       userId: user.id,
//       carId: currentCar.id,
//       startDate: startDate.toISOString(),
//       endDate: endDate.toISOString(),
//       totalPrice,
//       status: "PENDING", // Booking status, initially pending
//     };

//     try {
//       // Step 1: Create rental
//       await RentalService.create(rentalData);

//       // Step 2: Update the user's balance after booking
//       const newBalance = user.balance - totalPrice;
//       dispatch(updateBalance(newBalance)); // Update the balance in Redux

//       const updatedUser = { ...user, balance: newBalance };
//       localStorage.setItem("user", JSON.stringify(updatedUser)); // Save updated balance in localStorage

//       alert('Booking created successfully! Your balance has been updated.');

//     } catch (error) {
//       console.error(error);
//       alert('Failed to create booking.');
//     }
//   };

//   if (!currentCar || !currentCar.images || currentCar.images.length === 0) {
//     return <div className="p-4 text-gray-600">Loading car details...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <CarSlider images={currentCar?.images} />
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
//                   {currentCar?.brand} | {currentCar?.model}
//                 </h1>
//                 <p className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300 mt-2">
//                   <span>{currentCar?.category}</span> | <span>{currentCar?.year}</span>
//                 </p>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
//                 <Star size={18} className="text-yellow-500" />
//                 <span>{calculateAverageRating(currentreviews).toFixed(1)}</span>
//                 <span>({currentCar?.reviews?.length || 0} reviews)</span>
//               </div>
//             </div>

//             <div className="flex gap-6 border-b pb-4 mb-6">
//               {TABS.map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`py-2 px-4 text-sm font-semibold transition duration-300 ease-in-out ${activeTab === tab
//                     ? "border-b-2 border-black text-black dark:text-white"
//                     : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
//                     }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             <div className="text-gray-700 dark:text-gray-300 text-sm">{renderTabContent()}</div>
//           </div>

//           <aside className="lg:ml-10 flex justify-center lg:justify-start">
//             <Button onClick={handleBooking} size="lg" className="px-8 py-3 mt-2 bg-[#372AAC] text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-200">
//               Book Now
//             </Button>
//           </aside>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default CarDetail;

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CarSlider from "@/components/client/CarSlider";
import ReviewDialog from "@/components/client/Review";
import CarService from "@/services/requests/CarService";
import ReviewService from "@/services/requests/ReviewService";
import type { CarType } from "@/types/carType";
import type { Review } from "@/types/reviewType";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import RentalService from "@/services/requests/RentalService";
import { updateBalance } from "@/redux/features/AuthSlice";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const TABS = ["Details", "Reviews"];

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Details");
  const user = useSelector((state: RootState) => state.auth.user);
  const [currentCar, setCurrentCar] = useState<CarType | null>(null);
  const [numberOfDays, setNumberOfDays] = useState(1);  // This keeps track of the number of days for booking

  useEffect(() => {
    const fetchCars = async () => {
      const data = await CarService.getAll();
      const foundCar = data.find((car) => car.id === id);
      setCurrentCar(foundCar || null);
    };

    const fetchReviews = async () => {
      const data = await ReviewService.getAll();
      setReviews(data);
    };

    fetchCars();
    fetchReviews();
  }, [id]);

  const currentreviews = reviews.filter((review) => review.carId === currentCar?.id);

  const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const handleReviewSubmit = async (data: { rating: number; comment: string }) => {
    if (!user || !currentCar) {
      alert("User or car information is missing.");
      return;
    }
    try {
      await ReviewService.create({
        user: user,
        userId: user.id,
        carId: currentCar.id,
        rating: data.rating,
        comment: data.comment,
      });
      const updatedReviews = await ReviewService.getAll();
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (numberOfDays <= 0) {
      alert('Number of days must be greater than 0.');
      return;
    }

    if (!currentCar) {
      alert('Car data is missing.');
      return;
    }

    const totalPrice = currentCar.price * numberOfDays;

    if ((user?.balance ?? 0) < totalPrice) {
      alert("Insufficient balance to complete booking.");
      return;
    }


    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + numberOfDays);

    const rentalData = {
      userId: user.id,
      carId: currentCar.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalPrice,
      status: "PENDING" as const,
    };

    try {
      await RentalService.create(rentalData);

      const newBalance = user.balance - totalPrice;
      dispatch(updateBalance(newBalance));

      const updatedUser = { ...user, balance: newBalance };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert('Booking created successfully! Your balance has been updated.');

    } catch (error) {
      console.error(error);
      alert('Failed to create booking.');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Details":
        return (
          <div>
            <h3 className="font-semibold text-xl mb-2 dark:text-white">Description</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {currentCar?.description || "No description provided."}
            </p>

            <h3 className="font-semibold text-xl mt-6 mb-2 dark:text-white">Host</h3>
            <div className="flex items-center gap-3">
              <img
                src={"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                alt={currentCar?.owner?.username || "Host"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="dark:text-gray-300 text-md font-semibold">{currentCar?.owner?.username || "Unknown Host"}</span>
                <span>Host since January 2020</span>
                <span>98% response rate • Responds within an hour</span>
              </div>
            </div>
          </div>
        );

      case "Reviews":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-lg font-medium dark:text-white">
              <Star className="text-yellow-500 fill-yellow-500 w-6 h-6" />
              <span className="text-2xl font-semibold">{calculateAverageRating(currentreviews).toFixed(1)}</span>
              <span>|</span>
              <span className="text-gray-700 text-sm dark:text-gray-400">{currentreviews.length} reviews</span>
            </div>

            {currentreviews.length ? (currentreviews.map((review, idx) => (
              <div key={idx} className="border-t pt-4 border-gray-300 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full">
                    <img src={review.user.profileImage} alt={review.user?.username} className="rounded-full" />
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white">{review.user?.username}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center mt-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                <p className="text-gray-700 mt-2 dark:text-gray-300">{review.comment}</p>
              </div>))) : (
              <p className="dark:text-gray-300">No reviews yet.</p>
            )}
            <ReviewDialog onSubmit={handleReviewSubmit} user={user ?? undefined} />
          </div>
        );

      default:
        return null;
    }
  };

  if (!currentCar || !currentCar.images || currentCar.images.length === 0) {
    return <div className="p-4 text-gray-600">Loading car details...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <CarSlider images={currentCar?.images} />
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                  {currentCar?.brand} | {currentCar?.model}
                </h1>
                <p className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300 mt-2">
                  <span>{currentCar?.category}</span> | <span>{currentCar?.year}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Star size={18} className="text-yellow-500" />
                <span>{calculateAverageRating(currentreviews).toFixed(1)}</span>
                <span>({currentCar?.reviews?.length || 0} reviews)</span>
              </div>
            </div>

            <div className="flex gap-6 border-b pb-4 mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 text-sm font-semibold transition duration-300 ease-in-out ${activeTab === tab
                    ? "border-b-2 border-black text-black dark:text-white"
                    : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="text-gray-700 dark:text-gray-300 text-sm">{renderTabContent()}</div>
          </div>

          <aside className="lg:ml-10 flex justify-center lg:justify-start">

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="px-8 py-3 mt-2 bg-[#372AAC] text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
                >
                  Book Now
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select number of days</DialogTitle>
                  <DialogDescription>
                    <Input
                      type="number"
                      id="days"
                      value={numberOfDays}
                      onChange={(e) => setNumberOfDays(Number(e.target.value))}
                      min="1"
                    />
                    <Button
                      onClick={handleBooking}
                      className="mt-4 bg-[#372AAC] text-white hover:bg-blue-700"
                    >
                      Confirm Booking
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
