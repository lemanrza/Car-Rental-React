import CarService, { toggleWishlist } from "@/services/requests/CarService";
import type { User } from "@/types/authType";
import type { CarType } from "@/types/carType";
import { useState, useEffect, useCallback } from "react";


export function useWishlist(userId?: string) {
  const [wishlist, setWishlist] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    if (!userId) {
      setWishlist([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cars = await CarService.getAll();

      const filtered = cars.filter((car: CarType) =>
        car.wishlistedBy?.some((user: User) => user.id === userId)
      );

      setWishlist(filtered);
    } catch (err) {
      console.error("Failed to load wishlist:", err);
      setError("Failed to load wishlist");
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggleApartment = useCallback(
    async (apartmentId: string) => {
      if (!userId) return;

      setLoading(true);
      setError(null);
      try {
        const res = await toggleWishlist(apartmentId, userId);
        console.log("Toggle response:", res);
        if (res.message.includes("Added")) {
          setWishlist((prev) => [...prev, { id: apartmentId } as CarType]);
        } else if (res.message.includes("Removed")) {
          setWishlist((prev) => prev.filter((apt) => apt.id !== apartmentId));
        }
      } catch (err) {
        console.error("Toggle error:", err);
        setError("Failed to toggle wishlist");
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  const isInWishlist = useCallback(
    (apartmentId: string) => wishlist.some((apt) => apt.id === apartmentId),
    [wishlist]
  );

  return { wishlist, toggleApartment, isInWishlist, loading, error };
}
