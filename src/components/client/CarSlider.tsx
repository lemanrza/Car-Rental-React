import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarGalleryProps {
  images: string[];
}

const CarSlider: React.FC<CarGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      <div className="relative rounded-2xl mt-15 overflow-hidden aspect-[21/8] bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Car image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        <button 
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-lg transition-all transform hover:scale-110 focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-lg transition-all transform hover:scale-110 focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>
      
      <div className="flex justify-center mt-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`h-16 w-24 rounded-lg overflow-hidden transition-all ${
              index === currentIndex ? 'ring-2 ring-blue-500 opacity-100' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarSlider;