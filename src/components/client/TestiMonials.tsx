import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Emily Johnson',
    role: 'Business Traveler',
    avatar: 'https://media.istockphoto.com/id/1299849490/photo/portrait-of-a-black-woman.jpg?s=612x612&w=0&k=20&c=A8rgh5fd9glKs5rvZ3E_5CpxRKYmhl_wcA0iVifuME8=',
    content:
      'The service was impeccable! I needed a reliable car for a business trip, and they delivered beyond my expectations. The car was clean, well-maintained, and the pick-up process was smooth and quick.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Family Vacation',
    avatar: 'https://media.istockphoto.com/id/1135381173/photo/portrait-of-a-young-man-outdoors-smiling.jpg?s=2048x2048&w=is&k=20&c=xlSDbsMBOoGhFkFwVAkBqUgYB9Kowo_7xDwfzN4EGiY=',
    content:
      'We rented an SUV for our family vacation and had a wonderful experience. The vehicle was spacious, comfortable, and perfect for our road trip. The staff were friendly and helpful in choosing the right car for our needs.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    role: 'Weekend Getaway',
    avatar: 'https://media.istockphoto.com/id/1216152397/photo/portrait-of-female-owner-of-gift-store-standing-in-front-of-shelves-with-cosmetics-and-candles.jpg?s=2048x2048&w=is&k=20&c=pogZqHFwFA0EN522DLNpHSgK3ePFuE4LyKNlQKD8354=',
    content:
      'Rented a convertible for a weekend trip along the coast. The online booking was easy, and the car was exactly what I wanted. Made my trip special! Will definitely use their service again.',
    rating: 4,
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Corporate Event',
    avatar: 'https://media.istockphoto.com/id/1146962927/photo/senior-caucasian-man-portrait.jpg?s=2048x2048&w=is&k=20&c=CgVVhXWT6DArjWfV9153BKdEBWAiS94cGZaw603wEpI=',
    content:
      'Used their service for a corporate event where we needed multiple vehicles. Their team handled everything professionally, from booking to delivery. The fleet was impressive and our executives were very satisfied.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Jessica Miller',
    role: 'International Tourist',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content:
      'As a tourist visiting from abroad, I was concerned about renting a car in a foreign country. Their staff was patient and explained everything clearly. The GPS was pre-programmed with tourist attractions which was a nice touch!',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    resetAutoPlay();
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      if (isAutoPlaying) {
        startAutoPlay();
      }
    }
  };

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  return (
    <section
      id="testimonials"
      className="py-20 bg-muted/30"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read testimonials from our satisfied customers about their car
            rental experiences with us.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">


          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-20 w-20 border-4 border-white shadow-md mb-4">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>
                            {testimonial.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <div className="flex justify-center mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'h-5 w-5',
                                  i < testimonial.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-muted'
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-lg italic">"{testimonial.content}"</p>
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={cn(
                  'w-2 h-2 p-0 rounded-full',
                  activeIndex === index
                    ? 'bg-primary'
                    : 'bg-muted hover:bg-muted-foreground/50'
                )}
                onClick={() => {
                  setActiveIndex(index);
                  resetAutoPlay();
                }}
              />
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;